'use client'
import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { createRoot } from 'react-dom/client'

export default function RawHTMLWithLinks({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    console.log('[DEBUG] Initial HTML:', html) // Log raw input

    try {
      const links = require('@/data/internal-links.json')
      console.log('[DEBUG] Loaded links data:', links) // Verify data loading

      let processedHtml = html
      
      // Process placeholders
      links.forEach((link: any) => {
        const placeholder = `{{${link.id}}}`
        console.log(`[DEBUG] Processing placeholder: ${placeholder}`)
        
        processedHtml = processedHtml.replace(
          new RegExp(`\\{\\{${link.id}\\}\\}`, 'g'),
          `<span 
            data-link-id="${link.id}" 
            data-debug="placeholder-replaced"
            style="color: ${link.style || '#FFAC1C'}"
          >${link.text}</span>`
        )
      })

      console.log('[DEBUG] Processed HTML:', processedHtml) // Show intermediate result
      containerRef.current.innerHTML = processedHtml

      // Convert to Next.js Links
      const linkSpans = containerRef.current.querySelectorAll('span[data-link-id]')
      console.log(`[DEBUG] Found ${linkSpans.length} placeholders to convert`)

      linkSpans.forEach(span => {
        const linkId = span.getAttribute('data-link-id')
        const link = links.find((l: any) => l.id === linkId)
        
        if (!link) {
          console.warn(`[DEBUG] No link found for ID: ${linkId}`)
          return
        }

        console.log(`[DEBUG] Converting ${linkId} to Link component`)
        const parent = span.parentElement
        if (!parent) return

        const tempDiv = document.createElement('div')
        parent.replaceChild(tempDiv, span)

        const root = createRoot(tempDiv)
        root.render(
          <Link
            href={link.url}
            className="internal-link"
            style={{ color: link.style?.replace('color:', '').trim() || '#FFAC1C' }}
            data-debug="converted-link"
            data-link-id={link.id}
          >
            {link.text}
          </Link>
        )
      })

      console.log('[DEBUG] Final DOM:', containerRef.current.innerHTML) // Final output

    } catch (error) {
      console.error('[DEBUG] Error processing links:', error)
      containerRef.current.innerHTML = html // Fallback to original
    }

  }, [html])

  return <div 
    ref={containerRef} 
    data-debug="raw-html-container"
  />
}
