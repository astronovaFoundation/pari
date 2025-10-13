import { NextRequest, NextResponse } from "next/server"
import { catalogApi } from "@/lib/square"

// Get catalog items from Square
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const types = searchParams.get("types") // e.g., "ITEM,CATEGORY"
    const categoryId = searchParams.get("categoryId")

    // List all catalog objects or filter by types
    const response = await catalogApi.listCatalog(
      undefined, // cursor for pagination
      types || "ITEM,ITEM_VARIATION,CATEGORY,TAX,DISCOUNT" // types to retrieve
    )

    const catalogObjects = response.result.objects || []

    // If categoryId is specified, filter items by category
    let filteredObjects = catalogObjects
    if (categoryId) {
      filteredObjects = catalogObjects.filter((obj: any) => {
        if (obj.type === "ITEM") {
          return obj.itemData?.categoryId === categoryId
        }
        return false
      })
    }

    // Extract only necessary data: category names and items with prices
    const categories = catalogObjects
      .filter((obj: any) => obj.type === "CATEGORY")
      .map((cat: any) => ({
        id: cat.id,
        name: cat.categoryData?.name || "Uncategorized",
      }))

    const items = filteredObjects
      .filter((obj: any) => obj.type === "ITEM")
      .map((item: any) => {
        const itemData = item.itemData
        const variations = itemData?.variations || []
        
        return variations.map((variation: any) => {
          const variationData = variation.itemVariationData
          const price = variationData?.priceMoney?.amount 
            ? Number(variationData.priceMoney.amount) / 100 
            : 0
          
          // Get category ID from item
          const categoryId = itemData?.reportingCategory?.id || 
                           (itemData?.categories?.[0]?.id) || 
                           null

          return {
            id: variation.id,
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
  } catch (error: any) {
    console.error("Square catalog error:", error)
    return NextResponse.json(
      { error: error?.message || "Failed to fetch catalog" },
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
      textFilter: query ? { keywords: [query] } : undefined,
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
  } catch (error: any) {
    console.error("Square catalog search error:", error)
    return NextResponse.json(
      { error: error?.message || "Failed to search catalog" },
      { status: 500 }
    )
  }
}

