import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function AuthBox() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setMessage(null)
    setLoading(true)

    // Always redirect back to this app, correct for localhost + Vercel
    const redirectUrl = `${window.location.origin}/auth/callback`

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectUrl,
      },
    })

    setLoading(false)

    if (error) {
      console.error("Login failed:", error)
      setMessage("Login failed. Please try again.")
      return
    }

    setMessage("Check your email for the login link.")
  }

  return (
    <div className="flex items-center gap-2 p-3 border rounded bg-white">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="border px-2 py-1 rounded text-sm w-64"
      />

      <button
        onClick={handleLogin}
        disabled={!email || loading}
        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Sending…" : "Send Login Link"}
      </button>

      {message && (
        <span className="text-sm text-gray-600 ml-2">{message}</span>
      )}
    </div>
  )
}
