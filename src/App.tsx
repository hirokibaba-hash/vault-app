import { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Archive, Settings, Layers, LogOut, User, Library } from 'lucide-react'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import CanvasPage from './app/canvas'
import VaultPage from './app/vault'
import SettingsPage from './app/settings'
import MyKnowledgePage from './app/my-knowledge'
import LoginPage from './app/login'
import LPPage from './app/lp'
import ChatWidget from './components/ChatWidget'
import { Toaster } from 'sonner'
import { useAuth } from './hooks/useAuth'

function UserAvatar({ user }: { user: SupabaseUser }) {
  const [imgError, setImgError] = useState(false)
  const src = user.user_metadata?.avatar_url ?? user.user_metadata?.picture

  if (!src || imgError) {
    return (
      <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center">
        <User size={12} className="text-neutral-500" />
      </div>
    )
  }
  return (
    <img
      src={src}
      alt=""
      referrerPolicy="no-referrer"
      className="w-6 h-6 rounded-full object-cover"
      onError={() => setImgError(true)}
    />
  )
}

const navItems = [
  { to: '/canvas', icon: Layers, label: 'キャンバス', end: true },
  { to: '/vault', icon: Archive, label: 'リスト' },
]

function AppInner() {
  const { authState, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const isLandingPath = location.pathname === '/'
  const isLoginPath = location.pathname === '/login'

  // Loading
  if (authState.status === 'loading') {
    return (
      <div className="min-h-screen bg-neutral-200 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-neutral-300 border-t-neutral-700 animate-spin" />
      </div>
    )
  }

  // LP — public, redirect to app if already logged in
  if (isLandingPath) {
    if (authState.status === 'authenticated') return <Navigate to="/canvas" replace />
    return <LPPage />
  }

  // Login — public, redirect to app if already logged in
  if (isLoginPath) {
    if (authState.status === 'authenticated') return <Navigate to="/canvas" replace />
    return (
      <>
        <LoginPage unauthorized={authState.status === 'unauthorized' ? authState.email : undefined} />
        <Toaster position="bottom-left" />
      </>
    )
  }

  // App routes — require auth
  if (authState.status === 'unauthenticated') return <Navigate to="/login" replace />
  if (authState.status === 'unauthorized') return <Navigate to="/login" replace />

  // Authenticated
  const user = authState.user
  const isMyKnowledge = location.pathname.startsWith('/my-knowledge')
  const isSettings = location.pathname === '/settings'

  return (
    <>
      <div className="flex flex-col h-screen" style={{ backgroundColor: '#ebebeb' }}>
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-md border-b border-black/[0.06] shrink-0 z-10">
          {/* Logo */}
          <div className="flex items-center flex-1 min-w-0">
            <img src="/vault_logo.svg" alt="Vault" style={{ height: 10 }} />
          </div>

          {/* Pill nav — primary views */}
          <nav className="flex items-center gap-1 bg-black/[0.05] rounded-full px-1 py-1">
            {navItems.map(({ to, icon: Icon, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-white text-neutral-900 shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-700'
                  }`
                }
              >
                <Icon size={13} />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right side: マイナレッジ + user + settings + logout */}
          <div className="flex items-center gap-1 flex-1 justify-end min-w-0">
            {/* マイナレッジ icon button */}
            <button
              onClick={() => navigate('/my-knowledge')}
              title="マイナレッジ"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isMyKnowledge
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <Library size={14} />
              <span className="hidden sm:inline">マイナレッジ</span>
            </button>

            {/* Divider */}
            <div className="w-px h-4 bg-neutral-200 mx-1" />

            {/* User avatar + name */}
            <div className="flex items-center gap-2">
              <UserAvatar user={user} />
              <span className="text-xs text-neutral-500 hidden lg:block max-w-24 truncate">
                {user.user_metadata?.full_name ?? user.email}
              </span>
            </div>

            {/* Settings icon */}
            <button
              onClick={() => navigate('/settings')}
              title="設定"
              className={`p-1.5 rounded-lg transition-colors ${
                isSettings
                  ? 'text-neutral-900 bg-neutral-100'
                  : 'text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <Settings size={14} />
            </button>

            {/* Logout icon */}
            <button
              onClick={signOut}
              title="ログアウト"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <LogOut size={14} />
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 min-h-0 overflow-hidden">
          <Routes>
            <Route path="/canvas" element={<div className="h-full overflow-hidden"><CanvasPage /></div>} />
            <Route path="/vault" element={<div className="h-full overflow-y-auto"><VaultPage /></div>} />
            <Route path="/my-knowledge" element={<div className="h-full overflow-y-auto"><MyKnowledgePage /></div>} />
            <Route path="/settings" element={<div className="h-full overflow-y-auto"><SettingsPage /></div>} />
          </Routes>
        </main>
      </div>
      <ChatWidget />
      <Toaster position="bottom-right" />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
