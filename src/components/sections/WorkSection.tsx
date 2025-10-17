import Image from "next/image"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

type RecentWork = {
  _id: string
  title: string
  image: string
}

export default async function WorkSection() {
  try {
    // Already correctly implemented to show only the latest 3 items
    const recentWorks = await client.fetch<RecentWork[]>(`
      *[_type == "recentWork"] | order(_createdAt desc) [0...3] {
        _id,
        title,
        image
      }
    `)

    // Don't render if no recent work
    if (!recentWorks || recentWorks.length === 0) {
      return null
    }

    return (
      <section className="px-4 md:px-8 lg:px-36 py-6">
        <div className="">
          {/* Header */}
          <div className="text-center mb-8 md:mb-16">
            <p className="text-secondary font-light font-arizonia text-base md:text-lg mb-3 md:mb-4 tracking-wide">
              From The Latest Work
            </p>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-light text-foreground">
              Our Latest Work
            </h2>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {recentWorks.map((work) => (
              <div key={work._id}>
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3]">
                  <Image
                    src={urlFor(work.image).url()}
                    alt={work.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                {/* Service Name */}
                <div className="px-2">
                  <h3 className="text-lg md:text-xl font-light font-poppins text-primary leading-relaxed">
                    {work.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative Element */}
          <div className="flex justify-center mt-8 md:mt-16">
            <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-[#fac0f9] to-transparent"></div>
          </div>
        </div>
      </section>
    )
  } catch (error) {
    return null
  }
}