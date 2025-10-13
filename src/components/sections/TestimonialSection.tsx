import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

type Testimonial = {
  _id: string
  name: string
  image: string
  testimonial: string
  subDescription: string
}

export default async function TestimonialsSection() {
  try {
    const testimonials = await client.fetch<Testimonial[]>(`
      *[_type == "testimonial"] | order(_createdAt desc) [0...3] {
        _id,
        name,
        image,
        testimonial,
        subDescription
      }
    `, {}, { next: { revalidate: 60 } })

    // Don't render if no testimonials
    if (!testimonials || testimonials.length === 0) {
      return null
    }

    return (
      <section className="py-12 px-4 md:px-6 lg:px-36" id='Testimonials'>
        <div className="mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <p className="text-secondary text-base md:text-lg font-arizonia mb-2">Spa Center</p>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-light text-foreground">
              Client&apos;s Testimonials
            </h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial._id}
                className="relative bg-white"
              >
                {/* Testimonial Quote Section */}
                <div className="relative p-4">
                  {/* Opening quotation mark */}
                  <div className="absolute top-6 left-6 opacity-60">
                    <Image src="/comma.png" alt="" width={27.5} height={24} />
                  </div>

                  {/* Testimonial Content */}
                  <div className="relative z-10 pt-8 pb-4 px-4">
                    <blockquote className="text-secondary text-xs font-light leading-relaxed text-pretty min-h-[120px]">
                      {testimonial.testimonial}
                    </blockquote>
                  </div>

                  {/* Closing quotation mark */}
                  <div className="relative bottom-10 right-6 opacity-60 transform rotate-180">
                    <Image src="/comma.png" alt="" width={27.5} height={24} />
                  </div>
                </div>

                {/* Author Info */}
                <div className="px-8">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 flex-shrink-0">
                      <AvatarImage 
                        src={urlFor(testimonial.image).url()} 
                        alt={testimonial.name} 
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-secondary text-white font-light text-base">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-base truncate">
                        {testimonial.name}
                      </h4>
                      <p className="text-secondary font-light text-sm text-wrap line-clamp-2">
                        {testimonial.subDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  } catch (error) {
    console.error('Error loading testimonials:', error)
    return null
  }
}

