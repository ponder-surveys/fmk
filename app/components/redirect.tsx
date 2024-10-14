'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function RedirectComponent() {
  const router = useRouter()

  useEffect(() => {
    router.push('https://weponder.io')
  }, [router])

  return null
}
