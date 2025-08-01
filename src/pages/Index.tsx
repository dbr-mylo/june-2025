import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Editor from '@/components/Editor'
import AuthBox from '@/components/AuthBox'

export default function IndexPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data?.user || null)
    }

    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return user ? <Editor /> : <AuthBox />
}
