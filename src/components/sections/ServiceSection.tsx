import React from "react"
import Image from "next/image"
import { Car, Leaf, Smile } from "lucide-react"

export default function ServicesSection() {
  const specialServices = [
    {
      id: 1,
      name: "Unlimited Free Parking",
      description: "Convenient and secure parking available for all our valued customers at no extra cost.",
      icon: <Car className="w-6 h-6 sm:w-8 sm:h-8" />,
    },
    {
      id: 2,
      name: "Peaceful Environment",
      description: "Tranquil and serene atmosphere designed to provide you with the ultimate relaxation experience.",
      icon: <Leaf className="w-6 h-6 sm:w-8 sm:h-8" />,
    },
    {
      id: 3,
      name: "Friendly Environment",
      description: "Warm and welcoming staff dedicated to making your visit comfortable and enjoyable.",
      icon: <Smile className="w-6 h-6 sm:w-8 sm:h-8" />,
    },
  ]

  const services = [
    {
      id: 1,
      title: "THREADING",
      image: "/threading.webp",
      description:
        "You are welcome to call but you can also book a massage online! Please feel free to reach out with any questions.",
    },
    {
      id: 2,
      title: "WAXING",
      image: "/waxing.webp",
      description:
        "Book your massage online and view orthopedic massage therapy pricing at our booking page or at our price lists.",
    },
    {
      id: 3,
      title: "FACIAL",
      image: "/facial.webp",
      description:
        "Each one of our staff members are licensed massage therapists who have gone above and beyond in training.",
    },
    {
      id: 4,
      title: "OTHER",
      image: "/others.webp",
      description:
        "Book your massage online and view orthopedic massage therapy pricing at our booking page or at our price lists.",
    },
  ]

  return (
    <section id='Services'
      className="min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-36 bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: "url('/Mask-group.webp')" }}
    >
      <div className="">
        {/* Header Section */}
        <div className="mb-8 sm:mb-10 md:mb-16 flex flex-col items-center text-center px-2 sm:px-4">
          <p className="text-secondary text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 sm:mb-3 md:mb-4 font-arizonia">Welcome to</p>
          <h1 className="text-foreground text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal mb-3 sm:mb-4 md:mb-5">Explore Top Services</h1>
          <h2 className="text-foreground text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold mb-3 sm:mb-4 md:mb-5">You will like to look like goddess every day!</h2>
          <p className="text-secondary text-sm sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl px-2 sm:px-4">
            Pari Eyebrow & Threading Palace fuses expert artistry with premium care to deliver flawless brows, lashes, and threading — redefining natural beauty.
          </p>
        </div>

        {/* Grid: 1 col mobile, 2 cols tablet, 4 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {services.map((svc, index) => (
            <div key={svc.id} className={`${index % 2 === 0 ? 'flex-col' : 'sm:flex-col-reverse flex-col'} flex`}>
              {/* Image with fixed height */}
              <div className="relative w-full aspect-square overflow-hidden">
                <Image 
                  src={svc.image} 
                  alt={svc.title} 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              {/* Detail box with fixed height */}
              <div className="secondary-background aspect-square py-6 sm:py-5 md:py-6 lg:py-8 px-4 sm:px-4 md:px-5 lg:px-6 text-center flex flex-col justify-center">
                <div>
                  <h3 className="text-foreground text-2xl sm:text-2xl md:text-3xl lg:text-[28px] tracking-wide mb-3 sm:mb-3 md:mb-4 uppercase">{svc.title}</h3>
                  <p className="text-secondary text-sm sm:text-sm md:text-base lg:text-[15px] leading-relaxed mb-4 sm:mb-4 md:mb-5 flex-grow">{svc.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
      <div className="my-8 sm:my-12 md:my-16 lg:my-20 mt-12 sm:mt-16 md:mt-24 lg:mt-32 px-2 sm:px-4 md:px-6">
        <h2 className="text-secondary text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium mb-6 sm:mb-8 md:mb-12 lg:mb-16 text-center">
          How <span className="text-primary">We</span> Are Special?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 w-full mx-auto">
          {specialServices.map((service) => (
            <div key={service.id} className="flex flex-col">
              <div className="relative flex flex-row items-start w-full mb-3 sm:mb-4 md:mb-5">
                {/* Decorative purple brush stroke background */}
                <div className="w-10 h-8 sm:w-12 sm:h-10 md:w-16 md:h-12 lg:w-20 lg:h-14 flex-shrink-0 mb-2">
                  <Image
                    src="/decorative.webp"
                    alt="decorative brush"
                    width={80}
                    height={56}
                    className="w-full h-full -left-1 -top-1 sm:-left-2 sm:-top-2 object-contain opacity-80"
                  />
                  <div className="absolute left-1 top-1 sm:left-2 sm:top-2 opacity-70">
                    {service.icon}
                  </div>
                </div>

                <div className="ml-3 sm:ml-4 md:ml-5">
                  {/* Service Name */}
                  <div className="text-[#464646] text-lg sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2">{service.name}</div>
                  {/* Description */}
                  <div className="text-[#464646] text-sm sm:text-sm md:text-base lg:text-lg leading-relaxed opacity-80">{service.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}