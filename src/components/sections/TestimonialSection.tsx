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
    // Already correctly implemented to show only the latest 3 items
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
      <section className="py-16 px-4 md:px-6 lg:px-36" id='Testimonials'>
        <div className="mx-auto ">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-secondary text-base md:text-lg font-arizonia mb-2">Spa Center</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-foreground">
              Client&apos;s Testimonials
            </h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial._id}
                className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Testimonial Quote Section */}
                <div className="relative p-6 pb-4">
                  {/* Opening quotation mark */}
                  <div className="absolute top-6 left-6 opacity-60">
                    <Image src="/comma.webp" alt="" width={30} height={30} />
                  </div>

                  {/* Testimonial Content */}
                  <div className="relative z-10 p-8 ">
                    <blockquote className="text-secondary text-sm leading-relaxed italic text-pretty">
                      &quot;{testimonial.testimonial}&quot;
                    </blockquote>
                  </div>

                  {/* Closing quotation mark */}
                  <div className="absolute bottom-4 right-6 opacity-60 transform rotate-180">
                    <Image src="/comma.webp" alt="" width={30} height={30} />
                  </div>
                </div>

                {/* Author Info */}
                <div className="px-6 pb-6 pt-2">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 flex-shrink-0 ring-2 ring-primary/20">
                      <AvatarImage 
                        src={urlFor(testimonial.image).url()} 
                        alt={testimonial.name} 
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium text-base">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground text-base truncate">
                        {testimonial.name}
                      </h4>
                      <p className="text-secondary font-light text-sm text-wrap line-clamp-2 mt-1">
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