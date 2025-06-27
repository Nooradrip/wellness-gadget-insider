import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Smart Pet Care FAQ | Pet Gadget Insider',
  description: 'Get answers about smart pet care supplies including automatic feeders, GPS trackers, and pet cameras',
}

const faqItems = [
  {
    question: "What exactly are smart pet supplies?",
    answer: "Smart pet supplies are technology-enhanced products that automate, monitor, or improve aspects of pet care through features like app connectivity, sensors, and automated functions."
  },
  {
    question: "Are automatic feeders worth the investment?",
    answer: "Absolutely. Automatic feeders ensure consistent meal times and portion control, which is especially valuable for pets with special diets, busy owners, or multi-pet households."
  },
  {
    question: "How do smart pet fountains benefit my pet?",
    answer: "Dog fountains and cat fountains provide continuous filtered water flow, encouraging hydration while removing impurities. Some models even track water consumption to alert you to potential health issues."
  },
  {
    question: "What should I look for in a pet feeder?",
    answer: "Key features of dog feeders and cat feeders include: reliable scheduling, portion control, battery backup, camera integration, and compatibility with your pet's food type (kibble size, wet food capability)."
  },
  {
    question: "Do self-cleaning litter boxes really work?",
    answer: "Yes! The models we've reviewed here automatically sift waste into a sealed compartment, reducing odor and maintenance. They're ideal for cats who prefer clean boxes and owners who want convenience."
  },
  {
    question: "How accurate are GPS pet trackers?",
    answer: "Modern trackers use GPS+GLONASS with cellular connectivity, providing real-time location updates accurate within 5-10 feet. They're perfect for adventurous pets."
  },
  {
    question: "Can pet cameras help with separation anxiety?",
    answer: "Definitely. Two-way audio lets you comfort your pet, while treat dispensers with cameras reinforce positive behavior. Some pet cameras barking alerts so you can check in when needed."
  },
  {
    question: "What health metrics can smart collars track?",
    answer: "Advanced models monitor activity levels, sleep quality, calories burned, skin temperature, and even provide location history - great for spotting health changes early."
  },
  {
    question: "Are interactive cat toys and dog toys safe for unsupervised play?",
    answer: "Most pet toys are designed for safe independent use, but check for: sturdy construction, automatic shut-offs, and non-toxic materials. Always supervise initial play sessions."
  },
  {
    question: "How do I choose between WiFi and Bluetooth pet care devices?",
    answer: "WiFi offers unlimited range but requires home network. Bluetooth works offline but has shorter range (30-100 ft). Consider your needs - WiFi for remote access, Bluetooth for home use."
  },
  {
    question: "What's the battery life like on smart pet supplies?",
    answer: "Varies by device: Feeders/trackers typically last 2-6 months on batteries, while cameras usually need constant power. Look for low-power modes and rechargeable options."
  },
  {
    question: "Can smart pet feeders help with multiple pets?",
    answer: "Yes! Many feeders have microchip recognition, cameras distinguish between pets, and activity monitors can track individuals if each wears their own device."
  },
  {
    question: "Are there smart solutions for pet medications?",
    answer: "Absolutely. Automated treat dispensers can schedule pills/treats, send reminders, and some even have cameras to confirm medication was taken properly."
  },
  {
    question: "How difficult are these smart app pet feeders to set up?",
    answer: "Most pet feeders feature simple app-guided setup. Basic tech literacy is sufficient - typically just connecting to WiFi and configuring settings through intuitive mobile apps."
  },
  {
    question: "What if the power goes out?",
    answer: "Quality pet feeders have battery backups (feeders typically 12-48 hours). For critical devices like feeders, consider models with cellular failover options."
  },
  {
    question: "Do vets recommend smart pet supplies?",
    answer: "Many vets endorse smart pet supplies for: maintaining consistent routines, early health detection, and enabling remote monitoring between visits. Always consult your vet about specific needs."
  },
  {
    question: "How secure is the data from pet cameras?",
    answer: "Reputable pet camera brands use bank-grade encryption. Always enable two-factor authentication, use strong passwords and check privacy policies before purchasing."
  },
  {
    question: "Can pet feeders integrate with smart home systems?",
    answer: "Many work with Alexa/Google Home, allowing voice control and routines. Some even trigger actions - like turning on lights when your pet approaches their feeder."
  },
  {
    question: "What's the best starter smart pet product?",
    answer: "We recommend beginning with a pet camera or automatic feeder - they address universal needs and provide immediate value without overwhelming complexity."
  },
  {
    question: "Where can I find reliable reviews of smart pet supplies?",
    answer: "Right here at Pet Gadget Insider! We rigorously test all products and maintain updated 'best of' lists for every category based on real-world performance."
  }
]

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Breadcrumbs
        currentPage="FAQ"
        links={[
          { href: '/', text: 'Home' }
        ]}
      />
      
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })
        }}
      />
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Smart Pet Supplies FAQ</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Your complete guide to tech-powered pet care solutions
        </p>
      </div>

      <div className="space-y-6 mb-12">
        {faqItems.map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-2">
              {item.question}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}