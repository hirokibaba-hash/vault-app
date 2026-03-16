import { useEffect, useRef, useState } from 'react'

const APP_URL = 'https://vault-app-lemon-nine.vercel.app'

// ── Animated counter ─────────────────────────────────────────────────────────
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      let start: number | null = null
      const step = (ts: number) => {
        if (!start) start = ts
        const p = Math.min((ts - start) / 1200, 1)
        setVal(Math.round(p * to))
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [to])
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

// ── Feature card ─────────────────────────────────────────────────────────────
function FeatureCard({
  num, title, desc, tag,
  visual,
}: {
  num: string
  title: string
  desc: string
  tag: string
  visual: React.ReactNode
}) {
  return (
    <div className="group relative rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-8">
        <span className="inline-block text-xs font-semibold tracking-widest text-neutral-400 uppercase mb-4">{tag}</span>
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-4xl font-black text-neutral-100 select-none">{num}</span>
          <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
        </div>
        <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
      </div>
      <div className="bg-neutral-50 border-t border-neutral-100 px-8 py-6 min-h-[160px] flex items-center justify-center">
        {visual}
      </div>
    </div>
  )
}

// ── Step ─────────────────────────────────────────────────────────────────────
function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div className="flex gap-5 items-start">
      <div className="shrink-0 w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-bold">
        {n}
      </div>
      <div>
        <p className="font-semibold text-neutral-900 mb-0.5">{title}</p>
        <p className="text-sm text-neutral-500">{desc}</p>
      </div>
    </div>
  )
}

