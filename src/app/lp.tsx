import { useCallback, useEffect, useRef, useState } from 'react'
import { Monitor, Palette, Database, Sparkles, FileText, Plus, Bot, User, Send, Calendar, Layers, ArrowUpRight, Lightbulb, BookOpen, ArrowLeft } from 'lucide-react'

const APP_URL = '/login'

function VaultLogo({ color = 'black', height = 10 }: { color?: string; height?: number }) {
  const w = Math.round(height * 3.7)
  return (
    <svg width={w} height={height} viewBox="0 0 37 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.07661e-06 1.692C1.07661e-06 1.596 0.104001 1.484 0.312001 1.356C0.520001 1.22 0.812001 1.1 1.188 0.996C1.572 0.892 1.988 0.84 2.436 0.84C2.884 0.84 3.212 0.904 3.42 1.032C3.628 1.16 3.74 1.3 3.756 1.452L4.176 5.82H4.344L4.716 1.56C4.74 1.336 5.012 1.16 5.532 1.032C6.052 0.904 6.536 0.84 6.984 0.84C7.432 0.84 7.764 0.88 7.98 0.96C8.196 1.032 8.332 1.108 8.388 1.188C8.452 1.268 8.484 1.344 8.484 1.416C8.484 1.48 8.424 1.668 8.304 1.98C8.192 2.284 8.072 2.612 7.944 2.964C7.52 4.084 6.804 6.092 5.796 8.988C5.708 9.236 5.02 9.36 3.732 9.36C3.332 9.36 3.068 9.332 2.94 9.276C2.812 9.22 2.724 9.124 2.676 8.988C2.204 7.628 1.64 6.084 0.984001 4.356C0.328001 2.628 1.07661e-06 1.74 1.07661e-06 1.692ZM10.7011 9.468C9.97309 9.468 9.40109 9.296 8.98509 8.952C8.81709 8.808 8.66909 8.596 8.54109 8.316C8.42109 8.036 8.36109 7.708 8.36109 7.332C8.36109 6.956 8.44909 6.628 8.62509 6.348C8.80909 6.068 9.02909 5.852 9.28509 5.7C9.54109 5.548 9.84109 5.424 10.1851 5.328C10.7051 5.192 11.2771 5.124 11.9011 5.124H12.2971C12.2971 4.796 12.1851 4.564 11.9611 4.428C11.8651 4.372 11.7171 4.344 11.5171 4.344C11.3251 4.344 11.0891 4.396 10.8091 4.5C10.5371 4.604 10.3091 4.712 10.1251 4.824C9.94109 4.928 9.81709 4.98 9.75309 4.98C9.60909 4.98 9.41309 4.792 9.16509 4.416C8.91709 4.032 8.79309 3.684 8.79309 3.372C8.79309 3.268 8.94109 3.132 9.23709 2.964C9.53309 2.796 9.94909 2.644 10.4851 2.508C11.0291 2.364 11.5571 2.292 12.0691 2.292C12.5811 2.292 13.0211 2.336 13.3891 2.424C13.7651 2.504 14.0691 2.604 14.3011 2.724C14.5411 2.844 14.7411 3.004 14.9011 3.204C15.0691 3.404 15.1931 3.584 15.2731 3.744C15.3611 3.904 15.4251 4.112 15.4651 4.368C15.5211 4.664 15.5491 5.028 15.5491 5.46V9.072C15.5491 9.16 15.3331 9.232 14.9011 9.288C14.4771 9.336 14.0531 9.36 13.6291 9.36C13.2131 9.36 12.9411 9.348 12.8131 9.324C12.6931 9.3 12.6211 9.272 12.5971 9.24C12.5731 9.208 12.5531 9.152 12.5371 9.072L12.4411 8.388H12.3451C12.1451 9.108 11.5971 9.468 10.7011 9.468ZM12.3091 7.476V6.072C12.1011 6.072 11.9331 6.16 11.8051 6.336C11.6771 6.512 11.6131 6.712 11.6131 6.936C11.6131 7.464 11.7331 7.728 11.9731 7.728C12.0771 7.728 12.1571 7.704 12.2131 7.656C12.2771 7.6 12.3091 7.54 12.3091 7.476ZM18.8018 9.468C17.9058 9.468 17.2778 9.236 16.9178 8.772C16.5658 8.308 16.3898 7.5 16.3898 6.348V3.084C16.3898 2.924 16.6258 2.772 17.0978 2.628C17.5698 2.476 18.0658 2.4 18.5858 2.4C19.2818 2.4 19.6298 2.58 19.6298 2.94V5.988C19.6298 6.596 19.6538 7.04 19.7018 7.32C19.7498 7.592 19.8698 7.728 20.0618 7.728C20.3178 7.728 20.4458 7.62 20.4458 7.404V3.084C20.4458 2.916 20.6938 2.76 21.1898 2.616C21.6858 2.472 22.2258 2.4 22.8098 2.4C23.3938 2.4 23.6858 2.556 23.6858 2.868V9.048C23.6858 9.16 23.4338 9.24 22.9298 9.288C22.4258 9.336 21.9298 9.36 21.4418 9.36C20.9538 9.36 20.7058 9.296 20.6978 9.168L20.5778 8.388H20.4818C20.4098 8.676 20.2658 8.912 20.0498 9.096C19.9378 9.192 19.7698 9.28 19.5458 9.36C19.3298 9.432 19.0818 9.468 18.8018 9.468ZM27.7627 0.552V9.072C27.7627 9.16 27.5347 9.232 27.0787 9.288C26.6227 9.336 26.1507 9.36 25.6627 9.36C25.1827 9.36 24.8707 9.34 24.7267 9.3C24.5907 9.252 24.5227 9.176 24.5227 9.072V0.768C24.5227 0.592 24.7467 0.42 25.1947 0.252C25.6507 0.0840001 26.1387 2.38419e-07 26.6587 2.38419e-07C27.3947 2.38419e-07 27.7627 0.184 27.7627 0.552ZM33.3168 9.252C33.1728 9.388 32.8448 9.456 32.3328 9.456C31.8208 9.456 31.3968 9.424 31.0608 9.36C30.7248 9.288 30.4048 9.152 30.1008 8.952C29.5168 8.56 29.2248 7.744 29.2248 6.504V4.632H28.6248C28.5368 4.632 28.4608 4.54 28.3968 4.356C28.3328 4.172 28.3008 3.92 28.3008 3.6C28.3008 3.28 28.3488 3 28.4448 2.76C28.5488 2.512 28.6808 2.388 28.8408 2.388H29.2248V0.936C29.2248 0.688 29.4648 0.488 29.9448 0.336C30.4328 0.184 30.9088 0.108 31.3728 0.108C32.1008 0.108 32.4648 0.288 32.4648 0.648V2.388H33.3528C33.5608 2.388 33.6648 2.688 33.6648 3.288C33.6648 3.68 33.6168 4.004 33.5208 4.26C33.4328 4.508 33.3168 4.632 33.1728 4.632H32.4648V6.828C32.4648 7.044 32.5568 7.2 32.7408 7.296C32.9248 7.384 33.0848 7.428 33.2208 7.428C33.3648 7.428 33.4528 7.496 33.4848 7.632C33.5168 7.768 33.5328 7.972 33.5328 8.244C33.5328 8.78 33.4608 9.116 33.3168 9.252ZM37.0058 8.232C37.0058 8.704 36.8978 9.028 36.6818 9.204C36.4658 9.38 36.1458 9.468 35.7218 9.468C35.3058 9.468 34.9898 9.38 34.7738 9.204C34.5578 9.028 34.4498 8.704 34.4498 8.232C34.4498 7.76 34.5578 7.448 34.7738 7.296C34.9978 7.136 35.3178 7.056 35.7338 7.056C36.1498 7.056 36.4658 7.136 36.6818 7.296C36.8978 7.448 37.0058 7.76 37.0058 8.232Z" fill={color}/>
    </svg>
  )
}

// ── Cluster config (mirrored from product) ────────────────────────────────────
const CLUSTERS = {
  design:   { label: 'デザイン / UX',  accent: '#8b5cf6', Icon: Palette },
  frontend: { label: 'フロントエンド', accent: '#3b82f6', Icon: Monitor },
  ai:       { label: 'AI',             accent: '#f59e0b', Icon: Sparkles },
  backend:  { label: 'バックエンド',   accent: '#10b981', Icon: Database },
}
type Cluster = keyof typeof CLUSTERS

const CLUSTER_GRADIENT: Record<Cluster, string> = {
  frontend: 'linear-gradient(135deg, #93c5fd 0%, #3b82f6 45%, #6366f1 100%)',
  design:   'linear-gradient(135deg, #d8b4fe 0%, #8b5cf6 45%, #ec4899 100%)',
  backend:  'linear-gradient(135deg, #6ee7b7 0%, #10b981 45%, #0891b2 100%)',
  ai:       'linear-gradient(135deg, #fde68a 0%, #f59e0b 45%, #f97316 100%)',
}

// ── Faithful reproduction of the actual Vault card ───────────────────────────
function VaultCard({
  cluster, title, summary, assignees = [], date = '', hasPage = false,
  style,
}: {
  cluster: Cluster; title: string; summary: string
  assignees?: { name: string; color: string }[]
  date?: string; hasPage?: boolean
  style?: React.CSSProperties
}) {
  const cfg = CLUSTERS[cluster]
  return (
    <div style={{
      width: 224,
      borderRadius: 14,
      backgroundColor: 'white',
      border: '1px solid rgba(0,0,0,0.07)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06), 0 16px 40px -6px rgba(0,0,0,0.12)',
      overflow: 'hidden',
      pointerEvents: 'none',
      ...style,
    }}>
      <div style={{ padding: '13px 14px 11px', display: 'flex', flexDirection: 'column', gap: 7 }}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            fontSize: 9.5, fontWeight: 600, letterSpacing: '0.02em',
            color: cfg.accent, backgroundColor: `${cfg.accent}12`,
            border: `1px solid ${cfg.accent}28`, borderRadius: 6,
            padding: '2px 7px', lineHeight: 1.4,
          }}>{cfg.label}</span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
            {hasPage && <FileText size={9} color="#ccc" />}
            <div style={{
              width: 20, height: 20, borderRadius: 6,
              border: '1px solid rgba(0,0,0,0.1)',
              backgroundColor: 'rgba(0,0,0,0.04)', color: '#999',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><Plus size={11} /></div>
          </div>
        </div>
        {/* Title */}
        <p style={{
          fontSize: 12.5, fontWeight: 600, color: '#111',
          lineHeight: 1.45, margin: 0,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{title}</p>
        {/* Summary */}
        <p style={{
          fontSize: 10, color: summary ? '#999' : '#ccc',
          lineHeight: 1.65, margin: 0,
          display: '-webkit-box', WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{summary || 'サマリーなし'}</p>
        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingTop: 2 }}>
          {assignees.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {assignees.map((a, i) => (
                <div key={a.name} style={{
                  width: 18, height: 18, borderRadius: '50%',
                  backgroundColor: a.color, border: '1.5px solid white',
                  marginLeft: i > 0 ? -5 : 0, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: 7.5, fontWeight: 700, color: 'white',
                  zIndex: assignees.length - i, position: 'relative',
                }}>{a.name.charAt(0)}</div>
              ))}
            </div>
          )}
          {date && <span style={{ fontSize: 9, color: '#bbb' }}>{date}</span>}
        </div>
      </div>
    </div>
  )
}

// ── Fade-in on scroll ─────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={className}
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  )
}


