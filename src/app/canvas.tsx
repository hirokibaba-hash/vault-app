import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react'
import { Plus, ZoomIn, ZoomOut, Maximize2, Search, X, ExternalLink, Sparkles, CalendarDays, Network, LayoutGrid, Clock, Link2, RotateCcw, Layers, FileText, Trash2, Edit3, GripVertical, BookmarkPlus } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { supabase } from '@/lib/supabase'
import { fetchOgp } from '@/lib/ogp'
import type { CardLink, ChatMessage } from '@/lib/card-types'
import { ASSIGNEE_COLORS, CLUSTER_ICON, getClusterVisual } from '@/lib/card-constants'
import { CardPage } from '@/components/CardPage'
import { TopicWorkspace } from '@/components/TopicWorkspace'

// ─── Types ────────────────────────────────────────────────────────────────────

type Cluster = 'frontend' | 'design' | 'backend' | 'ai'

interface KnowledgeItem {
  id: string
  title: string
  cluster: Cluster
  tags: string[]
  createdAt: string
  x: number
  y: number
  connections: string[]
  links: CardLink[]
  notes: string
  messages: ChatMessage[]
  body: string
  summary: string
  updatedAt: string
  assignees: string[]
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ITEMS: KnowledgeItem[] = [
  {
    id: '1', title: 'Next.js App Router を深く理解する',
    cluster: 'frontend', tags: ['Next.js', 'React'], createdAt: '2024-12-08',
    x: 1680, y: 80, connections: ['3', '6'],
    links: [
      { id: 'l1a', url: 'https://nextjs.org/docs/app', title: 'Next.js App Router Docs', domain: 'nextjs.org' },
      { id: 'l1b', url: 'https://zenn.dev/frontendlab/articles/nextjs15', title: 'Next.js 15 新機能まとめ', domain: 'zenn.dev' },
    ],
    notes: 'Turbopack のデフォルト化が特に気になる。Server Actions との組み合わせで何ができるか検証したい。',
    messages: [],
    summary: 'App Router・Server Components・Server Actionsを軸に、Next.js 13以降のアーキテクチャを体系的に整理する。Turbopackの実用性も検証対象。',
    updatedAt: '2025-01-08', assignees: ['木村', '田中'],
    body: `# Next.js App Router を深く理解する

## 概要

App Router は Next.js 13 で導入された新しいルーティングシステム。従来の Pages Router と共存できる。

## 重要な概念

### Server Components vs Client Components

- **Server Components** (デフォルト): サーバーサイドでレンダリング。DB アクセスや API キーを直接使える。
- **Client Components** (\`'use client'\`): ブラウザで動作。useState / useEffect が使える。

### Layouts

\`layout.tsx\` を使うことで、ページをまたいだ共有 UI を定義できる。

\`\`\`tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
\`\`\`

### Server Actions

フォーム送信や mutation を Server 側で処理できる仕組み。

\`\`\`tsx
async function createPost(formData: FormData) {
  'use server'
  const title = formData.get('title')
  await db.post.create({ data: { title } })
}
\`\`\`

## 調べること

- [ ] Streaming と Suspense の使い方
- [ ] Parallel Routes と Intercepting Routes
- [ ] Turbopack での HMR 速度検証
`,
  },
  {
    id: '2', title: 'デザインシステムの設計哲学',
    cluster: 'design', tags: ['デザイン', 'UI/UX', '設計'], createdAt: '2024-10-15',
    x: 960, y: 270, connections: ['4', '9', '5'],
    links: [
      { id: 'l2a', url: 'https://smashingmagazine.com/design-systems', title: 'Design Systems Best Practices', domain: 'smashingmagazine.com' },
      { id: 'l2b', url: 'https://storybook.js.org', title: 'Storybook — UI component explorer', domain: 'storybook.js.org' },
      { id: 'l2c', url: 'https://www.figma.com/blog/design-tokens', title: 'Design Tokens with Figma', domain: 'figma.com' },
    ],
    notes: 'トークン設計が鍵。命名規則を早めに固めないと後で辛くなる。',
    messages: [],
    summary: 'デザイントークンとコンポーネント階層の設計哲学を探求。Figma VariablesとCSS Custom Propertiesの連携が鍵。',
    updatedAt: '2024-12-20', assignees: ['佐藤'],
    body: `# デザインシステムの設計哲学

## なぜデザインシステムが必要か

> 一貫性は信頼を生む。信頼はプロダクトへの愛着を生む。

デザインシステムは単なる UI コンポーネント集ではなく、**チームの共通言語**。

## 構成要素

### 1. デザイントークン

色・スペーシング・タイポグラフィをトークンとして管理。

| トークン | 値 | 用途 |
|--------|-----|------|
| \`color.primary\` | \`#3b82f6\` | ブランドカラー |
| \`space.4\` | \`16px\` | 基本スペース |
| \`radius.md\` | \`8px\` | カード角丸 |

### 2. コンポーネント

Atomic Design を参考に階層化する。

- **Atoms**: Button, Input, Badge
- **Molecules**: SearchBar, Card
- **Organisms**: Header, Sidebar

## TODO

- [ ] Figma Variables と CSS Custom Properties の同期方法を調べる
- [ ] Storybook のドキュメントを整備する
`,
  },
  {
    id: '3', title: 'TypeScript 型の力を最大限に使う',
    cluster: 'frontend', tags: ['TypeScript', '型システム'], createdAt: '2024-11-18',
    x: 1380, y: 80, connections: ['1', '6'],
    links: [
      { id: 'l3a', url: 'https://zenn.dev/ynakamura/articles/typescript-advanced', title: 'TypeScript 型システム完全ガイド', domain: 'zenn.dev' },
    ],
    notes: '',
    messages: [],
    summary: '型システムの高度な活用法を習得。Conditional Types・Template Literal Typesなど実務で効くパターンを収集中。',
    updatedAt: '2025-01-03', assignees: ['木村'],
    body: '',
  },
  {
    id: '4', title: 'Figma プラグイン開発',
    cluster: 'design', tags: ['Figma', 'デザインツール', 'プラグイン'], createdAt: '2024-09-05',
    x: 680, y: 280, connections: ['2'],
    links: [
      { id: 'l4a', url: 'https://www.figma.com/plugin-docs/', title: 'Figma Plugin API Docs', domain: 'figma.com' },
    ],
    notes: 'UI スレッドとメインスレッドの分離を理解するのが最初のハードル。',
    messages: [],
    summary: 'FigmaのPlugin APIを使って開発ワークフローを自動化する。UIスレッドとメインスレッドの分離が設計の核心。',
    updatedAt: '2024-11-15', assignees: ['田中', '鈴木'],
    body: '',
  },
  {
    id: '5', title: 'AI がデザインワークフローを変える',
    cluster: 'ai', tags: ['AI', 'デザイン', '生成AI'], createdAt: '2024-12-20',
    x: 1780, y: 270, connections: ['2'],
    links: [
      { id: 'l5a', url: 'https://www.nngroup.com/articles/ai-ux', title: 'AI and UX — Nielsen Norman Group', domain: 'nngroup.com' },
      { id: 'l5b', url: 'https://www.figma.com/ai', title: 'Figma AI', domain: 'figma.com' },
    ],
    notes: 'デザイナーの役割が「決定者」にシフトしていく感覚がある。',
    messages: [],
    summary: 'AI がデザインプロセスに与える影響を考察。デザイナーの役割が意思決定者へとシフトしていく流れを追う。',
    updatedAt: '2025-01-10', assignees: ['佐藤', '木村'],
    body: '',
  },
  {
    id: '6', title: 'Tailwind CSS v4 移行メモ',
    cluster: 'frontend', tags: ['CSS', 'Tailwind'], createdAt: '2024-12-01',
    x: 1860, y: 80, connections: ['1', '3'],
    links: [
      { id: 'l6a', url: 'https://tailwindcss.com/docs/v4-beta', title: 'Tailwind CSS v4 Beta', domain: 'tailwindcss.com' },
    ],
    notes: 'CSS-first 設定が直感的で良い。vite プラグインへの移行も簡単だった。',
    messages: [],
    summary: 'CSS-first設定への移行メモ。Viteプラグイン対応やカスタムテーマの書き方など実務的な変更点をまとめる。',
    updatedAt: '2024-12-18', assignees: ['鈴木'],
    body: '',
  },
  {
    id: '7', title: 'ユーザーリサーチの実践',
    cluster: 'design', tags: ['UX', 'リサーチ', 'インタビュー'], createdAt: '2024-08-20',
    x: 380, y: 270, connections: ['2', '4'],
    links: [
      { id: 'l7a', url: 'https://uxresearch.io/methods', title: 'UX Research Methods', domain: 'uxresearch.io' },
      { id: 'l7b', url: 'https://www.nngroup.com/articles/user-interviews', title: 'User Interviews 101', domain: 'nngroup.com' },
    ],
    notes: 'アフィニティダイアグラムは実際やってみると整理が進む。デジタル版（FigJam）でやると共有が楽。',
    messages: [],
    summary: 'インタビューからアフィニティダイアグラムまでUXリサーチの実践知識を蓄積。デジタルツールでの効率化も探る。',
    updatedAt: '2024-10-30', assignees: ['田中'],
    body: '',
  },
  {
    id: '8', title: 'GraphQL vs REST — 選定基準',
    cluster: 'backend', tags: ['API', 'GraphQL', 'REST'], createdAt: '2024-09-28',
    x: 760, y: 510, connections: ['10'],
    links: [
      { id: 'l8a', url: 'https://dev.to/graphql-vs-rest', title: 'GraphQL と REST の比較', domain: 'dev.to' },
      { id: 'l8b', url: 'https://graphql.org/learn/', title: 'GraphQL 公式ドキュメント', domain: 'graphql.org' },
    ],
    notes: '',
    messages: [],
    summary: 'プロジェクトの特性に応じたAPI設計の選定基準を整理。オーバーフェッチ・型安全性・学習コストの観点から比較。',
    updatedAt: '2024-12-05', assignees: ['鈴木', '佐藤'],
    body: '',
  },
  {
    id: '9', title: 'ダークモード設計の原則',
    cluster: 'design', tags: ['デザイン', 'ダークモード', 'カラー'], createdAt: '2024-10-22',
    x: 1240, y: 280, connections: ['2'],
    links: [
      { id: 'l9a', url: 'https://css-tricks.com/dark-mode-design', title: 'Dark Mode Design Principles', domain: 'css-tricks.com' },
    ],
    notes: '色の反転ではなく「暗い環境での視認性」を起点に設計する思考が重要。',
    messages: [],
    summary: '色の反転ではなく視認性を起点にしたダークモード設計。知覚的な明るさと表面の階層設計が重要なテーマ。',
    updatedAt: '2024-11-22', assignees: ['木村'],
    body: '',
  },
  {
    id: '10', title: 'Web パフォーマンス最適化',
    cluster: 'backend', tags: ['パフォーマンス', 'Web', 'CoreWebVitals'], createdAt: '2024-11-10',
    x: 1520, y: 510, connections: ['8', '1'],
    links: [
      { id: 'l10a', url: 'https://web.dev/vitals', title: 'Core Web Vitals', domain: 'web.dev' },
      { id: 'l10b', url: 'https://web.dev/performance', title: 'Web Performance', domain: 'web.dev' },
    ],
    notes: 'LCP の改善が一番インパクト大きい。画像の lazy loading と preload の使い分けを整理する。',
    messages: [],
    summary: 'Core Web VitalsのLCP改善を中心に据えた最適化戦略。画像のloading戦略とコード分割が主要な施策。',
    updatedAt: '2025-01-02', assignees: ['田中', '木村'],
    body: '',
  },
]

// ─── Cluster config ────────────────────────────────────────────────────────────

const CLUSTER_CONFIG: Record<Cluster, {
  label: string
  labelX: number
  labelY: number
  zoneX: number
  zoneY: number
  zoneW: number
  zoneH: number
  fill: string
  stroke: string
  accent: string
  badge: string
}> = {
  frontend: {
    label: 'フロントエンド',
    labelX: 1570, labelY: 42,
    zoneX: 1270, zoneY: 50, zoneW: 740, zoneH: 200,
    fill: '#eff6ff', stroke: '#bfdbfe', accent: '#3b82f6',
    badge: 'bg-blue-50/60 text-blue-500 border-blue-100',
  },
  design: {
    label: 'デザイン / UX',
    labelX: 790, labelY: 242,
    zoneX: 260, zoneY: 242, zoneW: 1120, zoneH: 200,
    fill: '#f5f3ff', stroke: '#ddd6fe', accent: '#8b5cf6',
    badge: 'bg-violet-50/60 text-violet-500 border-violet-100',
  },
  backend: {
    label: 'バックエンド',
    labelX: 1130, labelY: 482,
    zoneX: 640, zoneY: 482, zoneW: 1020, zoneH: 190,
    fill: '#f0fdf4', stroke: '#bbf7d0', accent: '#10b981',
    badge: 'bg-emerald-50/60 text-emerald-600 border-emerald-100',
  },
  ai: {
    label: 'AI',
    labelX: 1870, labelY: 242,
    zoneX: 1660, zoneY: 242, zoneW: 300, zoneH: 140,
    fill: '#fffbeb', stroke: '#fde68a', accent: '#f59e0b',
    badge: 'bg-amber-50/60 text-amber-500 border-amber-100',
  },
}


// ─── Cluster mesh gradients ────────────────────────────────────────────────────
const CLUSTER_GRADIENT: Record<Cluster, string> = {
  frontend: 'linear-gradient(135deg, #93c5fd 0%, #3b82f6 45%, #6366f1 100%)',
  design:   'linear-gradient(135deg, #d8b4fe 0%, #8b5cf6 45%, #ec4899 100%)',
  backend:  'linear-gradient(135deg, #6ee7b7 0%, #10b981 45%, #0891b2 100%)',
  ai:       'linear-gradient(135deg, #fde68a 0%, #f59e0b 45%, #f97316 100%)',
}

// ─── Graph layout positions (pre-computed force-directed) ──────────────────────
// Nodes positioned by relationship proximity:
// - Higher degree nodes (more connections) placed more centrally
// - Connected nodes pulled together, disconnected nodes pushed apart
// Connection degrees: デザインシステム(4), Next.js(3), others(1-2)
const GRAPH_POS: Record<string, { x: number; y: number }> = {
  '1': { x: 1060, y: 200 }, // Next.js (degree 3) — right hub
  '2': { x:  310, y: 260 }, // デザインシステム (degree 4) — left hub
  '3': { x:  820, y:  55 }, // TypeScript (degree 2)
  '4': { x:   80, y: 430 }, // Figma (degree 2)
  '5': { x:  310, y:  55 }, // AI とデザイン (degree 1) — satellite
  '6': { x: 1300, y:  55 }, // Tailwind (degree 2)
  '7': { x:   80, y: 240 }, // ユーザーリサーチ (degree 2)
  '8': { x: 1350, y: 440 }, // GraphQL (degree 1) — peripheral
  '9': { x:  550, y: 400 }, // ダークモード (degree 1) — satellite
  '10':{ x: 1100, y: 390 }, // Web パフォーマンス (degree 2) — bridge
}

// Bidirectional connection degree for each node (used for visual sizing)
const NODE_DEGREE: Record<string, number> = { '1':3, '2':4, '3':2, '4':2, '5':1, '6':2, '7':2, '8':1, '9':1, '10':2 }

type LayoutMode = 'timeline' | 'graph'
type BgPattern = 'dots' | 'square' | 'grid' | 'none'
type ArrangeMode = 'cluster' | 'date' | 'readtime' | 'connections'

const LAYOUT_CONFIG = {
  timeline: { canvasW: 2300, canvasH: 760, scale: 0.72, offset: { x: -140, y: 44 } },
  graph:    { canvasW: 1680, canvasH: 700, scale: 0.82, offset: { x:   50, y: 38 } },
} as const

const CARD_W = 224
const CARD_H = 168

// ─── Add URL Dialog ────────────────────────────────────────────────────────────

interface OgpPreview { title: string; description: string; image: string; siteName: string; domain: string }

function AddDialog({ onClose, onSave, initialUrl }: {
  onClose: () => void
  onSave: (url: string, ogp: OgpPreview, cluster: Cluster) => Promise<void>
  initialUrl?: string
}) {
  const [url, setUrl] = useState(initialUrl ?? '')
  const [fetching, setFetching] = useState(false)
  const [saving, setSaving] = useState(false)
  const [preview, setPreview] = useState<OgpPreview | null>(null)
  const [cluster, setCluster] = useState<Cluster>('design')

  const handleFetch = async (overrideUrl?: string) => {
    const trimmed = (overrideUrl ?? url).trim()
    if (!trimmed) return
    setFetching(true)
    try {
      const ogp = await fetchOgp(trimmed)
      setPreview(ogp)
    } finally {
      setFetching(false)
    }
  }

  // On mount: if initialUrl given use it, otherwise try clipboard
  useEffect(() => {
    if (initialUrl?.startsWith('http')) {
      handleFetch(initialUrl)
      return
    }
    navigator.clipboard.readText().then(text => {
      const trimmed = text.trim()
      if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        setUrl(trimmed)
        handleFetch(trimmed)
      }
    }).catch(() => {}) // ignore permission errors silently
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = async () => {
    if (!preview) return
    setSaving(true)
    await onSave(url.trim(), preview, cluster)
    setSaving(false)
    onClose()
  }

  const isUrl = url.startsWith('http://') || url.startsWith('https://')

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] w-full max-w-md mx-4 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-neutral-900 text-sm">URLを保存する</h3>
              <p className="text-xs text-neutral-400 mt-0.5">WebページをVaultにキャプチャします</p>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors">
              <X size={15} />
            </button>
          </div>

          {/* URL input */}
          <div className="flex gap-2">
            <Input
              autoFocus
              placeholder="https://..."
              value={url}
              onChange={e => { setUrl(e.target.value); setPreview(null) }}
              onKeyDown={e => e.key === 'Enter' && !preview && isUrl && handleFetch()}
              className="text-sm flex-1"
            />
            {!preview && (
              <Button
                variant="outline"
                onClick={() => handleFetch()}
                disabled={fetching || !isUrl}
                className="shrink-0 gap-1.5"
              >
                {fetching
                  ? <span className="w-3.5 h-3.5 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
                  : <ExternalLink size={13} />}
                {fetching ? '取得中' : '取得'}
              </Button>
            )}
          </div>

          {/* OGP preview */}
          {preview && (
            <div className="rounded-xl border border-neutral-200 overflow-hidden">
              {preview.image && (
                <img
                  src={preview.image}
                  alt=""
                  className="w-full h-36 object-cover"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              )}
              <div className="p-3">
                <p className="text-[11px] text-neutral-400 mb-0.5">{preview.siteName || preview.domain}</p>
                <p className="text-[13px] font-semibold text-neutral-900 leading-snug line-clamp-2">{preview.title}</p>
                {preview.description && (
                  <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed line-clamp-2">{preview.description}</p>
                )}
              </div>
              <button
                onClick={() => setPreview(null)}
                className="w-full py-1.5 text-[10px] text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 border-t border-neutral-100 transition-colors"
              >
                URLを変更する
              </button>
            </div>
          )}

          {/* Cluster picker (shown after preview) */}
          {preview && (
            <div>
              <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">カテゴリ</p>
              <div className="grid grid-cols-2 gap-2">
                {(Object.entries(CLUSTER_CONFIG) as [Cluster, typeof CLUSTER_CONFIG[Cluster]][]).map(([key, cfg]) => {
                  const Icon = CLUSTER_ICON[key]
                  const active = cluster === key
                  return (
                    <button
                      key={key}
                      onClick={() => setCluster(key)}
                      className="flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all"
                      style={active
                        ? { backgroundColor: `${cfg.accent}10`, borderColor: `${cfg.accent}50` }
                        : { borderColor: '#e5e5e5' }}
                    >
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: active ? cfg.accent : '#f0f0f0' }}
                      >
                        <Icon size={12} color={active ? 'white' : '#aaa'} />
                      </div>
                      <span className={`text-[11px] font-medium ${active ? 'text-neutral-900' : 'text-neutral-400'}`}>
                        {cfg.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {preview && (
            <Button onClick={handleSave} disabled={saving} className="w-full gap-2">
              {saving
                ? <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <Plus size={14} />}
              {saving ? '保存中…' : 'Vaultに保存する'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── New Card Dialog ───────────────────────────────────────────────────────────

function NewCardDialog({ onClose, onCreate }: {
  onClose: () => void
  onCreate: (title: string, cluster: Cluster) => void
}) {
  const [title, setTitle] = useState('')
  const [cluster, setCluster] = useState<Cluster>('design')

  const handleSubmit = () => {
    const t = title.trim()
    if (!t) return
    onCreate(t, cluster)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] w-full max-w-sm mx-4 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="font-semibold text-neutral-900 text-sm">新しいトピックを作成</h3>
              <p className="text-xs text-neutral-400 mt-0.5">考えを整理したいテーマを追加します</p>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors">
              <X size={15} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <Input
              autoFocus
              placeholder="トピックのタイトル…"
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              className="text-sm"
            />

            {/* Cluster picker */}
            <div>
              <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">カテゴリ</p>
              <div className="grid grid-cols-2 gap-2">
                {(Object.entries(CLUSTER_CONFIG) as [Cluster, typeof CLUSTER_CONFIG[Cluster]][]).map(([key, cfg]) => {
                  const Icon = CLUSTER_ICON[key]
                  const active = cluster === key
                  return (
                    <button
                      key={key}
                      onClick={() => setCluster(key)}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all"
                      style={active
                        ? { backgroundColor: `${cfg.accent}10`, borderColor: `${cfg.accent}50` }
                        : { borderColor: '#e5e5e5' }
                      }
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                        style={{ backgroundColor: active ? cfg.accent : '#f0f0f0' }}
                      >
                        <Icon size={13} color={active ? 'white' : '#aaa'} />
                      </div>
                      <span className={`text-[11px] font-medium transition-colors ${active ? 'text-neutral-900' : 'text-neutral-400'}`}>
                        {cfg.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <Button onClick={handleSubmit} disabled={!title.trim()} className="w-full gap-2">
              <Plus size={14} />
              カードを作成
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Detail Panel ──────────────────────────────────────────────────────────────

// ─── Mock AI response ─────────────────────────────────────────────────────────

function mockAIResponse(item: KnowledgeItem, links: CardLink[], notes: string, userMsg: string): string {
  const linkNames = links.map(l => l.title || l.domain).join('、')
  const q = userMsg
  if (q.includes('要点') || q.includes('まとめ') || q.includes('整理')) {
    return `「${item.title}」の要点をまとめます。\n\n${links.length > 0 ? `登録されている${links.length}件の参考資料（${linkNames}）を踏まえると、` : ''}このトピックの核心は ${item.tags.slice(0, 2).join('・')} に関連した課題です。${notes ? `\n\nあなたのメモにある「${notes.slice(0, 40)}…」という視点は特に重要で、実践的な観点から価値があります。` : ''}\n\n具体的にどの側面を深堀りしますか？`
  }
  if (q.includes('共通点') || q.includes('関連') || q.includes('つながり')) {
    return links.length >= 2
      ? `${links.length}件のリンクを横断してみると、いくつかの共通テーマが浮かび上がります。\n\n特に「${links[0].title || links[0].domain}」と「${links[1].title || links[1].domain}」の間には、アプローチの面で興味深い接点があります。どちらの視点がより ${item.title} の解像度を上げると思いますか？`
      : 'リンクをもう少し追加すると、資料間の共通点や対立点を分析できます。'
  }
  if (q.includes('次') || q.includes('調べ') || q.includes('深め')) {
    return `「${item.title}」をさらに深めるなら、以下の観点が有効です：\n\n1. 実際のユースケースや導入事例の収集\n2. ${item.tags.slice(0, 2).join('・')} の最新動向の確認\n3. 関連トピック（${ITEMS.filter(i => item.connections.includes(i.id)).map(i => i.title).slice(0, 2).join('、') || 'なし'}）との比較\n\nどれから始めますか？`
  }
  const defaults = [
    `興味深い問いですね。「${item.title}」について考える上で、${links.length > 0 ? `「${links[0].title || links[0].domain}」が参考になりそうです。` : 'まずリンクを追加してみましょう。'}具体的にどんな課題がありますか？`,
    `${item.title} というテーマは奥が深いです。${item.tags.map(t => `「${t}」`).join('・')} の観点から整理すると見えてくるものがあるかもしれません。今一番引っかかっている点は？`,
    `良い質問です。${notes ? `あなたのメモを読む限り、すでに核心に近いところに来ている気がします。` : `まずこのトピックで一番「わかっていないこと」を言語化してみましょう。`}`,
  ]
  return defaults[Math.floor(Math.random() * defaults.length)]
}


// ─── Canvas Card ───────────────────────────────────────────────────────────────

function QuickCapturePopover({ onAdd, onClose }: {
  onAdd: (value: string) => void
  onClose: () => void
}) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 30)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleSubmit = () => {
    if (!value.trim()) return
    onAdd(value)
    setValue('')
  }

  const isUrl = value.startsWith('http://') || value.startsWith('https://')

  return (
    <div
      onMouseDown={e => e.stopPropagation()}
      onClick={e => e.stopPropagation()}
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        marginTop: 6,
        backgroundColor: 'white',
        border: '1px solid rgba(0,0,0,0.09)',
        borderRadius: 12,
        boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
        padding: '10px',
        zIndex: 100,
      }}
    >
      <p style={{ fontSize: 9.5, color: '#aaa', marginBottom: 6, fontWeight: 500 }}>
        {isUrl ? '🔗 リンクとして追加' : '📝 メモとして追加'}
      </p>
      <div style={{ display: 'flex', gap: 6 }}>
        <input
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSubmit() }}
          placeholder="URLまたはメモを入力…"
          style={{
            flex: 1,
            fontSize: 11,
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: 8,
            padding: '5px 8px',
            outline: 'none',
            color: '#222',
            backgroundColor: '#fafafa',
            minWidth: 0,
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          style={{
            padding: '5px 10px',
            borderRadius: 8,
            backgroundColor: value.trim() ? '#111' : '#f0f0f0',
            color: value.trim() ? 'white' : '#bbb',
            fontSize: 10,
            fontWeight: 600,
            border: 'none',
            cursor: value.trim() ? 'pointer' : 'default',
            transition: 'all 0.15s',
            flexShrink: 0,
          }}
        >
          追加
        </button>
      </div>
    </div>
  )
}

function StackCard({
  cluster,
  clusterCards,
  posX,
  posY,
  onCardClick,
  onCardDelete,
  onCardQuickAdd,
  onStackMouseDown,
  stackDragMoved,
  onExpand,
  isExiting,
  isGrabbing,
  clusterSummary,
  summaryLoading,
}: {
  cluster: Cluster
  clusterCards: Array<{ id: string; title: string; summary: string; hasPage: boolean }>
  posX: number
  posY: number
  onCardClick: (id: string) => void
  onCardDelete: (id: string) => void
  onCardQuickAdd: (id: string, value: string) => void
  onStackMouseDown: (e: React.MouseEvent) => void
  stackDragMoved: { current: boolean }
  onExpand: () => void
  isExiting?: boolean
  isGrabbing?: boolean
  clusterSummary?: string
  summaryLoading?: boolean
}) {
  const [fanned, setFanned] = useState(false)
  const [entered, setEntered] = useState(false)
  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(raf)
  }, [])
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [stackQCId, setStackQCId] = useState<string | null>(null)

  // Close fan when clicking outside
  useEffect(() => {
    if (!fanned) return
    const handler = (e: MouseEvent) => {
      if (!(e.target as Element).closest('[data-stack]')) {
        setFanned(false)
        setHoveredId(null)
      }
    }
    document.addEventListener('mouseup', handler)
    return () => document.removeEventListener('mouseup', handler)
  }, [fanned])
  const cfg = CLUSTER_CONFIG[cluster]
  const N = clusterCards.length

  // Fan: each card placed on a circular arc + independently rotated
  // Arc center = stack center (posX + CARD_W/2, posY + CARD_H/2)
  // Fixed 30° step: N=2 → ±15°, N=3 → ±30°, N=5 → ±60°
  // i=N-1 (newest) → most negative angle (1 o'clock / upper)
  // i=0   (oldest) → most positive angle (5 o'clock / lower)
  const FAN_R    = Math.round(CARD_W * 0.5)   // ~112px arc radius
  const FAN_STEP   = 18                          // fixed 18° per card
  const FAN_OFFSET = 20                          // shift fan center down (+= clockwise)
  const halfSpread = FAN_STEP * (N - 1) / 2     // e.g. N=3 → 30°, N=5 → 60°
  const FAN_MAX    = halfSpread + FAN_OFFSET     // oldest (i=0): bottom-most angle

  // Container sized for maximum spread (offset shifts center, so use FAN_MAX for vertical extent)
  const maxAngleRad = FAN_MAX * Math.PI / 180
  const CPX = Math.round(CARD_W / 2) + 20
  const CPY = Math.round(FAN_R * Math.sin(maxAngleRad))
              + Math.round(CARD_H / 2) + 30
  const CPW = CPX + FAN_R + CARD_W + 30
  const CPH = CPY * 2

  const stackVisible = isExiting ? false : entered
  const stackScale   = stackVisible ? 1 : 0.72
  const stackOpacityOuter = stackVisible ? 1 : 0

  return (
    <div
      style={{
        position: 'absolute',
        left: posX + Math.round(CARD_W / 2) - CPX,
        top:  posY + Math.round(CARD_H / 2) - CPY,
        width:  CPW,
        height: CPH,
        transform: `scale(${stackScale})`,
        transformOrigin: '50% 50%',
        opacity: stackOpacityOuter,
        transition: 'transform 0.38s cubic-bezier(0.34,1.56,0.64,1), opacity 0.28s ease',
        pointerEvents: isExiting ? 'none' : 'auto',
        cursor: isGrabbing ? 'grabbing' : 'grab',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
      data-stack
      onMouseDown={onStackMouseDown}
      onClick={(e) => {
        e.stopPropagation()
        if (stackDragMoved.current) return
        onExpand()
      }}
    >
      {clusterCards.map((card, i) => {
        // Collapsed: small tilt stack
        const stackRot     = i === N - 1 ? 0 : i === N - 2 ? -3.5 : -7
        const stackX       = i === N - 1 ? 0 : i === N - 2 ? -2   : -4
        const stackY       = i === N - 1 ? 0 : i === N - 2 ? 3    : 6
        const stackOpacity = i === N - 1 ? 1 : i === N - 2 ? 0.72 : 0.42

        // Fanned: translate card center to arc position + rotate to face outward
        // newest (i=N-1) → -halfSpread (1 o'clock); oldest (i=0) → +halfSpread (5 o'clock)
        const fanAngle    = FAN_MAX - i * FAN_STEP  // i=0: +halfSpread, i=N-1: -halfSpread
        const fanAngleRad = fanAngle * Math.PI / 180
        // translation = arc offset from current card center (which sits at arc center)
        const arcDX = Math.round(FAN_R * Math.cos(fanAngleRad))
        const arcDY = Math.round(FAN_R * Math.sin(fanAngleRad))

        const isTopCard     = i === N - 1
        const isCardHovered = fanned && hoveredId === card.id

        // Hover: push outward 10px in the card's pointing direction
        const hoverDX = isCardHovered ? Math.round(Math.cos(fanAngleRad) * 10) : 0
        const hoverDY = isCardHovered ? Math.round(Math.sin(fanAngleRad) * 10) : 0

        const tx  = fanned ? arcDX + hoverDX : stackX
        const ty  = fanned ? arcDY + hoverDY : stackY
        const rot = fanned ? fanAngle         : stackRot
        const op  = fanned ? 1                : stackOpacity

        // z-index: newest (i=N-1) on top; hovered card floats above all
        const zIdx = fanned
          ? (isCardHovered ? N + 10 : i + 1)
          : i + 1

        // stagger: newest first on open (i=N-1 delay=0), oldest first on close
        const staggerMs = fanned ? (N - 1 - i) * 35 : i * 20

        return (
          <div
            key={card.id}
            style={{
              position: 'absolute',
              // card center = arc center inside container
              left: CPX - Math.round(CARD_W / 2),
              top:  CPY - Math.round(CARD_H / 2),
              width: CARD_W,
              height: CARD_H,
              transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg)`,
              transformOrigin: '50% 50%',
              opacity: op,
              zIndex: zIdx,
              transition: [
                `transform        0.42s cubic-bezier(0.34,1.56,0.64,1) ${staggerMs}ms`,
                `opacity          0.28s ease                           ${staggerMs}ms`,
                `background-color 0.32s ease                           ${staggerMs}ms`,
                `box-shadow       0.22s ease`,
                `border-color     0.22s ease`,
              ].join(', '),
              boxShadow: isCardHovered
                ? `0 0 0 1.5px ${cfg.accent}, 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)`
                : fanned
                ? '0 8px 28px rgba(0,0,0,0.09), 0 2px 6px rgba(0,0,0,0.05)'
                : `0 4px 20px ${cfg.accent}33, 0 1px 4px ${cfg.accent}22`,
              cursor: fanned ? 'pointer' : 'default',
              borderRadius: 20,
              overflow: 'hidden',
              backgroundColor: fanned ? 'white' : cfg.accent,
              border: isCardHovered
                ? `1px solid ${cfg.accent}60`
                : fanned
                ? '1px solid rgba(0,0,0,0.08)'
                : `1px solid ${cfg.accent}`,
            }}
            onMouseEnter={e => { e.stopPropagation(); if (fanned) setHoveredId(card.id) }}
            onMouseLeave={e => { e.stopPropagation(); setHoveredId(null) }}
            onClick={e => {
              if (!fanned) return
              e.stopPropagation()
              onCardClick(card.id)
            }}
          >
            {/* Card inner content */}
            <div style={{ padding: '12px 13px 10px', display: 'flex', flexDirection: 'column', gap: 6, height: '100%' }}>

              {/* When collapsed and this is the front (top) card: colored thumbnail */}
              {isTopCard && !fanned ? (
                <>
                  {/* Cluster icon */}
                  {(() => { const Icon = CLUSTER_ICON[cluster]; return (
                    <div style={{ marginBottom: 4 }}>
                      <Icon size={28} color="rgba(255,255,255,0.85)" strokeWidth={1.6} />
                    </div>
                  )})()}
                  {/* Category label */}
                  <p style={{
                    fontSize: 16, fontWeight: 700, color: 'white',
                    lineHeight: 1.2, margin: 0, letterSpacing: '-0.01em',
                  }}>
                    {cfg.label}
                  </p>
                  {/* Card count */}
                  <p style={{
                    fontSize: 10, color: 'rgba(255,255,255,0.55)',
                    margin: 0, marginTop: 2,
                  }}>
                    {N} cards
                  </p>
                  {/* Hover hint */}
                  <p style={{
                    fontSize: 9, color: 'rgba(255,255,255,0.38)',
                    margin: 0, marginTop: 'auto',
                  }}>
                    hover to preview
                  </p>
                </>
              ) : fanned ? (
                <>
                  {/* Top row: same as ItemCard */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{
                      display: 'inline-flex',
                      fontSize: 9.5, fontWeight: 600, letterSpacing: '0.02em',
                      color: cfg.accent, backgroundColor: `${cfg.accent}12`,
                      border: `1px solid ${cfg.accent}28`,
                      borderRadius: 6, padding: '2px 7px', lineHeight: 1.4,
                    }}>
                      {cfg.label}
                    </span>
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 3 }}>
                      {card.hasPage && <div style={{ color: '#ccc' }}><FileText size={9} /></div>}
                      {/* Trash button */}
                      {isCardHovered && (
                        <button onMouseDown={e => e.stopPropagation()}
                          onClick={e => { e.stopPropagation(); onCardDelete(card.id) }}
                          style={{ width: 20, height: 20, borderRadius: 6, border: '1px solid rgba(0,0,0,0.1)', backgroundColor: 'rgba(0,0,0,0.04)', color: '#bbb', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s', padding: 0 }}
                          onMouseEnter={e => { const el = e.currentTarget; el.style.backgroundColor = '#fee2e2'; el.style.color = '#ef4444'; el.style.borderColor = '#fca5a5' }}
                          onMouseLeave={e => { const el = e.currentTarget; el.style.backgroundColor = 'rgba(0,0,0,0.04)'; el.style.color = '#bbb'; el.style.borderColor = 'rgba(0,0,0,0.1)' }}
                        ><Trash2 size={10} /></button>
                      )}
                      {/* Quick capture "+" button */}
                      <button onMouseDown={e => e.stopPropagation()}
                        onClick={e => { e.stopPropagation(); setStackQCId(prev => prev === card.id ? null : card.id) }}
                        style={{ width: 20, height: 20, borderRadius: 6, border: '1px solid rgba(0,0,0,0.1)', backgroundColor: stackQCId === card.id ? '#111' : 'rgba(0,0,0,0.04)', color: stackQCId === card.id ? 'white' : '#999', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s', padding: 0 }}
                      ><Plus size={11} /></button>
                    </div>
                  </div>
                  {/* Quick capture popover */}
                  {stackQCId === card.id && (
                    <div style={{ position: 'absolute', top: -10, right: 24, zIndex: 100 }}>
                      <QuickCapturePopover
                        onAdd={value => { onCardQuickAdd(card.id, value); setStackQCId(null) }}
                        onClose={() => setStackQCId(null)}
                      />
                    </div>
                  )}
                  {/* Title */}
                  <p style={{
                    fontSize: 11.5, fontWeight: 600, color: '#111',
                    lineHeight: 1.45, margin: 0,
                    display: '-webkit-box', WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {card.title}
                  </p>
                  {/* Summary */}
                  {card.summary && (
                    <p style={{
                      fontSize: 9.5, color: '#aaa', lineHeight: 1.6, margin: 0,
                      display: '-webkit-box', WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                      {card.summary}
                    </p>
                  )}
                  {isCardHovered && (
                    <p style={{ fontSize: 9, color: cfg.accent, marginTop: 'auto', fontWeight: 500 }}>
                      クリックで選択 →
                    </p>
                  )}
                </>
              ) : null /* collapsed back cards: no content */}
            </div>
          </div>
        )
      })}

      {/* Summary card — extra card in the fan arc at index N */}
      {(clusterSummary || summaryLoading) && (() => {
        const summaryAngle    = FAN_MAX - N * FAN_STEP
        const summaryAngleRad = summaryAngle * Math.PI / 180
        const arcDX = Math.round(FAN_R * Math.cos(summaryAngleRad))
        const arcDY = Math.round(FAN_R * Math.sin(summaryAngleRad))
        const tx  = fanned ? arcDX : 0
        const ty  = fanned ? arcDY : (N === 0 ? 0 : -4)
        const rot = fanned ? summaryAngle : (N === 0 ? 0 : 3.5)
        const op  = fanned ? 1 : 0.55
        const zIdx = fanned ? N + 1 : 0
        return (
          <div
            style={{
              position: 'absolute',
              left: CPX - Math.round(CARD_W / 2),
              top:  CPY - Math.round(CARD_H / 2),
              width: CARD_W,
              height: CARD_H,
              transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg)`,
              transformOrigin: '50% 50%',
              zIndex: zIdx,
              borderRadius: 14,
              overflow: 'hidden',
              backgroundColor: cfg.accent,
              border: `1px solid ${cfg.accent}`,
              boxShadow: fanned
                ? `0 0 0 1.5px ${cfg.accent}, 0 6px 22px ${cfg.accent}44, 0 2px 6px rgba(0,0,0,0.1)`
                : `0 4px 20px ${cfg.accent}33`,
              transition: [
                `transform        0.42s cubic-bezier(0.34,1.56,0.64,1) ${N * 35}ms`,
                `opacity          0.28s ease                           ${N * 35}ms`,
                `box-shadow       0.22s ease`,
              ].join(', '),
              opacity: op,
              cursor: 'default',
            }}
          >
            <div style={{ padding: '13px 14px 11px', display: 'flex', flexDirection: 'column', gap: 6, height: '100%' }}>
              {/* Header: icon + label + AI badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {(() => { const Icon = CLUSTER_ICON[cluster]; return (
                  <Icon size={16} color="rgba(255,255,255,0.85)" strokeWidth={1.6} />
                )})()}
                <p style={{ fontSize: 11, fontWeight: 700, color: 'white', margin: 0, letterSpacing: '-0.01em' }}>
                  {cfg.label}
                </p>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Sparkles size={8} color="rgba(255,255,255,0.75)" />
                  <p style={{ fontSize: 8, fontWeight: 600, color: 'rgba(255,255,255,0.75)', margin: 0, letterSpacing: '0.05em' }}>
                    AI INSIGHT
                  </p>
                </div>
              </div>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.2)' }} />
              {/* Content */}
              {summaryLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1 }}>
                  <div style={{
                    width: 12, height: 12, borderRadius: '50%', flexShrink: 0,
                    border: '1.5px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'rgba(255,255,255,0.85)',
                    animation: 'spin 0.7s linear infinite',
                  }} />
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', margin: 0 }}>生成中...</p>
                </div>
              ) : (
                <p style={{
                  fontSize: 10.5, color: 'rgba(255,255,255,0.92)',
                  lineHeight: 1.6, margin: 0,
                  display: '-webkit-box', WebkitLineClamp: 5,
                  WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                  {clusterSummary}
                </p>
              )}
            </div>
          </div>
        )
      })()}
    </div>
  )
}

function DocStatusBadge({ isDone, accent, onToggle }: {
  isDone: boolean
  accent: string
  onToggle?: () => void
}) {
  const badgeColor = isDone ? '#10b981' : accent
  return (
    <div
      role="button"
      title={isDone ? 'クリックで執筆中に戻す' : 'クリックで完了にする'}
      onClick={e => { e.stopPropagation(); onToggle?.() }}
      onMouseDown={e => e.stopPropagation()}
      style={{
        display: 'flex', alignItems: 'center', gap: 3,
        background: `${badgeColor}18`,
        borderRadius: 6, padding: '2px 5px',
        cursor: 'pointer',
        transition: 'background 0.15s',
      }}
    >
      {isDone
        ? <><span style={{ fontSize: 8 }}>✓</span><span style={{ fontSize: 8, fontWeight: 700, color: badgeColor }}>完了</span></>
        : <><Edit3 size={8} color={badgeColor} /><span style={{ fontSize: 8, fontWeight: 700, color: badgeColor }}>執筆中</span></>
      }
    </div>
  )
}

function ItemCard({
  item,
  cardTitle,
  summary,
  updatedAt,
  assignees,
  isSelected,
  isHovered,
  isFaded,
  isDragging,
  hasPage,
  degree,
  posX,
  posY,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  quickCaptureOpen,
  onQuickCapture,
  onQuickAdd,
  onQuickCaptureClose,
  onDelete,
  bundleAnim,
  bundleFrom,
  animDelay,
  affinityTags,
  docStatus,
  onDocStatusToggle,
}: {
  item: KnowledgeItem
  cardTitle: string
  summary: string
  updatedAt: string
  assignees: string[]
  isSelected: boolean
  isHovered: boolean
  isFaded: boolean
  isDragging: boolean
  hasPage: boolean
  degree?: number
  posX: number
  posY: number
  onClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
  onMouseDown: (e: React.MouseEvent) => void
  quickCaptureOpen: boolean
  onQuickCapture: (e: React.MouseEvent) => void
  onQuickAdd: (value: string) => void
  onQuickCaptureClose: () => void
  onDelete: () => void
  bundleAnim?: 'collapsing' | 'expanding'
  bundleFrom?: { x: number; y: number }
  animDelay?: number
  affinityTags?: string[]
  docStatus?: 'writing' | 'done'
  onDocStatusToggle?: () => void
}) {
  const cfg = CLUSTER_CONFIG[item.cluster]

  // For expanding animation: start at bundleFrom, animate to actual posX/posY after one frame
  const [expandFromPos, setExpandFromPos] = useState<{ x: number; y: number } | null>(
    bundleAnim === 'expanding' && bundleFrom ? bundleFrom : null
  )
  useEffect(() => {
    if (!expandFromPos) return
    const raf = requestAnimationFrame(() => setExpandFromPos(null))
    return () => cancelAnimationFrame(raf)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const isCollapsing = bundleAnim === 'collapsing'
  const isExpanding  = bundleAnim === 'expanding'
  const displayX = expandFromPos ? expandFromPos.x : posX
  const displayY = expandFromPos ? expandFromPos.y : posY

  const bundleTransform = isCollapsing
    ? 'scale(0.25) translateY(8px)'
    : isExpanding && expandFromPos
      ? 'scale(0.3)'
      : isExpanding
        ? 'scale(1)'
        : isHovered || isSelected ? 'translateY(-3px)' : 'translateY(0)'

  const bundleOpacity = isCollapsing
    ? 0
    : isFaded ? 0.15 : 1

  const bundleTransition = (isCollapsing || (isExpanding && !expandFromPos))
    ? `left 0.4s cubic-bezier(0.4,0,0.2,1) ${animDelay ?? 0}ms, top 0.4s cubic-bezier(0.4,0,0.2,1) ${animDelay ?? 0}ms, opacity 0.32s ease ${animDelay ?? 0}ms, transform 0.38s cubic-bezier(0.4,0,0.2,1) ${animDelay ?? 0}ms`
    : isDragging
      ? 'opacity 0.2s, transform 0.15s ease-out, box-shadow 0.15s'
      : 'left 0.45s cubic-bezier(0.4,0,0.2,1), top 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.2s, transform 0.15s ease-out, box-shadow 0.15s'

  return (
    <div
      data-card
      style={{
        position: 'absolute',
        left: displayX,
        top: displayY,
        width: CARD_W,
        opacity: bundleOpacity,
        zIndex: isSelected ? 10 : isHovered ? 5 : 1,
        transform: bundleTransform,
        transition: bundleTransition,
        boxShadow: isSelected
          ? `0 0 0 1.5px ${cfg.accent}, 0 4px 16px ${cfg.accent}22, 0 20px 48px -8px rgba(0,0,0,0.16)`
          : isHovered
          ? '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)'
          : affinityTags && affinityTags.length > 0
          ? `0 0 0 2px ${cfg.accent}28, 0 4px 24px rgba(0,0,0,0.07)`
          : '0 4px 24px rgba(0,0,0,0.07)',
        borderRadius: 20,
        overflow: 'visible',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div style={{ borderRadius: 20, overflow: 'hidden', backgroundColor: 'white', border: affinityTags && affinityTags.length > 0 ? `1.5px dashed ${cfg.accent}55` : '1px solid rgba(0,0,0,0.06)', transition: 'border 0.3s ease' }}>
        <div style={{ padding: '13px 14px 11px', display: 'flex', flexDirection: 'column', gap: 7 }}>

          {/* Top row: category badge + buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 9.5,
              fontWeight: 600,
              letterSpacing: '0.02em',
              color: cfg.accent,
              backgroundColor: `${cfg.accent}12`,
              border: `1px solid ${cfg.accent}28`,
              borderRadius: 6,
              padding: '2px 7px',
              lineHeight: 1.4,
            }}>
              {cfg.label}
            </span>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
              {hasPage && (
                <DocStatusBadge
                  isDone={(docStatus ?? 'writing') === 'done'}
                  accent={cfg.accent}
                  onToggle={onDocStatusToggle}
                />
              )}
              {/* Trash button */}
              {isHovered && (
                <button
                  onMouseDown={e => e.stopPropagation()}
                  onClick={e => { e.stopPropagation(); onDelete() }}
                  style={{
                    width: 20, height: 20, borderRadius: 6,
                    border: '1px solid rgba(0,0,0,0.1)',
                    backgroundColor: 'rgba(0,0,0,0.04)', color: '#bbb',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0, padding: 0,
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#fee2e2'; (e.currentTarget as HTMLElement).style.color = '#ef4444'; (e.currentTarget as HTMLElement).style.borderColor = '#fca5a5' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(0,0,0,0.04)'; (e.currentTarget as HTMLElement).style.color = '#bbb'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.1)' }}
                >
                  <Trash2 size={10} />
                </button>
              )}
              {/* Quick capture "+" button */}
              <button
                onMouseDown={e => e.stopPropagation()}
                onClick={onQuickCapture}
                style={{
                  width: 20, height: 20, borderRadius: 6,
                  border: '1px solid rgba(0,0,0,0.1)',
                  backgroundColor: quickCaptureOpen ? '#111' : 'rgba(0,0,0,0.04)',
                  color: quickCaptureOpen ? 'white' : '#999',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0, padding: 0,
                }}
              >
                <Plus size={11} />
              </button>
            </div>
          </div>

          {/* Title */}
          <p style={{
            fontSize: 12.5,
            fontWeight: 600,
            color: '#111',
            lineHeight: 1.45,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            margin: 0,
          }}>
            {cardTitle}
          </p>

          {/* Summary */}
          <p style={{
            fontSize: 10,
            color: summary ? '#999' : '#ccc',
            lineHeight: 1.65,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            margin: 0,
          }}>
            {summary || 'サマリーなし'}
          </p>

          {/* Footer: assignees + updated date */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingTop: 2 }}>
            {/* Assignee avatar stack */}
            {assignees.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {assignees.slice(0, 3).map((name, i) => (
                  <div
                    key={name}
                    title={name}
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      backgroundColor: ASSIGNEE_COLORS[name] ?? '#e0e0e0',
                      border: '1.5px solid white',
                      marginLeft: i > 0 ? -5 : 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 7.5,
                      fontWeight: 700,
                      color: 'white',
                      zIndex: assignees.length - i,
                      position: 'relative',
                      flexShrink: 0,
                    }}
                  >
                    {name.charAt(0)}
                  </div>
                ))}
              </div>
            )}
            {/* Updated date */}
            {updatedAt && (
              <span style={{ fontSize: 9, color: '#bbb', marginLeft: assignees.length > 0 ? 2 : 0 }}>
                {updatedAt.replace(/^\d{4}-/, '').replace('-', '/')}
              </span>
            )}
            {/* Degree badge if in graph mode */}
            {degree !== undefined && degree >= 3 && (
              <span style={{ fontSize: 9, color: cfg.accent, opacity: 0.5, marginLeft: 'auto' }}>
                ●{degree}
              </span>
            )}
          </div>

        </div>
      </div>

      {/* Quick Capture Popover */}
      {quickCaptureOpen && (
        <QuickCapturePopover
          onAdd={onQuickAdd}
          onClose={onQuickCaptureClose}
        />
      )}
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function CanvasPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('graph')
  const [scale, setScale] = useState<number>(LAYOUT_CONFIG.graph.scale)
  const [offset, setOffset] = useState<{x:number,y:number}>(LAYOUT_CONFIG.graph.offset)
  const [dragging, setDragging] = useState(false)
  const [selected, setSelected] = useState<KnowledgeItem | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [bgPattern, setBgPattern] = useState<BgPattern>('dots')
  const [cardPositions, setCardPositions] = useState<Record<string, { x: number; y: number }>>({})
  const [showArrange, setShowArrange] = useState(false)
  const [draggingCardId, setDraggingCardId] = useState<string | null>(null)
  const [showPage, setShowPage] = useState(false)
  const [showNewCard, setShowNewCard] = useState(false)
  const [addDialogInitialUrl, setAddDialogInitialUrl] = useState<string | undefined>(undefined)
  const [quickCaptureId, setQuickCaptureId] = useState<string | null>(null)
  const [dbItems, setDbItems] = useState<KnowledgeItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const allItems = useMemo(() => dbItems, [dbItems])
  const allItemsRef = useRef(allItems)
  useEffect(() => { allItemsRef.current = allItems }, [allItems])

  // Per-card mutable data (links, notes, messages, body)
  const [cardLinks, setCardLinks] = useState<Record<string, CardLink[]>>({})
  const [cardNotes, setCardNotes] = useState<Record<string, string>>({})
  const [cardMessages, setCardMessages] = useState<Record<string, ChatMessage[]>>({})
  const [cardBodies, setCardBodies] = useState<Record<string, string>>({})
  const [cardSummaries, setCardSummaries] = useState<Record<string, string>>({})
  const [cardUpdatedAt, setCardUpdatedAt] = useState<Record<string, string>>({})
  const [cardAssignees, setCardAssignees] = useState<Record<string, string[]>>({})
  const [cardTitles, setCardTitles] = useState<Record<string, string>>({})
  const [cardDocStatus, setCardDocStatus] = useState<Record<string, 'writing' | 'done'>>({})

  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)
  const [bundledClusters, setBundledClusters] = useState<Set<Cluster>>(new Set())
  const [connectionMode, setConnectionMode] = useState<'none' | 'explicit' | 'all'>('explicit')
  // Snapshot positions for bundled stacks — prevents centroid drift when cards are added/moved
  const [bundledStackPos, setBundledStackPos] = useState<Partial<Record<Cluster, { x: number; y: number }>>>({})
  // Animation phases
  const [collapsingClusters, setCollapsingClusters] = useState<Set<Cluster>>(new Set())
  const [exitingBundleClusters, setExitingBundleClusters] = useState<Set<Cluster>>(new Set())
  const [expandingClusters, setExpandingClusters] = useState<Set<Cluster>>(new Set())
  const [expandFromPos, setExpandFromPos] = useState<Partial<Record<Cluster, { x: number; y: number }>>>({})

  // ── Supabase: load items on mount ──
  useEffect(() => {
    supabase
      .from('vault_cards')
      .select('*')
      .order('created_at', { ascending: true })
      .then(({ data, error }) => {
        if (error) { console.error(error); setIsLoading(false); return }
        if (!data) { setIsLoading(false); return }
        const items: KnowledgeItem[] = data.map(row => ({
          id: row.id, title: row.title, cluster: row.cluster as Cluster,
          tags: row.tags ?? [], x: row.x, y: row.y,
          connections: row.connections ?? [], links: row.links ?? [],
          notes: row.notes ?? '', body: row.body ?? '', summary: row.summary ?? '',
          assignees: row.assignees ?? [], messages: row.messages ?? [],
          createdAt: row.created_at ?? '', updatedAt: row.updated_at ?? '',
        }))
        setDbItems(items)
        setCardLinks(Object.fromEntries(items.map(i => [i.id, i.links])))
        setCardNotes(Object.fromEntries(items.map(i => [i.id, i.notes])))
        setCardMessages(Object.fromEntries(items.map(i => [i.id, i.messages])))
        setCardBodies(Object.fromEntries(items.map(i => [i.id, i.body])))
        setCardSummaries(Object.fromEntries(items.map(i => [i.id, i.summary])))
        setCardAssignees(Object.fromEntries(items.map(i => [i.id, i.assignees])))
        setCardUpdatedAt(Object.fromEntries(items.map(i => [i.id, i.updatedAt])))
        setCardDocStatus(Object.fromEntries(data.map(row => [row.id, (row.doc_status ?? 'writing') as 'writing' | 'done'])))
        setIsLoading(false)
      })
  }, [])

  // ── Debounced field save ──
  const saveTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({})
  const debouncedSave = useCallback((id: string, field: string, value: unknown) => {
    const key = `${id}:${field}`
    clearTimeout(saveTimers.current[key])
    saveTimers.current[key] = setTimeout(() => {
      supabase.from('vault_cards').update({ [field]: value }).eq('id', id)
    }, 600)
  }, [])

  const addCard = useCallback(async (title: string, cluster: Cluster, fixedX?: number, fixedY?: number, initialLinks?: CardLink[]) => {
    const id = `c${Date.now()}`
    const rect = containerRef.current?.getBoundingClientRect()
    const vw = rect?.width ?? 800
    const vh = rect?.height ?? 600
    const x = fixedX ?? (-offsetRef.current.x + vw / 2) / scaleRef.current - CARD_W / 2 + (Math.random() - 0.5) * 100
    const y = fixedY ?? (-offsetRef.current.y + vh / 2) / scaleRef.current - CARD_H / 2 + (Math.random() - 0.5) * 100
    const now = new Date().toISOString()
    const links = initialLinks ?? []
    const card: KnowledgeItem = {
      id, title, cluster, tags: [], x, y, connections: [], links, notes: '',
      messages: [], body: '', summary: '', assignees: [], createdAt: now, updatedAt: now,
    }
    const { error } = await supabase.from('vault_cards').insert({
      id, title, cluster, tags: [], x, y, connections: [], links, notes: '',
      messages: [], body: '', summary: '', assignees: [],
    })
    if (error) { toast.error('カードの作成に失敗しました'); return }
    setDbItems(prev => [...prev, card])
    setCardPositions(prev => ({ ...prev, [id]: { x, y } }))
    setCardLinks(prev => ({ ...prev, [id]: links }))
    setCardNotes(prev => ({ ...prev, [id]: '' }))
    setCardMessages(prev => ({ ...prev, [id]: [] }))
    setCardBodies(prev => ({ ...prev, [id]: '' }))
    setCardSummaries(prev => ({ ...prev, [id]: '' }))
    setCardUpdatedAt(prev => ({ ...prev, [id]: now }))
    setCardAssignees(prev => ({ ...prev, [id]: [] }))
  }, [])

  const deleteCard = useCallback(async (id: string) => {
    const { error } = await supabase.from('vault_cards').delete().eq('id', id)
    if (error) { toast.error('カードの削除に失敗しました'); return }
    setDbItems(prev => prev.filter(i => i.id !== id))
    setCardLinks(prev => { const n = { ...prev }; delete n[id]; return n })
    setCardNotes(prev => { const n = { ...prev }; delete n[id]; return n })
    setCardMessages(prev => { const n = { ...prev }; delete n[id]; return n })
    setCardBodies(prev => { const n = { ...prev }; delete n[id]; return n })
    setCardSummaries(prev => { const n = { ...prev }; delete n[id]; return n })
    setCardTitles(prev => { const n = { ...prev }; delete n[id]; return n })
    setCardUpdatedAt(prev => { const n = { ...prev }; delete n[id]; return n })
    setCardAssignees(prev => { const n = { ...prev }; delete n[id]; return n })
    setCardPositions(prev => { const n = { ...prev }; delete n[id]; return n })
    setSelected(prev => prev?.id === id ? null : prev)
  }, [])

  const onCanvasDoubleClick = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-card]')) return
    setAddDialogInitialUrl(undefined)
    setShowAdd(true)
  }, [])

  const handleQuickAdd = useCallback(async (cardId: string, value: string) => {
    const trimmed = value.trim()
    if (!trimmed) return
    setQuickCaptureId(null)
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      // Optimistic: add with domain while fetching OGP
      const domain = (() => { try { return new URL(trimmed).hostname } catch { return trimmed } })()
      const linkId = `l${Date.now()}`
      const optimistic: CardLink = { id: linkId, url: trimmed, title: domain, domain }
      const optimisticLinks = [...(cardLinks[cardId] ?? []), optimistic]
      setCardLinks(prev => ({ ...prev, [cardId]: optimisticLinks }))
      supabase.from('vault_cards').update({ links: optimisticLinks }).eq('id', cardId)
      toast.success('リンクを追加中…')
      // Enrich with OGP in background
      const ogp = await fetchOgp(trimmed)
      const enriched: CardLink = { id: linkId, url: trimmed, title: ogp.title, domain: ogp.domain, description: ogp.description, image: ogp.image, siteName: ogp.siteName }
      setCardLinks(prev => {
        const updated = (prev[cardId] ?? []).map(l => l.id === linkId ? enriched : l)
        supabase.from('vault_cards').update({ links: updated }).eq('id', cardId)
        return { ...prev, [cardId]: updated }
      })
    } else {
      const existing = cardNotes[cardId] ?? ''
      const updated = existing ? `${existing}\n${trimmed}` : trimmed
      setCardNotes(prev => ({ ...prev, [cardId]: updated }))
      supabase.from('vault_cards').update({ notes: updated }).eq('id', cardId)
      toast.success('メモを追加しました')
    }
  }, [cardLinks, cardNotes])

  // Card drag
  const draggingCard = useRef<{ id: string; startMouseX: number; startMouseY: number; startCardX: number; startCardY: number } | null>(null)
  const cardDragMoved = useRef(false)

  // Stack (bundled cluster) drag
  const stackDragInfo = useRef<{
    cluster: Cluster
    startMouseX: number
    startMouseY: number
    startPositions: Record<string, { x: number; y: number }>
  } | null>(null)
  const stackDragMoved = useRef(false)
  const [stackGrabbing, setStackGrabbing] = useState<Cluster | null>(null)
  const cardPositionsRef = useRef(cardPositions)
  useEffect(() => { cardPositionsRef.current = cardPositions }, [cardPositions])
  const cardTitlesRef = useRef(cardTitles)
  useEffect(() => { cardTitlesRef.current = cardTitles }, [cardTitles])
  const cardSummariesRef = useRef(cardSummaries)
  useEffect(() => { cardSummariesRef.current = cardSummaries }, [cardSummaries])
  const cardBodiesRef = useRef(cardBodies)
  useEffect(() => { cardBodiesRef.current = cardBodies }, [cardBodies])
  const cardNotesRef = useRef(cardNotes)
  useEffect(() => { cardNotesRef.current = cardNotes }, [cardNotes])
  const cardLinksRef = useRef(cardLinks)
  useEffect(() => { cardLinksRef.current = cardLinks }, [cardLinks])
  const cardMessagesRef = useRef(cardMessages)
  useEffect(() => { cardMessagesRef.current = cardMessages }, [cardMessages])

  const [clusterSummaries, setClusterSummaries] = useState<Partial<Record<Cluster, string>>>({})
  const [clusterSummaryLoading, setClusterSummaryLoading] = useState<Partial<Record<Cluster, boolean>>>({})

  interface InsightSection { title: string; insights: string[] }
  const [knowledgeSidebar, setKnowledgeSidebar] = useState<{ cluster: Cluster; sections: InsightSection[] } | null>(null)
  const [knowledgeLoading, setKnowledgeLoading] = useState<Partial<Record<Cluster, boolean>>>({})
  const [knowledgeSaving, setKnowledgeSaving] = useState(false)

  const [hoveredCluster, setHoveredCluster] = useState<Cluster | null>(null)
  const clusterHoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const onCardClusterEnter = useCallback((cluster: Cluster) => {
    if (clusterHoverTimer.current) clearTimeout(clusterHoverTimer.current)
    setHoveredCluster(cluster)
  }, [])
  const onCardClusterLeave = useCallback(() => {
    clusterHoverTimer.current = setTimeout(() => setHoveredCluster(null), 200)
  }, [])

  // Mirror state to refs so event handlers always read the latest value
  // without needing to be recreated on every render.
  const scaleRef = useRef(scale)
  const offsetRef = useRef(offset)
  const layoutModeRef = useRef(layoutMode)
  useEffect(() => { scaleRef.current = scale }, [scale])
  useEffect(() => { offsetRef.current = offset }, [offset])
  useEffect(() => { layoutModeRef.current = layoutMode }, [layoutMode])

  // ── Pan ──
  const isDragging = useRef(false)
  const dragOrigin = useRef({ mouseX: 0, mouseY: 0, offsetX: 0, offsetY: 0 })

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-card]')) return
    if (e.button !== 0) return
    isDragging.current = true
    setDragging(true)
    dragOrigin.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      offsetX: offsetRef.current.x,
      offsetY: offsetRef.current.y,
    }
  }, [])

  const expandCluster = useCallback((cluster: Cluster) => {
    if (!bundledClusters.has(cluster)) return
    const fromSnap = { ...bundledStackPos }
    const center = bundledStackPos[cluster] ?? (() => {
      const items = allItemsRef.current.filter(i => i.cluster === cluster)
      if (items.length === 0) return { x: 200, y: 200 }
      const avgX = items.reduce((s, i) => s + (cardPositionsRef.current[i.id]?.x ?? i.x), 0) / items.length
      const avgY = items.reduce((s, i) => s + (cardPositionsRef.current[i.id]?.y ?? i.y), 0) / items.length
      return { x: avgX, y: avgY }
    })()

    // Arrange cards in a grid centered on the stack position
    const clusterItems = allItemsRef.current.filter(i => i.cluster === cluster)
    const cols = Math.ceil(Math.sqrt(clusterItems.length))
    const GAP_X = CARD_W + 16
    const GAP_Y = CARD_H + 12
    const gridW = cols * GAP_X - 16
    const rows = Math.ceil(clusterItems.length / cols)
    const gridH = rows * GAP_Y - 12
    const gridPositions: Record<string, { x: number; y: number }> = {}
    clusterItems.forEach((item, idx) => {
      const col = idx % cols
      const row = Math.floor(idx / cols)
      gridPositions[item.id] = {
        x: center.x - gridW / 2 + col * GAP_X,
        y: center.y - gridH / 2 + row * GAP_Y,
      }
    })
    setCardPositions(prev => ({ ...prev, ...gridPositions }))

    setExitingBundleClusters(new Set([cluster]))
    setTimeout(() => {
      setExpandFromPos(fromSnap)
      setBundledClusters(prev => { const n = new Set(prev); n.delete(cluster); return n })
      setExpandingClusters(new Set([cluster]))
    }, 60)
    setTimeout(() => { setExitingBundleClusters(new Set()) }, 300)
    setTimeout(() => { setExpandingClusters(new Set()); setExpandFromPos({}) }, 650)
  }, [bundledClusters, bundledStackPos])


  const onStackMouseDown = useCallback((e: React.MouseEvent, cluster: Cluster) => {
    if (e.button !== 0) return
    e.stopPropagation()

    // Capture initial positions and mouse coords directly in closure
    const startPositions: Record<string, { x: number; y: number }> = {}
    allItemsRef.current
      .filter(i => i.cluster === cluster)
      .forEach(item => {
        startPositions[item.id] = cardPositionsRef.current[item.id]
          ?? GRAPH_POS[item.id]
          ?? { x: item.x, y: item.y }
      })
    const startX = e.clientX
    const startY = e.clientY
    const origCentroidX = Object.values(startPositions).reduce((s, p) => s + p.x, 0) / Math.max(Object.keys(startPositions).length, 1)
    const origCentroidY = Object.values(startPositions).reduce((s, p) => s + p.y, 0) / Math.max(Object.keys(startPositions).length, 1)
    stackDragMoved.current = false
    stackDragInfo.current = { cluster, startMouseX: startX, startMouseY: startY, startPositions }

    const onMove = (ev: MouseEvent) => {
      const scale = scaleRef.current || 1
      const dx = (ev.clientX - startX) / scale
      const dy = (ev.clientY - startY) / scale
      if (!stackDragMoved.current && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
        stackDragMoved.current = true
        setStackGrabbing(cluster)
      }
      if (!stackDragMoved.current) return
      const updates: Record<string, { x: number; y: number }> = {}
      Object.entries(startPositions).forEach(([id, pos]) => {
        updates[id] = { x: pos.x + dx, y: pos.y + dy }
      })
      setCardPositions(prev => ({ ...prev, ...updates }))
      setBundledStackPos(prev => ({ ...prev, [cluster]: { x: origCentroidX + dx, y: origCentroidY + dy } }))
    }

    const onUp = () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      setStackGrabbing(null)
      stackDragInfo.current = null
      if (!stackDragMoved.current) return
      // Persist positions to DB
      allItemsRef.current.filter(i => i.cluster === cluster).forEach(item => {
        const pos = cardPositionsRef.current[item.id]
        if (pos) supabase.from('vault_cards').update({ x: pos.x, y: pos.y }).eq('id', item.id)
      })
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    // Stack drag fallback (primary: document listener in onStackMouseDown)
    if (stackDragInfo.current) {
      const { cluster, startMouseX, startMouseY, startPositions } = stackDragInfo.current
      const scale = scaleRef.current || 1
      const dx = (e.clientX - startMouseX) / scale
      const dy = (e.clientY - startMouseY) / scale
      if (!stackDragMoved.current && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
        stackDragMoved.current = true
        setStackGrabbing(cluster)
      }
      if (!stackDragMoved.current) return
      const updates: Record<string, { x: number; y: number }> = {}
      Object.entries(startPositions).forEach(([id, pos]) => {
        updates[id] = { x: pos.x + dx, y: pos.y + dy }
      })
      setCardPositions(prev => ({ ...prev, ...updates }))
      const n = Object.keys(startPositions).length || 1
      const cx = Object.values(startPositions).reduce((s, p) => s + p.x, 0) / n
      const cy = Object.values(startPositions).reduce((s, p) => s + p.y, 0) / n
      setBundledStackPos(prev => ({ ...prev, [cluster]: { x: cx + dx, y: cy + dy } }))
      return
    }
    // Card drag
    if (draggingCard.current) {
      const { id, startMouseX, startMouseY, startCardX, startCardY } = draggingCard.current
      const dx = (e.clientX - startMouseX) / scaleRef.current
      const dy = (e.clientY - startMouseY) / scaleRef.current
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) cardDragMoved.current = true
      setCardPositions(prev => ({ ...prev, [id]: { x: startCardX + dx, y: startCardY + dy } }))
      return
    }
    if (!isDragging.current) return
    const { mouseX, mouseY, offsetX, offsetY } = dragOrigin.current
    const next = {
      x: offsetX + (e.clientX - mouseX),
      y: offsetY + (e.clientY - mouseY),
    }
    offsetRef.current = next
    setOffset(next)
  }, [])

  const onMouseUp = useCallback(() => {
    // Save position when a card drag ends
    if (draggingCard.current && cardDragMoved.current) {
      const { id } = draggingCard.current
      const pos = cardPositionsRef.current[id]
      if (pos) supabase.from('vault_cards').update({ x: pos.x, y: pos.y }).eq('id', id)
    }
    draggingCard.current = null
    isDragging.current = false
    setDragging(false)
    setDraggingCardId(null)
  }, [])

  // ── Zoom & Pan (trackpad + mouse wheel) ──
  // ctrlKey=true  → pinch gesture (trackpad) or Ctrl+wheel (mouse) → zoom
  // ctrlKey=false → two-finger swipe (trackpad) or plain scroll (mouse) → pan
  //
  // Sensitivity is adaptive:
  //   Trackpad pinch  … |deltaY| is tiny (< 20) → needs higher sensitivity
  //   Mouse wheel     … |deltaY| is large (≥ 20) → needs lower sensitivity
  const onWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()

    if (e.ctrlKey) {
      // ── Pinch / ctrl+scroll → zoom (cursor-centered) ──
      let dy = e.deltaY
      if (e.deltaMode === 1) dy *= 16   // line mode
      if (e.deltaMode === 2) dy *= 400  // page mode

      // Distinguish trackpad pinch (small |dy|) from mouse wheel (large |dy|)
      const isTrackpadPinch = Math.abs(dy) < 20
      const sensitivity = isTrackpadPinch ? 0.025 : 0.002
      const factor = Math.exp(-dy * sensitivity)

      const currentScale = scaleRef.current
      const nextScale = Math.min(4, Math.max(0.15, currentScale * factor))
      if (nextScale === currentScale) return

      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      // Keep the point under the cursor fixed while zooming
      const cx = e.clientX - rect.left
      const cy = e.clientY - rect.top
      const ratio = nextScale / currentScale
      const nextOffset = {
        x: cx - (cx - offsetRef.current.x) * ratio,
        y: cy - (cy - offsetRef.current.y) * ratio,
      }

      scaleRef.current = nextScale
      offsetRef.current = nextOffset
      setScale(nextScale)
      setOffset(nextOffset)
    } else {
      // ── Two-finger swipe → pan ──
      let dx = e.deltaX
      let dy = e.deltaY
      if (e.deltaMode === 1) { dx *= 16; dy *= 16 }
      if (e.deltaMode === 2) { dx *= 400; dy *= 400 }

      const nextOffset = {
        x: offsetRef.current.x - dx,
        y: offsetRef.current.y - dy,
      }
      offsetRef.current = nextOffset
      setOffset(nextOffset)
    }
  }, [])

