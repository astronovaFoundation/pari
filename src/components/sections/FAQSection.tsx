"use client"

import { Plus, Minus } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function FAQSection() {
  const faqItems = [
    {
      question: "Q1. What is eyebrow threading?",
      answer:
        "Eyebrow threading is a hair removal technique that uses a twisted cotton thread to remove unwanted hair from the eyebrow area. This ancient method originated in Asia and the Middle East and provides precise shaping with clean, defined lines.",
    },
    {
      question: "Q2. How long does eyebrow threading last?",
      answer:
        "Eyebrow threading typically lasts 3-6 weeks, depending on your hair growth rate. The results tend to last longer than tweezing because threading removes hair from the root, giving you smoother brows for an extended period.",
    },
    {
      question: "Q3. Is eyebrow threading painful?",
      answer:
        "Most people experience minimal discomfort during eyebrow threading. The sensation is often described as a quick pinching feeling. The process is generally less painful than waxing and becomes more comfortable with regular sessions.",
    },
    {
      question: "Q4. What should I expect during my first threading session?",
      answer:
        "During your first session, the technician will assess your brow shape and discuss your desired look. The threading process typically takes 10-15 minutes. You may experience slight redness afterward, which usually subsides within an hour.",
    },
    {
      question: "Q5. How should I prepare for eyebrow threading?",
      answer:
        "Avoid plucking or trimming your eyebrows for at least 2 weeks before threading to ensure there's enough hair to work with. Come with clean skin, free of makeup or moisturizer around the brow area for the best results.",
    },
    {
      question: "Q6. What aftercare is needed post-threading?",
      answer:
        "After threading, avoid touching the area, applying makeup, or using harsh products for 24 hours. You can apply aloe vera gel or a cold compress to soothe any irritation. Avoid sun exposure and swimming for the first day.",
    },
  ]

  const [openItem, setOpenItem] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenItem((prev) => (prev === index ? null : index))
  }

  return (
    <section id='faq' className="min-h-fit bg-white px-4 sm:px-6 md:px-8 mt-5">
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