// ── Google icon ───────────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
    </svg>
  )
}

// ── Slack Scene Section ───────────────────────────────────────────────────────
type SlackMessage = {
  user: string; avatar: string; color: string; time: string; text: string
  reactions?: { emoji: string; count: number }[]
}
type SlackScenario = {
  id: string; label: string; channel: string; topic: string; annotation: string
  messages: SlackMessage[]
}

function SlackSceneSection() {
  const [tab, setTab] = useState(0)

  const scenarios: SlackScenario[] = [
    {
      id: 'scattered', label: '情報源の拡散', channel: 'product-dev', topic: 'プロダクト開発',
      annotation: '情報はある。ただ、どのツールのどこにあるかを、誰も把握していない。',
      messages: [
        { user: 'Yui S.',  avatar: 'Y', color: '#ec4899', time: '10:08', text: '認証フローの最新仕様ってどこにありますか？' },
        { user: 'Kenji M.', avatar: 'K', color: '#8b5cf6', time: '10:12', text: 'Notionにあったはずです' },
        { user: 'Aiko T.', avatar: 'A', color: '#3b82f6', time: '10:14', text: 'あ、でも最新はFigmaで更新されてます' },
        { user: 'Yui S.',  avatar: 'Y', color: '#ec4899', time: '10:15', text: 'Figmaのどのページでしょう…？' },
        { user: 'Masa K.', avatar: 'M', color: '#10b981', time: '10:19', text: '#design-specs に流れてたやつかもしれないです。ちょっと探してみます', reactions: [{ emoji: '🔍', count: 2 }] },
        { user: 'Yui S.',  avatar: 'Y', color: '#ec4899', time: '10:41', text: '結局どれが最新版ですか…？', reactions: [{ emoji: '😅', count: 3 }] },
      ],
    },
    {
      id: 'undocumented', label: 'ナレッジ化されていない', channel: 'research', topic: 'リサーチ・インサイト',
      annotation: '気づきは生まれた。でも誰かの頭の中に留まったまま、組織には渡らなかった。',
      messages: [
        { user: 'Riku O.', avatar: 'R', color: '#06b6d4', time: '14:22', text: '先月のユーザーインタビューで出てきた課題感、どこかにまとまってますか？' },
        { user: 'Hiro N.', avatar: 'H', color: '#f59e0b', time: '14:35', text: 'Meet の録画がDriveにあります' },
        { user: 'Riku O.', avatar: 'R', color: '#06b6d4', time: '14:36', text: '録画だと2時間あって…テキストのサマリーはないですか？' },
        { user: 'Hiro N.', avatar: 'H', color: '#f59e0b', time: '14:40', text: 'ないですね。あの場にいたメンバーの頭の中には入ってるんですが', reactions: [{ emoji: '😶', count: 4 }] },
        { user: 'Riku O.', avatar: 'R', color: '#06b6d4', time: '14:42', text: 'わかりました、録画見てみます 🙏' },
      ],
    },
    {
      id: 'disconnected', label: '情報の関連性が築けていない', channel: 'engineering', topic: 'エンジニアリング',
      annotation: '情報は存在していた。繋がっていれば、2週間は節約できた。',
      messages: [
        { user: 'Masa K.', avatar: 'M', color: '#10b981', time: '11:03', text: 'パフォーマンス改善の方針、一から調査してまとめました。レビューお願いします 🙏' },
        { user: 'Kenji M.', avatar: 'K', color: '#8b5cf6', time: '11:18', text: 'あ、これ…先月フロントチームが同じ課題で調査してた内容とかなり被ってますね' },
        { user: 'Masa K.', avatar: 'M', color: '#10b981', time: '11:19', text: 'え、そうなんですか？全然知らなかったです', reactions: [{ emoji: '😞', count: 3 }] },
        { user: 'Aiko T.', avatar: 'A', color: '#3b82f6', time: '11:21', text: '別チームが別のチャンネルで進めてたので、繋がってなかったんですよね' },
        { user: 'Masa K.', avatar: 'M', color: '#10b981', time: '11:22', text: '事前に知ってれば2週間は節約できたな…', reactions: [{ emoji: '😩', count: 5 }] },
      ],
    },
    {
      id: 'knowledge-loss', label: '意思決定の文脈が消える', channel: 'dev-backend', topic: 'バックエンド開発',
      annotation: '意思決定の文脈は、担当者の記憶の中にしか存在しなかった。',
      messages: [
        { user: 'Kenji M.', avatar: 'K', color: '#8b5cf6', time: '14:05', text: 'このAPIの認証方式をBearerにした理由、どこかに残ってますか？セキュリティレビューで聞かれてます' },
        { user: 'Aiko T.', avatar: 'A', color: '#3b82f6', time: '14:12', text: 'たしか山田さんが設計したはず。山田さんに聞けばわかると思います' },
        { user: 'Kenji M.', avatar: 'K', color: '#8b5cf6', time: '14:13', text: '山田さん、今は別プロジェクトで捕まらなくて…', reactions: [{ emoji: '😢', count: 3 }] },
        { user: 'Hiro N.', avatar: 'H', color: '#f59e0b', time: '14:17', text: 'PRのコメントに何か残ってないかな' },
        { user: 'Kenji M.', avatar: 'K', color: '#8b5cf6', time: '14:28', text: '実装の話しかなくて。なぜそうしたかは結局見つからず…', reactions: [{ emoji: '😞', count: 2 }] },
      ],
    },
    {
      id: 'onboarding', label: 'オンボーディングの停滞', channel: 'onboarding-2025', topic: '',
      annotation: 'マニュアルはある。なぜそうなったかの文脈は、どこにもない。',
      messages: [
        { user: 'Riku O.', avatar: 'R', color: '#06b6d4', time: '09:00', text: 'はじめまして！今日から入社したRikuです。よろしくお願いします 🙌', reactions: [{ emoji: '🎉', count: 6 }, { emoji: '👋', count: 4 }] },
        { user: 'Riku O.', avatar: 'R', color: '#06b6d4', time: '11:20', text: 'DBのスキーマ設計の背景について、参照できる資料はありますか？' },
        { user: 'Masa K.', avatar: 'M', color: '#10b981', time: '11:35', text: 'Notionにドキュメントがあります！ただ1年以上更新されてないかも' },
        { user: 'Riku O.', avatar: 'R', color: '#06b6d4', time: '11:48', text: '読みましたが現状と違う部分があって…どこが最新かわからなくて 😢' },
        { user: 'Aiko T.', avatar: 'A', color: '#3b82f6', time: '12:10', text: 'ごめんなさい、口頭で説明するのが早いかも。来週時間取れますか？', reactions: [{ emoji: '🙏', count: 2 }] },
      ],
    },
  ]

  const s = scenarios[tab]
  const allChannels = ['product-dev', 'research', 'engineering', 'dev-backend', 'onboarding-2025']

  return (
    <section id="recognition" className="relative overflow-hidden" style={{ backgroundColor: '#D8D2C8' }}>
      <div className="absolute left-5 top-1/2 -translate-y-1/2 -rotate-90 origin-center z-10 hidden sm:block">
        <span className="text-[9px] font-black tracking-[0.3em] text-[#A09890] uppercase">Act 01</span>
      </div>

      <div className="px-5 sm:px-10 md:px-20 py-12 sm:py-20 flex flex-col items-center">
        <Reveal className="w-full max-w-5xl">
          <p className="text-[11px] font-black tracking-[0.2em] text-[#A09890] uppercase mb-6 text-center">Recognition</p>
          <h2 className="font-black leading-[1.1] tracking-[-0.04em] mb-10 text-center"
            style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(24px, 3vw, 40px)', color: '#2A2420' }}>
            見覚えのある光景、ありませんか。
          </h2>
        </Reveal>

        {/* Scenario tabs */}
        <Reveal delay={80} className="w-full max-w-5xl">
          <div className="flex gap-2 flex-wrap mb-8 justify-center">
            {scenarios.map((sc, i) => (
              <button
                key={sc.id}
                onClick={() => setTab(i)}
                className="text-[10px] font-black tracking-[0.15em] px-4 py-2 rounded-full transition-all"
                style={{
                  backgroundColor: tab === i ? 'rgba(0,0,0,0.08)' : 'transparent',
                  border: `1px solid ${tab === i ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.12)'}`,
                  color: tab === i ? '#2A2420' : '#8A847C',
                  cursor: 'pointer',
                }}
              >
                {sc.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Slack mock */}
        <Reveal delay={120} className="w-full">
          <div className="w-full max-w-[1100px] mx-auto" style={{
            borderRadius: 10, overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.12)',
            backgroundColor: '#1a1d21',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}>
            {/* Window chrome */}
            <div style={{
              height: 36, backgroundColor: '#19171d',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', gap: 6, padding: '0 14px', flexShrink: 0,
            }}>
              {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: c }} />
              ))}
            </div>

            <div style={{ display: 'flex', minHeight: 360 }}>
              {/* Sidebar */}
              <div className="hidden sm:flex" style={{
                width: 200, backgroundColor: '#19171d',
                borderRight: '1px solid rgba(255,255,255,0.06)',
                flexDirection: 'column', flexShrink: 0,
              }}>
                <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>Acme Corp</div>
                  <div style={{ fontSize: 11, color: '#949ba4', marginTop: 3 }}>
                    <span style={{ color: '#26a269' }}>●</span> Kenji M.
                  </div>
                </div>
                <div style={{ padding: '10px 0', flex: 1, overflowY: 'auto' }}>
                  <div style={{ padding: '2px 14px 4px', fontSize: 11, fontWeight: 700, color: '#616061', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Channels</div>
                  {allChannels.map((ch) => (
                    <div key={ch} style={{
                      padding: '3px 10px', margin: '0 4px', fontSize: 13, borderRadius: 4,
                      color: ch === s.channel ? 'white' : '#949ba4',
                      backgroundColor: ch === s.channel ? 'rgba(255,255,255,0.1)' : 'transparent',
                      fontWeight: ch === s.channel ? 600 : 400,
                    }}>
                      # {ch}
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat area */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                {/* Header */}
                <div style={{
                  padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0,
                }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: 'white' }}># {s.channel}</span>
                  {s.topic && (
                    <span style={{ fontSize: 12, color: '#949ba4', borderLeft: '1px solid rgba(255,255,255,0.12)', paddingLeft: 8 }}>
                      {s.topic}
                    </span>
                  )}
                </div>

                {/* Messages */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
                  {s.messages.map((msg, i) => (
                    <div key={i} style={{ padding: '5px 16px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 6, backgroundColor: msg.color,
                        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 800, color: 'white',
                      }}>{msg.avatar}</div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 2 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{msg.user}</span>
                          <span style={{ fontSize: 11, color: '#949ba4' }}>{msg.time}</span>
                        </div>
                        <p style={{ fontSize: 13, color: '#d1d2d3', lineHeight: 1.55, margin: 0, wordBreak: 'break-word' }}>{msg.text}</p>
                        {msg.reactions && msg.reactions.length > 0 && (
                          <div style={{ display: 'flex', gap: 4, marginTop: 5, flexWrap: 'wrap' }}>
                            {msg.reactions.map((r, j) => (
                              <div key={j} style={{
                                display: 'inline-flex', alignItems: 'center', gap: 3,
                                backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 4, padding: '1px 6px', fontSize: 11, color: '#d1d2d3',
                              }}>
                                <span>{r.emoji}</span><span>{r.count}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div style={{
                  margin: '8px 12px 10px', border: '1px solid rgba(255,255,255,0.13)',
                  borderRadius: 6, padding: '8px 12px', fontSize: 13, color: '#616061', flexShrink: 0,
                }}>
                  #{s.channel} にメッセージを送信
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Annotation — large conclusion */}
        <Reveal delay={160} className="w-full">
          <div className="mt-6">
            <p className="font-black text-center leading-[1.25] tracking-[-0.02em] text-[#2A2420]"
              style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(16px, 1.8vw, 24px)' }}>
              {s.annotation}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── LP Canvas (draggable cards + bezier connections) ──────────────────────────
const LP_CARDS = [
  // Group A — Design (left)
  { id: '1', cluster: 'design'   as Cluster, title: 'デザインシステム移行計画',   summary: 'Figmaオートレイアウト全適用。トークン命名規則を統一する。',  assignees: [{ name: 'H', color: '#8b5cf6' }, { name: 'Y', color: '#ec4899' }], date: 'Mar 15', hasPage: true,  connections: ['2', '3'] },
  { id: '2', cluster: 'design'   as Cluster, title: 'ユーザーインタビュー 総括',  summary: '12インサイト抽出。情報過多が最大ペイン。',                   assignees: [{ name: 'Y', color: '#ec4899' }],                                   date: 'Mar 6',  hasPage: true,  connections: ['1'] },
  // Group B — Frontend / Backend (center)
  { id: '3', cluster: 'frontend' as Cluster, title: 'Next.js 15 App Router 移行', summary: '段階移行で初期ロード1.8s→0.6sに改善。',                    assignees: [{ name: 'T', color: '#3b82f6' }],                                   date: 'Mar 13', hasPage: false, connections: ['1', '4'] },
  { id: '4', cluster: 'backend'  as Cluster, title: 'Supabase RLS 設計',          summary: 'Row Level Securityで組織単位のデータ分離。',                assignees: [{ name: 'M', color: '#10b981' }],                                   date: 'Mar 8',  hasPage: false, connections: ['3'] },
  // Group C — AI (right)
  { id: '5', cluster: 'ai'       as Cluster, title: 'GPT-4o 実験メモ',            summary: '1200件データ検証。精度23%向上。',                          assignees: [{ name: 'K', color: '#f59e0b' }],                                   date: 'Mar 12', hasPage: false, connections: ['6'] },
  { id: '6', cluster: 'ai'       as Cluster, title: 'プロンプト設計ガイド',        summary: 'Few-shot最適化。出力品質が安定。',                          assignees: [{ name: 'K', color: '#f59e0b' }],                                   date: 'Mar 10', hasPage: false, connections: ['5'] },
]
const LP_CONNECTIONS: { idA: string; idB: string }[] = (() => {
  const seen = new Set<string>()
  const out: { idA: string; idB: string }[] = []
  LP_CARDS.forEach(c => c.connections.forEach(t => {
    const k = [c.id, t].sort().join('-')
    if (!seen.has(k)) { seen.add(k); out.push({ idA: c.id, idB: t }) }
  }))
  return out
})()
const CARD_SCALE = 0.75
const CARD_W_S = Math.round(224 * CARD_SCALE)  // 168
const CARD_H_S = Math.round(154 * CARD_SCALE)  // 115

function LPCanvas() {
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({
    '1': { x: 20,  y: 20  },  // design top-left
    '2': { x: 28,  y: 212 },  // design bottom-left
    '3': { x: 224, y: 14  },  // frontend top-center
    '4': { x: 216, y: 212 },  // backend bottom-center
    '5': { x: 426, y: 20  },  // ai top-right
    '6': { x: 418, y: 212 },  // ai bottom-right
  })
  const [dragging, setDragging] = useState<{ id: string; ox: number; oy: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const onMouseDown = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    if (!containerRef.current) return
    const r = containerRef.current.getBoundingClientRect()
    setDragging({ id, ox: e.clientX - r.left - positions[id].x, oy: e.clientY - r.top - positions[id].y })
  }
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging || !containerRef.current) return
    const r = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(r.width  - CARD_W_S, e.clientX - r.left - dragging.ox))
    const y = Math.max(0, Math.min(r.height - CARD_H_S, e.clientY - r.top  - dragging.oy))
    setPositions(p => ({ ...p, [dragging.id]: { x, y } }))
  }, [dragging])
  const stopDrag = useCallback(() => setDragging(null), [])

  const center = (id: string) => ({
    x: positions[id].x + CARD_W_S / 2,
    y: positions[id].y + CARD_H_S / 2,
  })

  return (
    <div ref={containerRef}
      className="relative rounded-2xl overflow-hidden bg-white"
      style={{ height: 360, border: '1px solid rgba(0,0,0,0.07)', cursor: dragging ? 'grabbing' : 'default', userSelect: 'none' }}
      onMouseMove={onMouseMove} onMouseUp={stopDrag} onMouseLeave={stopDrag}>

      {/* Dot grid — matches product canvas */}
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        <defs>
          <pattern id="lp-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="0" cy="0" r="1" fill="#d4d4d8" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lp-dots)" />
      </svg>

      {/* SVG connections — inactive state, matches product canvas */}
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        {LP_CONNECTIONS.map(({ idA, idB }) => {
          const cA = LP_CARDS.find(c => c.id === idA)!
          const cB = LP_CARDS.find(c => c.id === idB)!
          const pA = center(idA); const pB = center(idB)
          const isCross = cA.cluster !== cB.cluster
          const mx = (pA.x + pB.x) / 2
          const arcY = Math.min(pA.y, pB.y) - Math.abs(pB.x - pA.x) * 0.15 - 20
          const midX = 0.25 * pA.x + 0.5 * mx + 0.25 * pB.x
          const midY = 0.25 * pA.y + 0.5 * arcY + 0.25 * pB.y
          return (
            <g key={`l-${idA}-${idB}`}>
              <path
                d={`M ${pA.x} ${pA.y} Q ${mx} ${arcY} ${pB.x} ${pB.y}`}
                fill="none"
                stroke={isCross ? '#c4bdd8' : '#d4d4d8'}
                strokeWidth={isCross ? 1.5 : 1.2}
                strokeDasharray={isCross ? '8 5' : '6 5'}
                opacity={isCross ? 0.6 : 0.45}
              />
              {isCross && (
                <polygon
                  points={`${midX},${midY - 5} ${midX + 5},${midY} ${midX},${midY + 5} ${midX - 5},${midY}`}
                  fill="white" stroke="#c4bdd8" strokeWidth={1.5} opacity={0.65}
                />
              )}
            </g>
          )
        })}
      </svg>

      {/* Draggable cards */}
      {LP_CARDS.map(card => {
        const pos = positions[card.id]
        return (
          <div key={card.id} style={{
            position: 'absolute', left: pos.x, top: pos.y,
            transform: `scale(${CARD_SCALE})`, transformOrigin: 'top left',
            zIndex: dragging?.id === card.id ? 10 : 1,
          }}>
            <div style={{ position: 'relative' }}>
              <VaultCard cluster={card.cluster} title={card.title} summary={card.summary}
                assignees={card.assignees} date={card.date} hasPage={card.hasPage} />
              <div style={{ position: 'absolute', inset: 0, zIndex: 2, cursor: dragging?.id === card.id ? 'grabbing' : 'grab' }}
                onMouseDown={e => onMouseDown(e, card.id)} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── Organize View (static kanban — all clusters visible at once) ──────────────
function OrganizeTab() {
  const clusterData = [
    {
      key: 'design' as const,
      cards: [
        { title: 'デザインシステム v3 移行計画', summary: 'Figmaオートレイアウトを全コンポーネントに適用。デザイントークンの命名規則を統一する。', assignees: [{ name: 'H', color: '#8b5cf6' }, { name: 'Y', color: '#ec4899' }], date: 'Mar 15', hasPage: true },
        { title: 'ユーザーインタビュー 総まとめ', summary: '6名のインタビューから抽出した12のインサイト。情報過多と検索性がトップペイン。', assignees: [{ name: 'Y', color: '#ec4899' }, { name: 'H', color: '#8b5cf6' }], date: 'Mar 6', hasPage: true },
      ],
    },
    {
      key: 'frontend' as const,
      cards: [
        { title: 'Next.js 15 App Router 移行', summary: 'Pages RouterからApp Routerへ段階移行。初期ロードが1.8s→0.6sに。Turbopackも導入検討。', assignees: [{ name: 'T', color: '#3b82f6' }, { name: 'S', color: '#10b981' }], date: 'Mar 13', hasPage: true },
        { title: 'Storybook v8 移行ノート', summary: 'CSF3形式へのリライトと、Interaction Testsの導入。ビジュアルリグレッション自動化も整備。', assignees: [{ name: 'T', color: '#3b82f6' }], date: 'Feb 28', hasPage: true },
      ],
    },
    {
      key: 'ai' as const,
      cards: [
        { title: 'GPT-4o Fine-tuning 実験メモ', summary: '独自データ1200件で検証。精度が標準比23%向上。コスト効率も改善された点を記録。', assignees: [{ name: 'K', color: '#f59e0b' }], date: 'Mar 12' },
        { title: 'AIチャット UI リサーチ', summary: 'Copilot・Perplexity・Claude UIを比較分析。プロンプト入力とコンテキスト表示のベストプラクティス。', assignees: [{ name: 'H', color: '#8b5cf6' }, { name: 'R', color: '#f59e0b' }], date: 'Mar 3' },
      ],
    },
    {
      key: 'backend' as const,
      cards: [
        { title: 'Supabase RLS 設計ガイド', summary: 'Row Level Securityで組織単位のデータ分離。サービスロールとanonキーの使い分けを整理。', assignees: [{ name: 'M', color: '#10b981' }, { name: 'K', color: '#ef4444' }], date: 'Mar 8' },
        { title: 'Edge Functions 設計メモ', summary: 'Deno Deployベースの関数設計。レイテンシ削減のためのリージョン選定と認証フローのまとめ。', assignees: [{ name: 'K', color: '#ef4444' }], date: 'Mar 5' },
      ],
    },
  ]

  return (
    <div style={{
      overflowX: 'auto', WebkitOverflowScrolling: 'touch',
      marginLeft: -8, paddingLeft: 8,
      paddingBottom: 8,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(200px, 1fr))', gap: 14 }}>
        {clusterData.map((c) => {
          const cfg = CLUSTERS[c.key]
          const Icon = cfg.Icon
          return (
            <div key={c.key} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* Category label */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '7px 10px', borderRadius: 10,
                background: `${cfg.accent}12`,
                border: `1px solid ${cfg.accent}28`,
              }}>
                <div style={{
                  width: 20, height: 20, borderRadius: 6, background: cfg.accent, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={11} color="white" />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: cfg.accent }}>{cfg.label}</span>
              </div>
              {/* Cards */}
              {c.cards.map((card, i) => (
                <VaultCard
                  key={i}
                  cluster={c.key}
                  title={card.title}
                  summary={card.summary}
                  assignees={card.assignees}
                  date={card.date}
                  hasPage={card.hasPage}
                  style={{ boxShadow: 'none' }}
                />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Solution Section (Act 04) ─────────────────────────────────────────────────
function SolutionSection() {
  const [active, setActive] = useState(0)

  const navItems = [
    { n: '01', label: 'Canvas & Graph', sub: '知識の居場所をつくる' },
    { n: '02', label: 'Organize',       sub: '混沌を秩序にする' },
    { n: '03', label: 'AI Chat',        sub: '実務で即活用する' },
    { n: '04', label: 'My Knowledge',   sub: '個人の知を組織へ' },
  ]

  const tabContents = [
    // 01 Canvas & Graph
    <div key={0} className="flex flex-col px-8 sm:px-14 pt-24 pb-28">
      <p className="text-[10px] font-black tracking-[0.15em] text-neutral-400 uppercase mb-6">01 / Canvas &amp; Graph</p>
      <h3 className="font-black text-neutral-950 leading-[1.1] tracking-[-0.04em] mb-5"
        style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(28px, 3.5vw, 48px)' }}>
        バラバラな知識を、構造に変える。
      </h3>
      <p className="text-neutral-500 text-[15px] leading-[1.85] mb-8 max-w-lg">
        カードをキャンバスに置き、関係性が線で可視化。散らばった知識が、思考の全体像として一枚の地図になります。
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 48 }}>
        {navItems.map((item, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            padding: '7px 18px', borderRadius: 999,
            border: active === i ? 'none' : '1px solid rgba(0,0,0,0.12)',
            background: active === i ? '#1A1510' : 'transparent',
            color: active === i ? '#fff' : '#6b7280',
            fontSize: 12, fontWeight: active === i ? 700 : 500,
            cursor: 'pointer', transition: 'all 0.2s ease',
          }}>{item.label}</button>
        ))}
      </div>
      <LPCanvas />
    </div>,

    // 02 Organize
    <div key={1} className="flex flex-col px-8 sm:px-14 pt-24 pb-28">
      <p className="text-[10px] font-black tracking-[0.15em] text-neutral-400 uppercase mb-6">02 / Organize</p>
      <h3 className="font-black text-neutral-950 leading-[1.1] tracking-[-0.04em] mb-5"
        style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(28px, 3.5vw, 48px)' }}>
        混沌を、秩序にする。
      </h3>
      <p className="text-neutral-500 text-[15px] leading-[1.85] mb-8 max-w-lg">
        クラスター別に分類し、バンドルで束ねる。どんなに増えても、誰でも探せる状態を保ちます。
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 48 }}>
        {navItems.map((item, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            padding: '7px 18px', borderRadius: 999,
            border: active === i ? 'none' : '1px solid rgba(0,0,0,0.12)',
            background: active === i ? '#1A1510' : 'transparent',
            color: active === i ? '#fff' : '#6b7280',
            fontSize: 12, fontWeight: active === i ? 700 : 500,
            cursor: 'pointer', transition: 'all 0.2s ease',
          }}>{item.label}</button>
        ))}
      </div>
      <OrganizeTab />
    </div>,

    // 03 AI Chat
    <div key={2} className="flex flex-col px-8 sm:px-14 pt-24 pb-28">
      <p className="text-[10px] font-black tracking-[0.15em] text-neutral-400 uppercase mb-6">03 / AI Chat</p>
      <h3 className="font-black text-neutral-950 leading-[1.1] tracking-[-0.04em] mb-5"
        style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(28px, 3.5vw, 48px)' }}>
        問えば、3秒で答える。
      </h3>
      <p className="text-neutral-500 text-[15px] leading-[1.85] mb-8 max-w-lg">
        「なぜこの設計にしたか」「あの議論の結論は何だったか」——蓄積・連携されたナレッジを、瞬間にAIが即座に引き出します。
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 48 }}>
        {navItems.map((item, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            padding: '7px 18px', borderRadius: 999,
            border: active === i ? 'none' : '1px solid rgba(0,0,0,0.12)',
            background: active === i ? '#1A1510' : 'transparent',
            color: active === i ? '#fff' : '#6b7280',
            fontSize: 12, fontWeight: active === i ? 700 : 500,
            cursor: 'pointer', transition: 'all 0.2s ease',
          }}>{item.label}</button>
        ))}
      </div>
      <div className="rounded-2xl overflow-hidden"
        style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', boxShadow: '0 8px 40px rgba(0,0,0,0.10)' }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '14px 16px', borderBottom: '1px solid #f3f4f6',
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: 10,
            background: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Bot size={15} color="white" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', margin: 0 }}>AIチャット</p>
            <p style={{ fontSize: 10.5, color: '#9ca3af', margin: 0 }}>保存したナレッジに質問する</p>
          </div>
        </div>
        {/* Messages */}
        <div style={{ padding: '14px 14px 8px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { role: 'user', content: 'デザインシステムはなぜ導入したの？' },
            { role: 'ai', content: '2023年Q3、コンポーネント乱立と認識ズレが課題に。Hさんが提案しYさんが設計を主導。導入後、開発速度が約40%向上しました。', refs: ['デザインシステム移行計画', '2023 Q3 振り返り'] },
            { role: 'user', content: '関連する意思決定記録は他にある？' },
            { role: 'ai', content: '3件の関連カードが見つかりました。「UIコンポーネント命名規則」「Figmaトークン設計」「フロントエンド技術選定 2023」が直接繋がっています。', refs: [] },
          ].map((msg, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
              <div style={{
                width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                background: msg.role === 'user' ? '#111827' : '#f3f4f6',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {msg.role === 'user' ? <User size={12} color="white" /> : <Bot size={12} color="#6b7280" />}
              </div>
              <div style={{ maxWidth: '78%', display: 'flex', flexDirection: 'column', gap: 6, alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  padding: '9px 12px',
                  borderRadius: msg.role === 'user' ? '14px 4px 14px 14px' : '4px 14px 14px 14px',
                  background: msg.role === 'user' ? '#111827' : '#f9fafb',
                  border: msg.role === 'ai' ? '1px solid #f0f0f0' : 'none',
                  fontSize: 12.5, lineHeight: 1.65,
                  color: msg.role === 'user' ? '#fff' : '#374151',
                }}>
                  {msg.content}
                </div>
                {'refs' in msg && msg.refs && msg.refs.length > 0 && (
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {msg.refs.map((ref, ri) => (
                      <div key={ri} style={{
                        display: 'flex', alignItems: 'center', gap: 5,
                        padding: '5px 9px', borderRadius: 8,
                        background: '#fff', border: '1px solid #e5e7eb',
                        fontSize: 11, color: '#374151',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                      }}>↗ {ref}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Input */}
        <div style={{ padding: '10px 12px', borderTop: '1px solid #f3f4f6' }}>
          <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
            <div style={{
              flex: 1, padding: '8px 12px', borderRadius: 10,
              border: '1px solid #e5e7eb', background: '#f9fafb',
              fontSize: 12.5, color: '#9ca3af',
            }}>質問を入力…</div>
            <div style={{
              width: 34, height: 34, borderRadius: 10, flexShrink: 0,
              background: '#e5e7eb',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Send size={13} color="#9ca3af" />
            </div>
          </div>
          <p style={{ fontSize: 10, color: '#d1d5db', margin: '5px 0 0', textAlign: 'center' }}>Enter で送信</p>
        </div>
      </div>
    </div>,

    // 04 My Knowledge
    <div key={3} className="flex flex-col px-8 sm:px-14 pt-24 pb-28">
      <p className="text-[10px] font-black tracking-[0.15em] text-neutral-400 uppercase mb-6">04 / My Knowledge</p>
      <h3 className="font-black text-neutral-950 leading-[1.1] tracking-[-0.04em] mb-5"
        style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(28px, 3.5vw, 48px)' }}>
        気づきを、資産に変える。
      </h3>
      <p className="text-neutral-500 text-[15px] leading-[1.85] mb-8 max-w-lg">
        カードから自動生成されるナレッジサマリー。「このナレッジをどう活かすか」まで、AIが具体的なシーンで示唆します。
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 48 }}>
        {navItems.map((item, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            padding: '7px 18px', borderRadius: 999,
            border: active === i ? 'none' : '1px solid rgba(0,0,0,0.12)',
            background: active === i ? '#1A1510' : 'transparent',
            color: active === i ? '#fff' : '#6b7280',
            fontSize: 12, fontWeight: active === i ? 700 : 500,
            cursor: 'pointer', transition: 'all 0.2s ease',
          }}>{item.label}</button>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-4" style={{ alignItems: 'flex-start' }}>
        {/* Left: 2×2 card grid */}
        <div className="w-full sm:w-40 flex-shrink-0 grid grid-cols-2 sm:grid-cols-1 gap-[10px]">
          {[
            { cluster: 'frontend' as const, summary: 'pages/からapp/への段階的移行。Turbopackの導入検証も含む。', count: 8,  date: 'Mar 12' },
            { cluster: 'backend'  as const, summary: 'マルチテナント対応のRow Level Security設計方針のまとめ。', count: 9,  date: 'Mar 8'  },
          ].map((card, i) => {
            const cfg = CLUSTERS[card.cluster]
            const Icon = cfg.Icon
            const gradient = CLUSTER_GRADIENT[card.cluster]
            return (
              <div key={i} style={{
                background: '#fff',
                borderRadius: 16,
                border: '1px solid rgba(0,0,0,0.06)',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                display: 'flex', flexDirection: 'column',
              }}>
                <div style={{
                  background: gradient, padding: '14px 14px 12px',
                  position: 'relative', overflow: 'hidden',
                  minHeight: 100, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                }}>
                  <div style={{ position: 'absolute', right: -20, top: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 7, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={12} color="white" />
                    </div>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ArrowUpRight size={12} color="white" />
                    </div>
                  </div>
                  <p style={{ fontSize: 11.5, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.5 }}>
                    {card.summary}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', gap: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 20, background: `${cfg.accent}15`, color: cfg.accent, flexShrink: 0, whiteSpace: 'nowrap' }}>
                    {cfg.label}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: '#9ca3af' }}>
                      <Calendar size={9} />{card.date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: '#9ca3af' }}>
                      <Layers size={9} />{card.count}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right: Detail panel (design cluster selected) */}
        <div style={{ flex: 1, background: '#fff', borderRadius: 20, border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          {/* Top bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderBottom: '1px solid #f3f4f6' }}>
            <ArrowLeft size={12} color="#9ca3af" />
            <span style={{ fontSize: 11, color: '#9ca3af' }}>マイナレッジに戻る</span>
            <div style={{ flex: 1 }} />
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#9ca3af' }}>
              <Calendar size={10} />Mar 15
            </span>
          </div>
          {/* Cover banner */}
          <div style={{ background: CLUSTER_GRADIENT.design, padding: '18px 20px 14px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: -24, top: -24, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Palette size={18} color="white" />
              </div>
              <div>
                <p style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 3px' }}>ナレッジスナップショット</p>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>デザイン / UX</h2>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 10, position: 'relative' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'rgba(255,255,255,0.65)' }}><Layers size={10} />カード 12枚</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)' }}>2セクション</span>
            </div>
          </div>
          {/* Body */}
          <div style={{ padding: '14px 16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* 活用できる場面 */}
            <div style={{ borderRadius: 14, border: '1px solid rgba(0,0,0,0.06)', padding: '12px 14px', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <Lightbulb size={12} color="#f59e0b" />
                <h3 style={{ fontSize: 10, fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>活用できる場面</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {['UIのデザインレビューを行う場面で', 'デザインシステムの方針を策定するとき', '新しい画面のワイヤーフレームを作成する際に'].map((scene, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', background: '#fffbeb', borderRadius: 9, padding: '7px 10px', border: '1px solid #fde68a' }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: '#f59e0b', flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                    <p style={{ fontSize: 11.5, lineHeight: 1.55, color: '#374151', margin: 0 }}>{scene}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* ナレッジ詳細 */}
            <div style={{ borderRadius: 14, border: '1px solid rgba(0,0,0,0.06)', padding: '12px 14px', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <BookOpen size={12} color="#8b5cf6" />
                <h3 style={{ fontSize: 10, fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>ナレッジ詳細</h3>
              </div>
              {[
                { title: 'コンポーネント設計', insights: ['Atomic Designを採用しAtoms/Molecules/Organismsで整理', 'デザイントークンを一元管理し一貫性を担保'] },
                { title: '運用・改善フロー',   insights: ['週次レビューでコンポーネントの乱立を防ぐ', 'Figma変数とコードのトークンを自動同期'] },
              ].map((section, si) => (
                <div key={si}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#8b5cf620', letterSpacing: '-0.04em', flexShrink: 0, lineHeight: 1 }}>{String(si + 1).padStart(2, '0')}</span>
                    <h4 style={{ fontSize: 12, fontWeight: 700, color: '#111827', margin: 0 }}>{section.title}</h4>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 26 }}>
                    {section.insights.map((insight, ii) => (
                      <div key={ii} style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                        <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#8b5cf6', flexShrink: 0, marginTop: 6 }} />
                        <p style={{ fontSize: 11.5, lineHeight: 1.6, color: '#374151', margin: 0 }}>{insight}</p>
                      </div>
                    ))}
                  </div>
                  {si === 0 && <div style={{ height: 1, background: '#f3f4f6', margin: '10px 0' }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
  ]

  return (
    <section id="solution" style={{ backgroundColor: '#F4F0EB' }}>
      <div className="lg:grid lg:grid-cols-[260px_1fr] lg:items-start">

        {/* ── Left nav ── */}
        <div className="hidden lg:flex flex-col justify-center px-8 sticky top-0 h-screen"
          style={{ borderRight: '1px solid rgba(0,0,0,0.08)' }}>
          <p className="text-[10px] font-black tracking-[0.2em] text-neutral-400 uppercase mb-10">Act 04 — Solution</p>
          <div className="relative">
            <div className="absolute left-0 top-3 bottom-3 w-px bg-neutral-200" />
            {navItems.map((item, i) => (
              <div key={i} className="relative pl-7 py-4 cursor-pointer"
                onClick={() => setActive(i)}
                style={{ transition: 'opacity 0.3s ease', opacity: active === i ? 1 : 0.28 }}>
                <div style={{
                  position: 'absolute', left: -5, top: '50%', transform: 'translateY(-50%)',
                  width: active === i ? 12 : 8, height: active === i ? 12 : 8,
                  borderRadius: '50%',
                  backgroundColor: active === i ? '#1A1510' : 'white',
                  border: `2px solid ${active === i ? '#1A1510' : '#D1D0CE'}`,
                  transition: 'all 0.3s ease',
                }} />
                <span className="block text-[9px] font-black tracking-[0.2em] text-neutral-400 uppercase mb-1">{item.n}</span>
                <span className="block text-[13px] font-black text-neutral-900 leading-tight">{item.label}</span>
                <span className="block text-[11px] text-neutral-400 mt-0.5">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tab content (desktop) ── */}
        <div className="hidden lg:block">
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            {tabContents[active]}
          </div>
        </div>

      </div>

      {/* ── Mobile tab bar (Plan A) ── */}
      <div className="lg:hidden">
        {/* Sticky horizontal pill tabs */}
        <div style={{
          position: 'sticky', top: 72, zIndex: 20,
          backgroundColor: '#F4F0EB',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          padding: '10px 16px',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          display: 'flex', gap: 8,
        }}>
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                flexShrink: 0,
                padding: '7px 16px',
                borderRadius: 999,
                border: active === i ? 'none' : '1px solid rgba(0,0,0,0.1)',
                background: active === i ? '#1A1510' : 'transparent',
                color: active === i ? '#fff' : '#6b7280',
                fontSize: 12, fontWeight: active === i ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Active tab content */}
        <div>
          {tabContents[active]}
        </div>
      </div>

    </section>
  )
}

// ── Main LP ───────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'よくある課題',  href: '#recognition' },
  { label: 'ソリューション', href: '#solution' },
  { label: '使い方',        href: '#howto' },
]

export default function LPPage() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1))
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { rootMargin: '-40% 0px -50% 0px' }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.slice(1))
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9] font-sans antialiased overflow-x-hidden" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      <div style={{
        position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)',
        zIndex: 50, width: 'min(760px, calc(100vw - 24px))',
      }}>
        <nav style={{
          background: '#ffffff',
          borderRadius: 999,
          height: 52,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 6px 0 14px',
        }}>
          <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false) }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', minWidth: 0 }}>
            <VaultLogo color="#111" height={15} />
          </button>
          {/* Desktop nav links */}
          <div className="hidden sm:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                style={{
                  fontSize: 12, fontWeight: activeSection === href.slice(1) ? 700 : 500,
                  color: activeSection === href.slice(1) ? '#111827' : '#6b7280',
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '6px 14px', borderRadius: 999,
                  transition: 'color 0.2s',
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {/* Hamburger (mobile only) */}
            <button
              className="sm:hidden flex flex-col items-center justify-center"
              onClick={() => setMenuOpen(v => !v)}
              style={{
                width: 36, height: 36, borderRadius: 999, border: 'none',
                background: menuOpen ? '#111827' : '#f3f4f6',
                cursor: 'pointer', gap: 4.5,
                transition: 'background 0.2s', flexShrink: 0,
              }}
            >
              <span style={{
                display: 'block', width: 14, height: 1.5, borderRadius: 2,
                background: menuOpen ? '#fff' : '#374151',
                transform: menuOpen ? 'translateY(3px) rotate(45deg)' : 'none',
                transition: 'transform 0.2s, background 0.2s',
              }} />
              <span style={{
                display: 'block', width: 14, height: 1.5, borderRadius: 2,
                background: menuOpen ? '#fff' : '#374151',
                opacity: menuOpen ? 0 : 1,
                transition: 'opacity 0.2s, background 0.2s',
              }} />
              <span style={{
                display: 'block', width: 14, height: 1.5, borderRadius: 2,
                background: menuOpen ? '#fff' : '#374151',
                transform: menuOpen ? 'translateY(-3px) rotate(-45deg)' : 'none',
                transition: 'transform 0.2s, background 0.2s',
              }} />
            </button>
            <a href={APP_URL}
              className="flex items-center gap-2 text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors"
              style={{ background: '#111827' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#374151')}
              onMouseLeave={e => (e.currentTarget.style.background = '#111827')}
            >
              <GoogleIcon />
              <span className="hidden sm:inline">無料で試す</span>
              <span className="sm:hidden">試す</span>
            </a>
          </div>
        </nav>

        {/* Mobile dropdown */}
        <div style={{
          marginTop: 8,
          background: '#ffffff',
          borderRadius: 20,
          overflow: 'hidden',
          maxHeight: menuOpen ? 200 : 0,
          opacity: menuOpen ? 1 : 0,
          transition: 'max-height 0.25s ease, opacity 0.2s ease',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
          className="sm:hidden"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '14px 20px', fontSize: 14,
                fontWeight: activeSection === href.slice(1) ? 700 : 500,
                color: activeSection === href.slice(1) ? '#111827' : '#6b7280',
                background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: '1px solid #f3f4f6',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: '100svh', maxHeight: '900px', backgroundColor: '#EEEAE4' }}>

        {/* CSS Keyframes */}
        <style>{`
          @keyframes cardEnter {
            from { opacity: 0; transform: translateY(36px) scale(0.84); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes hf0 { 0%,100%{transform:rotate(-9deg) translateY(0px)} 50%{transform:rotate(-9deg) translateY(-13px)} }
          @keyframes hf1 { 0%,100%{transform:rotate(4deg) translateY(0px)} 50%{transform:rotate(4deg) translateY(-10px)} }
          @keyframes hf2 { 0%,100%{transform:rotate(11deg) translateY(0px)} 50%{transform:rotate(11deg) translateY(-15px)} }
          @keyframes hf3 { 0%,100%{transform:rotate(6deg) translateY(0px)} 50%{transform:rotate(6deg) translateY(-9px)} }
          @keyframes hf4 { 0%,100%{transform:rotate(-8deg) translateY(0px)} 50%{transform:rotate(-8deg) translateY(-12px)} }
          @keyframes hf5 { 0%,100%{transform:rotate(-5deg) translateY(0px)} 50%{transform:rotate(-5deg) translateY(-8px)} }
          @keyframes hf6 { 0%,100%{transform:rotate(7deg) translateY(0px)} 50%{transform:rotate(7deg) translateY(-11px)} }
          @keyframes ambientGlow {
            0%,100% { opacity: 0.18; transform: scale(1); }
            50%     { opacity: 0.35; transform: scale(1.07); }
          }
          @keyframes lineDraw {
            from { stroke-dashoffset: 1200; opacity: 0; }
            to   { stroke-dashoffset: 0;    opacity: 1; }
          }
          @keyframes lineGlow {
            0%,100% { opacity: 0.2; }
            50%     { opacity: 0.45; }
          }
          @keyframes nodePulse {
            0%,100% { opacity: 0.3; }
            50%     { opacity: 0.8; }
          }
          @keyframes headlineWord {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes dotGridDrift {
            0%   { background-position: 0px 0px; }
            100% { background-position: 28px 28px; }
          }
          @keyframes peepFloat {
            0%,100% { transform: translateY(0px); }
            50%     { transform: translateY(-8px); }
          }
          @keyframes peepFloatFlip {
            0%,100% { transform: scaleX(-1) translateY(0px); }
            50%     { transform: scaleX(-1) translateY(-8px); }
          }
          @media (max-width: 639px) {
            .hc-mid, .hc-bottom { display: none; }
            .hc-top {
              transform: scale(0.72);
              transform-origin: top center;
            }
            .peep-side { display: none; }
          }
          @media (max-width: 1023px) {
            .step2-inner {
              transform: translateX(-50%) scale(0.78) !important;
              transform-origin: top center;
            }
          }
          @media (min-width: 640px) and (max-width: 1023px) {
            .peep-side { display: none; }
          }
        `}</style>

        {/* Canvas dot grid */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, #b8b3ab 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            opacity: 0.55,
            animation: 'dotGridDrift 12s linear infinite',
          }} />

        {/* Ambient center glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 2 }}>
          <div style={{
            width: '65vw', height: '65vw', maxWidth: 720, maxHeight: 720,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, rgba(59,130,246,0.05) 45%, transparent 70%)',
            animation: 'ambientGlow 6s ease-in-out infinite',
          }} />
        </div>

        {/* SVG connection lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none hidden sm:block"
          style={{ zIndex: 3 }}
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="lg0" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="lg2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="lg3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {/* design → frontend */}
          <line x1="141" y1="166" x2="601" y2="128"
            stroke="url(#lg0)" strokeWidth="1" strokeLinecap="round"
            strokeDasharray="600"
            style={{ animation: 'lineDraw 1.2s cubic-bezier(0.4,0,0.2,1) 0.7s both, lineGlow 4.5s ease-in-out 2s infinite' }} />
          {/* frontend → ai */}
          <line x1="601" y1="128" x2="1298" y2="150"
            stroke="url(#lg1)" strokeWidth="1" strokeLinecap="round"
            strokeDasharray="800"
            style={{ animation: 'lineDraw 1.4s cubic-bezier(0.4,0,0.2,1) 0.9s both, lineGlow 5s ease-in-out 2.3s infinite' }} />
          {/* design → backend */}
          <line x1="141" y1="166" x2="100" y2="466"
            stroke="url(#lg2)" strokeWidth="1" strokeLinecap="round"
            strokeDasharray="400"
            style={{ animation: 'lineDraw 1.0s cubic-bezier(0.4,0,0.2,1) 1.1s both, lineGlow 4s ease-in-out 2.6s infinite' }} />
          {/* ai → interview (mid-right) */}
          <line x1="1298" y1="150" x2="1315" y2="430"
            stroke="url(#lg3)" strokeWidth="1" strokeLinecap="round"
            strokeDasharray="400"
            style={{ animation: 'lineDraw 1.0s cubic-bezier(0.4,0,0.2,1) 1.2s both, lineGlow 4.2s ease-in-out 2.8s infinite' }} />
          {/* backend → ai-bottom */}
          <line x1="100" y1="466" x2="178" y2="638"
            stroke="url(#lg2)" strokeWidth="1" strokeLinecap="round"
            strokeDasharray="300"
            style={{ animation: 'lineDraw 1.0s cubic-bezier(0.4,0,0.2,1) 1.4s both, lineGlow 3.8s ease-in-out 3s infinite' }} />
          {/* nodes */}
          {([
            [141, 166, '#8b5cf6', 0],
            [601, 128, '#3b82f6', 0.3],
            [1298, 150, '#f59e0b', 0.6],
            [100, 466, '#10b981', 0.9],
            [1315, 430, '#8b5cf6', 1.2],
            [178, 638, '#f59e0b', 1.5],
          ] as [number, number, string, number][]).map(([x, y, color, delay], i) => (
            <circle key={i} cx={x} cy={y} r="4" fill={color} fillOpacity="0.6"
              style={{ animation: `nodePulse 3.5s ease-in-out ${delay + 1.8}s infinite` }} />
          ))}
        </svg>

        {/* ── Scattered VaultCards with entrance + float animations ── */}
        <div className="absolute inset-0 pointer-events-none select-none" style={{ zIndex: 4 }}>

          <div className="hc-top" style={{ position: 'absolute', top: 130, left: '2%', animation: 'cardEnter 0.9s cubic-bezier(0.34,1.56,0.64,1) 0.15s both' }}>
            <div style={{ animation: 'hf0 6.2s ease-in-out 1.1s infinite' }}>
              <VaultCard cluster="design" title="デザインシステム v3 移行計画" summary="Figmaオートレイアウトを全コンポーネントに適用。デザイントークンの命名規則を統一する。" assignees={[{ name: 'H', color: '#8b5cf6' }, { name: 'Y', color: '#ec4899' }]} date="Mar 15" hasPage />
            </div>
          </div>

          <div className="hc-top" style={{ position: 'absolute', top: 100, left: '34%', animation: 'cardEnter 0.9s cubic-bezier(0.34,1.56,0.64,1) 0.3s both' }}>
            <div style={{ animation: 'hf1 5.8s ease-in-out 0.8s infinite' }}>
              <VaultCard cluster="frontend" title="Next.js 15 App Router 移行" summary="Pages RouterからApp Routerへ段階移行。初期ロードが1.8s→0.6sに。Turbopackも導入検討。" assignees={[{ name: 'T', color: '#3b82f6' }, { name: 'S', color: '#10b981' }]} date="Mar 13" hasPage />
            </div>
          </div>

          <div className="hc-top" style={{ position: 'absolute', top: 120, right: '1%', animation: 'cardEnter 0.9s cubic-bezier(0.34,1.56,0.64,1) 0.45s both' }}>
            <div style={{ animation: 'hf2 6.6s ease-in-out 1.4s infinite' }}>
              <VaultCard cluster="ai" title="GPT-4o Fine-tuning 実験メモ" summary="独自データ1200件で検証。精度が標準比23%向上。コスト効率も改善された点を記録。" assignees={[{ name: 'K', color: '#f59e0b' }]} date="Mar 12" />
            </div>
          </div>

          <div className="hc-mid" style={{ position: 'absolute', top: 'clamp(260px, 38%, 360px)', left: '0', animation: 'cardEnter 0.9s cubic-bezier(0.34,1.56,0.64,1) 0.25s both' }}>
            <div style={{ animation: 'hf3 5.5s ease-in-out 0.5s infinite' }}>
              <VaultCard cluster="backend" title="Supabase RLS 設計ガイド" summary="Row Level Securityで組織単位のデータ分離。サービスロールとanonキーの使い分けを整理。" assignees={[{ name: 'M', color: '#10b981' }, { name: 'K', color: '#ef4444' }]} date="Mar 8" />
            </div>
          </div>

          <div className="hc-mid" style={{ position: 'absolute', top: 'clamp(240px, 34%, 340px)', right: '0%', animation: 'cardEnter 0.9s cubic-bezier(0.34,1.56,0.64,1) 0.5s both' }}>
            <div style={{ animation: 'hf4 6.0s ease-in-out 1.2s infinite' }}>
              <VaultCard cluster="design" title="ユーザーインタビュー 総まとめ" summary="6名のインタビューから抽出した12のインサイト。情報過多と検索性がトップペイン。" assignees={[{ name: 'Y', color: '#ec4899' }, { name: 'H', color: '#8b5cf6' }]} date="Mar 6" hasPage />
            </div>
          </div>

          <div className="hc-bottom" style={{ position: 'absolute', bottom: 90, left: '5%', animation: 'cardEnter 0.9s cubic-bezier(0.34,1.56,0.64,1) 0.4s both' }}>
            <div style={{ animation: 'hf5 5.7s ease-in-out 0.9s infinite' }}>
              <VaultCard cluster="ai" title="AIチャット UI リサーチ" summary="Copilot・Perplexity・Claude UIを比較分析。プロンプト入力とコンテキスト表示のベストプラクティス。" assignees={[{ name: 'H', color: '#8b5cf6' }, { name: 'R', color: '#f59e0b' }]} date="Mar 3" />
            </div>
          </div>

          <div className="hc-bottom" style={{ position: 'absolute', bottom: 80, right: '3%', animation: 'cardEnter 0.9s cubic-bezier(0.34,1.56,0.64,1) 0.6s both' }}>
            <div style={{ animation: 'hf6 6.4s ease-in-out 1.6s infinite' }}>
              <VaultCard cluster="frontend" title="Storybook v8 移行ノート" summary="CSF3形式へのリライトと、Interaction Testsの導入。ビジュアルリグレッション自動化も整備。" assignees={[{ name: 'T', color: '#3b82f6' }]} date="Feb 28" hasPage />
            </div>
          </div>
        </div>

        {/* ── Open Peeps — Stage characters at bottom ── */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none select-none flex items-end justify-center" style={{ zIndex: 5, gap: 'clamp(8px, 2vw, 32px)' }}>
          <div className="peep-side">
            <img src="/peeps/peep-standing-12.svg" alt=""
              style={{ height: 370, maxHeight: '31vh', display: 'block', opacity: 1, animation: 'peepFloat 7.2s ease-in-out 0.4s infinite' }} />
          </div>
          <div>
            <img src="/peeps/peep-standing-9.svg" alt=""
              style={{ height: 370, maxHeight: '31vh', display: 'block', opacity: 1, animation: 'peepFloatFlip 7.0s ease-in-out 0.6s infinite' }} />
          </div>
          <div>
            <img src="/peeps/peep-standing-19.svg" alt=""
              style={{ height: 370, maxHeight: '31vh', display: 'block', opacity: 1, animation: 'peepFloat 8s ease-in-out 1s infinite' }} />
          </div>
          <div>
            <img src="/peeps/peep-standing-22.svg" alt=""
              style={{ height: 370, maxHeight: '31vh', display: 'block', opacity: 1, animation: 'peepFloat 6.8s ease-in-out 0.8s infinite' }} />
          </div>
          <div>
            <img src="/peeps/peep-standing-13.svg" alt=""
              style={{ height: 370, maxHeight: '31vh', display: 'block', opacity: 1, animation: 'peepFloatFlip 7.3s ease-in-out 1.2s infinite' }} />
          </div>
          <div className="peep-side">
            <img src="/peeps/peep-standing-25.svg" alt=""
              style={{ height: 370, maxHeight: '31vh', display: 'block', opacity: 1, animation: 'peepFloatFlip 7.4s ease-in-out 1.2s infinite' }} />
          </div>
        </div>

        {/* ── Giant headline + sub + CTA ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 select-none px-4" style={{ paddingTop: 'clamp(60px, 8vh, 100px)' }}>
          <div className="flex flex-col items-center gap-3">
            <img
              src="/vault_logo.svg"
              alt="Vault"
              className="pointer-events-none"
              style={{
                height: 'clamp(72px, 7vw, 110px)',
                display: 'block',
                animation: 'headlineWord 0.9s cubic-bezier(0.4,0,0.2,1) 0.75s both',
              }}
            />
            <h1
              className="font-black text-center leading-[1.05] tracking-[-0.05em] pointer-events-none"
              style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(18px, 2.4vw, 38px)' }}
            >
              <span className="text-neutral-950" style={{ animation: 'headlineWord 0.9s cubic-bezier(0.4,0,0.2,1) 0.9s both' }}>気づきを、資産に変える。</span>
            </h1>
            <p className="text-sm text-neutral-500 text-center leading-relaxed pointer-events-none mt-1"
              style={{ fontFamily: "'Shippori Mincho', serif", animation: 'headlineWord 0.9s cubic-bezier(0.4,0,0.2,1) 1.1s both' }}>
              チームの知識を蓄積し、つなぎ、実務に活かせる資産に変える。
            </p>
            <a
              href={APP_URL}
              className="flex items-center gap-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-neutral-900/30 mt-2"
              style={{ animation: 'headlineWord 0.9s cubic-bezier(0.4,0,0.2,1) 1.25s both' }}
            >
              <GoogleIcon />
              Googleアカウントで使い始める
            </a>
          </div>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════════════════
          ACT 1 — RECOGNITION
      ════════════════════════════════════════════════════════════════════ */}
      <SlackSceneSection />

      {/* ════════════════════════════════════════════════════════════════════
          ACT 2 — ROOT CAUSE
          「ツールの問題じゃない」
          本質的な課題への洞察。共感から納得へ。
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F4F0EB' }} className="overflow-hidden">
        <div className="max-w-5xl mx-auto px-5 sm:px-10 md:px-16 py-16 sm:py-24">

          {/* ① 主張 */}
          <Reveal>
            <p className="text-[11px] font-black tracking-[0.2em] text-neutral-400 uppercase mb-8">Act 02 — Root Cause</p>
            <h2 className="font-black text-neutral-950 leading-[1.1] tracking-[-0.04em] mb-12"
              style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(26px, 3.5vw, 48px)' }}>
              ツールの問題じゃない。
            </h2>
          </Reveal>

          {/* ② 根拠 — 数字 + ツール一覧 */}
          <Reveal delay={80}>
            <div className="mb-3 flex items-baseline gap-3">
              <span className="font-black text-neutral-950 leading-none" style={{ fontSize: 'clamp(52px, 7vw, 88px)' }}>7+</span>
              <span className="text-neutral-400 text-sm">平均的なチームが使うツールの数</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {['Notion', 'Slack', 'Figma', 'Google Drive', 'GitHub', 'Confluence', 'Google Meet'].map(t => (
                <span key={t} className="text-[12px] font-semibold px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: 'rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.08)', color: '#5A5450' }}>
                  {t}
                </span>
              ))}
            </div>
            <p className="text-neutral-400 text-sm">それぞれは、機能しています。</p>
          </Reveal>

          {/* ③ 再定義 */}
          <Reveal delay={160}>
            <div className="mt-14 pt-12 border-t border-neutral-200">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="text-[11px] font-black tracking-[0.18em] uppercase"
                  style={{ color: '#B8906A' }}>
                  Question
                </span>
                <span className="h-px w-8 block" style={{ backgroundColor: '#B8906A', opacity: 0.5 }} />
                <span className="font-black text-neutral-800 leading-none"
                  style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(15px, 1.6vw, 20px)' }}>
                  では、何が問題か。
                </span>
              </div>
              <p className="font-black text-neutral-950 leading-[1.15] tracking-[-0.03em] mb-10"
                style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(22px, 3vw, 40px)' }}>
                <span style={{ color: '#B8906A' }}>A.</span>繋ぐ場所が、ないだけだ。
              </p>
              <p className="text-neutral-500 text-base leading-[1.9] max-w-xl">
                チームの知識は点在したまま、互いに繋がることなく、誰かの記憶に依存して、ある日静かに消えていく。蓄積されず、繋がらず、実務で活きることもない。
                それは怠慢ではなく、<strong className="text-neutral-800 font-black">構造的な問題</strong>です。
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          ACT 3 — VISION
          「本来、こうあるべきだ」
          読者が「そうなりたい」と感じる変容後の世界像
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#6B5E52' }}>
        <div className="absolute left-5 top-1/2 -translate-y-1/2 -rotate-90 origin-center z-10 hidden sm:block">
          <span className="text-[9px] font-black tracking-[0.3em] text-[#9A8E84] uppercase">Act 03</span>
        </div>

        <div className="px-5 sm:px-10 md:px-20 py-12 sm:py-20">
          <Reveal>
            <p className="text-[11px] font-black tracking-[0.2em] text-[#8A847C] uppercase mb-6">Vision</p>
            <h2 className="font-black leading-[1.1] tracking-[-0.04em] mb-12 max-w-xl"
              style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(24px, 3vw, 40px)', color: 'white' }}>
              本来、こうあるべきだ。
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                before: '意思決定の文脈は、担当者の記憶にしか残らない。',
                after: 'なぜそうなったかの文脈が、組織の資産として残り続ける。',
              },
              {
                before: '新入社員の立ち上がりに、3ヶ月かかる。',
                after: '入社3日目に、過去5年の文脈を自分で読み解ける。',
              },
              {
                before: '同じリサーチを、別チームが繰り返す。',
                after: '知識と知識が繋がり、実務の判断をその場で支える。',
              },
            ].map((v, i) => (
              <Reveal key={i} delay={i * 100}>
                <div style={{
                  backgroundColor: '#F4F0EB',
                  borderRadius: 16,
                  padding: '24px 24px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
                  minHeight: 220,
                }}>
                  {/* Index + before */}
                  <div style={{ marginBottom: 16 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 900, color: '#B8906A',
                      letterSpacing: '0.2em', display: 'block', marginBottom: 10,
                    }}>0{i + 1}</span>
                    <p style={{
                      fontSize: 11.5, color: '#A09080', lineHeight: 1.65,
                      textDecoration: 'line-through', textDecorationColor: '#C0AFA0',
                    }}>{v.before}</p>
                  </div>
                  {/* Divider */}
                  <div style={{ height: 1, backgroundColor: 'rgba(0,0,0,0.08)', marginBottom: 16 }} />
                  {/* After */}
                  <p style={{
                    fontFamily: "'Shippori Mincho', serif",
                    fontSize: 'clamp(15px, 1.5vw, 19px)',
                    fontWeight: 900, color: '#1A1510',
                    lineHeight: 1.55, letterSpacing: '-0.01em',
                    marginTop: 'auto',
                  }}>{v.after}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          ACT 4 — SOLUTION
      ════════════════════════════════════════════════════════════════════ */}
      <SolutionSection />

      {/* ════════════════════════════════════════════════════════════════════
          ACT 5 — ACTION
          「3ステップで、今日から始まる」
      ════════════════════════════════════════════════════════════════════ */}
      <section id="howto" style={{ backgroundColor: '#EEEAE4' }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
          <Reveal>
            <p className="text-[10px] font-black tracking-[0.2em] text-neutral-400 uppercase mb-12">Act 05 — How to Start</p>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-8 sm:gap-6">

            {/* ── Step 01: ノートを作成する ── */}
            <Reveal delay={0}>
              <div>
                <div style={{ position: 'relative', height: 300, borderRadius: 20, border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden', marginBottom: 24 }}>
                  {/* URL input bar */}
                  <div style={{ position: 'absolute', top: 16, left: 14, right: 14, zIndex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.7)', borderRadius: 8, padding: '7px 10px', border: '1px solid rgba(0,0,0,0.08)' }}>
                      <div style={{ width: 12, height: 12, borderRadius: 3, background: '#e5e7eb', flexShrink: 0 }} />
                      <span style={{ fontSize: 10, color: '#9ca3af', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>https://zenn.dev/next-js-app-router</span>
                      <div style={{ width: 20, height: 20, borderRadius: 5, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Plus size={10} color="white" />
                      </div>
                    </div>
                  </div>
                  {/* Memo bar */}
                  <div style={{ position: 'absolute', top: 58, left: 14, right: 14, zIndex: 2 }}>
                    <div style={{ background: '#fffbeb', borderRadius: 8, padding: '6px 10px', border: '1px solid #fde68a' }}>
                      <span style={{ fontSize: 9.5, color: '#92400e' }}>メモ：移行で詰まったポイントをあとで整理する</span>
                    </div>
                  </div>
                  {/* 1 VaultCard fully visible at bottom */}
                  <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%) scale(0.78)', transformOrigin: 'bottom center', zIndex: 2 }}>
                    <VaultCard cluster="frontend" title="Next.js App Router 移行メモ" summary="use clientの使い分け。Server ComponentsでのData Fetching。" assignees={[{ name: 'H', color: '#3b82f6' }]} date="Mar 12" />
                  </div>
                </div>
                <span style={{ display: 'block', fontSize: 9.5, fontWeight: 800, color: '#b5afa8', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>Step 01</span>
                <h3 className="font-black text-neutral-950 leading-[1.2] tracking-[-0.03em] mb-3" style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(20px, 2vw, 26px)', marginTop: 0 }}>ノートを作成する</h3>
                <p style={{ fontSize: 13.5, color: '#6b6560', lineHeight: 1.8, margin: 0 }}>リンクやメモ書きから1クリックでノートを作成。Googleアカウントで今日から試せる。</p>
              </div>
            </Reveal>

            {/* ── Step 02: 関連性を可視化する ── */}
            <Reveal delay={100}>
              <div>
                <div style={{ position: 'relative', height: 300, borderRadius: 20, border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden', marginBottom: 24 }}>
                  {/* Fixed inner coordinate space (280×300) */}
                  <div className="step2-inner" style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 280 }}>
                    {/* Dot grid */}
                    <svg width="280" height="300" style={{ position: 'absolute', inset: 0 }}>
                      <defs>
                        <pattern id="step2-dots" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
                          <circle cx="1" cy="1" r="1" fill="#d4d4d8" opacity="0.4" />
                        </pattern>
                      </defs>
                      <rect width="280" height="300" fill="url(#step2-dots)" />
                      {/* Card1 → Badge */}
                      <path d="M 66 69 Q 82 122 140 138" stroke="#c4bdd8" strokeWidth="1.2" fill="none" strokeDasharray="4 3" />
                      {/* Card2 → Badge */}
                      <path d="M 214 69 Q 198 122 140 138" stroke="#c4bdd8" strokeWidth="1.2" fill="none" strokeDasharray="4 3" />
                      {/* Badge → Card3 */}
                      <line x1="140" y1="164" x2="140" y2="196" stroke="#d4d4d8" strokeWidth="1.2" strokeDasharray="4 3" />
                    </svg>
                    {/* Card 1: top-left */}
                    <div style={{ position: 'absolute', top: 32, left: 10, transform: 'scale(0.5)', transformOrigin: 'top left', zIndex: 2 }}>
                      <VaultCard cluster="design" title="デザインシステム移行計画" summary="Figmaオートレイアウト全適用。" assignees={[{ name: 'H', color: '#8b5cf6' }]} date="Mar 15" />
                    </div>
                    {/* Card 2: top-right */}
                    <div style={{ position: 'absolute', top: 32, right: 10, transform: 'scale(0.5)', transformOrigin: 'top right', zIndex: 2 }}>
                      <VaultCard cluster="ai" title="GPT-4o 実験メモ" summary="Function Calling検証。" date="Mar 10" />
                    </div>
                    {/* ナレッジ生成バッジ — wide centered pill */}
                    <div style={{ position: 'absolute', top: 138, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #f59e0b, #f97316)', borderRadius: 20, padding: '5px 32px', fontSize: 10, fontWeight: 700, color: 'white', zIndex: 3, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Sparkles size={9} color="white" />ナレッジ生成中…
                    </div>
                    {/* Card 3: bottom-center */}
                    <div style={{ position: 'absolute', top: 196, left: 140, transform: 'translateX(-50%) scale(0.5)', transformOrigin: 'top center', zIndex: 2 }}>
                      <VaultCard cluster="frontend" title="App Router 移行" summary="段階的な移行手順。" date="Mar 12" />
                    </div>
                  </div>
                </div>
                <span style={{ display: 'block', fontSize: 9.5, fontWeight: 800, color: '#b5afa8', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>Step 02</span>
                <h3 className="font-black text-neutral-950 leading-[1.2] tracking-[-0.03em] mb-3" style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(20px, 2vw, 26px)', marginTop: 0 }}>関連性を可視化する</h3>
                <p style={{ fontSize: 13.5, color: '#6b6560', lineHeight: 1.8, margin: 0 }}>ノートの関連性が自動で可視化され、散らばった知識が構造として見えてくる。AIがナレッジサマリーを生成する。</p>
              </div>
            </Reveal>

            {/* ── Step 03: 実務に活かす ── */}
            <Reveal delay={200}>
              <div>
                <div style={{ position: 'relative', height: 300, borderRadius: 20, border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden', marginBottom: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '14px 12px 14px' }}>
                  {/* Mini SnapshotCard */}
                  <div style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.07)', flexShrink: 0 }}>
                    <div style={{ background: CLUSTER_GRADIENT.design, padding: '10px 12px', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', right: -8, top: -8, width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Palette size={11} color="white" />
                        </div>
                        <div>
                          <p style={{ fontSize: 8, fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>ナレッジスナップショット</p>
                          <p style={{ fontSize: 13, fontWeight: 800, color: 'white', margin: 0, letterSpacing: '-0.02em' }}>デザイン / UX</p>
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 9, fontWeight: 600, padding: '1px 6px', borderRadius: 20, background: '#8b5cf615', color: '#8b5cf6' }}>デザイン / UX</span>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 9, color: '#9ca3af' }}><Calendar size={8} />Mar 15</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 9, color: '#9ca3af' }}><Layers size={8} />12枚</span>
                      </div>
                    </div>
                  </div>
                  {/* Chat exchange */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {/* User question */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <div style={{ padding: '6px 10px', borderRadius: '10px 3px 10px 10px', background: '#111827', fontSize: 10, lineHeight: 1.5, color: 'white', maxWidth: '85%' }}>
                        デザインシステムはなぜ導入したの？
                      </div>
                    </div>
                    {/* AI response */}
                    <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                      <div style={{ width: 20, height: 20, borderRadius: 6, flexShrink: 0, background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Bot size={10} color="#6b7280" />
                      </div>
                      <div style={{ flex: 1, padding: '7px 10px', borderRadius: '3px 10px 10px 10px', background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(0,0,0,0.07)', fontSize: 10.5, lineHeight: 1.55, color: '#374151' }}>
                        Hさんが提案しYさんが主導。導入後、開発速度が40%向上しました。
                      </div>
                    </div>
                  </div>
                </div>
                <span style={{ display: 'block', fontSize: 9.5, fontWeight: 800, color: '#b5afa8', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>Step 03</span>
                <h3 className="font-black text-neutral-950 leading-[1.2] tracking-[-0.03em] mb-3" style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(20px, 2vw, 26px)', marginTop: 0 }}>実務に活かす</h3>
                <p style={{ fontSize: 13.5, color: '#6b6560', lineHeight: 1.8, margin: 0 }}>生成されたナレッジをAIに問いかけ、設計判断・レビュー・オンボーディングで即座に活用できる。</p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          CLOSE — CTA
          「ここから、チームの記憶が始まる」
          感情的なクロージング
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#1a1a1a', minHeight: '72vh' }}>
        <div className="absolute inset-0 pointer-events-none select-none">
          <div style={{ position: 'absolute', top: '8%',    left: '-4%',  transform: 'rotate(-9deg)',  opacity: 0.04 }}>
            <VaultCard cluster="design"   title="デザインシステム"  summary="" />
          </div>
          <div style={{ position: 'absolute', top: '4%',    left: '28%',  transform: 'rotate(7deg)',   opacity: 0.04 }}>
            <VaultCard cluster="frontend" title="Next.js 移行計画" summary="" />
          </div>
          <div style={{ position: 'absolute', top: '12%',   right: '-3%', transform: 'rotate(-12deg)', opacity: 0.04 }}>
            <VaultCard cluster="ai"       title="AI ロードマップ"  summary="" />
          </div>
          <div style={{ position: 'absolute', bottom: '14%', left: '4%',  transform: 'rotate(5deg)',  opacity: 0.04 }}>
            <VaultCard cluster="backend"  title="Supabase 設計"   summary="" />
          </div>
          <div style={{ position: 'absolute', bottom: '8%',  right: '6%', transform: 'rotate(-7deg)', opacity: 0.04 }}>
            <VaultCard cluster="design"   title="インタビュー総括" summary="" />
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-28 flex flex-col items-start justify-center" style={{ minHeight: '72vh' }}>
          <p className="text-[10px] font-black tracking-[0.25em] text-[#6b7280] uppercase mb-8">Close</p>
          <h2 className="font-black text-white leading-[1.1] tracking-[-0.05em] mb-6"
            style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(30px, 4.5vw, 60px)' }}>
            知識は、使われてはじめて資産になる。
          </h2>
          <p className="text-[#9ca3af] text-base leading-[1.9] mb-12 max-w-md">
            あなたのチームも、今日から。
          </p>
          <a href={APP_URL}
            className="inline-flex items-center gap-3 bg-white hover:bg-neutral-100 text-neutral-950 font-black text-sm px-8 py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl">
            <GoogleIcon />
            Googleアカウントで使い始める
          </a>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: '#1a1a1a', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <VaultLogo color="#ffffff" height={18} />
            <p className="mt-3 text-[13px] font-medium" style={{ fontFamily: "'Shippori Mincho', serif", color: '#d1d5db' }}>
              気づきを、資産に変える。
            </p>
            <p className="mt-1 text-[11px] leading-relaxed" style={{ color: '#6b7280', maxWidth: 320 }}>
              チームの知識を蓄積し、つなぎ、実務に活かせる資産に変える。
            </p>
          </div>
          <p className="text-[11px]" style={{ color: '#6b7280' }}>© 2026 Vault</p>
        </div>
      </footer>

    </div>
  )
}
