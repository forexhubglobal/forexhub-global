'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

function AuthCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleAuth = async () => {
      const code = searchParams.get('code')
      const next = searchParams.get('next') ?? '/dashboard'
      const supabase = createClient()

      if (code) {
        // PKCE Flow
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
          router.push(next)
        } else {
          router.push('/login?error=Ralat PKCE. Sila cuba lagi.')
        }
      } else {
        // Implicit Flow (Hash)
        // @supabase/ssr browser client automatically parses the hash in the URL
        // and sets the session cookie behind the scenes.
        const { data } = await supabase.auth.getSession()
        if (data.session) {
          router.push(next)
        } else {
          // Add a tiny delay to allow Supabase client to process the hash if it hasn't yet
          setTimeout(async () => {
            const { data: retryData } = await supabase.auth.getSession()
            if (retryData.session) {
              router.push(next)
            } else {
              router.push('/login?error=Pautan tidak sah atau telah tamat tempoh.')
            }
          }, 1000)
        }
      }
    }
    
    handleAuth()
  }, [router, searchParams])

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-neon-blue border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-slate-400 font-medium">Mengesahkan pautan keselamatan...</p>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  )
}
