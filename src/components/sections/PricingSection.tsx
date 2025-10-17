"use client"

import { useEffect, useState } from "react"
import { Check } from "lucide-react"
import { Loader } from "../ui/Loader"

type PricingItem = {
  id: string
  name: string
  price: number
  categoryId?: string
}

type PricingCategory = {
  id: string
  name: string
  items: PricingItem[]
}

export default function PricingSection() {
  const [categories, setCategories] = useState<PricingCategory[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch pricing data from Square Catalog API (services only)
  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        
        // Create AbortController for timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
        
        const response = await fetch("/api/square/catalog?types=ITEM,CATEGORY&servicesOnly=true", {
          signal: controller.signal,
          cache: 'no-cache'
        })
        
        clearTimeout(timeoutId)
        
        if (!response.ok) {
          throw new Error("Failed to fetch catalog")
        }

        const data = await response.json()
        const { items, categories: catalogCategories } = data

        // Create a map of categories
        const categoryMap = new Map<string, PricingCategory>()
        
        // First, create all categories
        catalogCategories.forEach((cat: { id: string; name: string }) => {
          categoryMap.set(cat.id, {
            id: cat.id,
            name: cat.name,
            items: []
          })
        })

        // Add an "Other" category for items without a category
        categoryMap.set("uncategorized", {
          id: "uncategorized",
          name: "Other Services",
          items: []
        })

        // Then, assign items to their categories
        items.forEach((item: PricingItem) => {
          const categoryId = item.categoryId || "uncategorized"
          if (categoryMap.has(categoryId)) {
            categoryMap.get(categoryId)!.items.push(item)
          } else {
            categoryMap.get("uncategorized")!.items.push(item)
          }
        })

        // Filter out empty categories and convert to array
        const nonEmptyCategories = Array.from(categoryMap.values())
          .filter(cat => cat.items.length > 0)

        setCategories(nonEmptyCategories)
      } catch (e: unknown) {
        if (e instanceof Error && e.name === 'AbortError') {
          setError("Request timeout - please try again")
        } else {
          setError("Failed to load pricing")
        }
   
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const hasContent = categories.length > 0

  // Split categories into two columns
  const midPoint = Math.ceil(categories.length / 2)
  const leftCategories = categories.slice(0, midPoint)
  const rightCategories = categories.slice(midPoint)

  if (loading) {
    return (
      <section id='Pricing' className="min-h-fit secondary-background px-4 sm:px-6 md:px-8 lg:px-36">
        <div className="max-w-7xl mx-auto py-8 sm:py-10 md:py-12 text-center">
          <div className="mb-6 sm:mb-8 md:mb-16">
            <p className="text-lg sm:text-xl md:text-2xl mb-2 text-secondary font-arizonia">Spa Center</p>
            <h1 className="text-xl sm:text-2xl md:text-4xl font-light text-foreground">Our Pricing</h1>
          </div>
          <Loader label="Loading..." />
        </div>
      </section>
    )
  }

  if (!hasContent && !error) {
    return null
  }

  return (
    <section id='Pricing' className="min-h-fit secondary-background px-4 sm:px-6 md:px-8 lg:px-36">
      <div className="max-w-7xl mx-auto py-8 sm:py-10 md:py-12 text-center">
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-16">
          <p className="text-lg sm:text-xl md:text-2xl mb-2 text-secondary font-arizonia">Spa Center</p>
          <h1 className="text-xl sm:text-2xl md:text-4xl font-light text-foreground">Our Pricing</h1>
        </div>

        {error ? (
          <div className="text-red-500 py-8">
            <p>{error}</p>
          </div>
        ) : !hasContent ? (
          null
        ) : (
          <div className="flex flex-col md:flex-row md:gap-12 lg:gap-20 xl:gap-40 mb-8 md:mb-16">
            {/* Left Column */}
            <div className="flex-1 space-y-4 sm:space-y-6 md:space-y-8 mb-6 md:mb-0">
              {leftCategories.map((category) => (
                <div key={category.id} className="space-y-3 sm:space-y-4 md:space-y-6">
                  <div className="flex justify-between items-center px-2 sm:px-0">
                    <h2 className="text-sm sm:text-base md:text-lg font-medium text-foreground">
                      {category.name}
                    </h2>
                    <span className="text-sm sm:text-base md:text-lg font-medium text-foreground">
                      Price
                    </span>
                  </div>

                  <div className="space-y-2 sm:space-y-3 md:space-y-4">
                    {category.items.map((item) => (
                      <div key={item.id} className="flex items-start justify-between gap-2 sm:gap-3 px-2 sm:px-0">
                        <div className="flex items-start gap-1.5 sm:gap-2 flex-1">
                          <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 mt-0.5 flex-shrink-0 text-primary/30" strokeWidth={5} />
                          <span className="text-xs sm:text-sm leading-relaxed text-secondary text-left">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm font-medium flex-shrink-0 text-secondary">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="flex-1 space-y-4 sm:space-y-6 md:space-y-8">
              {rightCategories.map((category) => (
                <div key={category.id} className="space-y-3 sm:space-y-4 md:space-y-6">
                  <div className="flex justify-between items-center px-2 sm:px-0">
                    <h2 className="text-sm sm:text-base md:text-lg font-medium text-foreground">
                      {category.name}
                    </h2>
                    <span className="text-sm sm:text-base md:text-lg font-medium text-foreground">
                      Price
                    </span>
                  </div>

                  <div className="space-y-2 sm:space-y-3 md:space-y-4">
                    {category.items.map((item) => (
                      <div key={item.id} className="flex items-start justify-between gap-2 sm:gap-3 px-2 sm:px-0">
                        <div className="flex items-start gap-1.5 sm:gap-2 flex-1">
                          <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 mt-0.5 flex-shrink-0 text-primary/30" strokeWidth={5} />
                          <span className="text-xs sm:text-sm leading-relaxed text-secondary text-left">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm font-medium flex-shrink-0 text-secondary">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

   
      </div>
    </section>
  )
}