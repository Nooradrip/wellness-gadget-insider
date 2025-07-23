import React from 'react';
import { Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react';

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Wellness Gadget Insider', // Changed to new site name
    template: '%s',
  },
  description: 'Expert reviews of wellness technology and health gadgets', // Updated description
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://wellness-gadget-insider.vercel.app'), // Updated default URL
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="35_OX-Xb7UFbNy2iQm3FcqOozBI9kIdbyXyKUlemNGQ" />
        
        {/* Fixed Google Analytics Script */}
        <Script 
          strategy="afterInteractive" 
          src="https://www.googletagmanager.com/gtag/js?id=G-R2XEL04Y6X" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R2XEL04Y6X', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        
        {/* SEO Meta Tags */}
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="robots" content="all" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#FFAC1C" />
        
        {/* Favicons */}
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicons/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/images/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/favicons/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/images/favicons/android-chrome-512x512.png" />
      </head>
      <body className={`${font.className} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  )
}