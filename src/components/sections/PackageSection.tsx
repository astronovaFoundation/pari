"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/lib/auth-client"
import { Button } from "../ui/button"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

type Package = {
  _id: string
  name: string
  totalPrice: number
  isFeatured: boolean
  image: string
  services: {
    _id: string
    name: string
  }[]
}

export default function PackagesSection() {
  const [packages, setPackages] = useState<Package[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const data = await client.fetch<Package[]>(`
          *[_type == "package"] | order(order asc) {
            _id,
            name,
            totalPrice,
            isFeatured,
            image,
            "services": services[]-> {
              _id,
              name
            }
          }
        `)
        setPackages(data || [])
      } catch (err) {
        setError("Failed to load packages")
        console.error(err)
      }
    })()
  }, [])

  // Don't render section if there's an error or no items
  if (error || packages.length === 0) {
    return null
  }

  return (
    <section
      id="Packages"
      className="max-w-7xl mx-auto px-4 md:px-6 lg:px-36 my-8 md:my-10"
    >
      {/* Header */}
      <div className="text-center mb-8 md:mb-12 lg:mb-16">
        <h1 className="text-xl md:text-2xl font-arizonia text-secondary mb-2">
          Spa Center
        </h1>
        <h2 className="text-2xl md:text-4xl font-light text-foreground">
          Our Packages
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {packages.map((pkg) => (
          <PackageCard key={pkg._id} pkg={pkg} />
        ))}
      </div>
    </section>
  )
}

function PackageCard({ pkg }: { pkg: Package }) {
  const router = useRouter()
  const { data: session } = useSession()

  async function onSelect() {
    if (!session) {
      const next = encodeURIComponent(`/booking/calendar?package=${pkg._id}`)
      router.push(`/auth?next=${next}`)
      return
    }

    const packageData = {
      id: pkg._id,
      name: pkg.name,
      totalPrice: pkg.totalPrice,
      services: pkg.services.map((s) => ({
        id: s._id,
        name: s.name,
      })),
    }
    sessionStorage.setItem("selectedPackage", JSON.stringify(packageData))

    router.push(`/booking/calendar?package=${pkg._id}&guests=1`)
  }

  return (
    <div
      className={`relative rounded-b-lg rounded-t-full overflow-hidden hover:scale-[1.01] transition duration-300 flex flex-col h-full ${
        pkg.isFeatured
          ? "primary-gradient"
          : "text-foreground secondary-background"
      }`}
    >
      {/* Image */}
      <div className="p-3">
        <div className="relative w-full aspect-square">
          <div className="absolute inset-0 rounded-full border-2 md:border-4 border-white overflow-hidden">
            <Image
              src={urlFor(pkg.image).url()}
              alt={`${pkg.name} spa treatment`}
              className="object-cover w-full h-full"
              width={250}
              height={250}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-8 flex flex-col flex-grow pb-6 md:pb-8">
        {/* Package Info */}
        <div className={`${pkg.isFeatured ? "text-white" : "text-foreground"} mb-4 md:mb-6 text-center flex-shrink-0`}>
          <h3 className="text-base md:text-lg font-medium mb-2">
            {pkg.name}
          </h3>
          <p className={`text-xl md:text-2xl font-arizonia ${pkg.isFeatured ? "text-white" : "text-primary"}`}>
            ${pkg.totalPrice.toFixed(2)}
          </p>
        </div>

        {/* Services List */}
        <div className="mb-6 md:mb-8 space-y-2 md:space-y-3 flex-grow">
          <ul className="space-y-0.5 md:space-y-1 text-center">
            {pkg.services.map((s) => (
              <li
                key={s._id}
                className={`text-xs md:text-sm ${pkg.isFeatured ? "text-white" : "text-foreground"} font-poppins`}
              >
                {s.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Button */}
        <div className="flex-shrink-0 mt-auto">
          <Button
            onClick={onSelect}
            className={`w-full !rounded-full py-2.5 md:py-3 px-4 md:px-6 text-sm md:text-base font-medium ${
              pkg.isFeatured
                ? "bg-white text-primary"
                : "bg-primary text-white"
            }`}
          >
            SELECT PLAN
          </Button>
        </div>
      </div>
    </div>
  )
}

