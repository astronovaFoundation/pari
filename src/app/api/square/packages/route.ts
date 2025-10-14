import { NextRequest, NextResponse } from "next/server"
import { catalogApi } from "@/lib/square"
import { CatalogObject } from "square"

// Define types
type PackageService = {
  id: string
  name: string
  price: number
}

type PackageItem = {
  id: string
  name: string
  price: number
  services: PackageService[]
  packageImage: string | null
}

// Type definitions for Square objects
type SquareCatalogObject = CatalogObject

type SquareError = {
  message?: string
}

// Get packages from Square with their associated services
export async function GET(req: NextRequest) {
  try {
    // Fetch all catalog objects
    const response = await catalogApi.listCatalog(
      undefined,
      "ITEM,ITEM_VARIATION,CATEGORY,IMAGE"
    )

    const catalogObjects: SquareCatalogObject[] = response.result.objects || []
    
    // Separate packages and individual services
    const allItems: SquareCatalogObject[] = catalogObjects.filter((obj) => obj.type === "ITEM")
    
    // Find packages - items with "package" or "pack" in their name
    const packages: SquareCatalogObject[] = allItems.filter((item) => {
      const name = item.itemData?.name?.toLowerCase() || ""
      return name.includes("package") || name.includes("pack")
    })
    
    // Find individual services - items that are not packages
    const services: SquareCatalogObject[] = allItems.filter((item) => {
      const name = item.itemData?.name?.toLowerCase() || ""
      return !name.includes("package") && !name.includes("pack")
    })
    
    // Convert packages with their associated services
    const packageItems: PackageItem[] = packages.map((item) => {
      return convertItemToPackage(item, services, catalogObjects)
    })

    return NextResponse.json({
      packages: packageItems,
    })
  } catch (error: unknown) {
    const squareError = error as SquareError
    console.error("Square packages error:", squareError)
    return NextResponse.json(
      { error: squareError?.message || "Failed to fetch packages" },
      { status: 500 }
    )
  }
}

// Convert a Square item to our package format and associate services
function convertItemToPackage(
  item: SquareCatalogObject, 
  allServices: SquareCatalogObject[], 
  allObjects: SquareCatalogObject[]
): PackageItem {
  const itemData = item.itemData
  const variations = itemData?.variations || []
  
  // Get the first variation for pricing
  const firstVariation = variations[0]
  const variationData = firstVariation?.itemVariationData
  
  const price = variationData?.priceMoney?.amount 
    ? Number(variationData.priceMoney.amount) / 100 
    : 0

  // Extract package image
  let packageImage: string | null = null
  if (itemData?.imageIds && itemData.imageIds.length > 0) {
    const imageId = itemData.imageIds[0]
    const imageObject = allObjects.find((obj) => obj.id === imageId && obj.type === "IMAGE")
    if (imageObject?.imageData?.url) {
      packageImage = imageObject.imageData.url
    }
  }

  // Extract services included in the package
  const services = extractServicesForPackage(itemData, allServices)

  return {
    id: item.id || '',
    name: itemData?.name || 'Package',
    price: price,
    services: services,
    packageImage: packageImage
  }
}

// Extract services for a package based on package name
function extractServicesForPackage(
  packageData: SquareCatalogObject['itemData'] | undefined, 
  allServices: SquareCatalogObject[]
): PackageService[] {
  const packageServices: PackageService[] = []
  const packageName = packageData?.name?.toLowerCase() || ""
  
  // Map packages to their specific services based on business logic
  if (packageName.includes("demo pack") && !packageName.includes("demo pack 2")) {
    // "Demo Pack" should only include "Consultation (example service)"
    const consultationService = allServices.find((serviceItem) => {
      const serviceName = serviceItem.itemData?.name?.toLowerCase() || ""
      return serviceName.includes("consultation")
    })
    
    if (consultationService) {
      const serviceData = consultationService.itemData
      
      packageServices.push({
        id: consultationService.id || '',
        name: serviceData?.name || 'Service',
        price: 0  // No individual pricing for services within packages
      })
    }
  } else if (packageName.includes("demo pack 2")) {
    // "Demo pack 2" should only include exact "hair" and "Nail" services (not "hairsss" or "Nailsss")
    const exactHairService = allServices.find((serviceItem) => {
      const serviceName = serviceItem.itemData?.name || ""
      return serviceName === "hair"
    })
    
    const exactNailService = allServices.find((serviceItem) => {
      const serviceName = serviceItem.itemData?.name || ""
      return serviceName === "Nail"
    })
    
    // Add these exact services to the package (without individual pricing)
    if (exactHairService) {
      const serviceData = exactHairService.itemData
      packageServices.push({
        id: exactHairService.id || '',
        name: serviceData?.name || 'Service',
        price: 0
      })
    }
    
    if (exactNailService) {
      const serviceData = exactNailService.itemData
      packageServices.push({
        id: exactNailService.id || '',
        name: serviceData?.name || 'Service',
        price: 0
      })
    }
  } else {
    // For any other packages, include all services as a fallback (without individual pricing)
    allServices.forEach((serviceItem) => {
      const serviceData = serviceItem.itemData
      
      packageServices.push({
        id: serviceItem.id || '',
        name: serviceData?.name || 'Service',
        price: 0  // No individual pricing for services within packages
      })
    })
  }
  
  return packageServices
}