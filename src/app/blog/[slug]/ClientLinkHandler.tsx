'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ClientLinkHandler() {
  const router = useRouter()

  useEffect(() => {
    // This will convert all links after page loads
    const convertLinks = () => {
      document.querySelectorAll('a[href^="/"]').forEach(link => {
        link.onclick = (e) => {
          e.preventDefault()
          router.push(link.getAttribute('href') || '/')
        }
      })
    }

    // Run immediately and whenever content changes
    convertLinks()
    const observer = new MutationObserver(convertLinks)
    observer.observe(document.body, { subtree: true, childList: true })
    
    return () => observer.disconnect()
  }, [router])

  return null
}