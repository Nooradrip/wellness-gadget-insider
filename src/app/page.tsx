import React from 'react';
import Hero from '@/components/Home/Hero';
import Features from '@/components/Home/Features'; // Removed .tsx extension
import Cook from '@/components/Home/Cook';
import Gallery from '@/components/Home/Gallery';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wellness Tech Reviews | Wellness Gadget Insider',
  description: 'Get the inside scoop on gadgets for wellness and wellbeing.',
  metadataBase: new URL('https://wellnessgadgetinsider.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Wellness Tech Reviews | Wellness Gadget Insider',
    description: 'Get the inside scoop on gadgets for wellness and wellbeing.',
    url: 'https://wellnessgadgetinsider.vercel.app',
    siteName: 'Wellness Gadget Insider',
    images: [
      {
        url: '/images/wellness17.jpg',
        width: 1200,
        height: 630,
        alt: 'Gadgets for wellness and wellbeing',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Scoop on Gadgets for Wellness | Wellness Gadget Insider',
    description: 'Get the inside scoop on gadgets for wellness and wellbeing',
    images: ['/images/wellness18.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    }
  }
};

// Schema.org structured data for pet products
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Wellness Gadget Insider',
  url: 'https://wellnessgadgetinsider.vercel.app',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://wellnessgadgetinsider.vercel.app/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
};

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'Product',
      url: 'https://petgadgetinsider.tech/products/auto-feeder',
      name: 'Smart Automatic Pet Feeder',
      image: '/images/auto-feeder.jpg',
      description: 'Programmable pet feeder with portion control and voice recording',
      brand: {
        '@type': 'Brand',
        name: 'PetTech'
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: '89.99'
      }
    },
    {
      '@type': 'Product',
      url: 'https://petgadgetinsider.tech/products/gps-tracker',
      name: 'Pet GPS Tracker Collar',
      image: '/images/gps-collar.jpg',
      description: 'Real-time location tracking for your pet with geofencing',
      brand: {
        '@type': 'Brand',
        name: 'TrackPaw'
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: '129.99'
      }
    }
  ]
};

export default function Home() {
  return (
    <main>
      {/* Structured data scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      
      <Hero />
      <Features />
      <Cook />
      <Gallery />
    </main>
  );
}