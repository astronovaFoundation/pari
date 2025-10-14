import { NextRequest, NextResponse } from "next/server"
import { catalogApi } from "@/lib/square"
import { CatalogObject } from "square"

// Type definitions for Square objects
type SquareCatalogObject = CatalogObject

type SquareError = {
  message?: string
}

// Debug endpoint to see what's in Square
export async function GET() {
  try {
    // Fetch all catalog objects
    const response = await catalogApi.listCatalog(
      undefined,
      "ITEM,ITEM_VARIATION,CATEGORY"
    )

    const catalogObjects: SquareCatalogObject[] = response.result.objects || []
    
    // Separate categories and items
    const categories: SquareCatalogObject[] = catalogObjects.filter((obj) => obj.type === "CATEGORY")
    const items: SquareCatalogObject[] = catalogObjects.filter((obj) => obj.type === "ITEM")
    
    // Separate packages and individual services
    const packages: SquareCatalogObject[] = items.filter((item) => {
      const name = item.itemData?.name?.toLowerCase() || ""
      return name.includes("package") || name.includes("pack")
    })
    
    const services: SquareCatalogObject[] = items.filter((item) => {
      const name = item.itemData?.name?.toLowerCase() || ""
      return !name.includes("package") && !name.includes("pack")
    })
    
    // Format the data for easier viewing
    const debugInfo = {
      totalObjects: catalogObjects.length,
      categories: categories.map((cat) => ({
        id: cat.id || '',
        name: cat.categoryData?.name,
        type: cat.type
      })),
      packages: packages.map((item) => ({
        id: item.id || '',
        name: item.itemData?.name,
        description: item.itemData?.description,
        categoryId: item.itemData?.categoryId,
        variations: (item.itemData?.variations || []).map((v) => ({
          id: v.id || '',
          name: v.itemVariationData?.name,
          price: v.itemVariationData?.priceMoney?.amount ? 
            Number(v.itemVariationData.priceMoney.amount) / 100 : 0
        }))
      })),
      services: services.map((item) => ({
        id: item.id || '',
        name: item.itemData?.name,
        description: item.itemData?.description,
        categoryId: item.itemData?.categoryId,
        variations: (item.itemData?.variations || []).map((v) => ({
          id: v.id || '',
          name: v.itemVariationData?.name,
          price: v.itemVariationData?.priceMoney?.amount ? 
            Number(v.itemVariationData.priceMoney.amount) / 100 : 0
        }))
      })),
      allItems: items.map((item) => ({
        id: item.id || '',
        name: item.itemData?.name,
        description: item.itemData?.description,
        categoryId: item.itemData?.categoryId,
        isPackage: (item.itemData?.name?.toLowerCase() || "").includes("package") || 
                   (item.itemData?.name?.toLowerCase() || "").includes("pack"),
        variations: (item.itemData?.variations || []).map((v) => ({
          id: v.id || '',
          name: v.itemVariationData?.name,
          price: v.itemVariationData?.priceMoney?.amount ? 
            Number(v.itemVariationData.priceMoney.amount) / 100 : 0
        }))
      }))
    }

    return NextResponse.json(debugInfo)
  } catch (error: unknown) {
    const squareError = error as SquareError
    console.error("Square debug error:", squareError)
    return NextResponse.json(
      { error: squareError?.message || "Failed to fetch catalog" },
      { status: 500 }
    )
  }
}