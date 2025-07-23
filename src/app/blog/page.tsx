import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import blogData from '@/data/blog-articles.json'
import type { Metadata } from 'next'

interface Category {
  slug: string
  name: string
  description: string
  image: string
}

interface BlogData {
  mainCategories: Category[]
}

export const metadata: Metadata = {
  title: 'Health and Wellness Gadget Review Categories',
  description: 'Our health and wellness gadget reviews cover everything from tens machines for back pain to facial red light therapy.',
}

// FAQ data array
const faqItems = [
  {
    question: "What is health and wellness?",
    answer: "Health and wellness represent the holistic integration of physical, mental and emotional wellbeing through proactive lifestyle choices. Wellness extends beyond mere absence of illness to include active pursuit of optimal functioning across all life dimensions. This comprehensive approach encompasses preventive care, healthy habits and balanced living. It's a continuous journey toward achieving one's full potential in all aspects of life."
  },
  {
    question: "What is the definition of health and wellbeing?",
    answer: "Health refers to the physical state of the body including absence of disease and proper physiological functioning. Wellbeing encompasses broader life satisfaction, purpose and emotional resilience that contribute to quality of life. Together they form a holistic concept that addresses both biological and psychosocial aspects of human existence. True health and wellbeing enable individuals to thrive in their daily activities and relationships."
  },
  {
    question: "How do you define good health and wellness?",
    answer: "Good health and wellness manifest as sustained energy levels, emotional balance and resilience to stress. It involves maintaining physical fitness through proper nutrition and exercise while cultivating mental clarity and emotional stability. Wellness is reflected in positive social connections and a sense of purpose in daily activities. Ultimately it's characterized by the capacity to prevent illness and recover quickly from health challenges."
  },
  {
    question: "What are the 5 aspects of health and wellbeing?",
    answer: "The five core aspects include physical wellbeing (nutrition, exercise, sleep), emotional wellbeing (stress management, resilience), social wellbeing (meaningful relationships), intellectual wellbeing (continuous learning) and spiritual wellbeing (purpose, values). Each dimension contributes uniquely to overall wellness and requires balanced attention. These interconnected elements work synergistically to create comprehensive health foundations. Neglecting any single aspect can compromise the entire wellbeing ecosystem."
  }
]

export default function BlogHomePage() {
  const { mainCategories } = blogData as BlogData

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs 
        links={[
          { href: '/', text: 'Home' }
        ]} 
        currentPage="Health and Wellness Gadget Reviews" 
      />

      <h1 className="text-4xl font-bold mb-8">Health and Wellness Gadget Review Categories</h1>

      {/* Two-column grid layout with small left-aligned images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mainCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/blog/category/${category.slug}`}
            className="block border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
            passHref
          >
            <div className="flex items-start">
              {/* Slightly larger image on left */}
              <div className="flex-shrink-0 mr-4">
                {category.image && (
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                )}
              </div>
              
              {/* Text content on right */}
              <div>
                <h2 className="text-xl font-bold text-gray-800">{category.name}</h2>
                <p className="mt-1 text-gray-600">{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4">Your Guide to Health and Wellness Technology</h2>
      <div className="bg-white border rounded-xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto text-gray-800">
        <p className="text-lg leading-relaxed">
          At Wellness Gadget Insider, we help you choose the best health and wellness devices for your wellbeing journey, including healthy massage technology for recovery. Our reviews cover essential categories from relaxation tools to recovery systems, focusing on products that are meant to enhance your wellness. Discover how the right home devices can transform your daily routine and help create a personal wellness sanctuary. We review gadgets that make professional-grade treatments accessible from the comfort of your living space.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          With so many options for wellness available today, it's easy to feel overwhelmed by technology choices. That's where our expertise in health and wellness comes in. Our content is designed to simplify your search for the perfect healthy massage device and other wellbeing tools. We offer thoughtful comparisons and practical guidance for every wellness need. Explore our curated selection of home gadgets that bring spa-like experiences to your doorstep. From compact massage devices to portable recovery devices, we help you build your ideal wellness ecosystem.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          Whether you're shopping for a daily skincare device or long-term wellbeing technology, we've got you covered. Each review cuts through marketing clutter so you can make informed decisions about products that help enhance your wellness. Wellness Gadget Insider is your trusted guide in the health tech landscape, especially for wellness at home. Our reviews consider practical factors like features and usage tips.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          We evaluate the latest innovations in health and wellness, from advanced stress relief methods to pain management. Our reviews give you insights that matter for your wellbeing journey, whether you're maintaining fitness or optimizing daily wellness routines. Discover how the right medical equipment gadgets can help transform your approach to personal health and wellness.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          Designed with both efficacy and user experience in mind, our guides help you compare performance and value. Whether your focus is a healthy massage for pain management or overall wellbeing, our resources help you choose tools that align with your wellness objectives. We prioritize your wellness journey and the role of technology in achieving it. Learn which devices offer the best integration with smart home systems for seamless wellness routines. We also highlight gadgets that require minimal technical expertise while delivering maximum wellness benefits.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          We use AI to compare specifications and user experiences for top-rated wellness products. We analyze what matters, so your next health and wellness purchase isn't just smart—it's transformative for your wellbeing. Whether you're looking for home medical equipment, stress reduction methods or other wellness tech, start here and elevate your health game.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Health and Wellness FAQ</h2>
        
        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-3">
                {item.question}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}