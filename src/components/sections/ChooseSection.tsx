import Image from "next/image"
import { Award, Users, Sparkles, Heart } from "lucide-react"

export default function ChooseSection() {
  const features = [
    {
      icon: Award,
      title: "Expert Stylists",
      description: "Trained by seasoned beauty professionals"
    },
    {
      icon: Sparkles,
      title: "Premium Products",
      description: "Quality products from U.S. and Europe"
    },
    {
      icon: Users,
      title: "Personalized Care",
      description: "Tailored services for every client"
    },
    {
      icon: Heart,
      title: "Long-lasting Results",
      description: "Flawless outcomes that endure"
    }
  ]

  return (
    <section id="ChooseUs" className="relative w-full min-h-[70vh]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/WhyUs.png"
          alt="Beauty treatment background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col md:flex-row w-full min-h-[70vh] items-stretch">
        {/* Left Section - How We are Special */}
        <div className="flex flex-1 items-center justify-center bg-primary/30 p-8 md:p-12">
          <div className="max-w-lg text-center h-full flex flex-col justify-center">
            <h2 className="mb-6 text-3xl font-semibold text-foreground underline underline-offset-10 decoration-white md:text-4xl">
              How We are Special
            </h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <feature.icon className="w-8 h-8 mx-auto mb-2 text-foreground" />
                  <h3 className="text-sm font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-xs text-black">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Why Are Us? */}
        <div className="flex flex-1 items-center justify-center bg-primary/30 p-8 md:p-12">
          <div className="max-w-lg text-center h-full flex flex-col justify-center">
            <h2 className="mb-6 text-3xl font-semibold text-foreground md:text-4xl underline underline-offset-10 decoration-white">
              Why Are Us?
            </h2>
            <p className="text-balance leading-relaxed text-black">
              Pari Eyebrow, Lashes & Threading Palace is where timeless elegance meets expert artistry. We specialize in
              precision threading, luxurious lash extensions, and brow perfection — all designed to elevate your natural
              beauty. Step into our serene space and experience refined service, premium products, and results that
              radiate confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

