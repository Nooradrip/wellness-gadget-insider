import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import blogData from '@/data/blog-articles.json'
import type { Metadata } from 'next'

interface Category {
  slug: string
  name: string
  description: string
}

interface BlogData {
  mainCategories: Category[]
}

export const metadata: Metadata = {
  title: 'Pet Supplies Review Categories',
  description: 'Our curated reviews cover everything from automatic feeders to tech-driven innovations like the microchip feeder.',
}

export default function BlogHomePage() {
  const { mainCategories } = blogData as BlogData

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Added Home breadcrumb */}
      <Breadcrumbs 
        links={[
          { href: '/', text: 'Home' }
        ]} 
        currentPage="Pet Supplies Reviews" 
      />

      <h1 className="text-4xl font-bold mb-8">Pet Supplies Review Categories</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {mainCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/blog/category/${category.slug}`}
            className="block border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
            passHref
          >
            <h2 className="text-xl font-bold text-gray-800">{category.name}</h2>
            <p className="mt-2 text-gray-600">{category.description}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4">Your Guide to Automatic Feeders and Smart Pet Supplies</h2>
      <div className="bg-white border rounded-xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto text-gray-800">
        <p className="text-lg leading-relaxed">
          At Pet Gadget Insider, we help you choose the best automatic feeders and other pet supply essentials—whether you need a microchip feeder for pet food or smart pet care solutions for your dog’s or cat's routine. Our curated reviews cover everything from dog and cat automatic feeders to smart pet supplies like pet trackers, cameras and interactive cat and dog toys.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          With so many options available today—from sleek pet cameras to microchip feeders that sync with your schedule—it’s easy to feel overwhelmed by all the pet supplies available today. That’s where we come in. Our content is designed to simplify your search, offering thoughtful comparisons and practical guidance for every kind of pet parent. Whether you’re after convenience, innovation, or a smarter daily routine, we’re here to help you make decisions that feel effortless and right for your pet.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          Whether you’re shopping for a premium self-cleaning cat litter box, a feature-rich automatic feeder for cat food, or smarter ways to keep your dogs entertained and well-fed, we’ve got you covered. Each review is designed to cut through the clutter so you can make informed decisions quickly and confidently.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          We evaluate the latest innovations—like microchip feeders that personalize meals or automatic feeders that help manage portion sizes—for every pet lifestyle. Whether you're feeding kittens, managing a diet plan for pet food, or finding smarter solutions for dog food, our reviews give you the insights that matter.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          Designed with both convenience and care in mind, our guides help you compare performance, efficiency and tech-forward features across automatic feeders and other top-rated products. So whether your focus is on wellness, cleanup or daily feeding, our resources give you a head start in choosing the best gear for your furry friend.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          Our team compares performance, reliability, and value on top-rated smart pet care products across Amazon’s pet store landscape. We review what matters, so your next purchase isn’t just smart—it’s perfect for your lifestyle. Whether you’re looking for an everyday automatic feeder or tech that transforms your home, start here and elevate your pet care game.
        </p>
      </div>
    </div>
  )
}