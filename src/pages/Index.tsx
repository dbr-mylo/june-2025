import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Editor from '@/components/Editor'
import AuthBox from '@/components/AuthBox'

export default function IndexPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      // Handle magic-link redirect (PKCE)
      const url = new URL(window.location.href)
      const code = url.searchParams.get('code')

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(
          window.location.href
        )

        if (error) {
          console.error('exchangeCodeForSession failed:', error)
        }

        // Clean URL so refresh does not reprocess the code
        window.history.replaceState({}, document.title, url.pathname)
      }

      const { data } = await supabase.auth.getUser()
      setUser(data?.user ?? null)
      setLoading(false)
    }

    initAuth()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    return null
  }

  return user ? <Editor /> : <AuthBox />
}
