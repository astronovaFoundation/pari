import Image from 'next/image'

export default function GallerySection() {
  return (
    <section id='gallery' className="min-h-screen">
      {/* First Section - With responsive padding */}
      <section className="px-4 sm:px-6 md:px-16 lg:px-36 py-6 ">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-lg sm:text-xl md:text-2xl mb-2 text-secondary font-arizonia">Spa Center</p>
          <h1 className="text-xl sm:text-2xl md:text-4xl font-light text-foreground">Our Gallery</h1>
        </div>

        {/* Gallery Grid - Desktop Layout */}
        <div className="hidden lg:grid grid-cols-12 gap-2 h-[450px]">
          {/* Left column - 2 stacked images */}
          <div className="col-span-3 grid grid-rows-2 gap-2">
            <div className="relative overflow-hidden rounded-sm">
              <Image
                src="/gallery-1x1.webp"
                alt="Spa tools and products"
                fill
                sizes='(100vw)'
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative overflow-hidden rounded-sm">
              <Image
                src="/gallery-2x1.webp"
                alt="Eye beauty treatment"
                fill
                sizes='(100vw)'
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Center large image */}
          <div className="col-span-5 relative overflow-hidden rounded-sm">
            <Image
              src="/gallery-main.webp"
              alt="Eyelash extension treatment"
              fill
              sizes='(100vw)'
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Right column - 4 images in 2x2 grid */}
          <div className="col-span-4 grid grid-rows-2 grid-cols-2 gap-2">
            <div className="relative rounded-sm">
              <Image
                src="/gallery-1x2.webp"
                alt="Beautiful eyelashes"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative overflow-hidden rounded-sm">
              <Image
                src="/gallery-1x3.webp"
                alt="Facial treatment"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative overflow-hidden rounded-sm">
              <Image
                src="/gallery-2x2.webp"
                alt="Eyebrow treatment"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative overflow-hidden rounded-sm">
              <Image
                src="/gallery-3x3.webp"
                alt="Eye beauty"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Gallery Grid - Mobile/Tablet Layout */}
        <div className="lg:hidden grid grid-cols-2 gap-2 sm:gap-3">
          <div className="relative overflow-hidden rounded-sm h-40 sm:h-48 md:h-56">
            <Image src="/gallery-1x1.webp" alt="Spa tools and products" fill className="object-cover hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="relative overflow-hidden rounded-sm h-40 sm:h-48 md:h-56">
            <Image src="/gallery-2x1.webp" alt="Eye beauty treatment" fill className="object-cover hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="relative overflow-hidden rounded-sm h-80 col-span-2">
            <Image src="/gallery-main.webp" alt="Eyelash extension treatment" fill sizes='(100vw)' className="object-cover hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="relative overflow-hidden rounded-sm h-40 sm:h-48 md:h-56">
            <Image src="/gallery-1x2.webp" alt="Beautiful eyelashes" fill className="object-cover hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="relative overflow-hidden rounded-sm h-40 sm:h-48 md:h-56">
            <Image src="/gallery-1x3.webp" alt="Facial treatment" fill className="object-cover hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="relative overflow-hidden rounded-sm h-40 sm:h-48 md:h-56">
            <Image src="/gallery-2x2.webp" alt="Facial treatment" fill className="object-cover hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="relative overflow-hidden rounded-sm h-40 sm:h-48 md:h-56">
            <Image src="/gallery-3x3.webp" alt="Facial treatment" fill className="object-cover hover:scale-105 transition-transform duration-300" />
          </div>
        </div>
      </section>

      {/* Second Section - Full width gallery strip (uniform rectangles) */}
      <section className="py-0 mt-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="relative overflow-hidden aspect-[4/3]">
            <Image src="/gallery-1.webp" alt="Eyebrow treatment" fill className="object-cover" />
          </div>
          <div className="relative overflow-hidden aspect-[4/3]">
            <Image src="/gallery-2.webp" alt="Eyelash extension process" fill className="object-cover" />
          </div>
          <div className="relative overflow-hidden aspect-[4/3]">
            <Image src="/facial.webp" alt="Facial treatment" fill className="object-cover" />
          </div>
          <div className="relative overflow-hidden aspect-[4/3]">
            <Image src="/threading.webp" alt="Spa relaxation treatment" fill className="object-cover" />
          </div>
        </div>
      </section>
    </section>
  )
}

