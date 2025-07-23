import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Wellness FAQ | Wellness Gadget Insider',
  description: 'Get answers about wellness and how tech for wellbeing can help you at home',
}

const faqItems = [
  {
    question: "What does wellness mean?",
    answer: "Wellness is the holistic integration of physical, mental and spiritual well-being that extends beyond just the absence of illness. It represents a conscious, self-directed process of fulfilling one's full potential through healthy lifestyle choices. Wellness encompasses proactive prevention and maximizing vitality across all dimensions of life. It's a dynamic state that requires ongoing awareness and intentional choices toward optimal functioning."
  },
  {
    question: "What are the 7 areas of wellness?",
    answer: "The seven interconnected dimensions include physical wellness (flexibility and pain management), emotional wellness (stress relief methods), intellectual wellness (lifelong learning), social wellness (meaningful relationships), spiritual wellness (purpose and values), occupational wellness (career satisfaction) and environmental wellness (healthy surroundings). Each dimension contributes to overall well-being and requires balanced attention. These areas, especially physical and emotional wellness, work synergistically to create a comprehensive approach to health, where improvement in one dimension often positively impacts others."
  },
  {
    question: "How can devices for wellness help at home?",
    answer: "Wellness gadgets provide personalized pain management and stress relief methods. Home medical equipment like smart scales track body composition trends while a relaxation massager is a great stress reduction technique. Breathing machines help you maintain maximum lung power and sleep aid devices help you get the rest that balances your day. You can also improve your appearance with skincare devices and your mobility with medical equipment for your back, neck and knees. These technologies empower individuals to take proactive control of their health in daily life by making wellness practices more accessible right at home."
  },
  {
    question: "What is wellness in one word?",
    answer: "Balance."
  },
  {
    question: "How do you explain wellness?",
    answer: "Wellness is the active process of making conscious choices toward a healthy and fulfilling life across all dimensions of being. It involves developing awareness of how daily choices impact both immediate and long-term health outcomes. Unlike passive health, wellness requires intentional engagement with practices that nourish body, mind and spirit. It's a personalized journey toward optimal functioning where individuals take responsibility for creating habits that support their best possible quality of life."
  },
  {
    question: "Why is wellness important?",
    answer: "Wellness enhances quality of life, reduces healthcare costs and improves resilience against chronic diseases. Wellness is accomplished mostly at home. It enables individuals to function at their peak capacity both personally and professionally. Comprehensive wellness practices strengthen immune function, extend longevity and increase daily energy levels. Wellness creates sustainable health foundations that support individuals through life's challenges and transitions."
  },
  {
    question: "What behavior contributes most to wellness?",
    answer: "Consistent self-awareness and proactive health management form the cornerstone of sustainable wellness. Regular physical activity combined with mindful nutrition creates powerful physiological benefits. Quality sleep hygiene and effective stress-reduction techniques regulate crucial biological processes. Developing emotional intelligence through reflection and social connection completes the foundation for holistic well-being."
  },
  {
    question: "What is the difference between health and wellness?",
    answer: "Health typically refers to the absence of disease or medical conditions, while wellness encompasses the active pursuit of optimal functioning across all life dimensions. Health is often measured by medical biomarkers, whereas wellness considers subjective quality-of-life factors. Wellness precedes health - it's the proactive approach that prevents health issues from developing. Wellness also has the power to help reduce symptoms if health issues occur. While health can be determined by healthcare providers, wellness is self-directed and requires personal engagement beyond clinical settings."
  },
  {
    question: "What is the essence of wellness?",
    answer: "The essence of wellness lies in the harmonious integration of body, mind and spirit through conscious daily choices. It represents the continuous journey toward realizing one's full human potential in all life domains. Wellness fundamentally involves taking personal responsibility for creating health rather than merely treating illness. Its core is the understanding that all aspects of life are interconnected and require balanced nurturing for true vitality."
  },
  {
    question: "What are the 8 pillars of wellness?",
    answer: "The comprehensive framework includes physical, emotional, intellectual, social, spiritual, occupational, financial and environmental wellness. Physical focuses on bodily health through exercise and nutrition, while emotional addresses stress management and resilience. Intellectual involves cognitive engagement and social emphasizes relationships. Spiritual concerns purpose and meaning, occupational career satisfaction, financial resource management and environmental our interaction with surroundings. These pillars create a roadmap for holistic self-improvement."
  },
  {
    question: "Who defines wellness?",
    answer: "The World Health Organization originally defined wellness as 'a state of complete physical, mental and social well-being.' The National Wellness Institute further developed multidimensional models emphasizing active processes. Researchers and healthcare professionals continuously refine concepts through evidence-based studies. Ultimately, individuals define personal wellness through their unique values, goals and life circumstances within broader cultural contexts."
  },
  {
    question: "What are the lifestyle factors?",
    answer: "Key modifiable factors include nutrition quality, physical activity levels, sleep patterns, stress management techniques, substance avoidance and social connection quality. Environmental factors like air/water quality and living conditions significantly influence wellness outcomes. Psychological aspects such as mindset, emotional regulation and purpose also play crucial roles. These interconnected elements collectively determine approximately 80% of health outcomes according to population health studies."
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
        <h1 className="text-4xl font-bold mb-4">Wellness FAQ</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Get answers about wellness and how tech for wellbeing can help you at home
        </p>
      </div>

      <div className="space-y-6 mb-12">
        {faqItems.map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-2">
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