import React from 'react';
import Hero from '@/components/Home/Hero';
import Features from '@/components/Home/Features'; // Removed .tsx extension
import Cook from '@/components/Home/Cook';
import Gallery from '@/components/Home/Gallery';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smart Pet Supplies Reviews | Pet Gadget Insider',
  description: 'Get the scoop on pet-friendly pet supplies for optimal pet care that\'s fun.',
  metadataBase: new URL('https://petgadgetinsider.tech'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Pet Supplies Reviews | Pet Gadget Insider',
    description: 'Get the inside scoop on pet-friendly pet supplies like automatic pet feeders.',
    url: 'https://petgadgetinsider.tech',
    siteName: 'Pet Gadget Insider',
    images: [
      {
        url: '/images/dogcat.png',
        width: 1200,
        height: 630,
        alt: 'Pet-friendly pet care gadgets',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Scoop on Smart Pet Supplies | Pet Gadget Insider',
    description: 'Get the inside story on pet-friendly smart gadgets',
    images: ['/images/cat.png'],
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
  name: 'Pet Gadget Insider',
  url: 'https://petgadgetinsider.tech',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://petgadgetinsider.tech/search?q={search_term_string}',
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