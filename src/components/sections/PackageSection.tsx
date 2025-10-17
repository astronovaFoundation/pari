"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import Image from "next/image"

// Define types for package data from Square
type PackageService = {
  id: string
  name: string
  price: number
}

type Package = {
  id: string
  name: string
  price: number
  services: PackageService[]
  packageImage: string | null
}

export default function PackagesSection() {
  const [packages, setPackages] = useState<Package[]>([])
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    (async () => {
      try {
        // Create AbortController for timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
        
        // Fetch packages from Square API
        const response = await fetch("/api/square/packages", {
          signal: controller.signal
        })
        
        clearTimeout(timeoutId)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch packages: ${response.status}`)
        }

        const data = await response.json()
        const { packages: packageItems } = data

        setPackages(packageItems || [])
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          setError("Request timeout - please try again")
        } else {
          const errorMessage = err instanceof Error ? err.message : "Failed to load packages"
          setError(errorMessage)
        }
        console.error("Package fetch error:", err)
      } 
    })()
  }, [])


  if (error) {
    return (
      <section id="Packages" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-36 my-8 md:my-10">
        <div className="text-center text-red-500">
          <p>Error loading packages: {error}</p>
          <p className="text-sm mt-2">Please check the console for more details.</p>
        </div>
      </section>
    )
  }

  if (packages.length === 0) {
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

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </section>
  )
}

function PackageCard({ pkg }: { pkg: Package }) {
  const router = useRouter()
  
  async function onSelect() {
    router.push(process.env.NEXT_PUBLIC_SQUARE_BOOKING_URL || "/")
  }

  return (
    <div className="relative !rounded-b-lg rounded-t-full overflow-hidden  flex flex-col h-full btn-gradient border border-gray-200">
      {/* Image */}
      <div className="p-3">
        <div className="relative w-full aspect-square">
          <div className="absolute inset-0 rounded-full border-2 md:border-4 border-white overflow-hidden">
            {/* Package Image - using placeholder */}
          { pkg.packageImage &&

            <Image src={pkg.packageImage} fill alt={pkg.name} />
          }
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-6 flex flex-col flex-grow pb-6">
        {/* Package Info */}
        <div className="text-white mb-4 text-center flex-shrink-0">
          <h3 className="text-lg md:text-xl font-medium mb-2">
            {pkg.name}
          </h3>
          <p className="text-xl md:text-2xl font-arizonia text-white">
            ${pkg.price.toFixed(2)}
          </p>
        </div>

        {/* Services List */}
        <div className="mb-6 space-y-3 flex-grow">
          <div className="border-t border-b border-gray-200 py-3">
            <h4 className="text-sm font-medium text-white mb-2 text-center">Includes:</h4>
            <ul className="space-y-2 max-h-40 overflow-y-auto">
              {pkg.services && pkg.services.length > 0 ? (
                pkg.services.map((service) => (
                  <li key={service.id} className="flex justify-center items-center px-2">
                    <span className="text-md text-white font-poppins">
                      {service.name}
                    </span>
             
                  </li>
                ))
              ) : (
                <li className="text-sm text-white text-center italic px-2">
                  Package services
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Button */}
        <div className="flex-shrink-0 mt-auto">
          <Button
            onClick={onSelect}
            className="w-full !rounded-full py-2.5 md:py-3 px-4 md:px-6 text-sm md:text-base font-medium bg-white text-primary hover:opacity-90"
          >
            SELECT
          </Button>
        </div>
      </div>
    </div>
  )
}