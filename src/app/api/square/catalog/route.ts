import { NextRequest, NextResponse } from "next/server"
import { catalogApi } from "@/lib/square"
import { CatalogObject } from "square"

// Type definitions for Square objects
type SquareCatalogObject = CatalogObject

type SquareError = {
  message?: string
}

// Get catalog items from Square
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const types = searchParams.get("types") // e.g., "ITEM,CATEGORY"
 const servicesOnly = searchParams.get("servicesOnly") === "true" // New parameter to fetch only services

    // List all catalog objects or filter by types
    const response = await catalogApi.listCatalog(
      undefined, // cursor for pagination
      types || "ITEM,ITEM_VARIATION,CATEGORY,TAX,DISCOUNT" // types to retrieve
    )

    const catalogObjects: SquareCatalogObject[] = response.result.objects || []

    // If categoryId is specified, filter items by category
    let filteredObjects: SquareCatalogObject[] = catalogObjects
    if (searchParams.get("categoryId")) {
      filteredObjects = catalogObjects.filter((obj) => {
        if (obj.type === "ITEM") {
          return obj.itemData?.categoryId === searchParams.get("categoryId")
        }
        return false
      })
    } else {
      filteredObjects = catalogObjects
    }

    // If servicesOnly is true, filter to include only service items
    if (servicesOnly) {
      filteredObjects = filteredObjects.filter((obj) => {
        if (obj.type === "ITEM") {
          // Filter for service items - exclude packages
          const name = obj.itemData?.name?.toLowerCase() || ""
          return !name.includes("package") && !name.includes("pack")
        }
        return obj.type === "CATEGORY" // Keep categories
      })
    }

    // Extract only necessary data: category names and items with prices
    const categories = filteredObjects
      .filter((obj) => obj.type === "CATEGORY")
      .map((cat) => ({
        id: cat.id || '',
        name: cat.categoryData?.name || "Uncategorized",
      }))

    const items = filteredObjects
      .filter((obj) => obj.type === "ITEM")
      .map((item) => {
        const itemData = item.itemData
        const variations = itemData?.variations || []
        
        return variations.map((variation) => {
          const variationData = variation.itemVariationData
          const price = variationData?.priceMoney?.amount 
            ? Number(variationData.priceMoney.amount) / 100 
            : 0
          
          // Get category ID from item
          const categoryId = itemData?.reportingCategory?.id || 
                           (itemData?.categories?.[0]?.id) || 
                           null

          return {
            id: variation.id || '',
            name: `${itemData?.name || 'Unknown'}${variationData?.name ? ` - ${variationData.name}` : ''}`,
            price: price,
            categoryId: categoryId,
          }
        })
      })
      .flat()

    return NextResponse.json({
      categories,
      items,
    })
  } catch (error: unknown) {
    const squareError = error as SquareError
    console.error("Square catalog error:", squareError)
    return NextResponse.json(
      { error: squareError?.message || "Failed to fetch catalog" },
      { status: 500 }
    )
  }
}

// Search catalog items
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { query, categoryIds, productTypes } = body

    const response = await catalogApi.searchCatalogItems({
      textFilter: query ? query : undefined,
      categoryIds: categoryIds || undefined,
      productTypes: productTypes || undefined,
      enabledLocationIds: [process.env.SQUARE_LOCATION_ID!],
    })

    const items = response.result.items || []

    // Convert BigInt to string for JSON serialization
    const jsonString = JSON.stringify({ items }, (key, value) => 
      typeof value === 'bigint' ? value.toString() : value
    )

    return new NextResponse(jsonString, {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: unknown) {
    const squareError = error as SquareError
    console.error("Square catalog search error:", squareError)
    return NextResponse.json(
      { error: squareError?.message || "Failed to search catalog" },
      { status: 500 }
    )
  }
}