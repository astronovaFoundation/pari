"use client"

import { useRef, useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination } from "swiper/modules"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Swiper as SwiperType } from "swiper"
import Image from "next/image"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

type Banner = {
  _id: string
  title: string
  image: string
  order: number
}

export default function BannerSection() {
  const swiperRef = useRef<SwiperType>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [banners, setBanners] = useState<Banner[]>([])

  // Fetch banners from Sanity
  useEffect(() => {
    async function fetchBanners() {
      try {
        const data = await client.fetch<Banner[]>(`
          *[_type == "banner"] | order(order asc) {
            _id,
            title,
            image,
            order
          }
        `)
        setBanners(data || [])
      } catch (error) {
        console.error('Error loading banners:', error)
      }
    }

    fetchBanners()
  }, [])

  if (banners.length === 0) {
    return null
  }

  return (
    <div className="relative w-full">
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[29/9] overflow-hidden">
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={800}
          effect="slide"
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex)
          }}
          className="w-full h-full"
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner._id}>
              <div className="w-full h-full relative">
                <Image
                  src={urlFor(banner.image).url()}
                  alt={banner.title}
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute hidden left-2 md:left-6 top-1/2 cursor-pointer bg-white/90 hover:bg-white backdrop-blur-sm -translate-y-1/2 z-20 w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full md:flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl group border border-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#2d2c40] group-hover:text-[#7a7992] transition-colors duration-300" />
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute hidden right-2 md:right-6 top-1/2 cursor-pointer bg-white/90 hover:bg-white backdrop-blur-sm -translate-y-1/2 z-20 w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full md:flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl group border border-white/20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#2d2c40] group-hover:text-[#7a7992] transition-colors duration-300" />
        </button>

        {/* Navigation Dots */}
        <div className="absolute bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {banners.map((_, index) => {
            const isActive = index === activeIndex
            return (
              <button
                key={index}
                onClick={() => swiperRef.current?.slideToLoop(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all duration-300 ease-in-out focus:outline-none ${
                  isActive
                    ? "bg-primary w-5 md:w-6 h-1.5 md:h-2 rounded-full"
                    : "bg-primary/40 hover:bg-primary/70 w-2.5 md:w-3 h-1 md:h-1.5 rounded-full"
                }`}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