// ── Canvas visual mock ────────────────────────────────────────────────────────
function CanvasMock() {
  const nodes = [
    { x: 50, y: 30, label: 'デザインシステム', color: '#8b5cf6' },
    { x: 200, y: 20, label: 'Next.js', color: '#3b82f6' },
    { x: 330, y: 60, label: 'TypeScript', color: '#3b82f6' },
    { x: 20, y: 110, label: 'Figma', color: '#ec4899' },
    { x: 160, y: 120, label: 'AI設計', color: '#f59e0b' },
    { x: 290, y: 130, label: 'パフォーマンス', color: '#10b981' },
  ]
  const links = [[0,1],[0,3],[1,2],[1,4],[2,5],[4,5]]
  return (
    <svg width="360" height="160" viewBox="0 0 360 160" className="w-full max-w-sm">
      {links.map(([a,b], i) => (
        <line key={i}
          x1={nodes[a].x + 60} y1={nodes[a].y + 14}
          x2={nodes[b].x + 60} y2={nodes[b].y + 14}
          stroke="#e5e7eb" strokeWidth="1.5"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <rect x={n.x} y={n.y} width={120} height={28} rx={6}
            fill="white" stroke={n.color} strokeWidth="1.5"
          />
          <text x={n.x + 10} y={n.y + 18} fontSize="9" fill={n.color} fontWeight="600">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

// ── Bundle visual mock ────────────────────────────────────────────────────────
function BundleMock() {
  const colors = ['#8b5cf6', '#3b82f6', '#f59e0b', '#10b981']
  const labels = ['デザイン / UX', 'フロントエンド', 'AI', 'バックエンド']
  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {colors.map((c, i) => (
        <div key={i} className="relative w-20 h-24">
          {[2,1,0].map(j => (
            <div key={j} className="absolute inset-0 rounded-xl border-2 flex flex-col items-center justify-center"
              style={{
                borderColor: c,
                backgroundColor: j === 0 ? c : `${c}22`,
                transform: `rotate(${(j - 1) * 4}deg) translateY(${j * 2}px)`,
                zIndex: 3 - j,
              }}>
              {j === 0 && (
                <span className="text-[9px] font-bold text-white text-center px-1 leading-tight">{labels[i]}</span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

// ── AI chat visual mock ───────────────────────────────────────────────────────
function AIMock() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <div className="ml-auto bg-neutral-900 text-white text-xs rounded-2xl rounded-tr-sm px-4 py-2.5 w-fit max-w-[75%]">
        デザインシステムの導入経緯は？
      </div>
      <div className="bg-neutral-100 text-neutral-700 text-xs rounded-2xl rounded-tl-sm px-4 py-2.5 w-fit max-w-[80%] leading-relaxed">
        2023年Q3に統一性の課題から導入。<br/>
        Figmaコンポーネントと連携し、<br/>
        開発速度が約40%向上しました。
      </div>
      <div className="flex items-center gap-1.5 mt-1 pl-1">
        <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  )
}

// ── Main LP ───────────────────────────────────────────────────────────────────
export default function LPPage() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className="min-h-screen bg-white font-sans antialiased overflow-x-hidden">

      {/* ── Navbar ── */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur border-b border-neutral-200 shadow-sm' : ''}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-neutral-900 flex items-center justify-center">
              <span className="text-white text-xs font-bold">V</span>
            </div>
            <span className="font-bold text-neutral-900 tracking-tight">Vault</span>
          </div>
          <a
            href={APP_URL}
            className="text-sm font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-4 py-2 rounded-full transition-colors"
          >
            ログイン
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative bg-neutral-950 pt-40 pb-32 px-6 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '48px 48px' }}
        />
        {/* Gradient blobs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500 rounded-full blur-[100px] opacity-15 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/70 text-xs font-medium">Goodpatch 社内ナレッジ管理ツール</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
            散らばった知識が、<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
              つながって動き出す。
            </span>
          </h1>

          <p className="text-white/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Notion・Slack・Figmaに眠っていたチームのナレッジを集約。<br />
            グラフで関係性を掴み、AIが即座に答える。
          </p>

          <a
            href={APP_URL}
            className="inline-flex items-center gap-3 bg-white text-neutral-900 font-bold text-base px-8 py-4 rounded-2xl hover:bg-neutral-100 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-black/30"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
            </svg>
            Googleアカウントで使い始める
          </a>

          <p className="text-white/30 text-xs mt-4">@goodpatch.com アカウントが必要です</p>
        </div>

        {/* Hero app mockup */}
        <div className="relative max-w-5xl mx-auto mt-20">
          <div className="rounded-2xl border border-white/10 bg-neutral-900 overflow-hidden shadow-2xl shadow-black/60">
            {/* Fake browser bar */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <div className="ml-4 flex-1 bg-white/5 rounded-md h-5 max-w-xs" />
            </div>
            {/* Canvas preview */}
            <div className="relative h-64 sm:h-80 bg-stone-950 overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
              />
              {/* Cluster zones */}
              {[
                { x: '5%', y: '8%', w: '28%', h: '42%', label: 'デザイン / UX', color: '#8b5cf6' },
                { x: '36%', y: '5%', w: '28%', h: '38%', label: 'フロントエンド', color: '#3b82f6' },
                { x: '68%', y: '8%', w: '28%', h: '42%', label: 'AI', color: '#f59e0b' },
                { x: '20%', y: '55%', w: '60%', h: '38%', label: 'バックエンド', color: '#10b981' },
              ].map((z, i) => (
                <div key={i} className="absolute rounded-xl border"
                  style={{ left: z.x, top: z.y, width: z.w, height: z.h, borderColor: `${z.color}30`, backgroundColor: `${z.color}08` }}>
                  <span className="absolute top-2 left-3 text-[9px] font-semibold" style={{ color: `${z.color}80` }}>{z.label}</span>
                </div>
              ))}
              {/* Cards */}
              {[
                { x: '7%', y: '20%', title: 'デザインシステム', color: '#8b5cf6' },
                { x: '38%', y: '13%', title: 'Next.js 移行計画', color: '#3b82f6' },
                { x: '70%', y: '18%', title: 'AI機能 ロードマップ', color: '#f59e0b' },
                { x: '23%', y: '62%', title: 'API設計ガイドライン', color: '#10b981' },
                { x: '52%', y: '65%', title: 'DB スキーマ', color: '#10b981' },
              ].map((c, i) => (
                <div key={i} className="absolute rounded-lg border text-[8px] font-semibold px-2 py-1.5"
                  style={{ left: c.x, top: c.y, borderColor: `${c.color}60`, backgroundColor: `${c.color}15`, color: `${c.color}cc`, minWidth: 80 }}>
                  {c.title}
                </div>
              ))}
              {/* SVG connections */}
              <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                <line x1="15%" y1="28%" x2="42%" y2="20%" stroke="#ffffff10" strokeWidth="1" />
                <line x1="52%" y1="20%" x2="74%" y2="25%" stroke="#ffffff10" strokeWidth="1" />
                <line x1="42%" y1="22%" x2="30%" y2="65%" stroke="#ffffff10" strokeWidth="1" />
              </svg>
            </div>
          </div>
          {/* Glow under card */}
          <div className="absolute inset-x-10 -bottom-8 h-16 bg-violet-500/20 blur-2xl rounded-full" />
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 border-b border-neutral-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 divide-x divide-neutral-100 text-center">
            {[
              { n: 3, suffix: '秒', label: '平均ナレッジ検索時間' },
              { n: 100, suffix: '%', label: 'Googleアカウントで即ログイン' },
              { n: 4, suffix: 'つ', label: 'のクラスターで整理' },
            ].map((s, i) => (
              <div key={i} className="px-6">
                <div className="text-4xl font-black text-neutral-900 mb-1">
                  <Counter to={s.n} suffix={s.suffix} />
                </div>
                <div className="text-xs text-neutral-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="py-24 px-6 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-neutral-400 uppercase text-center mb-4">Problem</p>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 text-center mb-4 leading-tight">
            チームの知識、<br />ちゃんと活きていますか？
          </h2>
          <p className="text-neutral-500 text-center mb-14 max-w-md mx-auto">
            情報ツールを使っているのに、なぜか「知識が消える」問題は解決されない。
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: '🔍',
                title: '情報が点在している',
                desc: 'Notion・Slack・Figmaに分散していて、探すだけで30分消える。',
              },
              {
                icon: '👋',
                title: '退職で知識が消える',
                desc: '誰かが抜けると、その人の持つ暗黙知・文脈がすべて失われる。',
              },
              {
                icon: '❓',
                title: '意思決定の背景がない',
                desc: '「なぜこうなったか」が残っていなくて、同じ議論を何度も繰り返す。',
              },
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{p.icon}</div>
                <h3 className="font-bold text-neutral-900 mb-2">{p.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solution ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest text-neutral-400 uppercase mb-4">Solution</p>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 mb-4 leading-tight">
            Vault は、チームの知識を<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-blue-500">生きた地図</span>にする
          </h2>
          <p className="text-neutral-500 max-w-lg mx-auto leading-relaxed">
            カードに書いて、つなげて、AIに聞く。<br />
            それだけで知識が資産になる。
          </p>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-neutral-400 uppercase text-center mb-12">Features</p>
          <div className="grid sm:grid-cols-3 gap-6">
            <FeatureCard
              num="01"
              tag="Visualize"
              title="カンバス＆グラフ"
              desc="知識の全体像を俯瞰。カードを置いて関係性を線でつなぐと、チームの思考が地図になる。"
              visual={<CanvasMock />}
            />
            <FeatureCard
              num="02"
              tag="Organize"
              title="クラスター＆バンドル"
              desc="カテゴリ別に束ねて整理。散らかってきたら一発でまとめられる。"
              visual={<BundleMock />}
            />
            <FeatureCard
              num="03"
              tag="AI"
              title="AIチャット＆サマリー"
              desc="蓄積したナレッジをAIが要約・回答。「あの話どこだっけ」が0秒で解決。"
              visual={<AIMock />}
            />
          </div>
        </div>
      </section>

      {/* ── How to start ── */}
      <section className="py-24 px-6 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold tracking-widest text-neutral-400 uppercase mb-4">How to start</p>
              <h2 className="text-3xl font-black text-neutral-900 mb-8 leading-tight">
                3ステップで、<br />今日から使える
              </h2>
              <div className="space-y-6">
                <Step n={1} title="Googleアカウントでログイン" desc="設定不要。@goodpatch.com アカウントでそのままスタート。" />
                <Step n={2} title="カードを作成してナレッジを追加" desc="タイトルと内容を入力するだけ。Markdownにも対応。" />
                <Step n={3} title="チームで共有・検索・活用" desc="リアルタイムで同期。メンバー全員の知識にアクセスできる。" />
              </div>
            </div>
            {/* Right visual */}
            <div className="relative">
              <div className="rounded-2xl bg-neutral-900 p-6 shadow-xl">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">V</span>
                  </div>
                  <span className="text-white/60 text-xs">Vault へようこそ</span>
                </div>
                <div className="space-y-2.5">
                  {['デザインシステムの概要', 'Q3 ロードマップ', 'オンボーディングガイド', 'ブランドガイドライン'].map((t, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/5 rounded-lg px-3 py-2.5">
                      <div className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: ['#8b5cf6','#3b82f6','#f59e0b','#10b981'][i] }}
                      />
                      <span className="text-white/70 text-xs">{t}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-violet-500/30 flex items-center justify-center text-[8px] text-violet-300">H</div>
                  <span className="text-white/30 text-xs">hiroki@goodpatch.com が追加しました</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 bg-neutral-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600 rounded-full blur-[120px] opacity-15 pointer-events-none" />
        <div className="relative max-w-2xl mx-auto text-center">
          <div className="w-12 h-12 rounded-2xl bg-neutral-800 border border-white/10 flex items-center justify-center mx-auto mb-8">
            <span className="text-white text-lg font-black">V</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Goodpatchのナレッジを、<br />Vaultに。
          </h2>
          <p className="text-white/50 mb-10 text-lg">
            今日から始めれば、チームの知識は明日から資産になる。
          </p>
          <a
            href={APP_URL}
            className="inline-flex items-center gap-3 bg-white text-neutral-900 font-bold text-base px-8 py-4 rounded-2xl hover:bg-neutral-100 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-black/40"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
            </svg>
            今すぐ無料で使い始める
          </a>
          <p className="text-white/20 text-xs mt-4">@goodpatch.com アカウントが必要です</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-6 border-t border-neutral-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-neutral-900 flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">V</span>
            </div>
            <span className="text-xs text-neutral-400 font-medium">Vault — Goodpatch internal</span>
          </div>
          <p className="text-xs text-neutral-300">© 2026 Goodpatch Inc.</p>
        </div>
      </footer>

    </div>
  )
}
