import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Wellness Gadget Insider',
  description: 'Learn about Wellness Gadget Insider - your source for unbiased reviews of gadgets for wellness and wellbeing',
  openGraph: {
    title: 'About Us | Wellness Gadget Insider',
    description: 'Learn about Wellness Gadget Insider - your source for unbiased reviews of gadgets for wellness and wellbeing',
    images: [
      {
        url: '/images/nickgarcia.png',
        width: 1200,
        height: 630,
        alt: 'Nick Garcia, Wellness Gadget Insider',
      },
    ],
  },
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-4 max-w-3xl">
      {/* Hero Section */}
      <div className="text-center mb-0">
        <h1 className="text-4xl font-bold mb-2">About Wellness Gadget Insider</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Your guide to wellness and wellbeing gadgets: stress relief methods, skincare devices, home medical equipment and pain management. We use Nick AI to do unbiased comparisons of top models the top wellness tech available on Amazon.
        </p>
      </div>

      {/* Author Bio */}
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
            <h2 className="text-2xl font-bold mb-1">Hi, I'm Nick AI.</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              I'm a tech tinkerer and the data analyst and behind <em>Wellness Gadget Insider</em>.
              I make it easy for you to find and use wellness devices in the comfort of your home.
            </p>
          </div> {/* Added missing closing div */}
        </div>
      </section>

      {/* Mission Sections */}
      <section className="prose dark:prose-invert max-w-none mx-auto space-y-2 mt-4">
        <div className="bg-white dark:bg-gray-800 rounded shadow p-3 md:p-4">
          <h2 className="text-2xl font-bold">How Wellness Gadget Insider Began</h2>
          <p className="mt-1">
            What began as a weekend AI experiment turned into a full-blown mission to explore the various wellness devices available on Amazon. From effective pain management to red light therapy skincare devices, I've reviewed everything with one question in mind: "Can this make life better for you?"
          </p>
          <p className="mt-1">
            What does wellness mean and how can wellness devices improve your wellbeing? Wellness is the active pursuit of holistic health and well-being across multiple dimensions, including physical, mental, emotional and social aspects, to achieve a balanced and fulfilling life. Gadgets for wellness can't do all that but they can contribute to your wellbeing. Tech for pain management, for example can help you achieve better wellbeing in your life, as can home medical equipment, red light therapy skincare and stress relief methods. They are simple gadgets that can play a big role in the overall wellness picture.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded shadow p-3 md:p-4">
          <h2 className="text-2xl font-bold">Why Pet Gadget Insider Exists</h2>
          <p className="mt-1">
            If you've ever spent hours scrolling through Amazon trying to find the perfect solution to help with back pain or mindfulness, you probably ended up frustrated and overwhelmed. Gadgets for wellness aren't exactly easy to find. I want to make it easy.
          </p>
          <p className="mt-1">
            <em>Wellness Gadget Insider</em> was born to cut through the noise. My goal is simple: to help people make smarter, faster choices when it comes to the wellness they can provide for themselves at home. Whether you're hunting for home medical equipment that reads your body fat or a device to help with foot pain, I'm here to guide you straight to what works.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded shadow p-3 md:p-4">
          <h2 className="text-2xl font-bold">Our Review Process</h2>
          <p className="mt-1">
            To select the best tech for wellness, I use my AI data-driven process that leverages Amazon's internal product rankings:
          </p>
          <ul className="mt-1 pl-4 space-y-0">
            <li>Overall customer ratings</li>
            <li>Verified review volume</li>
            <li>Sales rank within categories</li>
          </ul>
          <p className="mt-1">
            The result is an unbiased list of products you can count on — each vetted for practicality, reliability and ease of integration into your wellness routine. After my list is in hand, I pick one product out of the five that I think you'll like the best. I use data to choose, not any particular brand name.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded shadow p-3 md:p-4">
          <h2 className="text-2xl font-bold">Our Promise to You</h2>
          <ul className="space-y-1 pl-4">
            <li><strong>Curated Reviews, Not Fluff</strong>: Each list is curated by my AI in an unbiased fashion</li>
            <li><strong>Trust Over Trend</strong>: We spotlight real value over viral hype</li>
            <li><strong>Your Wellbeing First</strong>: Results speak loudest when they work for you.</li>
          </ul>
        </div>

        <div className="text-center py-5">
          <p className="text-base font-medium">
            Wellness Gadget Insider isn't just about unbiased reviews. It's about helping people achieve wellness at home. If your doctor recommends a wellness device, that's excellent! If not, conditions vary, so make sure to consult with your doctor before using a gadget that promotes your wellbeing. Most of them work on bodily systems in some way or fashion, so you'll want that approval before you get started. I hope you find solutions that help and that Nick AI helps in your search.
          </p>
          <p className="mt-1">— Nick Garcia, nick.garcia@petgadgetinsider.org, founder of Nick AI, Wellness Gadget Insider and Pet Gadget Insider.</p>
        </div>
      </section>
    </div>
  )
}