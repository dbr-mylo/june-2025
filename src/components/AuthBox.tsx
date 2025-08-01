// File: components/AuthBox.tsx
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AuthBox() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  const handleLogin = async () => {
    setMessage(null)
    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      console.error('Login failed:', error.message)
      setMessage('❌ Login failed: ' + error.message)
    } else {
      setMessage('✅ Check your email for the login link.')
    }
  }

  return (
    <div className="flex items-center space-x-2 p-2 border rounded bg-white">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="border px-2 py-1 rounded text-sm"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
      >
        Send Login Link
      </button>
      {message && <p className="text-sm text-gray-700 ml-2">{message}</p>}
    </div>
  )
}