  useEffect(() => {
    if (isLoading) return
    const el = containerRef.current
    if (!el) return
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [onWheel, isLoading])

  const zoomIn = useCallback(() => {
    const rect = containerRef.current?.getBoundingClientRect()
    const cx = rect ? rect.width / 2 : 0
    const cy = rect ? rect.height / 2 : 0
    const current = scaleRef.current
    const next = Math.min(3, current * 1.2)
    const ratio = next / current
    const nextOffset = {
      x: cx - (cx - offsetRef.current.x) * ratio,
      y: cy - (cy - offsetRef.current.y) * ratio,
    }
    scaleRef.current = next
    offsetRef.current = nextOffset
    setScale(next)
    setOffset(nextOffset)
  }, [])

  const zoomOut = useCallback(() => {
    const rect = containerRef.current?.getBoundingClientRect()
    const cx = rect ? rect.width / 2 : 0
    const cy = rect ? rect.height / 2 : 0
    const current = scaleRef.current
    const next = Math.max(0.2, current / 1.2)
    const ratio = next / current
    const nextOffset = {
      x: cx - (cx - offsetRef.current.x) * ratio,
      y: cy - (cy - offsetRef.current.y) * ratio,
    }
    scaleRef.current = next
    offsetRef.current = nextOffset
    setScale(next)
    setOffset(nextOffset)
  }, [])

  const resetView = useCallback(() => {
    const cfg = LAYOUT_CONFIG[layoutMode]
    scaleRef.current = cfg.scale
    offsetRef.current = cfg.offset
    setScale(cfg.scale)
    setOffset(cfg.offset)
  }, [layoutMode])

  const arrangeCards = useCallback((mode: ArrangeMode) => {
    const items = allItemsRef.current
    const GAP_X = 24
    const GAP_Y = 20
    const COLS = 4
    const newPos: Record<string, { x: number; y: number }> = {}

    if (mode === 'cluster') {
      const order: Cluster[] = ['design', 'frontend', 'backend', 'ai']
      let colX = 80
      order.forEach(cluster => {
        const group = items.filter(i => i.cluster === cluster)
          .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
        group.forEach((item, i) => {
          newPos[item.id] = { x: colX, y: 80 + i * (CARD_H + GAP_Y) }
        })
        if (group.length > 0) colX += CARD_W + 48
      })
    } else {
      const sorted =
        mode === 'date'
          ? [...items].sort((a, b) => a.createdAt.localeCompare(b.createdAt))
          : mode === 'readtime'
          ? [...items].sort((a, b) => a.links.length - b.links.length)
          : [...items].sort((a, b) => b.connections.length - a.connections.length)
      sorted.forEach((item, i) => {
        newPos[item.id] = {
          x: 80 + (i % COLS) * (CARD_W + GAP_X),
          y: 80 + Math.floor(i / COLS) * (CARD_H + GAP_Y),
        }
      })
    }

    setCardPositions(newPos)
    setShowArrange(false)
  }, [])

  const switchLayout = useCallback((mode: LayoutMode) => {
    setLayoutMode(mode)
    const cfg = LAYOUT_CONFIG[mode]
    scaleRef.current = cfg.scale
    offsetRef.current = cfg.offset
    setScale(cfg.scale)
    setOffset(cfg.offset)
  }, [])

  const getTitle = (id: string, fallback: string) => cardTitles[id] ?? fallback

  const getClusterCentroid = useCallback((cluster: Cluster) => {
    const clusterItems = allItems.filter(i => i.cluster === cluster)
    if (clusterItems.length === 0) return { x: 200, y: 200 }
    const positions = clusterItems.map(item =>
      cardPositions[item.id] ?? GRAPH_POS[item.id] ?? { x: item.x, y: item.y }
    )
    const avgX = positions.reduce((sum, p) => sum + p.x, 0) / positions.length
    const avgY = positions.reduce((sum, p) => sum + p.y, 0) / positions.length
    return { x: avgX, y: avgY }
  }, [allItems, cardPositions, layoutMode])

  const generateClusterSummary = useCallback(async (cluster: Cluster) => {
    const items = allItemsRef.current.filter(i => i.cluster === cluster)
    if (items.length === 0) return
    const cards = items.map(i => ({
      title: cardTitlesRef.current[i.id] ?? i.title,
      summary: cardSummariesRef.current[i.id] ?? '',
      body: cardBodiesRef.current[i.id] ?? '',
      notes: cardNotesRef.current[i.id] ?? '',
      links: (cardLinksRef.current[i.id] ?? []).map(l => ({
        title: l.title, url: l.url, description: l.description ?? '',
      })),
      messages: (cardMessagesRef.current[i.id] ?? [])
        .filter(m => m.role === 'assistant')
        .map(m => m.content)
        .join('\n'),
    }))
    setClusterSummaryLoading(prev => ({ ...prev, [cluster]: true }))
    setClusterSummaries(prev => ({ ...prev, [cluster]: undefined }))
    try {
      const { data, error } = await supabase.functions.invoke('summarize-cluster', {
        body: { cards, clusterLabel: CLUSTER_CONFIG[cluster].label },
      })
      if (!error && data?.summary) {
        setClusterSummaries(prev => ({ ...prev, [cluster]: data.summary }))
      }
    } finally {
      setClusterSummaryLoading(prev => ({ ...prev, [cluster]: false }))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const alignCluster = useCallback((cluster: Cluster) => {
    const items = allItemsRef.current.filter(i => i.cluster === cluster)
    if (items.length === 0) return
    const GAP_X = 16
    const GAP_Y = 12
    const COLS = Math.ceil(Math.sqrt(items.length))
    const positions = cardPositionsRef.current
    // Sort cards by current position (top→bottom, left→right) so grid order feels natural
    const sorted = [...items].sort((a, b) => {
      const ay = (positions[a.id] ?? a).y
      const by = (positions[b.id] ?? b).y
      const ax = (positions[a.id] ?? a).x
      const bx = (positions[b.id] ?? b).x
      return ay !== by ? ay - by : ax - bx
    })
    // Anchor to the top-left of the current bounding box so cards don't fly away
    const xs = items.map(i => (positions[i.id] ?? i).x)
    const ys = items.map(i => (positions[i.id] ?? i).y)
    const startX = Math.min(...xs)
    const startY = Math.min(...ys)
    const newPositions: Record<string, { x: number; y: number }> = {}
    sorted.forEach((item, idx) => {
      const col = idx % COLS
      const row = Math.floor(idx / COLS)
      newPositions[item.id] = {
        x: Math.round(startX + col * (CARD_W + GAP_X)),
        y: Math.round(startY + row * (CARD_H + GAP_Y)),
      }
    })
    setCardPositions(prev => ({ ...prev, ...newPositions }))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const openKnowledgeSidebar = useCallback(async (cluster: Cluster) => {
    const items = allItemsRef.current.filter(i => i.cluster === cluster)
    if (items.length === 0) return
    setKnowledgeSidebar({ cluster, sections: [] })
    setKnowledgeLoading(prev => ({ ...prev, [cluster]: true }))
    await new Promise(r => setTimeout(r, 400))

    // カードごとに1テーマ = 1セクション
    // insights = summary + bodyの抜粋
    const sections: InsightSection[] = items
      .map(item => {
        const summary = (cardSummariesRef.current[item.id] ?? item.summary ?? '').trim()
        const body = (cardBodiesRef.current[item.id] ?? item.body ?? '').trim()
        const insights: string[] = []

        if (summary) insights.push(summary)

        if (body) {
          const lines = body
            .split('\n')
            .map(l => l.replace(/^#+\s*/, '').replace(/^[-*•]\s*/, '').trim())
            .filter(l => l.length > 15 && !l.startsWith('```') && !l.startsWith('|'))
            .slice(0, 2)
          insights.push(...lines)
        }

        if (insights.length === 0) return null
        return { title: item.title || '(タイトルなし)', insights }
      })
      .filter((s): s is InsightSection => s !== null)

    if (sections.length === 0) {
      sections.push({
        title: 'ナレッジがありません',
        insights: ['このクラスターのカードにサマリーやドキュメントを追加してください。'],
      })
    }

    setKnowledgeSidebar({ cluster, sections })
    setKnowledgeLoading(prev => ({ ...prev, [cluster]: false }))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const generateApplyScenes = useCallback(async (sections: { title: string; insights: string[] }[], clusterLabel: string): Promise<string[]> => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-apply-scenes', {
        body: { sections, clusterLabel },
      })
      if (error) throw error
      return (data as { apply_scenes: string[] }).apply_scenes ?? []
    } catch {
      return []
    }
  }, [])

  const saveKnowledgeSnapshot = useCallback(async () => {
    if (!knowledgeSidebar || knowledgeSidebar.sections.length === 0) return
    setKnowledgeSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')
      const clusterLabel = CLUSTER_CONFIG[knowledgeSidebar.cluster].label
      const cardCount = allItemsRef.current.filter(i => i.cluster === knowledgeSidebar.cluster).length
      const apply_scenes = await generateApplyScenes(knowledgeSidebar.sections, clusterLabel)
      const { error } = await supabase.from('knowledge_snapshots').insert({
        user_id: user.id,
        cluster: knowledgeSidebar.cluster,
        cluster_label: clusterLabel,
        sections: knowledgeSidebar.sections,
        card_count: cardCount,
        apply_scenes,
      })
      if (error) throw error
      toast.success('ナレッジを統合して保存しました')
    } catch (e) {
      toast.error('保存に失敗しました')
      console.error(e)
    } finally {
      setKnowledgeSaving(false)
    }
  }, [knowledgeSidebar, generateApplyScenes]) // eslint-disable-line react-hooks/exhaustive-deps

  const saveSingleSection = useCallback(async (section: { title: string; insights: string[] }) => {
    if (!knowledgeSidebar) return
    setKnowledgeSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')
      const clusterLabel = `${CLUSTER_CONFIG[knowledgeSidebar.cluster].label} — ${section.title}`
      const apply_scenes = await generateApplyScenes([section], clusterLabel)
      const { error } = await supabase.from('knowledge_snapshots').insert({
        user_id: user.id,
        cluster: knowledgeSidebar.cluster,
        cluster_label: clusterLabel,
        sections: [section],
        card_count: 1,
        apply_scenes,
      })
      if (error) throw error
      toast.success(`「${section.title}」を保存しました`)
    } catch (e) {
      toast.error('保存に失敗しました')
      console.error(e)
    } finally {
      setKnowledgeSaving(false)
    }
  }, [knowledgeSidebar, generateApplyScenes]) // eslint-disable-line react-hooks/exhaustive-deps

  const collapseCluster = useCallback((cluster: Cluster) => {
    if (bundledClusters.has(cluster)) return
    const snap = getClusterCentroid(cluster)
    setBundledStackPos(prev => ({ ...prev, [cluster]: snap }))
    setCollapsingClusters(new Set([cluster]))
    setTimeout(() => { setBundledClusters(prev => new Set([...prev, cluster])) }, 400)
    setTimeout(() => { setCollapsingClusters(new Set()) }, 500)
    generateClusterSummary(cluster)
  }, [bundledClusters, getClusterCentroid, generateClusterSummary])

  // ── Connections ──
  const connPairs: Array<[KnowledgeItem, KnowledgeItem]> = []
  const seen = new Set<string>()
  for (const item of allItems) {
    for (const cid of item.connections) {
      const key = [item.id, cid].sort().join('~')
      if (!seen.has(key)) {
        seen.add(key)
        const target = allItems.find(i => i.id === cid)
        if (target) connPairs.push([item, target])
      }
    }
  }

  // ── Tag-affinity map (latent connections) ──
  // Maps item ID → shared tags with the currently active (hovered/selected) card
  const activeId = hovered ?? selected?.id
  const affinityMap = useMemo((): Record<string, string[]> => {
    if (!activeId) return {}
    const activeItem = allItems.find(i => i.id === activeId)
    if (!activeItem) return {}
    const explicit = new Set(activeItem.connections)
    const result: Record<string, string[]> = {}
    for (const item of allItems) {
      if (item.id === activeItem.id || explicit.has(item.id)) continue
      const shared = item.tags.filter(t => activeItem.tags.includes(t))
      if (shared.length > 0) result[item.id] = shared
    }
    return result
  }, [activeId, allItems])

  // ── Timeline layout (dynamic, date-based) ──
  const timelineLayout = useMemo(() => {
    if (!allItems.length) return null

    const X_MARGIN    = 320   // left margin before first month
    const X_PER_MONTH = 300   // pixels per month
    const CARD_GAP_H  = 20    // horizontal gap between cards for overlap check
    const CARD_GAP_V  = 16    // vertical gap when stacking
    const ZONE_PAD    = 24    // padding around cluster zone

    // Build date map
    const dateMap: Record<string, Date> = {}
    allItems.forEach(i => {
      const d = new Date(i.createdAt)
      if (!isNaN(d.getTime())) dateMap[i.id] = d
    })

    const allDates = Object.values(dateMap)
    if (!allDates.length) return null

    const minTime = Math.min(...allDates.map(d => d.getTime()))
    const maxTime = Math.max(...allDates.map(d => d.getTime()))
    const minDate = new Date(minTime)
    const maxDate = new Date(maxTime)

    // Generate month array from min to max
    const months: { label: string; x: number; date: Date }[] = []
    let cur = new Date(minDate.getFullYear(), minDate.getMonth(), 1)
    const endMonth = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1)
    let idx = 0
    while (cur <= endMonth) {
      const label = cur.getMonth() === 0
        ? `${cur.getFullYear()}年 1月`
        : `${cur.getMonth() + 1}月`
      months.push({ label, x: X_MARGIN + idx * X_PER_MONTH, date: new Date(cur) })
      cur = new Date(cur.getFullYear(), cur.getMonth() + 1, 1)
      idx++
    }

    // Date → canvas X
    const dateToX = (d: Date): number => {
      const mIdx = months.findIndex(m =>
        m.date.getFullYear() === d.getFullYear() && m.date.getMonth() === d.getMonth()
      )
      if (mIdx < 0) return X_MARGIN
      const daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
      return months[mIdx].x + ((d.getDate() - 1) / daysInMonth) * X_PER_MONTH
    }

    // Cluster order by earliest card
    const clusterFirst: Record<string, number> = {}
    allItems.forEach(i => {
      const t = dateMap[i.id]?.getTime() ?? Infinity
      if (!clusterFirst[i.cluster] || t < clusterFirst[i.cluster]) clusterFirst[i.cluster] = t
    })
    const clusterOrder = [...new Set(allItems.map(i => i.cluster))]
      .sort((a, b) => (clusterFirst[a] ?? 0) - (clusterFirst[b] ?? 0))

    // Assign base Y per cluster row
    const ROW_INNER = CARD_H + CARD_GAP_V * 4  // minimum row inner height
    const ROW_GAP   = 48
    const Y_AXIS    = 50   // timeline axis Y
    const Y_START   = Y_AXIS + 40

    const clusterBaseY: Record<string, number> = {}
    let curY = Y_START
    clusterOrder.forEach(c => {
      clusterBaseY[c] = curY
      // Compute how tall this cluster will be (we do a dry-run)
      const items = allItems.filter(i => i.cluster === c && dateMap[i.id])
        .sort((a, b) => dateMap[a.id].getTime() - dateMap[b.id].getTime())
      let maxStack = 0
      const placed: { x: number; y: number }[] = []
      items.forEach(item => {
        const tx = dateToX(dateMap[item.id]) - CARD_W / 2
        let yOff = 0
        placed.forEach(p => {
          if (Math.abs(p.x - tx) < CARD_W + CARD_GAP_H) yOff = Math.max(yOff, p.y + CARD_H + CARD_GAP_V)
        })
        placed.push({ x: tx, y: yOff })
        maxStack = Math.max(maxStack, yOff + CARD_H)
      })
      curY += Math.max(ROW_INNER, maxStack) + ROW_GAP
    })

    // Compute final positions
    const positions: Record<string, { x: number; y: number }> = {}
    clusterOrder.forEach(c => {
      const baseY = clusterBaseY[c]
      const items = allItems.filter(i => i.cluster === c && dateMap[i.id])
        .sort((a, b) => dateMap[a.id].getTime() - dateMap[b.id].getTime())
      const placed: { x: number; y: number }[] = []
      items.forEach(item => {
        const tx = dateToX(dateMap[item.id]) - CARD_W / 2
        let yOff = 0
        placed.forEach(p => {
          if (Math.abs(p.x - tx) < CARD_W + CARD_GAP_H) yOff = Math.max(yOff, p.y + CARD_H + CARD_GAP_V)
        })
        placed.push({ x: tx, y: yOff })
        positions[item.id] = { x: tx, y: baseY + yOff }
      })
    })

    // Items with no date: place at the right side
    let noDateX = (months.length > 0 ? months[months.length - 1].x + X_PER_MONTH : X_MARGIN) + 60
    allItems.filter(i => !dateMap[i.id]).forEach(i => {
      positions[i.id] = { x: noDateX, y: Y_START }
      noDateX += CARD_W + 20
    })

    // Cluster zone rectangles
    const totalW = (months.length > 0 ? months[months.length - 1].x + X_PER_MONTH : X_MARGIN + 300) + 80
    const zones = clusterOrder.map(c => {
      const posArr = allItems.filter(i => i.cluster === c).map(i => positions[i.id]).filter(Boolean)
      if (!posArr.length) return null
      const minY = Math.min(...posArr.map(p => p.y)) - ZONE_PAD
      const maxY = Math.max(...posArr.map(p => p.y)) + CARD_H + ZONE_PAD
      return { cluster: c, x: X_MARGIN - 60, y: minY, width: totalW - (X_MARGIN - 60), height: maxY - minY }
    }).filter(Boolean) as { cluster: string; x: number; y: number; width: number; height: number }[]

    const canvasW = totalW + 60
    const canvasH = Math.max(...Object.values(positions).map(p => p.y)) + CARD_H + 80

    return { months, positions, zones, clusterOrder, clusterBaseY, canvasW, canvasH }
  }, [allItems])

  // ── Layout helpers ──
  const getPos = (item: KnowledgeItem) => {
    if (layoutMode === 'timeline' && timelineLayout?.positions[item.id]) {
      return timelineLayout.positions[item.id]
    }
    return cardPositions[item.id] ?? GRAPH_POS[item.id] ?? { x: item.x, y: item.y }
  }

  const canvasCfg = useMemo(() => {
    if (layoutMode === 'timeline' && timelineLayout) {
      return { ...LAYOUT_CONFIG.timeline, canvasW: timelineLayout.canvasW, canvasH: timelineLayout.canvasH }
    }
    return LAYOUT_CONFIG[layoutMode]
  }, [layoutMode, timelineLayout])

  // ── Search filter ──
  const q = searchQuery.toLowerCase()
  const matchIds = q
    ? new Set(allItems.filter(i =>
        i.title.toLowerCase().includes(q) ||
        i.tags.some(t => t.toLowerCase().includes(q)) ||
        i.links.some(l => l.domain.toLowerCase().includes(q))
      ).map(i => i.id))
    : null

  if (isLoading) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-neutral-200 border-t-neutral-600 animate-spin" />
          <p className="text-[12px] text-neutral-400">Vault を読み込んでいます…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-white">

      {/* ── Background pattern (viewport-filling, pan/zoom aligned) ── */}
      {bgPattern !== 'none' && (() => {
        const dotsSpacing = 32 * scale
        const gridSmall   = 20 * scale
        const gridLarge   = 80 * scale
        const px = ((offset.x % dotsSpacing) + dotsSpacing) % dotsSpacing
        const py = ((offset.y % dotsSpacing) + dotsSpacing) % dotsSpacing
        const pxS = ((offset.x % gridSmall) + gridSmall) % gridSmall
        const pyS = ((offset.y % gridSmall) + gridSmall) % gridSmall
        const pxL = ((offset.x % gridLarge) + gridLarge) % gridLarge
        const pyL = ((offset.y % gridLarge) + gridLarge) % gridLarge
        return (
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <defs>
              {bgPattern === 'dots' && (
                <pattern id="vp-dots" x={px} y={py} width={dotsSpacing} height={dotsSpacing} patternUnits="userSpaceOnUse">
                  <circle cx="0" cy="0" r={Math.max(0.6, scale * 1)} fill="#d4d4d8" opacity="0.5" />
                </pattern>
              )}
              {bgPattern === 'square' && (
                <pattern id="vp-square" x={pxS} y={pyS} width={gridSmall} height={gridSmall} patternUnits="userSpaceOnUse">
                  <path d={`M ${gridSmall} 0 L 0 0 0 ${gridSmall}`} fill="none" stroke="#e8e8ea" strokeWidth="0.5" />
                </pattern>
              )}
              {bgPattern === 'grid' && (
                <>
                  <pattern id="vp-grid-sub" x={pxS} y={pyS} width={gridSmall} height={gridSmall} patternUnits="userSpaceOnUse">
                    <path d={`M ${gridSmall} 0 L 0 0 0 ${gridSmall}`} fill="none" stroke="#eeeeef" strokeWidth="0.3" />
                  </pattern>
                  <pattern id="vp-grid" x={pxL} y={pyL} width={gridLarge} height={gridLarge} patternUnits="userSpaceOnUse">
                    <rect width={gridLarge} height={gridLarge} fill="url(#vp-grid-sub)" />
                    <path d={`M ${gridLarge} 0 L 0 0 0 ${gridLarge}`} fill="none" stroke="#e0e0e3" strokeWidth="0.7" />
                  </pattern>
                </>
              )}
            </defs>
            {bgPattern === 'dots'   && <rect width="100%" height="100%" fill="url(#vp-dots)" />}
            {bgPattern === 'square' && <rect width="100%" height="100%" fill="url(#vp-square)" />}
            {bgPattern === 'grid'   && <rect width="100%" height="100%" fill="url(#vp-grid)" />}
          </svg>
        )
      })()}

      {/* ── Canvas world ── */}
      <div
        ref={containerRef}
        className={`absolute inset-0 ${dragging || draggingCardId ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onDoubleClick={onCanvasDoubleClick}
        onClick={e => {
          if (!(e.target as HTMLElement).closest('[data-card]')) {
            setSelected(null)
            setKnowledgeSidebar(null)
          }
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: canvasCfg.canvasW,
            height: canvasCfg.canvasH,
            transform: `translate3d(${offset.x}px,${offset.y}px,0) scale(${scale})`,
            transformOrigin: '0 0',
          }}
        >
          {/* ── SVG layer: grid + zones + timeline + connections ── */}
          <svg
            style={{ position: 'absolute', inset: 0, width: canvasCfg.canvasW, height: canvasCfg.canvasH, overflow: 'visible', pointerEvents: 'none' }}
          >


            {/* Timeline mode: dynamic cluster zones */}
            {layoutMode === 'timeline' && timelineLayout?.zones.map(zone => {
              const visual = getClusterVisual(zone.cluster)
              return (
                <rect
                  key={zone.cluster}
                  x={zone.x} y={zone.y}
                  width={zone.width} height={zone.height}
                  rx="20" ry="20"
                  fill={`${visual.accent}10`}
                  stroke={`${visual.accent}40`}
                  strokeWidth="1"
                  opacity="0.9"
                />
              )
            })}

            {/* Timeline axis */}
            {layoutMode === 'timeline' && timelineLayout && (
              <>
                <line
                  x1="200" y1="26" x2={canvasCfg.canvasW - 60} y2="26"
                  stroke="#d4d0ca" strokeWidth="1"
                />
                {timelineLayout.months.map(m => (
                  <g key={m.label}>
                    <line x1={m.x} y1="20" x2={m.x} y2="32" stroke="#b8b4ae" strokeWidth="1" />
                    <line x1={m.x} y1="32" x2={m.x} y2={canvasCfg.canvasH - 40} stroke="#e2dfd9" strokeWidth="1" strokeDasharray="4 6" />
                  </g>
                ))}
              </>
            )}

            {/* Connection lines (explicit + latent) */}
            {connectionMode !== 'none' && (() => {
              // ── Helper: effective endpoint for a card (bundle center if bundled) ──
              const ep = (item: KnowledgeItem) => {
                if (bundledClusters.has(item.cluster)) {
                  const p = bundledStackPos[item.cluster] ?? getClusterCentroid(item.cluster)
                  return { x: p.x + CARD_W / 2, y: p.y + CARD_H / 2 }
                }
                const p = getPos(item)
                return { x: p.x + CARD_W / 2, y: p.y + CARD_H / 2 }
              }

              // ── Build deduplicated effective connections ──
              interface Conn {
                key: string
                ax: number; ay: number; bx: number; by: number
                clusterA: Cluster; clusterB: Cluster
                isCrossCluster: boolean
                anyBundled: boolean
                isLit: boolean
              }
              const seenBundlePairs = new Set<string>()
              const conns: Conn[] = []

              for (const [a, b] of connPairs) {
                const aBundled = bundledClusters.has(a.cluster)
                const bBundled = bundledClusters.has(b.cluster)

                // Same bundle → skip
                if (aBundled && bBundled && a.cluster === b.cluster) continue

                // Bundle-to-bundle: deduplicate per cluster pair
                if (aBundled && bBundled) {
                  const pairKey = [a.cluster, b.cluster].sort().join('~')
                  if (seenBundlePairs.has(pairKey)) continue
                  seenBundlePairs.add(pairKey)
                }

                const ptA = ep(a)
                const ptB = ep(b)
                const anyBundled = aBundled || bBundled
                const isLit = !anyBundled && (
                  hovered === a.id || hovered === b.id ||
                  selected?.id === a.id || selected?.id === b.id
                )
                const key = (aBundled && bBundled)
                  ? `bundle-${[a.cluster, b.cluster].sort().join('-')}`
                  : `${a.id}-${b.id}`

                conns.push({
                  key, ax: ptA.x, ay: ptA.y, bx: ptB.x, by: ptB.y,
                  clusterA: a.cluster, clusterB: b.cluster,
                  isCrossCluster: a.cluster !== b.cluster,
                  anyBundled, isLit,
                })
              }

              // ── Gradient defs ──
              const gradDefs = conns
                .filter(c => c.isCrossCluster)
                .map(c => {
                  const gradId = `conn-grad-${c.key}`
                  return (
                    <linearGradient
                      key={gradId} id={gradId}
                      gradientUnits="userSpaceOnUse"
                      x1={c.ax} y1={c.ay} x2={c.bx} y2={c.by}
                    >
                      <stop offset="0%"   stopColor={CLUSTER_CONFIG[c.clusterA].accent} />
                      <stop offset="100%" stopColor={CLUSTER_CONFIG[c.clusterB].accent} />
                    </linearGradient>
                  )
                })

              // ── Latent tag-affinity lines (only when no bundling) ──
              const latentLines: React.ReactNode[] = []
              if (connectionMode === 'all' && activeId && bundledClusters.size === 0) {
                const activeItem = allItems.find(i => i.id === activeId)
                if (activeItem) {
                  const cfgActive = CLUSTER_CONFIG[activeItem.cluster]
                  const ptA = ep(activeItem)
                  for (const itemId of Object.keys(affinityMap)) {
                    const target = allItems.find(i => i.id === itemId)
                    if (!target) continue
                    const ptB = ep(target)
                    const mx = (ptA.x + ptB.x) / 2
                    const arcY = Math.min(ptA.y, ptB.y) - Math.abs(ptB.x - ptA.x) * 0.08 - 8
                    const midX = 0.25 * ptA.x + 0.5 * mx + 0.25 * ptB.x
                    const midY = 0.25 * ptA.y + 0.5 * arcY + 0.25 * ptB.y
                    latentLines.push(
                      <g key={`affinity-${activeId}-${itemId}`}>
                        <path
                          d={`M ${ptA.x} ${ptA.y} Q ${mx} ${arcY} ${ptB.x} ${ptB.y}`}
                          fill="none" stroke={cfgActive.accent}
                          strokeWidth={1} strokeDasharray="3 5" opacity={0.4}
                        />
                        <circle cx={midX} cy={midY} r={3} fill={cfgActive.accent} opacity={0.55} />
                      </g>
                    )
                  }
                }
              }

              // ── Render ──
              return (
                <>
                  <defs>{gradDefs}</defs>
                  {latentLines}
                  {conns.map(c => {
                    const isCrossCluster = c.isCrossCluster
                    const gradId = `conn-grad-${c.key}`
                    const cfgA = CLUSTER_CONFIG[c.clusterA]
                    const arcY = layoutMode === 'graph'
                      ? Math.min(c.ay, c.by) - Math.abs(c.bx - c.ax) * 0.15 - 20
                      : Math.min(c.ay, c.by) - 24
                    const mx = (c.ax + c.bx) / 2
                    const midX = 0.25 * c.ax + 0.5 * mx + 0.25 * c.bx
                    const midY = 0.25 * c.ay + 0.5 * arcY + 0.25 * c.by
                    return (
                      <g key={c.key}>
                        <path
                          d={`M ${c.ax} ${c.ay} Q ${mx} ${arcY} ${c.bx} ${c.by}`}
                          fill="none"
                          stroke={isCrossCluster ? (c.isLit ? `url(#${gradId})` : '#c4bdd8') : (c.isLit ? cfgA.accent : '#d4d4d8')}
                          strokeWidth={isCrossCluster ? (c.isLit ? 2.2 : 1.5) : (c.isLit ? 2 : 1.2)}
                          strokeDasharray={isCrossCluster ? (c.isLit ? '' : '8 5') : (c.isLit ? '' : '6 5')}
                          opacity={isCrossCluster ? (c.isLit ? 0.9 : 0.6) : (c.isLit ? 0.85 : 0.45)}
                          style={{ transition: 'stroke 0.2s, opacity 0.2s, stroke-width 0.2s' }}
                        />
                        {isCrossCluster && (
                          <polygon
                            points={`${midX},${midY - 5} ${midX + 5},${midY} ${midX},${midY + 5} ${midX - 5},${midY}`}
                            fill={c.isLit ? `url(#${gradId})` : 'white'}
                            stroke={c.isLit ? 'none' : '#c4bdd8'}
                            strokeWidth={1.5}
                            opacity={c.isLit ? 1 : 0.65}
                            style={{ transition: 'all 0.2s' }}
                          />
                        )}
                      </g>
                    )
                  })}
                </>
              )
            })()}
          </svg>

          {/* Timeline month labels */}
          {layoutMode === 'timeline' && timelineLayout?.months.map(m => (
            <div
              key={m.label}
              style={{ position: 'absolute', left: m.x, top: 4, transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}
              className="text-[10px] font-medium text-neutral-400 tracking-wide"
            >
              {m.label}
            </div>
          ))}

          {/* Timeline cluster labels */}
          {layoutMode === 'timeline' && timelineLayout?.zones.map(zone => (
            <div
              key={zone.cluster}
              style={{ position: 'absolute', left: zone.x + 16, top: zone.y + 10, whiteSpace: 'nowrap' }}
              className="text-[10px] font-semibold text-neutral-400 tracking-wide pointer-events-none select-none"
            >
              {zone.cluster}
            </div>
          ))}


          {/* Cards */}
          {allItems.map((item) => {
            const isCollapsing = collapsingClusters.has(item.cluster)
            const isExpanding  = expandingClusters.has(item.cluster)
            // Hide when fully bundled and not in any transition
            if (bundledClusters.has(item.cluster) && !isExpanding && !isCollapsing) return null

            // Cluster-local index for stagger (cap at 4 to keep animation snappy)
            const clusterItems = allItems.filter(i => i.cluster === item.cluster)
            const clusterIdx   = clusterItems.findIndex(i => i.id === item.id)
            const stagger      = Math.min(clusterIdx, 4) * 20

            // For collapsing: pass centroid as position so card flies there
            const centroid = bundledStackPos[item.cluster] ?? getClusterCentroid(item.cluster)
            const displayPosX = isCollapsing ? centroid.x : getPos(item).x
            const displayPosY = isCollapsing ? centroid.y : getPos(item).y

            return (
              <ItemCard
                key={item.id}
                item={item}
                cardTitle={getTitle(item.id, item.title)}
                summary={cardSummaries[item.id] ?? ''}
                updatedAt={cardUpdatedAt[item.id] ?? ''}
                assignees={cardAssignees[item.id] ?? []}
                isSelected={selected?.id === item.id}
                isHovered={hovered === item.id}
                isFaded={!!matchIds && !matchIds.has(item.id)}
                isDragging={draggingCardId === item.id || stackGrabbing === item.cluster}
                hasPage={!!(cardBodies[item.id]?.trim())}
                degree={layoutMode === 'graph' ? NODE_DEGREE[item.id] : undefined}
                onClick={() => {
                  if (cardDragMoved.current) { cardDragMoved.current = false; return }
                  setSelected(selected?.id === item.id ? null : item)
                }}
                onMouseDown={(e) => {
                  if (isCollapsing || isExpanding) return
                  e.stopPropagation()
                  const pos = cardPositionsRef.current[item.id]
                    ?? GRAPH_POS[item.id]
                    ?? { x: item.x, y: item.y }
                  draggingCard.current = {
                    id: item.id,
                    startMouseX: e.clientX,
                    startMouseY: e.clientY,
                    startCardX: pos.x,
                    startCardY: pos.y,
                  }
                  cardDragMoved.current = false
                  setDraggingCardId(item.id)
                }}
                onMouseEnter={() => { setHovered(item.id); onCardClusterEnter(item.cluster) }}
                onMouseLeave={() => { setHovered(null); onCardClusterLeave() }}
                posX={displayPosX}
                posY={displayPosY}
                quickCaptureOpen={quickCaptureId === item.id}
                onQuickCapture={(e) => {
                  e.stopPropagation()
                  setQuickCaptureId(prev => prev === item.id ? null : item.id)
                }}
                onQuickAdd={(value) => handleQuickAdd(item.id, value)}
                onQuickCaptureClose={() => setQuickCaptureId(null)}
                onDelete={() => setPendingDeleteId(item.id)}
                bundleAnim={isCollapsing ? 'collapsing' : isExpanding ? 'expanding' : undefined}
                bundleFrom={isExpanding ? (expandFromPos[item.cluster] ?? centroid) : undefined}
                animDelay={stagger}
                affinityTags={affinityMap[item.id]}
                docStatus={cardDocStatus[item.id] ?? 'writing'}
                onDocStatusToggle={async () => {
                  const next = (cardDocStatus[item.id] ?? 'writing') === 'done' ? 'writing' : 'done'
                  setCardDocStatus(prev => ({ ...prev, [item.id]: next }))
                  await supabase.from('vault_cards').update({ doc_status: next }).eq('id', item.id)
                }}
              />
            )
          })}

          {/* Per-cluster header bar — visible only when hovering cards in that cluster */}
          {(['frontend', 'design', 'backend', 'ai'] as Cluster[])
            .filter(c =>
              !bundledClusters.has(c) &&
              !collapsingClusters.has(c) &&
              !expandingClusters.has(c) &&
              allItems.filter(i => i.cluster === c).length > 1 &&
              hoveredCluster === c
            )
            .map(cluster => {
              const cfg = CLUSTER_CONFIG[cluster]
              const ClusterIcon = CLUSTER_ICON[cluster]
              const clusterItems = allItems.filter(i => i.cluster === cluster)
              const positions = clusterItems.map(i => cardPositions[i.id] ?? { x: i.x, y: i.y })
              const minX = Math.min(...positions.map(p => p.x))
              const maxX = Math.max(...positions.map(p => p.x))
              const minY = Math.min(...positions.map(p => p.y))
              const MIN_BAR = 360
              const naturalWidth = maxX + CARD_W - minX
              const barWidth = Math.max(naturalWidth, MIN_BAR)
              // Center over the cluster's bounding box
              const clusterCenterX = minX + (maxX + CARD_W - minX) / 2
              return (
                <div
                  key={`cluster-header-${cluster}`}
                  onMouseEnter={() => onCardClusterEnter(cluster)}
                  onMouseLeave={onCardClusterLeave}
                  style={{
                    position: 'absolute',
                    left: clusterCenterX,
                    top: minY - 48,
                    width: barWidth,
                    transform: 'translateX(-50%)',
                    pointerEvents: 'auto',
                    zIndex: 20,
                    cursor: 'grab',
                    userSelect: 'none',
                  }}
                  onMouseDown={e => { e.stopPropagation(); onStackMouseDown(e, cluster) }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 8px 6px 10px',
                    borderRadius: 10,
                    border: `1px solid ${cfg.accent}28`,
                    background: `${cfg.accent}0c`,
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
                  }}>
                    {/* Grip + icon + label */}
                    <GripVertical size={13} color={cfg.accent} opacity={0.45} style={{ flexShrink: 0 }} />
                    <div style={{
                      width: 20, height: 20, borderRadius: 6,
                      background: cfg.accent, display: 'flex',
                      alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <ClusterIcon size={11} color="white" />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: cfg.accent, flex: 1, letterSpacing: '0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {cfg.label}
                    </span>
                    <span style={{ fontSize: 10, color: `${cfg.accent}80`, marginRight: 4 }}>
                      {clusterItems.length}枚
                    </span>

                    {/* Divider */}
                    <div style={{ width: 1, height: 16, background: `${cfg.accent}25`, flexShrink: 0 }} />

                    {/* Action buttons */}
                    {[
                      { label: '整列', icon: <LayoutGrid size={10} />, onClick: (e: React.MouseEvent) => { e.stopPropagation(); alignCluster(cluster) }, solid: false },
                      { label: 'ナレッジ', icon: <Sparkles size={10} />, onClick: (e: React.MouseEvent) => { e.stopPropagation(); openKnowledgeSidebar(cluster) }, solid: false },
                      { label: 'まとめる', icon: <Layers size={10} />, onClick: (e: React.MouseEvent) => { e.stopPropagation(); if (!stackDragMoved.current) collapseCluster(cluster) }, solid: true },
                    ].map(btn => (
                      <button
                        key={btn.label}
                        onMouseDown={e => e.stopPropagation()}
                        onClick={btn.onClick}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 4,
                          padding: '4px 9px',
                          borderRadius: 6,
                          border: `1px solid ${btn.solid ? cfg.accent : cfg.accent + '40'}`,
                          background: btn.solid ? cfg.accent : 'transparent',
                          color: btn.solid ? '#fff' : cfg.accent,
                          fontSize: 11, fontWeight: 500,
                          cursor: 'pointer', whiteSpace: 'nowrap',
                          transition: 'opacity 0.12s',
                          flexShrink: 0,
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.75' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
                      >
                        {btn.icon}{btn.label}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })
          }

          {/* Stack cards for bundled clusters + exiting stacks */}
          {(['frontend', 'design', 'backend', 'ai'] as Cluster[])
            .filter(c => (bundledClusters.has(c) || exitingBundleClusters.has(c)) && allItems.filter(i => i.cluster === c).length > 1)
            .map(cluster => {
              // Use snapshotted position so new/moved cards don't shift the stack
              const stackPos = bundledStackPos[cluster] ?? getClusterCentroid(cluster)
              const cards = allItems
                .filter(i => i.cluster === cluster)
                .map(i => ({
                  id: i.id,
                  title: getTitle(i.id, i.title),
                  summary: cardSummaries[i.id] ?? '',
                  hasPage: !!(cardBodies[i.id]?.trim()),
                }))
              return (
                <StackCard
                  key={`stack-${cluster}`}
                  cluster={cluster}
                  clusterCards={cards}
                  posX={stackPos.x}
                  posY={stackPos.y - 20}
                  onCardClick={id => {
                    const item = allItems.find(i => i.id === id)
                    if (item) setSelected(item)
                  }}
                  onStackMouseDown={e => onStackMouseDown(e, cluster)}
                  stackDragMoved={stackDragMoved}
                  onExpand={() => expandCluster(cluster)}
                  onCardDelete={id => setPendingDeleteId(id)}
                  onCardQuickAdd={(id, value) => handleQuickAdd(id, value)}
                  isExiting={exitingBundleClusters.has(cluster)}
                  isGrabbing={stackGrabbing === cluster}
                  clusterSummary={clusterSummaries[cluster]}
                  summaryLoading={clusterSummaryLoading[cluster]}
                />
              )
            })
          }
        </div>
      </div>

      {/* ── Topic Workspace ── */}
      {selected && (
        <TopicWorkspace
          wrapperClass="fixed right-0 top-0 h-full"
          item={selected}
          cardTitle={getTitle(selected.id, selected.title)}
          onTitleChange={v => {
            setCardTitles(prev => ({ ...prev, [selected.id]: v }))
            debouncedSave(selected.id, 'title', v)
          }}
          links={cardLinks[selected.id] ?? []}
          notes={cardNotes[selected.id] ?? ''}
          messages={cardMessages[selected.id] ?? []}
          body={cardBodies[selected.id] ?? ''}
          summary={cardSummaries[selected.id] ?? ''}
          onSummaryChange={v => {
            setCardSummaries(prev => ({ ...prev, [selected.id]: v }))
            debouncedSave(selected.id, 'summary', v)
          }}
          assignees={cardAssignees[selected.id] ?? []}
          onAssigneesChange={v => {
            setCardAssignees(prev => ({ ...prev, [selected.id]: v }))
            supabase.from('vault_cards').update({ assignees: v }).eq('id', selected.id)
          }}
          onNotesChange={v => {
            setCardNotes(prev => ({ ...prev, [selected.id]: v }))
            debouncedSave(selected.id, 'notes', v)
          }}
          onAddLink={async url => {
            const domain = (() => { try { return new URL(url).hostname } catch { return url } })()
            const linkId = `l${Date.now()}`
            const optimistic: CardLink = { id: linkId, url, title: domain, domain }
            const optimisticLinks = [...(cardLinks[selected.id] ?? []), optimistic]
            setCardLinks(prev => ({ ...prev, [selected.id]: optimisticLinks }))
            supabase.from('vault_cards').update({ links: optimisticLinks }).eq('id', selected.id)
            const ogp = await fetchOgp(url)
            const enriched: CardLink = { id: linkId, url, title: ogp.title, domain: ogp.domain, description: ogp.description, image: ogp.image, siteName: ogp.siteName }
            setCardLinks(prev => {
              const updated = (prev[selected.id] ?? []).map(l => l.id === linkId ? enriched : l)
              supabase.from('vault_cards').update({ links: updated }).eq('id', selected.id)
              return { ...prev, [selected.id]: updated }
            })
          }}
          onDeleteLink={id => {
            const newLinks = (cardLinks[selected.id] ?? []).filter(l => l.id !== id)
            setCardLinks(prev => ({ ...prev, [selected.id]: newLinks }))
            supabase.from('vault_cards').update({ links: newLinks }).eq('id', selected.id)
          }}
          onSendMessage={msg => {
            const userMsg: ChatMessage = { id: `m${Date.now()}`, role: 'user', content: msg }
            const current = cardMessages[selected.id] ?? []
            const aiReply: ChatMessage = {
              id: `m${Date.now() + 1}`,
              role: 'assistant',
              content: mockAIResponse(selected, cardLinks[selected.id] ?? [], cardNotes[selected.id] ?? '', msg),
            }
            const newMessages = [...current, userMsg, aiReply]
            setCardMessages(prev => ({ ...prev, [selected.id]: newMessages }))
            supabase.from('vault_cards').update({ messages: newMessages }).eq('id', selected.id)
          }}
          onOpenPage={() => setShowPage(true)}
          onClose={() => setSelected(null)}
          onDelete={() => setPendingDeleteId(selected.id)}
          allItems={allItems}
          onSelectItem={item => setSelected(item as KnowledgeItem)}
        />
      )}

      {/* ── Card Page (Markdown sub-page) ── */}
      {showPage && selected && (
        <CardPage
          item={selected}
          body={cardBodies[selected.id] ?? ''}
          onBodyChange={v => {
            setCardBodies(prev => ({ ...prev, [selected.id]: v }))
            debouncedSave(selected.id, 'body', v)
          }}
          onClose={() => setShowPage(false)}
          docStatus={cardDocStatus[selected.id] ?? 'writing'}
          onDocStatusToggle={async () => {
            const next = (cardDocStatus[selected.id] ?? 'writing') === 'done' ? 'writing' : 'done'
            setCardDocStatus(prev => ({ ...prev, [selected.id]: next }))
            await supabase.from('vault_cards').update({ doc_status: next }).eq('id', selected.id)
          }}
        />
      )}

      {/* ── Bottom-center: background pattern selector ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full border border-neutral-200 shadow-sm overflow-hidden">
          {(['dots', 'square', 'grid', 'none'] as BgPattern[]).map((p, i) => {
            const labels: Record<BgPattern, string> = { dots: 'ドット', square: '方眼', grid: 'グリッド', none: '白紙' }
            return (
              <button
                key={p}
                onClick={() => setBgPattern(p)}
                className={`px-3 py-1.5 text-[10px] font-medium transition-colors ${
                  i > 0 ? 'border-l border-neutral-200' : ''
                } ${bgPattern === p ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:text-neutral-800'}`}
              >
                {labels[p]}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Bottom-left: zoom controls ── */}
      <div className="absolute bottom-6 left-6 z-10 flex flex-col gap-2 items-start">
        <div className="flex items-center gap-3">
        {/* Layout mode toggle */}
        <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full border border-neutral-200 shadow-sm overflow-hidden">
          <button
            onClick={() => switchLayout('timeline')}
            title="時系列レイアウト"
            className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-medium transition-colors ${
              layoutMode === 'timeline'
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <CalendarDays size={12} />
            時系列
          </button>
          <button
            onClick={() => switchLayout('graph')}
            title="グラフレイアウト"
            className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-medium transition-colors ${
              layoutMode === 'graph'
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <Network size={12} />
            グラフ
          </button>
        </div>
        <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full border border-neutral-200 shadow-sm">
          <button
            onClick={zoomOut}
            className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors"
            title="ズームアウト"
          >
            <ZoomOut size={14} />
          </button>
          <span className="w-10 text-center text-[11px] font-mono text-neutral-500">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={zoomIn}
            className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors"
            title="ズームイン"
          >
            <ZoomIn size={14} />
          </button>
          <div className="w-px h-4 bg-neutral-200 mx-0.5" />
          <button
            onClick={resetView}
            className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors"
            title="リセット"
          >
            <Maximize2 size={14} />
          </button>
        </div>
        </div>
      </div>

      {/* ── Bottom-right: search + add ── */}
      <div className="absolute bottom-6 right-20 z-10 flex items-center gap-2">
        {searchOpen ? (
          <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-full border border-neutral-200 shadow-sm pl-3 pr-1 gap-1">
            <Search size={12} className="text-neutral-400 shrink-0" />
            <input
              autoFocus
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="タイトル・タグで検索..."
              className="text-xs outline-none py-2 w-44 bg-transparent text-neutral-800 placeholder:text-neutral-400"
            />
            <button
              onClick={() => { setSearchOpen(false); setSearchQuery('') }}
              className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full border border-neutral-200 shadow-sm text-neutral-500 hover:text-neutral-900 transition-colors"
            title="検索"
          >
            <Search size={15} />
          </button>
        )}

        <button
          onClick={() => setShowNewCard(true)}
          className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-neutral-200 text-neutral-700 text-[11px] font-medium px-4 py-2.5 rounded-full shadow-sm hover:bg-white hover:border-neutral-300 active:scale-95 transition-all"
        >
          <Edit3 size={13} />
          新規トピック
        </button>
      </div>

      {/* ── Top-right: arrange + item count ── */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">

        {/* Connection mode toggle */}
        <button
          onClick={() => setConnectionMode(m => m === 'none' ? 'explicit' : m === 'explicit' ? 'all' : 'none')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-medium backdrop-blur-sm shadow-sm transition-colors ${
            connectionMode === 'none'
              ? 'bg-white/90 text-neutral-400 border-neutral-200'
              : connectionMode === 'explicit'
              ? 'bg-white/90 text-neutral-600 border-neutral-200 hover:text-neutral-900'
              : 'bg-neutral-900 text-white border-neutral-900'
          }`}
        >
          {connectionMode === 'all' ? <Sparkles size={12} /> : <Network size={12} />}
          {connectionMode === 'none' ? 'つながり：なし' : connectionMode === 'explicit' ? 'つながり：接続' : 'つながり：全て'}
        </button>

        {/* Bundle mode toggle */}
        <button
          onClick={() => {
            const allClusters = (['frontend', 'design', 'backend', 'ai'] as Cluster[])
              .filter(c => allItems.filter(i => i.cluster === c).length > 1)
            if (bundledClusters.size === allClusters.length && allClusters.length > 0) {
              // ── 展開アニメーション ──
              const clustersToExpand = new Set([...bundledClusters]) as Set<Cluster>
              const fromSnap = { ...bundledStackPos }
              // 1. StackCard exit 開始
              setExitingBundleClusters(clustersToExpand)
              // 2. 60ms 後: StackCard が消え始めた状態で個別カードを centroid から burst
              //    (expandFromPos = centroid で opacity=1 → 即座に可視)
              setTimeout(() => {
                setExpandFromPos(fromSnap)
                setBundledClusters(new Set())
                setExpandingClusters(clustersToExpand)
              }, 60)
              // 3. StackCard の exit 完了 (280ms) 後に DOM から除去
              //    isExiting=true のまま opacity=0 で remove → flash なし
              setTimeout(() => {
                setExitingBundleClusters(new Set())
              }, 300)
              // 4. expand アニメーション完了後にクリア
              setTimeout(() => {
                setExpandingClusters(new Set())
                setExpandFromPos({})
              }, 650)
            } else {
              // ── まとめるアニメーション ──
              const snaps: Partial<Record<Cluster, { x: number; y: number }>> = {}
              allClusters.forEach(c => { snaps[c] = getClusterCentroid(c) })
              setBundledStackPos(snaps)
              // 1. カードを centroid へ向けて収縮 (max anim: 80ms stagger + 380ms = 460ms)
              setCollapsingClusters(new Set(allClusters))
              // 2. アニメーションが終わる直前に StackCard をマウント (invisible)
              setTimeout(() => {
                setBundledClusters(new Set(allClusters))
              }, 400)
              // 3. StackCard の enter (1 RAF) 後にコラプス中カードを DOM から除去
              //    !isCollapsing になるまでカードは return null しないので gap なし
              setTimeout(() => {
                setCollapsingClusters(new Set())
              }, 450)
              allClusters.forEach(c => generateClusterSummary(c))
            }
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-medium backdrop-blur-sm shadow-sm transition-colors ${
            bundledClusters.size > 0
              ? 'bg-neutral-900 text-white border-neutral-900'
              : 'bg-white/90 text-neutral-600 border-neutral-200 hover:text-neutral-900'
          }`}
        >
          <Layers size={12} />
          {bundledClusters.size > 0 ? '展開する' : 'まとめる'}
        </button>

        {/* Arrange button + dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowArrange(v => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-medium backdrop-blur-sm shadow-sm transition-colors ${
              showArrange
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'bg-white/90 text-neutral-600 border-neutral-200 hover:text-neutral-900'
            }`}
          >
            <LayoutGrid size={12} />
            整理する
          </button>

          {showArrange && (
            <div
              className="absolute top-full right-0 mt-2 bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-200 shadow-2xl p-1.5 w-52"
              onClick={e => e.stopPropagation()}
            >
              <p className="text-[9px] font-semibold text-neutral-400 uppercase tracking-wider px-2.5 py-1.5">整列の軸を選択</p>
              {([
                { mode: 'cluster' as ArrangeMode,     Icon: Network,      label: 'クラスター別',   sub: 'トピックでグループ化' },
                { mode: 'date' as ArrangeMode,        Icon: CalendarDays,  label: '保存日順',       sub: '古い順に並べる' },
                { mode: 'readtime' as ArrangeMode,    Icon: Clock,         label: '読了時間順',     sub: '短い記事から' },
                { mode: 'connections' as ArrangeMode, Icon: Link2,         label: 'つながり順',     sub: '関連数が多い順' },
              ]).map(({ mode, Icon, label, sub }) => (
                <button
                  key={mode}
                  onClick={() => arrangeCards(mode)}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-neutral-100 transition-colors text-left group"
                >
                  <div className="w-7 h-7 rounded-lg bg-neutral-100 group-hover:bg-neutral-200 flex items-center justify-center shrink-0 transition-colors">
                    <Icon size={13} className="text-neutral-600" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-neutral-800">{label}</p>
                    <p className="text-[9.5px] text-neutral-400">{sub}</p>
                  </div>
                </button>
              ))}
              <div className="mx-2.5 my-1 border-t border-neutral-100" />
              <button
                onClick={() => { setCardPositions({}); setShowArrange(false) }}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-neutral-50 transition-colors text-left"
              >
                <div className="w-7 h-7 rounded-lg bg-neutral-50 flex items-center justify-center shrink-0">
                  <RotateCcw size={12} className="text-neutral-400" />
                </div>
                <p className="text-[11px] text-neutral-400">配置をリセット</p>
              </button>
            </div>
          )}
        </div>

        <span className="text-[11px] text-neutral-400 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-neutral-200">
          {allItems.length} アイテム
        </span>
      </div>

      {/* ── Add dialog ── */}
      {showAdd && (
        <AddDialog
          initialUrl={addDialogInitialUrl}
          onClose={() => { setShowAdd(false); setAddDialogInitialUrl(undefined) }}
          onSave={async (url, ogp, cluster) => {
            const newLink: CardLink = {
              id: `l${Date.now()}`, url, title: ogp.title, domain: ogp.domain,
              description: ogp.description, image: ogp.image, siteName: ogp.siteName,
            }
            await addCard(ogp.title || ogp.domain, cluster, undefined, undefined, [newLink])
          }}
        />
      )}
      {showNewCard && (
        <NewCardDialog
          onClose={() => setShowNewCard(false)}
          onCreate={addCard}
        />
      )}

      {/* Delete confirmation modal */}
      <Dialog open={pendingDeleteId !== null} onOpenChange={open => { if (!open) setPendingDeleteId(null) }}>
        <DialogContent showCloseButton={false} className="max-w-xs">
          <DialogHeader>
            <DialogTitle>カードを削除しますか？</DialogTitle>
            <DialogDescription>
              「{pendingDeleteId ? (cardTitles[pendingDeleteId] ?? allItems.find(i => i.id === pendingDeleteId)?.title ?? 'このカード') : ''}」を削除します。この操作は取り消せません。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="border-t-0 bg-transparent -mx-0 -mb-0 px-0 pb-0 pt-2 flex-row gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setPendingDeleteId(null)}>
              キャンセル
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => {
                if (pendingDeleteId) deleteCard(pendingDeleteId)
                setPendingDeleteId(null)
              }}
            >
              削除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Knowledge sidebar */}
      {knowledgeSidebar && (() => {
        const cfg = CLUSTER_CONFIG[knowledgeSidebar.cluster]
        const isLoading = knowledgeLoading[knowledgeSidebar.cluster]
        const KnowledgeClusterIcon = CLUSTER_ICON[knowledgeSidebar.cluster]
        return (
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: selected ? 380 : 0,
              width: 380,
              height: '100vh',
              background: '#fafafa',
              borderLeft: '1px solid rgb(229 231 235)',
              boxShadow: '-8px 0 32px rgba(0,0,0,0.1)',
              zIndex: 19,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              transition: 'right 0.25s ease',
            }}
          >
            {/* Bold colored header */}
            <div style={{
              background: CLUSTER_GRADIENT[knowledgeSidebar.cluster],
              padding: '20px 20px 18px',
              flexShrink: 0,
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Decorative circle */}
              <div style={{
                position: 'absolute', right: -24, top: -24,
                width: 96, height: 96, borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
              }} />
              <div style={{
                position: 'absolute', right: 20, bottom: -32,
                width: 64, height: 64, borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
              }} />
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, position: 'relative' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <KnowledgeClusterIcon size={16} color="white" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 3px' }}>
                    ナレッジ抽出
                  </p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.01em' }}>
                    {cfg.label}
                  </p>
                </div>
                <button
                  onClick={() => setKnowledgeSidebar(null)}
                  style={{
                    width: 28, height: 28, borderRadius: 8, border: 'none',
                    background: 'rgba(255,255,255,0.15)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}
                >
                  <X size={13} color="white" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px' }}>
              {isLoading ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 200, gap: 12 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    border: `2px solid ${cfg.accent}30`,
                    borderTopColor: cfg.accent,
                    animation: 'spin 0.8s linear infinite',
                  }} />
                  <p style={{ fontSize: 11, color: '#9ca3af', margin: 0 }}>気づきを抽出中…</p>
                </div>
              ) : knowledgeSidebar.sections.length === 0 ? (
                <p style={{ fontSize: 12, color: '#9ca3af', textAlign: 'center', marginTop: 40 }}>データがありません</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {knowledgeSidebar.sections.map((section, si) => (
                    <div key={si}>
                      {/* Section header with large number + save button */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                        <span style={{
                          fontSize: 28, fontWeight: 800, lineHeight: 1,
                          color: `${cfg.accent}25`, letterSpacing: '-0.03em', flexShrink: 0,
                        }}>
                          {String(si + 1).padStart(2, '0')}
                        </span>
                        <p style={{ fontSize: 11.5, fontWeight: 700, color: '#1f2937', margin: 0, letterSpacing: '-0.01em', lineHeight: 1.3, flex: 1 }}>
                          {section.title}
                        </p>
                        <button
                          onClick={() => saveSingleSection(section)}
                          disabled={knowledgeSaving}
                          title="このテーマを保存"
                          style={{
                            flexShrink: 0, padding: '3px 8px', borderRadius: 6,
                            border: `1px solid ${cfg.accent}44`,
                            background: '#fff', color: cfg.accent,
                            fontSize: 10, fontWeight: 700, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: 3,
                            opacity: knowledgeSaving ? 0.5 : 1,
                          }}
                        >
                          <BookmarkPlus size={9} />保存
                        </button>
                      </div>
                      {/* Insight cards */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {section.insights.map((insight, ii) => (
                          <div key={ii} style={{
                            background: '#fff',
                            borderRadius: 14,
                            border: '1px solid rgba(0,0,0,0.05)',
                            padding: '10px 14px',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                          }}>
                            <p style={{ fontSize: 12, lineHeight: 1.7, color: '#374151', margin: 0 }}>
                              {insight}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{ padding: '12px 16px', borderTop: '1px solid #e5e7eb', flexShrink: 0, background: '#fafafa', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* Save button */}
              <button
                onClick={saveKnowledgeSnapshot}
                disabled={!!isLoading || knowledgeSaving || knowledgeSidebar.sections.length === 0}
                style={{
                  width: '100%', padding: '9px 0',
                  borderRadius: 10,
                  border: 'none',
                  background: isLoading || knowledgeSaving || knowledgeSidebar.sections.length === 0
                    ? '#e5e7eb'
                    : CLUSTER_GRADIENT[knowledgeSidebar.cluster],
                  color: isLoading || knowledgeSaving || knowledgeSidebar.sections.length === 0 ? '#9ca3af' : '#fff',
                  fontSize: 11.5, fontWeight: 700,
                  cursor: (isLoading || knowledgeSaving || knowledgeSidebar.sections.length === 0) ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  letterSpacing: '0.01em',
                  boxShadow: isLoading || knowledgeSaving || knowledgeSidebar.sections.length === 0 ? 'none' : '0 4px 16px rgba(0,0,0,0.15)',
                }}
              >
                <BookmarkPlus size={12} />
                {knowledgeSaving ? '保存中…' : 'すべてを統合して保存'}
              </button>
              {/* Regenerate button */}
              <button
                onClick={() => openKnowledgeSidebar(knowledgeSidebar.cluster)}
                disabled={!!isLoading}
                style={{
                  width: '100%', padding: '7px 0',
                  borderRadius: 8,
                  border: `1px solid ${cfg.accent}44`,
                  background: '#fff',
                  color: cfg.accent,
                  fontSize: 11, fontWeight: 600,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  opacity: isLoading ? 0.5 : 1,
                  letterSpacing: '0.01em',
                }}
              >
                <RotateCcw size={11} />
                再生成
              </button>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
