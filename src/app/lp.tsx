import { useEffect, useRef, useState } from 'react'

const APP_URL = 'https://vault-app-lemon-nine.vercel.app'

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

// ── Floating card wrapper ─────────────────────────────────────────────────────
function Float({ children, style, className = '' }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`absolute bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.10)] border border-neutral-100 ${className}`} style={style}>
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
            <div className="w-6 h-6 rounded-md bg-neutral-900 flex items-center justify-center">
              <span className="text-white text-[10px] font-black">V</span>
            </div>
            <span className="font-black text-neutral-900 tracking-tight text-sm">Vault</span>
          </div>
          <a href={APP_URL}
            className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors">
            <GoogleIcon />
            ログイン
          </a>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">

        {/* Subtle background texture */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #f3f0ff 0%, transparent 50%), radial-gradient(circle at 80% 20%, #fef9ec 0%, transparent 40%)' }} />

        {/* Badge */}
        <div className="relative z-10 mb-8 flex items-center gap-2 bg-white border border-neutral-200 rounded-full px-4 py-1.5 shadow-sm text-xs font-medium text-neutral-500">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Goodpatch 社内ナレッジ管理ツール
        </div>

        {/* Headline */}
        <div className="relative z-10 text-center max-w-3xl mx-auto mb-6">
          <h1 className="text-[56px] sm:text-[72px] lg:text-[88px] font-black text-neutral-950 leading-[0.95] tracking-[-0.04em]">
            散らばった<br />
            知識が、<br />
            <span style={{ WebkitTextStroke: '2px #0a0a0a', color: 'transparent' }}>
              つながる。
            </span>
          </h1>
        </div>

        <p className="relative z-10 text-neutral-500 text-base sm:text-lg max-w-md text-center leading-relaxed mb-10">
          Notion・Slack・Figmaに眠るナレッジを集約。グラフで関係性を掴み、AIが即座に答える。
        </p>

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 mb-20">
          <a href={APP_URL}
            className="flex items-center gap-2.5 bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-neutral-950/20">
            <GoogleIcon />
            Googleアカウントで使い始める
          </a>
          <span className="text-xs text-neutral-400">@goodpatch.com アカウントが必要です</span>
        </div>

        {/* Floating composition */}
        <div className="relative z-10 w-full max-w-3xl mx-auto" style={{ height: 400 }}>

          {/* Center: canvas mockup */}
          <div className="absolute inset-x-[10%] inset-y-0 rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden shadow-2xl shadow-neutral-950/30">
            {/* Browser bar */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10">
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <div className="ml-3 h-4 w-32 rounded bg-white/10" />
            </div>
            {/* Canvas */}
            <div className="relative h-full bg-stone-950 overflow-hidden">
              <div className="absolute inset-0 opacity-[0.025]"
                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
              {[
                { x: '8%', y: '10%', w: '26%', h: '40%', label: 'デザイン / UX', c: '#8b5cf6' },
                { x: '37%', y: '6%', w: '26%', h: '35%', label: 'フロントエンド', c: '#3b82f6' },
                { x: '67%', y: '10%', w: '26%', h: '40%', label: 'AI', c: '#f59e0b' },
                { x: '20%', y: '54%', w: '58%', h: '36%', label: 'バックエンド', c: '#10b981' },
              ].map((z, i) => (
                <div key={i} className="absolute rounded-xl border"
                  style={{ left: z.x, top: z.y, width: z.w, height: z.h, borderColor: `${z.c}25`, backgroundColor: `${z.c}08` }}>
                  <span className="absolute top-2 left-2.5 text-[8px] font-semibold" style={{ color: `${z.c}70` }}>{z.label}</span>
                </div>
              ))}
              {[
                { x: '10%', y: '26%', title: 'デザインシステム', c: '#8b5cf6' },
                { x: '39%', y: '16%', title: 'Next.js 移行計画', c: '#3b82f6' },
                { x: '69%', y: '22%', title: 'AI ロードマップ', c: '#f59e0b' },
                { x: '24%', y: '63%', title: 'API設計', c: '#10b981' },
                { x: '50%', y: '66%', title: 'DBスキーマ', c: '#10b981' },
              ].map((c, i) => (
                <div key={i} className="absolute rounded-lg px-2 py-1.5 text-[7px] font-semibold border"
                  style={{ left: c.x, top: c.y, borderColor: `${c.c}50`, backgroundColor: `${c.c}18`, color: `${c.c}dd`, minWidth: 72 }}>
                  {c.title}
                </div>
              ))}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="16%" y1="32%" x2="43%" y2="22%" stroke="#ffffff08" strokeWidth="1" />
                <line x1="50%" y1="22%" x2="73%" y2="29%" stroke="#ffffff08" strokeWidth="1" />
                <line x1="43%" y1="24%" x2="32%" y2="66%" stroke="#ffffff08" strokeWidth="1" />
              </svg>
            </div>
          </div>

          {/* Float: cluster badge — top left */}
          <Float style={{ top: 16, left: 0, padding: '10px 14px', transform: 'rotate(-3deg)' }}>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {['#8b5cf6','#3b82f6','#f59e0b','#10b981'].map((c,i) => (
                  <div key={i} className="w-5 h-5 rounded-full border-2 border-white" style={{ backgroundColor: c }} />
                ))}
              </div>
              <div>
                <p className="text-[10px] font-bold text-neutral-900 leading-none">4 クラスター</p>
                <p className="text-[9px] text-neutral-400 mt-0.5">整理済み</p>
              </div>
            </div>
          </Float>

          {/* Float: AI response — top right */}
          <Float style={{ top: 8, right: 0, padding: '12px 14px', transform: 'rotate(2deg)', minWidth: 160 }}>
            <p className="text-[9px] font-semibold text-neutral-400 mb-1.5">AI の回答</p>
            <p className="text-[10px] text-neutral-700 leading-relaxed">デザインシステムは<br />2023年Q3に導入。<br />開発速度が40%向上。</p>
            <div className="flex gap-0.5 mt-2">
              {[0,1,2].map(i => <div key={i} className="w-1 h-1 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: `${i*120}ms` }} />)}
            </div>
          </Float>

          {/* Float: stats — bottom left */}
          <Float style={{ bottom: 24, left: -8, padding: '10px 16px', background: '#fef9c3', borderColor: '#fde68a', transform: 'rotate(1.5deg)' }}>
            <p className="text-2xl font-black text-neutral-900 leading-none">24</p>
            <p className="text-[10px] text-neutral-500 mt-0.5 font-medium">ナレッジカード</p>
          </Float>

          {/* Float: activity — bottom right */}
          <Float style={{ bottom: 32, right: -4, padding: '10px 14px', transform: 'rotate(-2deg)', minWidth: 148 }}>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center text-[8px] font-bold text-violet-600 shrink-0">H</div>
              <div>
                <p className="text-[9px] font-semibold text-neutral-800">hiroki さんが追加</p>
                <p className="text-[9px] text-neutral-400">AIロードマップ · 今</p>
              </div>
            </div>
          </Float>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-neutral-200" />
      </div>

      {/* ── Problem ──────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.15em] text-neutral-400 uppercase mb-5">Problem</p>
            <h2 className="text-[42px] sm:text-[56px] font-black text-neutral-950 leading-[1.0] tracking-[-0.03em] mb-16 max-w-xl">
              チームの知識、<br />
              ちゃんと<br />
              活きていますか？
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-px bg-neutral-200 rounded-2xl overflow-hidden">
            {[
              { icon: '🔍', num: '01', title: '情報が点在している', body: 'Notion・Slack・Figmaに分散していて、探すだけで30分消える。' },
              { icon: '👋', num: '02', title: '退職で知識が消える', body: '誰かが抜けると、その人の持つ暗黙知・文脈がすべて失われる。' },
              { icon: '❓', num: '03', title: '意思決定の背景がない', body: '「なぜこうなったか」が残っていなくて、同じ議論を何度も繰り返す。' },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 100} className="bg-white p-8 hover:bg-neutral-50 transition-colors">
                <p className="text-3xl mb-6">{p.icon}</p>
                <p className="text-[10px] font-bold tracking-widest text-neutral-300 mb-3">{p.num}</p>
                <h3 className="text-base font-black text-neutral-900 mb-3">{p.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto space-y-4">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.15em] text-neutral-400 uppercase mb-5">Features</p>
          </Reveal>

          {/* Feature 01 */}
          <Reveal>
            <div className="group rounded-3xl bg-neutral-950 overflow-hidden grid sm:grid-cols-2 min-h-[360px]">
              <div className="p-10 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-neutral-500 mb-4">01 — VISUALIZE</p>
                  <h3 className="text-3xl font-black text-white leading-tight tracking-tight mb-4">カンバス<br />＆グラフ</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">知識の全体像を俯瞰。カードを置いて関係性を線でつなぐと、チームの思考が地図になる。</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-6">
                  {['ドラッグ移動', 'ズーム', 'クラスター', 'バンドル'].map(t => (
                    <span key={t} className="text-[10px] font-medium text-neutral-500 border border-neutral-700 rounded-full px-3 py-1">{t}</span>
                  ))}
                </div>
              </div>
              <div className="relative overflow-hidden bg-stone-900 flex items-center justify-center p-6">
                <div className="absolute inset-0 opacity-[0.03]"
                  style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <svg width="280" height="200" viewBox="0 0 280 200" className="relative z-10">
                  {[
                    [20, 30], [140, 20], [240, 40], [60, 120], [170, 130],
                  ].map(([x,y], i) => {
                    const colors = ['#8b5cf6','#3b82f6','#f59e0b','#10b981','#3b82f6']
                    const labels = ['デザインシステム','Next.js','TypeScript','Figma','AI設計']
                    return (
                      <g key={i}>
                        <rect x={x} y={y} width={100} height={28} rx={8} fill={`${colors[i]}20`} stroke={colors[i]} strokeWidth="1.5" />
                        <text x={x+10} y={y+18} fontSize="8" fill={colors[i]} fontWeight="700">{labels[i]}</text>
                      </g>
                    )
                  })}
                  <line x1="70" y1="44" x2="145" y2="34" stroke="#ffffff18" strokeWidth="1.5" />
                  <line x1="190" y1="34" x2="245" y2="54" stroke="#ffffff18" strokeWidth="1.5" />
                  <line x1="155" y1="48" x2="95" y2="134" stroke="#ffffff18" strokeWidth="1.5" />
                  <line x1="190" y1="48" x2="200" y2="144" stroke="#ffffff18" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </Reveal>

          {/* Feature 02 + 03 */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Reveal delay={80}>
              <div className="rounded-3xl border border-neutral-200 bg-white overflow-hidden h-full">
                <div className="p-8">
                  <p className="text-[10px] font-bold tracking-widest text-neutral-400 mb-4">02 — ORGANIZE</p>
                  <h3 className="text-2xl font-black text-neutral-950 leading-tight tracking-tight mb-3">クラスター<br />＆バンドル</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">カテゴリ別に束ねて整理。散らかってきたら一発でまとめられる。</p>
                </div>
                <div className="px-8 pb-8 flex gap-3 justify-center">
                  {[
                    { label: 'デザイン', c: '#8b5cf6' },
                    { label: 'フロント', c: '#3b82f6' },
                    { label: 'AI', c: '#f59e0b' },
                    { label: 'バック', c: '#10b981' },
                  ].map((b, i) => (
                    <div key={i} className="relative w-16 h-20">
                      {[2,1,0].map(j => (
                        <div key={j}
                          className="absolute inset-0 rounded-xl border-2"
                          style={{
                            borderColor: b.c,
                            backgroundColor: j === 0 ? b.c : `${b.c}15`,
                            transform: `rotate(${(j-1)*5}deg) translateY(${j*2}px)`,
                            zIndex: 3 - j,
                          }}>
                          {j === 0 && <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black text-white text-center px-1 leading-tight">{b.label}</span>}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="rounded-3xl border border-neutral-200 bg-white overflow-hidden h-full">
                <div className="p-8">
                  <p className="text-[10px] font-bold tracking-widest text-neutral-400 mb-4">03 — AI</p>
                  <h3 className="text-2xl font-black text-neutral-950 leading-tight tracking-tight mb-3">AIチャット<br />＆サマリー</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">蓄積したナレッジをAIが要約・回答。「あの話どこだっけ」が0秒で解決。</p>
                </div>
                <div className="px-8 pb-8 space-y-2">
                  <div className="ml-auto bg-neutral-900 text-white text-[11px] rounded-2xl rounded-tr-sm px-3.5 py-2.5 w-fit max-w-[85%]">
                    デザインシステムの導入経緯は？
                  </div>
                  <div className="bg-neutral-100 text-neutral-700 text-[11px] rounded-2xl rounded-tl-sm px-3.5 py-2.5 w-fit max-w-[90%] leading-relaxed">
                    2023年Q3に統一性の課題から導入。<br />開発速度が約40%向上しました。
                  </div>
                  <div className="flex items-center gap-1 pl-1 pt-0.5">
                    {[0,1,2].map(i => <div key={i} className="w-1 h-1 rounded-full bg-neutral-300 animate-bounce" style={{ animationDelay: `${i*150}ms` }} />)}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── How to start ─────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-16 items-center">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.15em] text-neutral-400 uppercase mb-5">How to start</p>
            <h2 className="text-[42px] sm:text-[52px] font-black text-neutral-950 leading-[1.0] tracking-[-0.03em] mb-10">
              3ステップで、<br />今日から。
            </h2>
            <div className="space-y-8">
              {[
                { n: '01', title: 'Googleアカウントでログイン', body: '設定不要。@goodpatch.com アカウントでそのままスタート。' },
                { n: '02', title: 'カードを作ってナレッジを追加', body: 'タイトルと内容を入力するだけ。Markdownにも対応。' },
                { n: '03', title: 'チームで共有・活用', body: 'リアルタイムで同期。メンバー全員の知識にアクセスできる。' },
              ].map((s, i) => (
                <div key={i} className="flex gap-5">
                  <span className="text-[11px] font-black text-neutral-300 mt-0.5 shrink-0 w-6">{s.n}</span>
                  <div>
                    <p className="font-black text-neutral-900 mb-1">{s.title}</p>
                    <p className="text-sm text-neutral-500 leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="rounded-3xl bg-neutral-950 p-6 shadow-2xl shadow-neutral-950/20">
              <div className="flex items-center gap-2 pb-4 border-b border-white/10 mb-4">
                <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center">
                  <span className="text-white text-[9px] font-black">V</span>
                </div>
                <span className="text-white/40 text-xs">Vault</span>
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <div className="space-y-2">
                {[
                  { label: 'デザインシステムの概要', c: '#8b5cf6', time: '2時間前' },
                  { label: 'Q3 ロードマップ', c: '#3b82f6', time: '昨日' },
                  { label: 'オンボーディングガイド', c: '#f59e0b', time: '3日前' },
                  { label: 'ブランドガイドライン', c: '#10b981', time: '1週間前' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors px-3 py-2.5 cursor-default">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.c }} />
                    <span className="text-white/70 text-xs flex-1">{item.label}</span>
                    <span className="text-white/25 text-[10px]">{item.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-violet-500/30 flex items-center justify-center text-[8px] font-bold text-violet-300">H</div>
                <span className="text-white/30 text-[10px]">hiroki@goodpatch.com が更新</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-8 px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="rounded-3xl bg-neutral-950 px-10 py-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(ellipse at 50% 0%, #7c3aed20 0%, transparent 60%)' }} />
              <div className="relative z-10">
                <p className="text-xs font-bold tracking-[0.15em] text-neutral-500 uppercase mb-6">Get Started</p>
                <h2 className="text-[42px] sm:text-[60px] font-black text-white leading-[1.0] tracking-[-0.03em] mb-4">
                  Goodpatchのナレッジを、<br />
                  <span style={{ WebkitTextStroke: '1.5px #ffffff', color: 'transparent' }}>Vaultに。</span>
                </h2>
                <p className="text-neutral-500 mb-10 text-base max-w-sm mx-auto">
                  今日から始めれば、チームの知識は明日から資産になる。
                </p>
                <a href={APP_URL}
                  className="inline-flex items-center gap-2.5 bg-white hover:bg-neutral-100 text-neutral-950 font-black text-sm px-8 py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl">
                  <GoogleIcon />
                  今すぐ無料で使い始める
                </a>
                <p className="text-neutral-600 text-xs mt-4">@goodpatch.com アカウントが必要です</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="py-8 px-6 border-t border-neutral-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-neutral-900 flex items-center justify-center">
              <span className="text-white text-[8px] font-black">V</span>
            </div>
            <span className="text-xs text-neutral-400 font-medium">Vault — Goodpatch internal</span>
          </div>
          <p className="text-xs text-neutral-300">© 2026 Goodpatch Inc.</p>
        </div>
      </footer>

    </div>
  )
}
