'use client'
import Image from 'next/image'
import Link from 'next/link'
import { FeaturesData } from '@/app/api/data'
import { Icon } from '@iconify/react'

const Features = () => {
  return (
    <div className="py-8">
      {/* Header */}
      <div className="container mx-auto px-4 text-center mb-20">
        <p className="text-primary text-lg font-normal mb-2 tracking-widest uppercase">
          FEATURES
        </p>
        <h2 className="text-2xl lg:text-3xl font-semibold text-black dark:text-white mx-auto max-w-3xl">
          We review trending gadgets for wellness.
        </h2>
      </div>

      {/* Feature cards */}
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FeaturesData.map((items, i) => (
            <div
              className="p-6 pt-8 rounded-3xl bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-black shadow-sm relative overflow-hidden group transition-all duration-300"
              key={i}
            >
              {/* Image placement with full oval visible */}
              <div className="w-full flex justify-center mb-6 relative z-10">
                <div className="w-40 h-40 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden shadow-lg">
                  <Image
                    src={items.imgSrc}
                    alt={items.heading}
                    width={160}
                    height={160}
                    className="object-contain transition-transform group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Card content */}
              <div className="text-center z-0 relative">
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  {items.heading}
                </h3>
                <p className="text-base text-black/50 dark:text-white/50 mt-2">
                  {items.subheading}
                </p>
                <div className="mt-4 flex justify-center">
                  <Link
                    href={items.path}
                    className="text-base font-medium text-primary hover:underline flex items-center"
                  >
                    Learn More
                    <Icon
                      icon="tabler:chevron-right"
                      width="20"
                      height="20"
                      className="ml-1"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features
