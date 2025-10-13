import React from "react"
import Image from "next/image"
import { Car } from "lucide-react"

export default function ServicesSection() {
  const specialServices = [
    {
      id: 1,
      name: "Unlimited Free Parking",
      description: "Lorem ipsum dolor sit amet, ne clita evertitur mei democritum.",
      icon: <Car />,
    },
    {
      id: 2,
      name: "Peaceful Environment",
      description: "Lorem ipsum dolor sit amet, ne clita evertitur mei democritum.",
      icon: <Car />,
    },
    {
      id: 3,
      name: "Friendly Environment",
      description: "Lorem ipsum dolor sit amet, ne clita evertitur mei democritum.",
      icon: <Car />,
    },
  ]

  const services = [
    {
      id: 1,
      title: "THREADING",
      image: "/threading.png",
      description:
        "You are welcome to call but you can also book a massage online! Please feel free to reach out with any questions.",
    },
    {
      id: 2,
      title: "WAXING",
      image: "/facial.png",
      description:
        "Book your massage online and view orthopedic massage therapy pricing at our booking page or at our price lists.",
    },
    {
      id: 3,
      title: "FACIAL",
      image: "/facial.png",
      description:
        "Each one of our staff members are licensed massage therapists who have gone above and beyond in training.",
    },
    {
      id: 4,
      title: "OTHER",
      image: "/others.png",
      description:
        "Book your massage online and view orthopedic massage therapy pricing at our booking page or at our price lists.",
    },
  ]

  return (
    <section id='Services'
      className="min-h-screen py-6 sm:py-8 md:py-16 px-4 sm:px-6 md:px-8 lg:px-36 bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: "url('/Mask-group.png')" }}
    >
      <div className="">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8 md:mb-16 flex flex-col items-center text-center px-2">
          <p className="text-secondary text-lg sm:text-xl md:text-2xl mb-2 font-arizonia">Welcome to</p>
          <h1 className="text-foreground text-xl sm:text-2xl md:text-4xl font-normal mb-2 sm:mb-3 md:mb-4">Explore Top Services</h1>
          <h2 className="text-foreground text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4">You will like to look like goddess every day!</h2>
          <p className="text-secondary text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl px-2 sm:px-4">
            Pari Eyebrow & Threading Palace fuses expert artistry with premium care to deliver flawless brows, lashes, and threading — redefining natural beauty.
          </p>
        </div>

        {/* Grid: 1 col mobile, 2 cols tablet, 4 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {services.map((svc, index) => (
            <div key={svc.id} className={`${index % 2 === 0 ? 'flex-col' : 'md:flex-col-reverse flex-col'} flex`}>
              {/* Image with fixed height */}
              <div className="relative w-full aspect-square overflow-hidden">
                <Image src={svc.image} alt={svc.title} fill className="object-cover" />
              </div>
              {/* Detail box with fixed height */}
              <div className="secondary-background aspect-square py-3 sm:py-4 md:py-8 px-2 sm:px-3 md:px-4 text-center flex flex-col justify-center">
                <div>
                  <h3 className="text-foreground text-[28px] tracking-wide mb-1.5 sm:mb-2 md:mb-3 uppercase">{svc.title}</h3>
                  <p className="text-secondary text-[15px] leading-relaxed mb-3 sm:mb-4 md:mb-6 flex-grow">{svc.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
      <div className="my-6 sm:my-8 mt-12 sm:mt-16 md:mt-32 px-2 sm:px-4">
        <h2 className="text-secondary text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-6 sm:mb-8 md:mb-16 text-center">
          How <span className="text-primary">We</span> Are Special?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-16 w-full mx-auto">
          {specialServices.map((service) => (
            <div key={service.id} className="flex flex-col">
              <div className="relative flex flex-row items-start w-full mb-2">
                {/* Decorative purple brush stroke background */}
                <div className="w-12 h-10 sm:w-16 sm:h-12 md:w-24 md:h-16 flex-shrink-0 mb-2">
                  <Image
                    src="/decorative.png"
                    alt="decorative brush"
                    width={96}
                    height={64}
                    className="w-full h-full -left-2 -top-2 object-contain opacity-80"
                  />
                  <Car className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 absolute left-2 top-2 opacity-70" fill="#ffffff" />
                </div>

                <div>
                  {/* Service Name */}
                  <div className="text-[#464646] text-base sm:text-lg md:text-xl font-semibold mb-2">{service.name}</div>
                  {/* Description */}
                  <div className="text-[#464646] text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4 md:mb-6 opacity-80">{service.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

