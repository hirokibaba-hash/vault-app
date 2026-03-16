import { useEffect, useRef, useState } from 'react'
import { Clock, Grid3X3, List, Search, Table, ChevronUp, ChevronDown, Link as LinkIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'
import { fetchOgp } from '@/lib/ogp'
import type { CardLink, ChatMessage } from '@/lib/card-types'
import { TopicWorkspace } from '@/components/TopicWorkspace'
import { CardPage } from '@/components/CardPage'

// ── Types ─────────────────────────────────────────────────────────
interface VaultItem {
  id: string
  title: string
  cluster: string
  tags: string[]
  createdAt: string
  updatedAt: string
  summary: string
  body: string
  links: CardLink[]
  notes: string
  assignees: string[]
  connections: string[]
  messages: ChatMessage[]
}

type ViewMode = 'grid' | 'list' | 'table'
type SortKey = 'title' | 'cluster' | 'createdAt' | 'updatedAt'
type SortDir = 'asc' | 'desc'

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: 'title',     label: 'タイトル' },
  { key: 'cluster',   label: 'クラスター' },
  { key: 'updatedAt', label: '更新日' },
  { key: 'createdAt', label: '作成日' },
]

function formatDate(iso: string) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

// ── Main page ─────────────────────────────────────────────────────
export default function Vault() {
  const [items, setItems]         = useState<VaultItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode]   = useState<ViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('すべて')
  const [sortKey, setSortKey]     = useState<SortKey>('updatedAt')
  const [sortDir, setSortDir]     = useState<SortDir>('desc')
  const [peekItem, setPeekItem]   = useState<VaultItem | null>(null)
  const [showPage, setShowPage]   = useState(false)

  // Per-card editable state (mirrors canvas pattern)
  const [cardTitles,    setCardTitles]    = useState<Record<string, string>>({})
  const [cardSummaries, setCardSummaries] = useState<Record<string, string>>({})
  const [cardNotes,     setCardNotes]     = useState<Record<string, string>>({})
  const [cardLinks,     setCardLinks]     = useState<Record<string, CardLink[]>>({})
  const [cardBodies,    setCardBodies]    = useState<Record<string, string>>({})
  const [cardAssignees, setCardAssignees] = useState<Record<string, string[]>>({})
  const [cardMessages,  setCardMessages]  = useState<Record<string, ChatMessage[]>>({})

  // Debounced save
  const saveTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({})
  const debouncedSave = (id: string, field: string, value: unknown) => {
    const key = `${id}:${field}`
    clearTimeout(saveTimers.current[key])
    saveTimers.current[key] = setTimeout(() => {
      supabase.from('vault_cards').update({ [field]: value }).eq('id', id)
    }, 600)
  }

  useEffect(() => {
    supabase
      .from('vault_cards')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) {
          const mapped: VaultItem[] = data.map(row => ({
            id: row.id,
            title: row.title ?? '',
            cluster: row.cluster ?? '',
            tags: row.tags ?? [],
            createdAt: row.created_at ?? '',
            updatedAt: row.updated_at ?? '',
            summary: row.summary ?? '',
            body: row.body ?? '',
            links: row.links ?? [],
            notes: row.notes ?? '',
            assignees: row.assignees ?? [],
            connections: row.connections ?? [],
            messages: row.messages ?? [],
          }))
          setItems(mapped)
          setCardTitles(Object.fromEntries(mapped.map(i => [i.id, i.title])))
          setCardSummaries(Object.fromEntries(mapped.map(i => [i.id, i.summary])))
          setCardNotes(Object.fromEntries(mapped.map(i => [i.id, i.notes])))
          setCardLinks(Object.fromEntries(mapped.map(i => [i.id, i.links])))
          setCardBodies(Object.fromEntries(mapped.map(i => [i.id, i.body])))
          setCardAssignees(Object.fromEntries(mapped.map(i => [i.id, i.assignees])))
          setCardMessages(Object.fromEntries(mapped.map(i => [i.id, i.messages])))
        }
        setIsLoading(false)
      })
  }, [])

  const allTags = ['すべて', ...Array.from(new Set(items.flatMap(i => i.tags))).sort()]

  const filtered = items.filter((item) => {
    const matchesTag    = selectedTag === 'すべて' || item.tags.includes(selectedTag)
    const matchesSearch = searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.body.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTag && matchesSearch
  })

  const sorted = viewMode === 'table'
    ? [...filtered].sort((a, b) => {
        const av = a[sortKey] as string
        const bv = b[sortKey] as string
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
      })
    : filtered

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const deleteItem = async (id: string) => {
    await supabase.from('vault_cards').delete().eq('id', id)
    setItems(prev => prev.filter(i => i.id !== id))
    setPeekItem(null)
  }

  // Mock AI response for chat tab
  const mockAI = (item: VaultItem, msg: string): string => {
    const links = cardLinks[item.id] ?? []
    if (msg.includes('要点') || msg.includes('まとめ') || msg.includes('整理'))
      return `「${item.title}」の要点をまとめます。${links.length > 0 ? `${links.length}件の参考資料を踏まえると、` : ''}このトピックの核心は ${item.tags.slice(0, 2).join('・')} に関連した課題です。具体的にどの側面を深堀りしますか？`
    if (msg.includes('共通点') || msg.includes('関連'))
      return links.length >= 2
        ? `「${links[0].title || links[0].domain}」と「${links[1].title || links[1].domain}」の間には興味深い接点があります。どちらの視点が役立ちそうですか？`
        : 'リンクをもう少し追加すると、資料間の共通点を分析できます。'
    return `「${item.title}」について考えるとき、${item.tags.map(t => `「${t}」`).join('・')} の観点から整理すると見えてくるものがあるかもしれません。今一番引っかかっている点は？`
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">リスト</h1>
        <p className="text-muted-foreground mt-1">
          {isLoading ? '読み込み中...' : `${items.length}件のカード`}
        </p>
      </div>

      {/* Search & Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input placeholder="タイトル・概要・メモで検索..." className="pl-9"
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border p-1">
          <Button variant={viewMode === 'grid'  ? 'default' : 'ghost'} size="sm" className="h-7 w-7 p-0"
            onClick={() => setViewMode('grid')}  title="グリッド"><Grid3X3 className="h-4 w-4" /></Button>
          <Button variant={viewMode === 'list'  ? 'default' : 'ghost'} size="sm" className="h-7 w-7 p-0"
            onClick={() => setViewMode('list')}  title="リスト"><List className="h-4 w-4" /></Button>
          <Button variant={viewMode === 'table' ? 'default' : 'ghost'} size="sm" className="h-7 w-7 p-0"
            onClick={() => setViewMode('table')} title="テーブル"><Table className="h-4 w-4" /></Button>
        </div>
      </div>

      {/* Tag filters */}
      {allTags.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Badge key={tag} variant={selectedTag === tag ? 'default' : 'outline'}
              className="cursor-pointer text-sm" onClick={() => setSelectedTag(tag)}>
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Loading skeleton */}
      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 rounded-xl bg-neutral-100 animate-pulse" />
          ))}
        </div>
      )}

      {/* Grid view */}
      {!isLoading && viewMode === 'grid' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((item) => (
            <Card key={item.id} className="group transition-shadow hover:shadow-md cursor-pointer"
              onClick={() => setPeekItem(item)}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold leading-tight line-clamp-2">
                      {cardTitles[item.id] || '(タイトルなし)'}
                    </h3>
                    {item.cluster && <p className="text-muted-foreground mt-0.5 text-xs">{item.cluster}</p>}
                  </div>
                </div>
                {(cardSummaries[item.id] || item.summary) && (
                  <p className="text-muted-foreground mt-3 text-sm line-clamp-3">
                    {cardSummaries[item.id] || item.summary}
                  </p>
                )}
                {item.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                )}
                <div className="text-muted-foreground mt-3 flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{formatDate(item.updatedAt)}</span>
                  {(cardLinks[item.id]?.length ?? 0) > 0 && (
                    <span className="flex items-center gap-1"><LinkIcon className="h-3 w-3" />{cardLinks[item.id].length}件</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* List view */}
      {!isLoading && viewMode === 'list' && (
        <div className="space-y-3">
          {sorted.map((item) => (
            <Card key={item.id} className="group transition-shadow hover:shadow-md cursor-pointer"
              onClick={() => setPeekItem(item)}>
              <CardContent className="pt-4">
                <div className="flex items-start gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold">{cardTitles[item.id] || '(タイトルなし)'}</h3>
                    {item.cluster && <p className="text-muted-foreground text-xs">{item.cluster}</p>}
                    {(cardSummaries[item.id] || item.summary) && (
                      <p className="text-muted-foreground mt-1 text-sm line-clamp-2">
                        {cardSummaries[item.id] || item.summary}
                      </p>
                    )}
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                      <div className="text-muted-foreground ml-auto flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{formatDate(item.updatedAt)}</span>
                        {(cardLinks[item.id]?.length ?? 0) > 0 && (
                          <span className="flex items-center gap-1"><LinkIcon className="h-3 w-3" />{cardLinks[item.id].length}件</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Table view */}
      {!isLoading && viewMode === 'table' && (
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {COLUMNS.map((col) => (
                  <th key={col.key}
                    className="px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors whitespace-nowrap"
                    onClick={() => handleSort(col.key)}>
                    <span className="flex items-center gap-1">
                      {col.label}
                      {sortKey === col.key
                        ? sortDir === 'asc' ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />
                        : <span className="h-3.5 w-3.5" />}
                    </span>
                  </th>
                ))}
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">タグ</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap">リンク</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((item, i) => (
                <tr key={item.id}
                  className={`group border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer ${i % 2 !== 0 ? 'bg-muted/10' : ''}`}
                  onClick={() => setPeekItem(item)}>
                  <td className="px-4 py-3 max-w-xs">
                    <span className="truncate font-medium block">{cardTitles[item.id] || '(タイトルなし)'}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{item.cluster || '—'}</td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{formatDate(item.updatedAt)}</td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{formatDate(item.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    {(cardLinks[item.id]?.length ?? 0) > 0 ? `${cardLinks[item.id].length}件` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <div className="text-muted-foreground py-12 text-center">
          <p>該当するカードが見つかりませんでした</p>
        </div>
      )}

      {/* Side peek — same TopicWorkspace as canvas */}
      {peekItem && !showPage && (
        <TopicWorkspace
          item={peekItem}
          cardTitle={cardTitles[peekItem.id] ?? peekItem.title}
          onTitleChange={v => {
            setCardTitles(prev => ({ ...prev, [peekItem.id]: v }))
            debouncedSave(peekItem.id, 'title', v)
          }}
          links={cardLinks[peekItem.id] ?? []}
          notes={cardNotes[peekItem.id] ?? ''}
          messages={cardMessages[peekItem.id] ?? []}
          body={cardBodies[peekItem.id] ?? ''}
          summary={cardSummaries[peekItem.id] ?? ''}
          assignees={cardAssignees[peekItem.id] ?? []}
          onSummaryChange={v => {
            setCardSummaries(prev => ({ ...prev, [peekItem.id]: v }))
            debouncedSave(peekItem.id, 'summary', v)
          }}
          onNotesChange={v => {
            setCardNotes(prev => ({ ...prev, [peekItem.id]: v }))
            debouncedSave(peekItem.id, 'notes', v)
          }}
          onAssigneesChange={v => {
            setCardAssignees(prev => ({ ...prev, [peekItem.id]: v }))
            supabase.from('vault_cards').update({ assignees: v }).eq('id', peekItem.id)
          }}
          onAddLink={async url => {
            const domain = (() => { try { return new URL(url).hostname } catch { return url } })()
            const linkId = `l${Date.now()}`
            const optimistic: CardLink = { id: linkId, url, title: domain, domain }
            const optimisticLinks = [...(cardLinks[peekItem.id] ?? []), optimistic]
            setCardLinks(prev => ({ ...prev, [peekItem.id]: optimisticLinks }))
            supabase.from('vault_cards').update({ links: optimisticLinks }).eq('id', peekItem.id)
            const ogp = await fetchOgp(url)
            const enriched: CardLink = { id: linkId, url, title: ogp.title, domain: ogp.domain, description: ogp.description, image: ogp.image, siteName: ogp.siteName }
            setCardLinks(prev => {
              const updated = (prev[peekItem.id] ?? []).map(l => l.id === linkId ? enriched : l)
              supabase.from('vault_cards').update({ links: updated }).eq('id', peekItem.id)
              return { ...prev, [peekItem.id]: updated }
            })
          }}
          onDeleteLink={id => {
            const newLinks = (cardLinks[peekItem.id] ?? []).filter(l => l.id !== id)
            setCardLinks(prev => ({ ...prev, [peekItem.id]: newLinks }))
            supabase.from('vault_cards').update({ links: newLinks }).eq('id', peekItem.id)
          }}
          onSendMessage={msg => {
            const userMsg: ChatMessage = { id: `m${Date.now()}`, role: 'user', content: msg }
            const aiReply: ChatMessage = { id: `m${Date.now() + 1}`, role: 'assistant', content: mockAI(peekItem, msg) }
            const newMessages = [...(cardMessages[peekItem.id] ?? []), userMsg, aiReply]
            setCardMessages(prev => ({ ...prev, [peekItem.id]: newMessages }))
            supabase.from('vault_cards').update({ messages: newMessages }).eq('id', peekItem.id)
          }}
          onOpenPage={() => setShowPage(true)}
          onClose={() => setPeekItem(null)}
          onDelete={() => deleteItem(peekItem.id)}
          allItems={items}
          onSelectItem={item => setPeekItem(item as VaultItem)}
        />
      )}

      {/* Full-screen document editor */}
      {showPage && peekItem && (
        <CardPage
          item={peekItem}
          body={cardBodies[peekItem.id] ?? ''}
          onBodyChange={v => {
            setCardBodies(prev => ({ ...prev, [peekItem.id]: v }))
            debouncedSave(peekItem.id, 'body', v)
          }}
          onClose={() => setShowPage(false)}
          backLabel="リストに戻る"
        />
      )}
    </div>
  )
}
