"use client"

import { Plus, Minus } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function FAQSection() {
const faqItems = [
  {
    question: "Q1. What services do you offer?",
    answer:
      "We offer a full range of beauty services including threading, waxing, facials, lash lifting, eyelash extensions, eyebrow tinting, henna tattoo, and more.",
  },
  {
    question: "Q2. Do I need to make an appointment, or do you accept walk-ins?",
    answer:
      "We welcome walk-ins, but appointments are recommended to ensure your preferred time and stylist are available.",
  },
  {
    question: "Q3. What are your opening hours?",
    answer:
      "We are open 7 days a week: Monday–Saturday, 9:30 AM – 6:30 PM, and Sunday 11:00 AM – 5:30 PM.",
  },
  {
    question: "Q4. How can I book an appointment?",
    answer:
      "You can book by calling us at 510-479-1045, visiting our salon, or scheduling online through our website or social media link.",
  },
  {
    question: "Q5. What payment methods do you accept?",
    answer:
      "We accept cash, debit/credit cards, and digital payments like Apple Pay, Google Pay, and Zelle (if applicable).",
  },
  {
    question: "Q6. Do you offer beauty packages or membership deals?",
    answer:
      "Yes! We have special packages and discounts for multiple services. Please ask our staff for details.",
  },
  {
    question: "Q7. What skincare products do you use?",
    answer:
      "We use professional-grade, dermatologist-approved products designed for all skin types.",
  },
  {
    question: "Q8. Do you offer services for men too?",
    answer:
      "Yes, we provide selected services for men such as facials, threading, and waxing.",
  },
  {
    question: "Q9. Do you offer treatments for sensitive skin?",
    answer:
      "Yes, we customize all our facials and treatments based on your skin type, including sensitive or acne-prone skin.",
  },
  {
    question: "Q10. Is your salon safe and hygienic?",
    answer:
      "Absolutely. We sanitize all tools and surfaces after every client and follow strict cleanliness and safety standards.",
  },
  {
    question: "Q11. What if I need to cancel or reschedule my appointment?",
    answer:
      "Please notify us at least 24 hours in advance if you need to cancel or reschedule.",
  },
  {
    question: "Q12. Can I wear makeup after my facial or waxing?",
    answer:
      "It’s best to avoid makeup for at least 24–48 hours after treatment to let your skin breathe and heal properly.",
  },
  {
    question: "Q13. What should I do before my facial or waxing appointment?",
    answer:
      "Avoid using harsh skincare products, exfoliants, or retinol 24–48 hours before your appointment. Clean skin helps us deliver the best results.",
  },
  {
    question: "Q14. Are your Estheticians licensed?",
    answer:
      "Absolutely. All our Estheticians are fully licensed and professionally trained to provide safe and effective treatments.",
  },
  {
    question: "Q15. How often should I get a facial?",
    answer:
      "For most clients, every 4–5 weeks is ideal to maintain healthy, glowing skin.",
  },
  {
    question: "Q16. What if I need to cancel or reschedule my appointment?",
    answer:
      "Please notify us at least 24 hours in advance if you need to cancel or reschedule.",
  },
];


  const [openItem, setOpenItem] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenItem((prev) => (prev === index ? null : index))
  }

  return (
    <section id='faq' className="min-h-fit bg-white px-4 sm:px-6 md:px-8 mb-10 mt-5">
      <div className="min-w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left side - Illustration */}
          <div className="flex justify-center lg:sticky lg:top-8 order-2 lg:order-1">
            <div className="relative w-full max-w-md lg:max-w-none">
              <Image
                src="/faq.png"
                alt="FAQ Illustration"
                className="w-full h-auto"
                width={700}
                height={700}
              />
            </div>
          </div>

          {/* Right side - FAQ Content */}
          <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
            {/* Header */}
            <div className="text-center lg:text-left">
              <p className="text-secondary text-lg sm:text-xl md:text-2xl font-medium mb-3 sm:mb-4 font-arizonia">From The Blog</p>
              <h1 className="text-foreground text-2xl sm:text-3xl lg:text-4xl font-bold text-balance">
                Frequently Asked Question(FAQ)
              </h1>
            </div>

            {/* FAQ Accordion Items */}
            <div className="space-y-3 sm:space-y-4">
              {faqItems.map((item, index) => {
                const isOpen = openItem === index
                return (
                  <div
                    key={index}
                    className="bg-white border-b border-primary cursor-pointer overflow-hidden hover:border-primary/40"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full p-3 sm:p-4 flex items-center justify-between text-left transition-colors group"
                    >
                      <span className="text-foreground font-medium text-xs sm:text-sm lg:text-base pr-3 sm:pr-4">{item.question}</span>
                      {isOpen ? (
                        <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:text-primary/40 transition-colors flex-shrink-0" />
                      ) : (
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:text-primary/40 transition-colors flex-shrink-0" />
                      )}
                    </button>

                    <div
                      className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
                    >
                      <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0">
                        <div className="border-t border-primary/10 pt-2 sm:pt-3">
                          <p className="text-secondary text-xs sm:text-sm lg:text-base leading-relaxed">{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

