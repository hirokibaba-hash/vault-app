import { useEffect, useRef, useState } from 'react'
import { Monitor, Palette, Database, Sparkles, FileText, Plus } from 'lucide-react'

const APP_URL = 'https://vault-app-lemon-nine.vercel.app'

// ── Cluster config (mirrored from product) ────────────────────────────────────
const CLUSTERS = {
  design:   { label: 'デザイン / UX',  accent: '#8b5cf6', Icon: Palette },
  frontend: { label: 'フロントエンド', accent: '#3b82f6', Icon: Monitor },
  ai:       { label: 'AI',             accent: '#f59e0b', Icon: Sparkles },
  backend:  { label: 'バックエンド',   accent: '#10b981', Icon: Database },
}
type Cluster = keyof typeof CLUSTERS

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

// ── Main LP ───────────────────────────────────────────────────────────────────
export default function LPPage() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <div className="min-h-screen bg-[#FAFAF9] font-sans antialiased overflow-x-hidden" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-neutral-200/80' : ''}`}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-neutral-600 flex items-center justify-center">
              <span className="text-white text-[10px] font-black">V</span>
            </div>
            <span className="font-black text-neutral-900 tracking-tight text-sm">Vault</span>
          </div>
          <a href={APP_URL}
            className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors">
            <GoogleIcon />
            ログイン
          </a>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '100svh', backgroundColor: '#EEEAE4' }}>

        {/* Canvas dot grid — authentic canvas texture */}
        <div className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(circle, #b8b3ab 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.55 }} />

        {/* ── Scattered VaultCards ── */}
        <div className="absolute inset-0 pointer-events-none select-none">

          {/* Top-left: Design card, tilted left */}
          <div style={{ position: 'absolute', top: 96, left: '2%', transform: 'rotate(-9deg)', zIndex: 4 }}>
            <VaultCard
              cluster="design"
              title="デザインシステム v3 移行計画"
              summary="Figmaオートレイアウトを全コンポーネントに適用。デザイントークンの命名規則を統一する。"
              assignees={[{ name: 'H', color: '#8b5cf6' }, { name: 'Y', color: '#ec4899' }]}
              date="Mar 15"
              hasPage
            />
          </div>

          {/* Top-center: Frontend card, slight tilt */}
          <div style={{ position: 'absolute', top: 68, left: '30%', transform: 'rotate(4deg)', zIndex: 4 }}>
            <VaultCard
              cluster="frontend"
              title="Next.js 15 App Router 移行"
              summary="Pages RouterからApp Routerへ段階移行。初期ロードが1.8s→0.6sに。Turbopackも導入検討。"
              assignees={[{ name: 'T', color: '#3b82f6' }, { name: 'S', color: '#10b981' }]}
              date="Mar 13"
              hasPage
            />
          </div>

          {/* Top-right: AI card, tilted right */}
          <div style={{ position: 'absolute', top: 88, right: '1%', transform: 'rotate(11deg)', zIndex: 4 }}>
            <VaultCard
              cluster="ai"
              title="GPT-4o Fine-tuning 実験メモ"
              summary="独自データ1200件で検証。精度が標準比23%向上。コスト効率も改善された点を記録。"
              assignees={[{ name: 'K', color: '#f59e0b' }]}
              date="Mar 12"
            />
          </div>

          {/* Mid-left: Backend card */}
          <div style={{ position: 'absolute', top: '44%', left: '-1%', transform: 'rotate(6deg)', zIndex: 4 }}>
            <VaultCard
              cluster="backend"
              title="Supabase RLS 設計ガイド"
              summary="Row Level Securityで組織単位のデータ分離。サービスロールとanonキーの使い分けを整理。"
              assignees={[{ name: 'M', color: '#10b981' }, { name: 'K', color: '#ef4444' }]}
              date="Mar 8"
            />
          </div>

          {/* Mid-right: Design card */}
          <div style={{ position: 'absolute', top: '40%', right: '0%', transform: 'rotate(-8deg)', zIndex: 4 }}>
            <VaultCard
              cluster="design"
              title="ユーザーインタビュー 総まとめ"
              summary="6名のインタビューから抽出した12のインサイト。情報過多と検索性がトップペイン。"
              assignees={[{ name: 'Y', color: '#ec4899' }, { name: 'H', color: '#8b5cf6' }]}
              date="Mar 6"
              hasPage
            />
          </div>

          {/* Bottom-left: AI card */}
          <div style={{ position: 'absolute', bottom: 140, left: '5%', transform: 'rotate(-5deg)', zIndex: 4 }}>
            <VaultCard
              cluster="ai"
              title="AIチャット UI リサーチ"
              summary="Copilot・Perplexity・Claude UIを比較分析。プロンプト入力とコンテキスト表示のベストプラクティス。"
              assignees={[{ name: 'H', color: '#8b5cf6' }, { name: 'R', color: '#f59e0b' }]}
              date="Mar 3"
            />
          </div>

          {/* Bottom-right: Frontend card */}
          <div style={{ position: 'absolute', bottom: 120, right: '3%', transform: 'rotate(7deg)', zIndex: 4 }}>
            <VaultCard
              cluster="frontend"
              title="Storybook v8 移行ノート"
              summary="CSF3形式へのリライトと、Interaction Testsの導入。ビジュアルリグレッション自動化も整備。"
              assignees={[{ name: 'T', color: '#3b82f6' }]}
              date="Feb 28"
              hasPage
            />
          </div>
        </div>

        {/* ── Giant headline — overlaps cards intentionally ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none select-none px-4">
          <h1
            className="font-black text-center leading-[0.83] tracking-[-0.05em]"
            style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: 'clamp(40px, 6vw, 72px)',
            }}
          >
            <span className="block text-neutral-950">誰かが</span>
            <span className="block" style={{ WebkitTextStroke: '1.5px #111', color: 'transparent', opacity: 0.85 }}>去っても、</span>
            <span className="block text-neutral-950">知識は残る。</span>
          </h1>
        </div>

        {/* ── Bottom CTA band ── */}
        <div className="absolute bottom-0 inset-x-0 z-20 pb-10 pt-6 flex flex-col items-center gap-3"
          style={{ background: 'linear-gradient(to top, #EEEAE4 55%, transparent)' }}>
          <p className="text-sm text-neutral-600 text-center max-w-xs leading-relaxed px-4"
            style={{ fontFamily: "'Shippori Mincho', serif" }}>
            チームの思考・意思決定・文脈を一つのキャンバスに。<br />Goodpatch専用ナレッジハブ。
          </p>
          <a
            href={APP_URL}
            className="flex items-center gap-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-neutral-900/30"
          >
            <GoogleIcon />
            Googleアカウントで使い始める
          </a>
          <p className="text-xs text-neutral-500">@goodpatch.com アカウントが必要です</p>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════════════════
          ACT 1 — RECOGNITION
          「あなたのチームで、今日も起きていること」
          ユーザーが自分ごととして感じる具体的なシーン3つ
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#18140F' }}>
        <div className="absolute left-5 top-1/2 -translate-y-1/2 -rotate-90 origin-center z-10 hidden sm:block">
          <span className="text-[9px] font-black tracking-[0.3em] text-[#3A3530] uppercase">Act 01</span>
        </div>

        <div className="px-10 sm:px-20 py-20">
          <Reveal>
            <p className="text-[11px] font-black tracking-[0.2em] text-[#5C5750] uppercase mb-6">Recognition</p>
            <h2 className="font-black leading-[0.9] tracking-[-0.04em] mb-16 max-w-2xl"
              style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(24px, 3vw, 40px)', color: 'white' }}>
              あなたのチームで、<br />
              <span style={{ WebkitTextStroke: '1.5px #fff', color: 'transparent' }}>今日も起きていること。</span>
            </h2>
          </Reveal>

          <div className="space-y-0">
            {[
              {
                num: '01',
                scene: '「なぜこの設計にしたか、誰かわかる人いる？」',
                body: '担当者が退職してから半年。理由も、文脈も、その人と一緒に去っていた。',
                tag: 'KNOWLEDGE LOSS',
              },
              {
                num: '02',
                scene: '「Slackのどこかにあった気がして」',
                body: '150件遡って、結局見つけられなかった。あの議論は、本当にあったのか。',
                tag: 'FINDABILITY',
              },
              {
                num: '03',
                scene: '「そのリサーチ、先週別チームもやってた」',
                body: '誰も知らなかった。ツールは揃っていた。ただ、繋がっていなかっただけ。',
                tag: 'DUPLICATION',
              },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="border-t border-[#2A2520] py-10 grid sm:grid-cols-[auto_1fr] gap-6 sm:gap-12 group">
                  <span className="text-[10px] font-black tracking-[0.15em] text-[#3A3530] mt-1 hidden sm:block">{p.num}</span>
                  <div>
                    <p className="font-black text-white mb-3 leading-snug tracking-tight"
                      style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(14px, 1.4vw, 18px)' }}>
                      {p.scene}
                    </p>
                    <p className="text-[#5C5750] text-[14px] leading-relaxed">{p.body}</p>
                  </div>
                  <span className="text-[8px] font-black tracking-[0.2em] text-[#2A2520] hidden lg:block self-start mt-1">{p.tag}</span>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-[#2A2520]" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          ACT 2 — ROOT CAUSE
          「ツールの問題じゃない」
          本質的な課題への洞察。共感から納得へ。
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F4F0EB' }} className="overflow-hidden">
        <div className="max-w-5xl mx-auto px-10 sm:px-16 py-28">
          <Reveal>
            <p className="text-[11px] font-black tracking-[0.2em] text-neutral-400 uppercase mb-8">Act 02 — Root Cause</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-black text-neutral-950 leading-[0.9] tracking-[-0.04em] mb-10"
              style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(26px, 3.5vw, 48px)' }}>
              ツールの<br />
              問題じゃない。
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <div className="grid sm:grid-cols-2 gap-12 items-start">
              <p className="text-neutral-500 text-base leading-[1.9]">
                NotionもSlackもFigmaも、それぞれ機能している。<br />
                問題は、それらを<strong className="text-neutral-700 font-black">繋ぐ場所がない</strong>こと。
              </p>
              <p className="text-neutral-500 text-base leading-[1.9]">
                チームの知識は点在したまま、誰かの記憶に依存して、ある日静かに消えていく。
                それは怠慢ではなく、<strong className="text-neutral-700 font-black">構造的な問題</strong>だ。
              </p>
            </div>
          </Reveal>
          {/* Accent divider */}
          <Reveal delay={200}>
            <div className="mt-16 pt-16 border-t border-neutral-200 flex items-center gap-4">
              <div className="flex gap-2">
                {['#8b5cf6', '#3b82f6', '#f59e0b', '#10b981'].map((c, i) => (
                  <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
                ))}
              </div>
              <p className="text-neutral-400 text-sm">
                Notion / Slack / Figma — それぞれ機能しているが、統合されていない
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
      <section className="relative overflow-hidden" style={{ backgroundColor: '#18140F' }}>
        <div className="absolute left-5 top-1/2 -translate-y-1/2 -rotate-90 origin-center z-10 hidden sm:block">
          <span className="text-[9px] font-black tracking-[0.3em] text-[#3A3530] uppercase">Act 03</span>
        </div>

        <div className="px-10 sm:px-20 py-20">
          <Reveal>
            <p className="text-[11px] font-black tracking-[0.2em] text-[#5C5750] uppercase mb-6">Vision</p>
            <h2 className="font-black leading-[0.9] tracking-[-0.04em] mb-16 max-w-xl"
              style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(24px, 3vw, 40px)', color: 'white' }}>
              本来、<br />
              <span style={{ WebkitTextStroke: '1.5px #fff', color: 'transparent' }}>こうあるべきだ。</span>
            </h2>
          </Reveal>

          <div className="space-y-0">
            {[
              {
                num: '—',
                vision: '入社3日目に、過去5年の意思決定の文脈を自分で読み解ける。',
                note: '退職者の知識も、組織の資産として残り続ける。',
              },
              {
                num: '—',
                vision: '「なぜこの設計にしたか」が、AIに聞けば3秒でわかる。',
                note: '記録された知識が、インタラクティブに問い返せる。',
              },
              {
                num: '—',
                vision: '同じリサーチを、二度やらなくてよくなる。',
                note: 'チームの集合知が可視化され、次の思考の起点になる。',
              },
            ].map((v, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="border-t border-[#2A2520] py-10">
                  <p className="font-black text-white leading-tight tracking-tight mb-3"
                    style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(14px, 1.4vw, 18px)' }}>
                    {v.vision}
                  </p>
                  <p className="text-[#4A4540] text-[13px] leading-relaxed">{v.note}</p>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-[#2A2520]" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          ACT 4 — SOLUTION
          「Vaultはどう変えるか」
          ビジョンを実現する具体的な機能
      ════════════════════════════════════════════════════════════════════ */}

      {/* 01 — Canvas: real VaultCards on canvas bg */}
      <Reveal>
        <section className="grid lg:grid-cols-[5fr_7fr] overflow-hidden" style={{ minHeight: 540 }}>
          <div className="flex flex-col justify-center p-10 lg:p-16" style={{ backgroundColor: '#23201A' }}>
            <p className="text-[10px] font-black tracking-[0.2em] text-[#5C5750] uppercase mb-2">Act 04 — Solution</p>
            <p className="text-[10px] font-black tracking-[0.15em] text-[#4A4540] uppercase mb-6">01 / Canvas &amp; Graph</p>
            <h3 className="font-black text-white leading-[0.88] tracking-[-0.04em] mb-5"
              style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(22px, 2.8vw, 36px)' }}>
              知識に、<br />居場所を<br />つくる。
            </h3>
            <p className="text-[#6B6560] text-sm leading-relaxed mb-8 max-w-[280px]">
              カードをキャンバスに置き、関係性を線でつなぐ。思考の全体像が一枚の地図になる。退職者の知識も、ここに残り続ける。
            </p>
            <div className="flex flex-wrap gap-2">
              {['ドラッグ移動', 'ズーム', 'グラフ', 'バンドル'].map(t => (
                <span key={t} className="text-[10px] font-medium text-[#5C5750] border border-[#3A3630] rounded-full px-3 py-1">{t}</span>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden" style={{ minHeight: 480, backgroundColor: '#EEEAE4' }}>
            <div className="absolute inset-0"
              style={{ backgroundImage: 'radial-gradient(circle, #b8b3ab 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.55 }} />
            <div className="absolute inset-0 pointer-events-none select-none">
              <div style={{ position: 'absolute', top: 28, left: 12, transform: 'rotate(-8deg) scale(0.68)', transformOrigin: 'top left' }}>
                <VaultCard cluster="design" title="デザインシステム移行計画" summary="Figmaオートレイアウト全適用。トークン命名規則を統一する。" assignees={[{ name: 'H', color: '#8b5cf6' }, { name: 'Y', color: '#ec4899' }]} date="Mar 15" hasPage />
              </div>
              <div style={{ position: 'absolute', top: 18, left: '38%', transform: 'rotate(5deg) scale(0.68)', transformOrigin: 'top left' }}>
                <VaultCard cluster="frontend" title="Next.js 15 App Router 移行" summary="段階移行で初期ロード1.8s→0.6sに改善。" assignees={[{ name: 'T', color: '#3b82f6' }]} date="Mar 13" />
              </div>
              <div style={{ position: 'absolute', top: 24, right: 8, transform: 'rotate(10deg) scale(0.68)', transformOrigin: 'top right' }}>
                <VaultCard cluster="ai" title="GPT-4o 実験メモ" summary="1200件データ検証。精度23%向上。" assignees={[{ name: 'K', color: '#f59e0b' }]} date="Mar 12" />
              </div>
              <div style={{ position: 'absolute', top: '42%', left: 24, transform: 'rotate(4deg) scale(0.68)', transformOrigin: 'top left' }}>
                <VaultCard cluster="backend" title="Supabase RLS 設計" summary="Row Level Securityで組織単位のデータ分離を実装。" assignees={[{ name: 'M', color: '#10b981' }]} date="Mar 8" />
              </div>
              <div style={{ position: 'absolute', bottom: 48, left: '28%', transform: 'rotate(-5deg) scale(0.68)', transformOrigin: 'top left' }}>
                <VaultCard cluster="design" title="ユーザーインタビュー 総括" summary="12インサイト抽出。情報過多が最大ペイン。" assignees={[{ name: 'Y', color: '#ec4899' }]} date="Mar 6" hasPage />
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* 02 — Organize + 03 — AI Chat */}
      <div className="grid sm:grid-cols-2">
        <Reveal>
          <div className="p-10 lg:p-14 flex flex-col" style={{ minHeight: 520, backgroundColor: '#F4F0EB' }}>
            <p className="text-[10px] font-black tracking-[0.15em] text-neutral-400 uppercase mb-6">02 / Organize</p>
            <h3 className="font-black text-neutral-950 leading-[0.9] tracking-[-0.04em] mb-4"
              style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(20px, 2.5vw, 30px)' }}>
              混沌を、<br />秩序にする。
            </h3>
            <p className="text-neutral-500 text-sm leading-relaxed mb-auto max-w-xs">
              クラスター別に分類し、バンドルで束ねる。どんなに増えても、誰でも探せる状態を保つ。
            </p>
            <div className="flex gap-5 justify-center pt-10">
              {[
                { label: 'Design', c: '#8b5cf6' },
                { label: 'Front',  c: '#3b82f6' },
                { label: 'AI',     c: '#f59e0b' },
                { label: 'Back',   c: '#10b981' },
              ].map((b, i) => (
                <div key={i} className="relative" style={{ width: 68, height: 90 }}>
                  {[3, 2, 1, 0].map(j => (
                    <div key={j} className="absolute inset-0 rounded-2xl"
                      style={{
                        border: `2px solid ${b.c}`,
                        backgroundColor: j === 0 ? b.c : `${b.c}${['', '10', '20', '38'][j]}`,
                        transform: `rotate(${(j - 1.5) * 7}deg) translateY(${j * 2}px)`,
                        zIndex: 4 - j,
                      }}>
                      {j === 0 && <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-white text-center px-1 leading-tight">{b.label}</span>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="p-10 lg:p-14 flex flex-col" style={{ minHeight: 520, backgroundColor: '#18140F' }}>
            <p className="text-[10px] font-black tracking-[0.15em] text-[#5C5750] uppercase mb-6">03 / AI Chat</p>
            <h3 className="font-black text-white leading-[0.9] tracking-[-0.04em] mb-4"
              style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(20px, 2.5vw, 30px)' }}>
              問えば、<br />3秒で答える。
            </h3>
            <p className="text-[#6B6560] text-sm leading-relaxed mb-auto max-w-xs">
              「なぜこの設計にしたか」「あの議論の結論は何だったか」——蓄積したナレッジをAIが即座に回答する。
            </p>
            <div className="space-y-3 pt-10">
              <div className="flex justify-end">
                <div className="bg-[#2C2822] border border-[#3A3630] text-neutral-300 text-[13px] rounded-2xl rounded-tr-sm px-4 py-3 max-w-[88%] leading-relaxed">
                  デザインシステムはなぜ導入したの？
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-[#8b5cf6]/12 border border-[#8b5cf6]/20 text-neutral-300 text-[13px] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[92%] leading-relaxed">
                  <span className="block text-[10px] font-black text-[#8b5cf6] mb-1.5 tracking-wide">Vault AI</span>
                  2023年Q3、コンポーネント乱立と認識ズレが課題に。導入後、開発速度が約40%向上しました。
                </div>
              </div>
              <div className="flex items-center gap-1 pl-1 pt-0.5">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-bounce" style={{ animationDelay: `${i * 160}ms`, opacity: 0.45 }} />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          ACT 5 — ACTION
          「3ステップで、今日から始まる」
      ════════════════════════════════════════════════════════════════════ */}
      <section className="overflow-hidden" style={{ backgroundColor: '#F4F0EB' }}>
        <div className="max-w-6xl mx-auto px-8 py-16">
          <Reveal>
            <div className="flex items-center gap-4 mb-2">
              <p className="text-[10px] font-black tracking-[0.2em] text-neutral-400 uppercase shrink-0">Act 05 — How to Start</p>
              <div className="h-px flex-1 bg-neutral-200" />
            </div>
          </Reveal>

          {[
            {
              n: '01', align: 'left',
              title: 'Google\nログイン',
              body: '設定不要。@goodpatch.com アカウントがあればそのまま。チームのナレッジに、今日からアクセスできる。',
            },
            {
              n: '02', align: 'right',
              title: 'カードを\n作る',
              body: 'タイトルと内容を書くだけ。クラスターを選んでキャンバスに置く。その瞬間から、知識は組織の財産になる。',
            },
            {
              n: '03', align: 'left',
              title: 'チームで\n問い続ける',
              body: 'カンバスで俯瞰し、AIに問いを立てる。チームの集合知が、次の意思決定を支える。',
            },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className={`relative border-b border-neutral-200 py-6 flex items-center gap-4 sm:gap-8 ${s.align === 'right' ? 'flex-row-reverse' : ''}`}>
                <span
                  className="font-black text-neutral-200 leading-none tracking-tighter shrink-0 select-none"
                  style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(56px, 10vw, 110px)', lineHeight: 0.85 }}
                  aria-hidden
                >{s.n}</span>
                <div className={`max-w-sm ${s.align === 'right' ? 'text-right' : ''}`}>
                  <h3 className="font-black text-neutral-950 leading-[0.88] tracking-[-0.03em] mb-3"
                    style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(18px, 2vw, 26px)', whiteSpace: 'pre-line' }}>{s.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          CLOSE — CTA
          「ここから、チームの記憶が始まる」
          感情的なクロージング
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#18140F', minHeight: '72vh' }}>
        <div className="absolute inset-0 pointer-events-none select-none">
          <div style={{ position: 'absolute', top: '8%',    left: '-4%',  transform: 'rotate(-9deg)',  opacity: 0.07 }}>
            <VaultCard cluster="design"   title="デザインシステム"  summary="" />
          </div>
          <div style={{ position: 'absolute', top: '4%',    left: '28%',  transform: 'rotate(7deg)',   opacity: 0.07 }}>
            <VaultCard cluster="frontend" title="Next.js 移行計画" summary="" />
          </div>
          <div style={{ position: 'absolute', top: '12%',   right: '-3%', transform: 'rotate(-12deg)', opacity: 0.07 }}>
            <VaultCard cluster="ai"       title="AI ロードマップ"  summary="" />
          </div>
          <div style={{ position: 'absolute', bottom: '14%', left: '4%',  transform: 'rotate(5deg)',  opacity: 0.07 }}>
            <VaultCard cluster="backend"  title="Supabase 設計"   summary="" />
          </div>
          <div style={{ position: 'absolute', bottom: '8%',  right: '6%', transform: 'rotate(-7deg)', opacity: 0.07 }}>
            <VaultCard cluster="design"   title="インタビュー総括" summary="" />
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-8 py-28 flex flex-col items-start justify-center" style={{ minHeight: '72vh' }}>
          <p className="text-[10px] font-black tracking-[0.25em] text-[#4A4540] uppercase mb-8">Close</p>
          <h2 className="font-black text-white leading-[0.85] tracking-[-0.05em] mb-6"
            style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 'clamp(30px, 4.5vw, 60px)' }}>
            ここから、<br />
            チームの<br />
            <span style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>記憶が始まる。</span>
          </h2>
          <p className="text-[#5C5750] text-base leading-[1.9] mb-12 max-w-md">
            今日記録した一枚のカードが、1年後に誰かの思考を助ける。<br />
            Goodpatchの知識を、Vaultに集めよう。
          </p>
          <a href={APP_URL}
            className="inline-flex items-center gap-3 bg-white hover:bg-neutral-100 text-neutral-950 font-black text-sm px-8 py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl">
            <GoogleIcon />
            Googleアカウントで使い始める
          </a>
          <p className="text-[#3A3530] text-xs mt-4">@goodpatch.com アカウントが必要です</p>
        </div>
      </section>

      {/* ── Footer ── wordmark ────────────────────────────────────────────── */}
      <footer className="overflow-hidden" style={{ backgroundColor: '#18140F', borderTop: '1px solid #2A2520' }}>
        <div className="overflow-hidden" style={{ lineHeight: 0.8 }}>
          <p className="font-black tracking-tighter select-none px-5 pt-5"
            style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: 'clamp(56px, 12vw, 140px)',
              WebkitTextStroke: '1px #2A2520',
              color: 'transparent',
              lineHeight: 0.85,
            }}>
            Vault
          </p>
        </div>
        <div className="max-w-6xl mx-auto px-6 pb-8 pt-2 flex items-center justify-between">
          <span className="text-[11px] text-[#4A4540] font-medium">Goodpatch internal knowledge hub</span>
          <p className="text-[11px] text-[#3A3530]">© 2026 Goodpatch Inc.</p>
        </div>
      </footer>

    </div>
  )
}
