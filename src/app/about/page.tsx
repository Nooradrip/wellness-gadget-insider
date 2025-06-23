import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Pet Gadget Insider',
  description: 'Learn about Pet Gadget Insider - your source for smart pet supplies reviews and pet care recommendations',
  openGraph: {
    title: 'About Us | Pet Gadget Insider',
    description: 'Discover our mission to help pet owners find the best smart pet supplies for pet care... easily.',
    images: [
      {
        url: '/images/nickgarcia.png',
        width: 1200,
        height: 630,
        alt: 'Nick Garcia, Pet Gadget Insider',
      },
    ],
  },
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-4 max-w-3xl">
      {/* Hero Section */}
      <div className="text-center mb-0">
        <h1 className="text-4xl font-bold mb-2">About Pet Gadget Insider</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Your guide to smarter pet care through pet supplies that have innovative technology. We compare top models of pet feeders, cameras, trackers and even self-cleaning litter boxes.
        </p>
      </div>

      {/* Author Bio - Minimal spacing */}
      <section className="mb-0 mt-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="shrink-0">
            <Image
              src="/images/nickgarcia.png"
              alt="Nick Garcia"
              width={160}
              height={160}
              className="rounded-full border-3 border-amber-100 shadow"
              priority
            />
          </div>
          <div className="text-center md:text-left mt-1 md:mt-0">
            <h2 className="text-2xl font-bold mb-1">Hi, I'm Nick.</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              I'm a pet dad, tech tinkerer, and the voice behind <em>Pet Gadget Insider</em>.
              If you're anything like me, your pets aren't just animals — they're family.
            </p>
            <h2 className="text-xl font-bold mt-2 text-amber-600 dark:text-amber-400">I'm a pet parent.</h2>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">Meet my pet family, Missy and Topy.</h3>
          </div>
        </div>
      </section>

      {/* Pet Stories - Minimal spacing */}
      <section className="mb-0 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3">
            <div className="mb-1 overflow-hidden rounded-lg">
              <Image
                src="/images/missy1.jpg"
                alt="Missy"
                width={400}
                height={300}
                className="w-full h-auto object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-center">Missy</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
              Found playing with her brothers and sisters in a tattered box seven years ago, Missy's honey-brown eyes and fast wag pulled on every fiber of my heart. So small and malnourished, the vet thought she was a chihuahua. She's a big, healthy girl now!  
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3">
            <div className="mb-1 overflow-hidden rounded-lg">
              <Image
                src="/images/topy.jpg"
                alt="Toppy"
                width={400}
                height={300}
                className="w-full h-auto object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-center">Topy</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
              We got him from a shelter and named him Tiger. But his claws did indeed hurt, so he became Topy -- problem solved. Four years old and super sweet.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Sections - Minimal spacing */}
      <section className="prose dark:prose-invert max-w-none mx-auto space-y-2 mt-4">
        <div className="bg-white dark:bg-gray-800 rounded shadow p-3 md:p-4">
          <h2 className="text-2xl font-bold">How Pet Gadget Insider Began</h2>
          <p className="mt-1">
            These two furballs have stretched my heart in ways I never thought possible. They're the reason why smart pet gadgets became so fascinating to me — and the reason you're reading this now. What began as a weekend AI experiment turned into a full-blown mission to explore modern pet care. From behavioral tracking collars to Wi-Fi-enabled pet cameras, I've reviewed everything with one question in mind: "Does this make life better for my pets?"
          </p>
          <p className="mt-1">
            Quality pet supplies aren't just about buying what's popular. It's about choosing tools that match your pet's personality and your lifestyle. That's my unbiased mission. Pet care is a daily rhythm, and the right product can turn chaos into consistency. A smart pet feeder, for example, doesn't just save time — it creates routine and peace of mind.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded shadow p-3 md:p-4">
          <h2 className="text-2xl font-bold">Why Pet Gadget Insider Exists</h2>
          <p className="mt-1">
            If you've ever spent hours scrolling through Amazon trying to find the perfect automatic cat feeder, only to end up frustrated and overwhelmed — you're not alone. That's the experience I want to eliminate for you.
          </p>
          <p className="mt-1">
            <em>Pet Gadget Insider</em> was born to cut through the noise. My goal is simple: help pet owners (like me!) make smarter, faster choices when it comes to pet care tech. Whether you're hunting for the most efficient pet feeder, intuitive smart collar or a better water fountain, I'm here to guide you straight to what works.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded shadow p-3 md:p-4">
          <h2 className="text-2xl font-bold">Our Review Process</h2>
          <p className="mt-1">
            To select the best smart pet gadgets, I use an AI data-driven process that leverages Amazon's internal product rankings:
          </p>
          <ul className="mt-1 pl-4 space-y-0">
            <li>Overall customer ratings</li>
            <li>Verified review volume</li>
            <li>Sales rank within categories</li>
          </ul>
          <p className="mt-1">
            The result is a list of products you can count on — each vetted for practicality, reliability, and ease of integration into your pet care routine. After my list is in hand, I pick one product that I think you'll like the best.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded shadow p-3 md:p-4">
          <h2 className="text-2xl font-bold">Our Promise to You</h2>
          <ul className="space-y-1 pl-4">
            <li><strong>Curated Reviews, Not Fluff</strong>: Each list is curated in an unbiased fashion</li>
            <li><strong>Trust Over Trend</strong>: We spotlight real value over viral hype</li>
            <li><strong>Pet Happiness First</strong>: From tail wags to purrs, results speak loudest when your pets love it.</li>
          </ul>
        </div>

        <div className="text-center py-3">
          <p className="text-base font-medium">
            Pet Gadget Insider isn't just about reviews. It's about helping people like you and me love our pets better using smart tools that actually work. Whether you're upgrading your pet care routine or searching for more reliable pet supplies, I hope you find solutions here that make your home smarter, your day easier and your pets healthier. Thanks for being here — and give your furry friends an ear scratch from me.
          </p>
          <p className="mt-1">— Nick Garcia</p>
        </div>
      </section>
    </div>
  )
}