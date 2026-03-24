import { useEffect, useState, useRef, useCallback } from 'react'
import { Library, Trash2, Sparkles, Calendar, Layers, Merge, Lightbulb, ArrowUpRight, ArrowLeft, FileText, BookOpen } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { getClusterVisual, getClusterIcon } from '@/lib/card-constants'

const CLUSTER_GRADIENT: Record<string, string> = {
  frontend: 'linear-gradient(135deg, #93c5fd 0%, #3b82f6 45%, #6366f1 100%)',
  design:   'linear-gradient(135deg, #d8b4fe 0%, #8b5cf6 45%, #ec4899 100%)',
  backend:  'linear-gradient(135deg, #6ee7b7 0%, #10b981 45%, #0891b2 100%)',
  ai:       'linear-gradient(135deg, #fde68a 0%, #f59e0b 45%, #f97316 100%)',
}

const FALLBACK_SCENES: Record<string, string[]> = {
  frontend: ['新機能のコンポーネント設計をはじめるとき', '実装方針をチームでレビューする場面で', 'パフォーマンス改善のタスクに取り組む際に'],
  design:   ['UIのデザインレビューを行う場面で', 'デザインシステムの方針を策定するとき', '新しい画面のワイヤーフレームを作成する際に'],
  backend:  ['APIの設計や実装方針を検討するとき', 'パフォーマンスのボトルネックを調査する場面で', 'インフラ構成を見直す際に'],
  ai:       ['AIを活用した機能を設計するとき', 'プロンプトの改善や評価を行う場面で', 'モデル選定や精度検証を進める際に'],
  all:      ['新しいプロジェクトの技術方針を決める場面で', 'チームの技術共有・勉強会を開催するとき', '四半期の振り返りや学習計画を立てる際に'],
}

interface InsightSection { title: string; insights: string[] }

interface KnowledgeSnapshot {
  id: string
  cluster: string
  cluster_label: string
  sections: InsightSection[]
  card_count: number
  saved_at: string
  apply_scenes?: string[]
  memo?: string
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

// ── Detail overlay (CardPage スタイル) ───────────────────────────────────────
function KnowledgeDetail({
  snap, related, onClose, onMemoChange,
}: {
  snap: KnowledgeSnapshot
  related: KnowledgeSnapshot[]
  onClose: () => void
  onMemoChange: (id: string, value: string) => void
}) {
  const visual = getClusterVisual(snap.cluster === 'all' ? 'frontend' : snap.cluster)
  const Icon = getClusterIcon(snap.cluster === 'all' ? 'frontend' : snap.cluster)
  const gradient = snap.cluster === 'all'
    ? 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%)'
    : CLUSTER_GRADIENT[snap.cluster] ?? visual.accent
  const applyScenes = snap.apply_scenes && snap.apply_scenes.length > 0
    ? snap.apply_scenes
    : FALLBACK_SCENES[snap.cluster] ?? FALLBACK_SCENES['all']
  const [memo, setMemo] = useState(snap.memo ?? '')
  const [memoSaving, setMemoSaving] = useState(false)
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const saveMemo = useCallback(async (value: string) => {
    setMemoSaving(true)
    const { error } = await supabase.from('knowledge_snapshots').update({ memo: value }).eq('id', snap.id)
    if (error) toast.error('メモの保存に失敗しました')
    else onMemoChange(snap.id, value)
    setMemoSaving(false)
  }, [snap.id, onMemoChange])

