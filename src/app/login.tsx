import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage({ unauthorized }: { unauthorized?: string }) {
  const { signInWithGoogle } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    await signInWithGoogle()
    // Page will redirect to Google — no need to reset loading
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden" style={{ backgroundColor: '#EEEAE4', paddingBottom: 'clamp(200px, 28vh, 320px)' }}>
      <style>{`
        @keyframes peepFloat { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
        @keyframes peepFloatFlip { 0%,100%{transform:scaleX(-1) translateY(0px)} 50%{transform:scaleX(-1) translateY(-8px)} }
      `}</style>

      {/* Peep characters */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none select-none flex items-end justify-center" style={{ gap: 'clamp(8px, 2vw, 32px)', zIndex: 0 }}>
        <img src="/peeps/peep-standing-12.svg" alt="" style={{ height: 370, maxHeight: '31vh', display: 'block', animation: 'peepFloat 7.2s ease-in-out 0.4s infinite' }} />
        <img src="/peeps/peep-standing-9.svg" alt="" style={{ height: 370, maxHeight: '31vh', display: 'block', animation: 'peepFloatFlip 7.0s ease-in-out 0.6s infinite' }} />
        <img src="/peeps/peep-standing-19.svg" alt="" style={{ height: 370, maxHeight: '31vh', display: 'block', animation: 'peepFloat 8s ease-in-out 1s infinite' }} />
        <img src="/peeps/peep-standing-22.svg" alt="" style={{ height: 370, maxHeight: '31vh', display: 'block', animation: 'peepFloat 6.8s ease-in-out 0.8s infinite' }} />
        <img src="/peeps/peep-standing-13.svg" alt="" style={{ height: 370, maxHeight: '31vh', display: 'block', animation: 'peepFloatFlip 7.3s ease-in-out 1.2s infinite' }} />
        <img src="/peeps/peep-standing-25.svg" alt="" style={{ height: 370, maxHeight: '31vh', display: 'block', animation: 'peepFloatFlip 7.4s ease-in-out 1.2s infinite' }} />
      </div>

      <div className="w-full max-w-sm relative" style={{ zIndex: 1 }}>
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <img src="/vault_logo.svg" alt="Vault" style={{ height: 56, display: 'block', marginBottom: 12 }} />
          <p className="text-sm text-neutral-500">チームのナレッジを一箇所に</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8">
          <h2 className="text-base font-semibold text-neutral-900 mb-1">ログイン</h2>
          <p className="text-sm text-neutral-500 mb-6">
            Goodpatch アカウント（@goodpatch.com）でログインしてください
          </p>

          {/* Unauthorized error */}
          {unauthorized && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
              <span className="font-medium">{unauthorized}</span> はアクセス権限がありません。
              <br />
              <span className="text-red-400 text-xs mt-0.5 block">@goodpatch.com のアカウントでログインしてください。</span>
            </div>
          )}

          {/* Google login button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-sm font-medium text-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {/* Google icon */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
            </svg>
            {loading ? 'リダイレクト中...' : 'Google でログイン'}
          </button>
        </div>

        <p className="text-center text-xs text-neutral-400 mt-6">
          アクセス権限は管理者にお問い合わせください
        </p>
      </div>
    </div>
  )
}
