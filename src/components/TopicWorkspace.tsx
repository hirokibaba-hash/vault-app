import { useState, useRef, useEffect } from 'react'
import { X, Trash2, FileText, MessageSquare, Plus, ExternalLink, Link as LinkIcon, Send, Sparkles, ArrowLeft } from 'lucide-react'
import { getClusterVisual, getClusterIcon, ASSIGNEE_COLORS } from '@/lib/card-constants'
import type { CardItemBase, CardLink, ChatMessage } from '@/lib/card-types'

export function TopicWorkspace({
  item, cardTitle, onTitleChange,
  links, notes, messages, body, summary, assignees,
  onNotesChange, onSummaryChange, onAssigneesChange,
  onAddLink, onDeleteLink, onSendMessage,
  onOpenPage, onClose, onDelete,
  allItems, onSelectItem,
  wrapperClass = 'fixed right-0 top-0 h-full',
}: {
  item: CardItemBase
  cardTitle: string
  onTitleChange: (v: string) => void
  links: CardLink[]
  notes: string
  messages: ChatMessage[]
  body: string
  summary: string
  assignees: string[]
  onNotesChange: (v: string) => void
  onSummaryChange: (v: string) => void
  onAssigneesChange: (v: string[]) => void
  onAddLink: (url: string) => Promise<void>
  onDeleteLink: (id: string) => void
  onSendMessage: (msg: string) => void
  onOpenPage: () => void
  onClose: () => void
  onDelete: () => void
  allItems: CardItemBase[]
  onSelectItem: (item: CardItemBase) => void
  wrapperClass?: string
}) {
  const [tab, setTab] = useState<'sources' | 'chat'>('sources')
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [addingLink, setAddingLink] = useState(false)
  const [linkInput, setLinkInput] = useState('')
  const [chatInput, setChatInput] = useState('')
  const [aiTyping, setAiTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const cfg = getClusterVisual(item.cluster)
  const ClusterIcon = getClusterIcon(item.cluster)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, aiTyping])

  const handleSend = () => {
    const msg = chatInput.trim()
    if (!msg) return
    setChatInput('')
    setAiTyping(true)
    onSendMessage(msg)
    setTimeout(() => setAiTyping(false), 900 + Math.random() * 600)
  }

  const handleAddLink = () => {
    const url = linkInput.trim()
    if (!url) return
    onAddLink(url)
    setLinkInput('')
    setAddingLink(false)
  }

  // Related cards
  const explicitRelated = allItems
    .filter(i => item.connections.includes(i.id))
    .map(i => ({ item: i, sharedTags: i.tags.filter(t => item.tags.includes(t)), type: 'explicit' as const }))

  const explicitIds = new Set(item.connections)
  const latentRelated = allItems
    .filter(i => i.id !== item.id && !explicitIds.has(i.id))
    .map(i => ({ item: i, sharedTags: i.tags.filter(t => item.tags.includes(t)), type: 'latent' as const }))
    .filter(r => r.sharedTags.length > 0)
    .sort((a, b) => b.sharedTags.length - a.sharedTags.length)
    .slice(0, 4)

  const relatedGroups = [
    { label: '明示的なつながり', items: explicitRelated },
    { label: 'タグで繋がっている', items: latentRelated },
  ].filter(g => g.items.length > 0)

  return (
    <div className={`${wrapperClass} w-[380px] bg-white border-l border-neutral-100 shadow-2xl z-20 flex flex-col`}>
      <div className="h-0.5 w-full shrink-0" style={{ backgroundColor: cfg.accent }} />

      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-neutral-100 shrink-0">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-lg" style={{ backgroundColor: cfg.accent }}>
            <ClusterIcon size={15} color="white" />
          </div>
          <div className="flex-1 min-w-0">
            <input value={cardTitle} onChange={e => onTitleChange(e.target.value)}
              className="font-semibold text-neutral-900 text-[13px] leading-snug bg-transparent border-none outline-none w-full hover:bg-neutral-50 focus:bg-neutral-50 rounded px-1 -ml-1 transition-colors"
              placeholder="タイトルを入力…"
            />
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${cfg.badge}`}>{cfg.label}</span>
              <span className="text-[10px] text-neutral-400">{links.length}件のリンク</span>
              {messages.length > 0 && <span className="text-[10px] text-neutral-400">{messages.filter(m => m.role === 'assistant').length}件のAI回答</span>}
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {deleteConfirm ? (
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-neutral-500">削除しますか？</span>
                <button onClick={() => { onDelete(); setDeleteConfirm(false) }}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors">削除</button>
                <button onClick={() => setDeleteConfirm(false)}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-500 border border-neutral-200 hover:bg-neutral-200 transition-colors">キャンセル</button>
              </div>
            ) : (
              <button onClick={() => setDeleteConfirm(true)}
                className="p-1 rounded-lg text-neutral-300 hover:text-red-400 hover:bg-red-50 transition-colors" title="カードを削除">
                <Trash2 size={13} />
              </button>
            )}
            <button onClick={onClose} className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors">
              <X size={14} />
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex gap-1 mt-3 bg-neutral-100 rounded-lg p-0.5">
          {([
            { id: 'sources', Icon: FileText,      label: 'ソース・メモ' },
            { id: 'chat',    Icon: MessageSquare, label: 'AIと話す' },
          ] as const).map(({ id, Icon, label }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-[11px] font-medium transition-colors ${tab === id ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}>
              <Icon size={11} />{label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Sources tab ── */}
      {tab === 'sources' && (
        <div className="flex-1 overflow-y-auto">
          {/* Page card */}
          <div className="px-4 pt-4 pb-3 border-b border-neutral-100">
            <button onClick={onOpenPage}
              className="w-full group rounded-2xl border overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5 text-left"
              style={{ borderColor: `${cfg.accent}40`, backgroundColor: `${cfg.accent}06` }}>
              <div className="px-3.5 pt-3 pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: cfg.accent }}>
                    <FileText size={10} color="white" />
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-700">思考のドキュメント</span>
                  {body.trim() && <span className="ml-auto text-[9.5px] text-neutral-400">{body.replace(/\s/g, '').length} 字</span>}
                </div>
                {body.trim() ? (
                  <p className="text-[10.5px] text-neutral-500 leading-relaxed line-clamp-3">
                    {body.replace(/#{1,6}\s/g, '').replace(/[*`_>\-]/g, '').trim()}
                  </p>
                ) : (
                  <p className="text-[10.5px] text-neutral-400 leading-relaxed">
                    リンク・メモ・AIとの対話をもとに、このトピックの思考をMarkdownでまとめましょう
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between px-3.5 py-2 border-t"
                style={{ borderColor: `${cfg.accent}30`, backgroundColor: `${cfg.accent}08` }}>
                <span className="text-[10px] font-medium" style={{ color: cfg.accent }}>
                  {body.trim() ? 'ドキュメントを開く' : '書き始める'}
                </span>
                <ArrowLeft size={10} className="rotate-180" style={{ color: cfg.accent }} />
              </div>
            </button>
          </div>

          {/* Links */}
          <div className="px-4 py-4 border-b border-neutral-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">参考リンク</p>
              <button onClick={() => setAddingLink(v => !v)} className="flex items-center gap-1 text-[10px] text-neutral-500 hover:text-neutral-900 transition-colors">
                <Plus size={11} />追加
              </button>
            </div>
            {addingLink && (
              <div className="mb-3 flex gap-2">
                <input autoFocus value={linkInput} onChange={e => setLinkInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleAddLink(); if (e.key === 'Escape') setAddingLink(false) }}
                  placeholder="https://..."
                  className="flex-1 text-[11px] border border-neutral-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-neutral-400 bg-neutral-50"
                />
                <button onClick={handleAddLink} className="px-2.5 py-1.5 bg-neutral-900 text-white text-[10px] rounded-lg font-medium">追加</button>
              </div>
            )}
            {links.length === 0
              ? <p className="text-[11px] text-neutral-300 text-center py-4">リンクがまだありません</p>
              : (
                <div className="flex flex-col gap-2">
                  {links.map(link => (
                    <div key={link.id} className="group rounded-xl border border-neutral-100 hover:border-neutral-200 bg-neutral-50/50 hover:bg-white overflow-hidden transition-all">
                      {link.image && (
                        <img src={link.image} alt="" className="w-full h-28 object-cover"
                          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      )}
                      <div className="flex items-start gap-2 p-2.5">
                        <LinkIcon size={11} className="text-neutral-400 mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-neutral-400 truncate">{link.siteName || link.domain}</p>
                          <p className="text-[11px] font-medium text-neutral-800 leading-snug line-clamp-2 mt-0.5">{link.title || link.url}</p>
                          {link.description && <p className="text-[10px] text-neutral-500 mt-1 leading-relaxed line-clamp-2">{link.description}</p>}
                        </div>
                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5">
                          <a href={link.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="p-1 rounded text-neutral-400 hover:text-neutral-700"><ExternalLink size={10} /></a>
                          <button onClick={() => onDeleteLink(link.id)} className="p-1 rounded text-neutral-400 hover:text-red-500"><X size={10} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          </div>

          {/* Summary */}
          <div className="px-4 py-4 border-b border-neutral-100">
            <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">サマリー</p>
            <textarea value={summary} onChange={e => onSummaryChange(e.target.value)}
              placeholder="このトピックを一言で表すサマリーを書きましょう…"
              className="w-full h-20 text-[11.5px] text-neutral-700 leading-relaxed resize-none outline-none bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 focus:border-neutral-400 focus:bg-white transition-colors placeholder:text-neutral-300"
            />
          </div>

          {/* Assignees */}
          <div className="px-4 py-4 border-b border-neutral-100">
            <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-2.5">アサイン</p>
            <div className="flex flex-wrap gap-1.5">
              {assignees.map(name => (
                <div key={name} className="flex items-center gap-1 pl-1 pr-1.5 py-0.5 rounded-full border border-neutral-200 bg-neutral-50 text-[10px]">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center text-white flex-shrink-0"
                    style={{ backgroundColor: ASSIGNEE_COLORS[name] ?? '#e0e0e0', fontSize: 7, fontWeight: 700 }}>
                    {name.charAt(0)}
                  </div>
                  <span className="text-neutral-600">{name}</span>
                  <button onClick={() => onAssigneesChange(assignees.filter(a => a !== name))}
                    className="text-neutral-300 hover:text-neutral-500 transition-colors ml-0.5">
                    <X size={9} />
                  </button>
                </div>
              ))}
              {Object.keys(ASSIGNEE_COLORS).filter(n => !assignees.includes(n)).map(name => (
                <button key={name} onClick={() => onAssigneesChange([...assignees, name])}
                  className="flex items-center gap-1 pl-1 pr-1.5 py-0.5 rounded-full border border-dashed border-neutral-200 text-[10px] text-neutral-400 hover:border-neutral-400 hover:text-neutral-600 transition-colors">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center text-white flex-shrink-0"
                    style={{ backgroundColor: ASSIGNEE_COLORS[name] ?? '#e0e0e0', fontSize: 7, fontWeight: 700, opacity: 0.4 }}>
                    {name.charAt(0)}
                  </div>
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="px-4 py-4 border-b border-neutral-100">
            <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">メモ</p>
            <textarea value={notes} onChange={e => onNotesChange(e.target.value)}
              placeholder="考えや気づきを書き留めておきましょう…"
              className="w-full h-32 text-[11.5px] text-neutral-700 leading-relaxed resize-none outline-none bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 focus:border-neutral-400 focus:bg-white transition-colors placeholder:text-neutral-300"
            />
          </div>

          {/* Related cards */}
          {relatedGroups.length > 0 && (
            <div className="px-4 py-4">
              <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-3">関連カード</p>
              <div className="flex flex-col gap-4">
                {relatedGroups.map(group => (
                  <div key={group.label}>
                    <p className="text-[9.5px] font-medium text-neutral-300 mb-2 flex items-center gap-1.5">
                      <span className="inline-block w-3 h-px bg-neutral-200" />{group.label}
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {group.items.map(({ item: r, sharedTags, type }) => {
                        const rc = getClusterVisual(r.cluster)
                        const RIcon = getClusterIcon(r.cluster)
                        return (
                          <button key={r.id} onClick={() => onSelectItem(r)}
                            className="group w-full text-left flex items-start gap-2.5 p-2.5 rounded-xl border border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50 hover:shadow-sm transition-all">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: rc.accent }}>
                              <RIcon size={12} color="white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-medium text-neutral-800 truncate group-hover:text-neutral-900 transition-colors">{r.title}</p>
                              {sharedTags.length > 0 ? (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {sharedTags.map(tag => (
                                    <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
                                      style={{ backgroundColor: `${rc.accent}18`, color: rc.accent }}>{tag}</span>
                                  ))}
                                </div>
                              ) : type === 'explicit' ? (
                                <p className="text-[9.5px] text-neutral-400 mt-0.5">明示的に接続</p>
                              ) : null}
                            </div>
                            <ArrowLeft size={10} className="rotate-180 text-neutral-300 group-hover:text-neutral-500 mt-1.5 shrink-0 transition-colors" />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Chat tab ── */}
      {tab === 'chat' && (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.length === 0 && !aiTyping ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-4">
                <div className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center">
                  <Sparkles size={18} className="text-neutral-400" />
                </div>
                <div>
                  <p className="text-[12px] font-medium text-neutral-700">AIと思考を深める</p>
                  <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">リンクやメモをもとに<br/>このトピックについて質問できます</p>
                </div>
                <div className="flex flex-col gap-1.5 w-full mt-1">
                  {['このトピックの要点を整理して', 'リンク間の共通点は？', '次に調べるべきことは？'].map(s => (
                    <button key={s} onClick={() => { onSendMessage(s); setAiTyping(true); setTimeout(() => setAiTyping(false), 1200) }}
                      className="w-full text-left text-[10.5px] text-neutral-600 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl px-3 py-2 transition-colors">{s}</button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map(msg => (
                  <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles size={10} color="white" />
                      </div>
                    )}
                    <div className={`max-w-[82%] rounded-2xl px-3 py-2 text-[11.5px] leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'bg-neutral-900 text-white rounded-br-sm' : 'bg-neutral-100 text-neutral-800 rounded-bl-sm'}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {aiTyping && (
                  <div className="flex gap-2 justify-start">
                    <div className="w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center shrink-0">
                      <Sparkles size={10} color="white" />
                    </div>
                    <div className="bg-neutral-100 rounded-2xl rounded-bl-sm px-3 py-2.5 flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
          <div className="px-4 pb-4 pt-2 border-t border-neutral-100 shrink-0">
            <div className="flex gap-2 items-end">
              <textarea value={chatInput} onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
                placeholder="質問や考えを入力… (Enter で送信)"
                rows={2}
                className="flex-1 text-[11.5px] border border-neutral-200 rounded-xl px-3 py-2 outline-none focus:border-neutral-400 resize-none bg-neutral-50 focus:bg-white transition-colors placeholder:text-neutral-300 leading-relaxed"
              />
              <button onClick={handleSend} disabled={!chatInput.trim() || aiTyping}
                className="p-2.5 bg-neutral-900 text-white rounded-xl hover:bg-neutral-700 disabled:opacity-30 transition-all shrink-0">
                <Send size={13} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
