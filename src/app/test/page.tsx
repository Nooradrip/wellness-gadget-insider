'use client'
import RawHTMLWithLinks from '@/components/RawHTMLWithLinks'
import { useEffect } from 'react'

export default function TestPage() {
  // Debugging setup
  useEffect(() => {
    console.log('Test component mounted')
    try {
      const links = require('@/data/internal-links.json')
      console.log('Links data verified:', links)
    } catch (error) {
      console.error('Failed to load links:', error)
    }
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Link Replacement Test</h1>
      
      <div className="space-y-6">
        {/* Test Case 1: Single Link */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Basic Link</h2>
          <RawHTMLWithLinks html={`<p>Test link: {{dry-cat-food28}}</p>`} />
        </div>

        {/* Test Case 2: Multiple Links */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Multiple Links</h2>
          <RawHTMLWithLinks html={`
            <ul>
              <li>First: {{dry-cat-food28}}</li>
              <li>Second: {{dry-cat-food29}}</li>
            </ul>
          `} />
        </div>

        {/* Test Case 3: Inline Link */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Inline Context</h2>
          <RawHTMLWithLinks html={`
            <p>You might enjoy {{dry-cat-food28}} or {{dry-cat-food29}} for your pets.</p>
          `} />
        </div>
      </div>
    </div>
  )
}