  const handleMemoChange = (value: string) => {
    setMemo(value)
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(() => saveMemo(value), 800)
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-5 py-2.5 bg-white border-b border-neutral-100 shrink-0">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft size={13} />マイナレッジに戻る
        </button>
        <div className="flex-1" />
        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#9ca3af' }}>
          <Calendar size={11} />{formatDate(snap.saved_at)}
        </span>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {/* Cover banner */}
        <div style={{ background: gradient, padding: '32px 40px 28px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -32, top: -32, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative', maxWidth: 720, margin: '0 auto' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {snap.cluster === 'all' ? <Merge size={20} color="white" /> : <Icon size={20} color="white" />}
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }}>ナレッジスナップショット</p>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{snap.cluster_label}</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 16, position: 'relative', maxWidth: 720, margin: '16px auto 0' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>
              <Layers size={11} />カード {snap.card_count}枚
            </span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>{snap.sections.length}セクション</span>
          </div>
        </div>

        {/* Body */}
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 40px 60px' }}>

          {/* 活用できる場面 */}
          <section style={{ background: '#fff', borderRadius: 20, border: '1px solid rgba(0,0,0,0.06)', padding: '20px 24px', marginBottom: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
              <Lightbulb size={13} color="#f59e0b" />
              <h2 style={{ fontSize: 11, fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>活用できる場面</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {applyScenes.map((scene, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: '#fffbeb', borderRadius: 12, padding: '10px 14px', border: '1px solid #fde68a' }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#f59e0b', flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                  <p style={{ fontSize: 12.5, lineHeight: 1.6, color: '#374151', margin: 0 }}>{scene}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 全セクション */}
          <section style={{ background: '#fff', borderRadius: 20, border: '1px solid rgba(0,0,0,0.06)', padding: '20px 24px', marginBottom: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
              <BookOpen size={13} color={visual.accent} />
              <h2 style={{ fontSize: 11, fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>ナレッジ詳細</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {snap.sections.map((section, si) => (
                <div key={si}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 26, fontWeight: 800, color: `${visual.accent}20`, letterSpacing: '-0.04em', flexShrink: 0, lineHeight: 1 }}>
                      {String(si + 1).padStart(2, '0')}
                    </span>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: '#111827', margin: 0 }}>{section.title}</h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 36 }}>
                    {section.insights.map((insight, ii) => (
                      <div key={ii} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: visual.accent, flexShrink: 0, marginTop: 6 }} />
                        <p style={{ fontSize: 12.5, lineHeight: 1.7, color: '#374151', margin: 0 }}>{insight}</p>
                      </div>
                    ))}
                  </div>
                  {si < snap.sections.length - 1 && <div style={{ height: 1, background: '#f3f4f6', marginTop: 20 }} />}
                </div>
              ))}
            </div>
          </section>

          {/* アクションメモ */}
          <section style={{ background: '#fff', borderRadius: 20, border: '1px solid rgba(0,0,0,0.06)', padding: '20px 24px', marginBottom: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <FileText size={13} color="#6b7280" />
                <h2 style={{ fontSize: 11, fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>アクションメモ</h2>
              </div>
              {memoSaving && <span style={{ fontSize: 10, color: '#9ca3af' }}>保存中…</span>}
            </div>
            <textarea
              value={memo}
              onChange={e => handleMemoChange(e.target.value)}
              placeholder="このナレッジをどう活かすか、次にやることなどを自由にメモ…"
              style={{
                width: '100%', minHeight: 120, border: '1px solid #e5e7eb', borderRadius: 12,
                padding: '12px 14px', fontSize: 12.5, lineHeight: 1.7, color: '#374151',
                resize: 'vertical', outline: 'none', fontFamily: 'inherit', background: '#fafafa',
                transition: 'border-color 0.15s',
              }}
              onFocus={e => (e.target.style.borderColor = '#6b7280')}
              onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
            />
          </section>

          {/* 関連ナレッジ */}
          {related.length > 0 && (
            <section>
              <h2 style={{ fontSize: 11, fontWeight: 800, color: '#9ca3af', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>関連ナレッジ</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                {related.map(r => {
                  const rGradient = r.cluster === 'all'
                    ? 'linear-gradient(135deg, #1f2937 0%, #4b5563 100%)'
                    : CLUSTER_GRADIENT[r.cluster] ?? '#6b7280'
                  return (
                    <div key={r.id} style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                      <div style={{ background: rGradient, padding: '10px 14px' }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.4 }}>{r.cluster_label}</p>
                      </div>
                      <div style={{ padding: '10px 14px' }}>
                        <p style={{ fontSize: 10.5, color: '#6b7280', margin: '0 0 5px' }}>{formatDate(r.saved_at)}</p>
                        {r.sections[0]?.insights[0] && (
                          <p style={{ fontSize: 11, color: '#374151', margin: 0, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {r.sections[0].insights[0]}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

// ── SnapshotCard ─────────────────────────────────────────────────────────────
function SnapshotCard({ snap, onDelete, onOpen }: { snap: KnowledgeSnapshot; onDelete: (id: string) => void; onOpen: () => void }) {
  const visual = getClusterVisual(snap.cluster === 'all' ? 'frontend' : snap.cluster)
  const Icon = getClusterIcon(snap.cluster === 'all' ? 'frontend' : snap.cluster)
  const gradient = snap.cluster === 'all'
    ? 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%)'
    : CLUSTER_GRADIENT[snap.cluster] ?? visual.accent
  const summary = snap.sections[0]?.insights[0] ?? snap.cluster_label

  return (
    <div
      onClick={onOpen}
      style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', cursor: 'pointer', transition: 'filter 0.15s', display: 'flex', flexDirection: 'column' }}
      onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(0.97)')}
      onMouseLeave={e => (e.currentTarget.style.filter = '')}
    >
      {/* Header */}
      <div style={{ background: gradient, padding: '14px 14px 12px', position: 'relative', overflow: 'hidden', minHeight: 110, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ position: 'absolute', right: -20, top: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        {/* Top: icon + buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {snap.cluster === 'all' ? <Merge size={12} color="white" /> : <Icon size={12} color="white" />}
          </div>
          <div style={{ display: 'flex', gap: 5 }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowUpRight size={12} color="white" />
            </div>
            <button
              onClick={e => { e.stopPropagation(); onDelete(snap.id) }}
              title="削除"
              style={{ width: 26, height: 26, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.15)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Trash2 size={11} color="white" />
            </button>
          </div>
        </div>
        {/* Title */}
        <p style={{ fontSize: 12, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {summary}
        </p>
      </div>

      {/* Meta row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px' }}>
        <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 20, background: `${visual.accent}15`, color: visual.accent, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '55%' }}>
          {snap.cluster_label}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: '#9ca3af' }}>
            <Calendar size={9} />{new Date(snap.saved_at).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: '#9ca3af' }}>
            <Layers size={9} />{snap.card_count}
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function MyKnowledgePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [snapshots, setSnapshots]         = useState<KnowledgeSnapshot[]>([])
  const [loading, setLoading]             = useState(true)
  const [filterCluster, setFilterCluster] = useState<string | null>(null)

  // selectedId はヒストリーの state で管理
  const selectedId: string | null = (location.state as { selectedId?: string } | null)?.selectedId ?? null

  const openDetail = useCallback((id: string) => {
    navigate('/my-knowledge', { state: { selectedId: id } })
  }, [navigate])

  const closeDetail = useCallback(() => {
    navigate(-1)
  }, [navigate])

  useEffect(() => {
    async function load() {
      setLoading(true)
      const { data, error } = await supabase
        .from('knowledge_snapshots')
        .select('*')
        .order('saved_at', { ascending: false })
      if (error) toast.error('ナレッジの読み込みに失敗しました')
      else setSnapshots((data ?? []) as KnowledgeSnapshot[])
      setLoading(false)
    }
    load()
  }, [])

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('knowledge_snapshots').delete().eq('id', id)
    if (error) { toast.error('削除に失敗しました'); return }
    setSnapshots(prev => prev.filter(s => s.id !== id))
    if (selectedId === id) closeDetail()
    toast.success('削除しました')
  }

  const handleMemoChange = useCallback((id: string, value: string) => {
    setSnapshots(prev => prev.map(s => s.id === id ? { ...s, memo: value } : s))
  }, [])

  const selectedSnap = selectedId ? snapshots.find(s => s.id === selectedId) ?? null : null
  const related = selectedSnap
    ? snapshots.filter(s => s.cluster === selectedSnap.cluster && s.id !== selectedSnap.id).slice(0, 3)
    : []

  const clusters = Array.from(new Set(snapshots.map(s => s.cluster)))
  const filtered = filterCluster ? snapshots.filter(s => s.cluster === filterCluster) : snapshots

  return (
    <>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '32px 24px' }}>

        {/* Page header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, borderRadius: 16, background: 'linear-gradient(135deg, #1f2937 0%, #4b5563 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
            <Library size={20} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.03em', lineHeight: 1.1 }}>マイナレッジ</h1>
            <p style={{ fontSize: 12.5, color: '#9ca3af', margin: '4px 0 0' }}>保存されたナレッジのスナップショット</p>
          </div>
          {snapshots.length > 0 && (
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 11, color: '#9ca3af' }}>合計</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>{snapshots.length}件</span>
            </div>
          )}
        </div>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>保存済みナレッジ</span>
          {snapshots.length > 0 && <span style={{ fontSize: 11, color: '#9ca3af' }}>{snapshots.length}件</span>}
        </div>

        {/* Cluster filter tabs */}
        {clusters.length > 1 && (
          <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
            <button
              onClick={() => setFilterCluster(null)}
              style={{ padding: '5px 12px', borderRadius: 20, border: '1px solid', borderColor: !filterCluster ? '#1f2937' : '#e5e7eb', background: !filterCluster ? '#1f2937' : '#fff', color: !filterCluster ? '#fff' : '#6b7280', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}
            >すべて</button>
            {clusters.map(c => {
              const visual = getClusterVisual(c === 'all' ? 'frontend' : c)
              const active = filterCluster === c
              return (
                <button key={c} onClick={() => setFilterCluster(active ? null : c)}
                  style={{ padding: '5px 12px', borderRadius: 20, border: '1px solid', borderColor: active ? visual.accent : '#e5e7eb', background: active ? visual.accent : '#fff', color: active ? '#fff' : '#6b7280', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}
                >
                  {c === 'all' ? '全統合' : visual.label}
                </button>
              )
            })}
          </div>
        )}

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 180, gap: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid #e5e7eb', borderTopColor: '#1f2937', animation: 'spin 0.8s linear infinite' }} />
            <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>読み込み中…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 24px', background: '#fafafa', borderRadius: 16, border: '1px dashed #d1d5db' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <Sparkles size={20} color="#9ca3af" />
            </div>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#374151', margin: '0 0 6px' }}>保存済みナレッジはありません</p>
            <p style={{ fontSize: 12, color: '#9ca3af', margin: 0, lineHeight: 1.6 }}>キャンバスのナレッジパネルから保存してください</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {filtered.map(snap => (
              <SnapshotCard key={snap.id} snap={snap} onDelete={handleDelete} onOpen={() => openDetail(snap.id)} />
            ))}
          </div>
        )}
      </div>

      {/* Detail overlay */}
      {selectedSnap && (
        <KnowledgeDetail
          snap={selectedSnap}
          related={related}
          onClose={closeDetail}
          onMemoChange={handleMemoChange}
        />
      )}
    </>
  )
}
