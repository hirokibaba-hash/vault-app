import { useEffect, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

const ALLOWED_DOMAIN = 'goodpatch.com'

function isAllowedEmail(email: string | undefined): boolean {
  if (!email) return false
  return email.toLowerCase().endsWith(`@${ALLOWED_DOMAIN}`)
}

export type AuthState =
  | { status: 'loading' }
  | { status: 'unauthenticated' }
  | { status: 'unauthorized'; email: string }
  | { status: 'authenticated'; user: User; session: Session }

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({ status: 'loading' })

  useEffect(() => {
    // Check existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setAuthState({ status: 'unauthenticated' })
        return
      }
      if (!isAllowedEmail(session.user.email)) {
        supabase.auth.signOut()
        setAuthState({ status: 'unauthorized', email: session.user.email ?? '' })
        return
      }
      setAuthState({ status: 'authenticated', user: session.user, session })
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setAuthState({ status: 'unauthenticated' })
        return
      }
      if (!isAllowedEmail(session.user.email)) {
        supabase.auth.signOut()
        setAuthState({ status: 'unauthorized', email: session.user.email ?? '' })
        return
      }
      setAuthState({ status: 'authenticated', user: session.user, session })
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithGoogle = () =>
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          // Prompt account selection every time for clarity
          prompt: 'select_account',
          // Restrict to goodpatch.com accounts on the Google side
          hd: ALLOWED_DOMAIN,
        },
      },
    })

  const signOut = () => supabase.auth.signOut()

  return { authState, signInWithGoogle, signOut }
}
