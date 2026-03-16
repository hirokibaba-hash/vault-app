import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { Archive, MessageSquare, Settings, Layers, LogOut } from 'lucide-react'
import CanvasPage from './app/canvas'
import VaultPage from './app/vault'
import ChatPage from './app/chat'
import SettingsPage from './app/settings'
import LoginPage from './app/login'
import { Toaster } from 'sonner'
import { useAuth } from './hooks/useAuth'

const navItems = [
  { to: '/', icon: Layers, label: 'キャンバス', end: true },
  { to: '/vault', icon: Archive, label: 'リスト' },
  { to: '/chat', icon: MessageSquare, label: 'AIチャット' },
  { to: '/settings', icon: Settings, label: '設定' },
]

export default function App() {
  const { authState, signOut } = useAuth()

  // Loading
  if (authState.status === 'loading') {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-neutral-300 border-t-neutral-700 animate-spin" />
      </div>
    )
  }

  // Not logged in or unauthorized domain
  if (authState.status === 'unauthenticated' || authState.status === 'unauthorized') {
    return (
      <>
        <LoginPage unauthorized={authState.status === 'unauthorized' ? authState.email : undefined} />
        <Toaster position="bottom-right" />
      </>
    )
  }

  // Authenticated
  const user = authState.user

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen bg-stone-50">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-neutral-200 shrink-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-neutral-900 flex items-center justify-center">
              <span className="text-white text-xs font-bold">V</span>
            </div>
            <span className="font-semibold text-neutral-900 text-sm tracking-tight">Vault</span>
          </div>

          {/* Pill nav */}
          <nav className="flex items-center gap-1 bg-neutral-100 rounded-full px-1 py-1">
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

          {/* User info + sign out */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {user.user_metadata?.avatar_url && (
                <img
                  src={user.user_metadata.avatar_url}
                  alt=""
                  className="w-6 h-6 rounded-full object-cover"
                />
              )}
              <span className="text-xs text-neutral-500 hidden sm:block">
                {user.user_metadata?.full_name ?? user.email}
              </span>
            </div>
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
            <Route path="/" element={<div className="h-full overflow-hidden"><CanvasPage /></div>} />
            <Route path="/vault" element={<div className="h-full overflow-y-auto"><VaultPage /></div>} />
            <Route path="/chat" element={<div className="h-full overflow-y-auto"><ChatPage /></div>} />
            <Route path="/settings" element={<div className="h-full overflow-y-auto"><SettingsPage /></div>} />
          </Routes>
        </main>
      </div>
      <Toaster position="bottom-right" />
    </BrowserRouter>
  )
}
