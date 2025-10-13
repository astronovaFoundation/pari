# Square Catalog API Integration

## ✅ Completed: Pricing from Square Catalog API

The pricing/menu section now fetches data directly from **Square Catalog API** instead of Sanity CMS.

### What Changed:

#### 1. **New API Endpoint: `/api/square/catalog`**
- **GET Request**: Fetches catalog items from Square
  - Query params: `types` (e.g., "ITEM,CATEGORY")
  - Returns grouped catalog: items, categories, taxes, discounts

- **POST Request**: Searches catalog items
  - Body: `{ query, categoryIds, productTypes }`
  - Returns matching items

#### 2. **PricingSection Component Updated**
- **Before**: Fetched from Sanity CMS (`pricingItem` and `pricingCategory`)
- **After**: Fetches from Square Catalog API
- Displays:
  - **Categories** from Square `CATEGORY` type
  - **Items & Variations** from Square `ITEM` and `ITEM_VARIATION` types
  - **Prices** from Square `priceMoney` (converted from cents to dollars)

### How Square Catalog Works:

According to [Square Catalog API documentation](https://developer.squareup.com/docs/catalog-api/what-it-does):

1. **Catalog Objects**: All items are `CatalogObject` instances with specific types
2. **Item Structure**:
   - `ITEM` - The main product/service
   - `ITEM_VARIATION` - Different variations (sizes, options)
   - `CATEGORY` - Groups related items
   - `TAX` - Tax definitions
   - `DISCOUNT` - Discount rules

3. **Pricing**: Stored in `priceMoney` object with amount in cents
4. **References**: Items reference categories by ID via `categoryId`

### Implementation Details:

#### API Route (`/api/square/catalog/route.ts`):
```typescript
// GET - List all catalog objects
const response = await catalogApi.listCatalog(
  undefined, // cursor for pagination
  "ITEM,ITEM_VARIATION,CATEGORY,TAX,DISCOUNT" // types to retrieve
)

// POST - Search catalog items
const response = await catalogApi.searchCatalogItems({
  textFilter: { keywords: [query] },
  categoryIds: categoryIds,
  enabledLocationIds: [process.env.SQUARE_LOCATION_ID!],
})
```

#### PricingSection Component Logic:
1. Fetches items and categories from Square
2. Creates category map with all categories
3. Processes each item's variations
4. Converts price from cents to dollars: `amount / 100`
5. Groups items by category
6. Displays in two-column layout

### Data Flow:

```
Square Catalog (Items + Categories)
          ↓
  /api/square/catalog (GET)
          ↓
  PricingSection Component
          ↓
  Display: Categories with Items & Prices
```

### Benefits of Square Catalog:

✅ **Single Source of Truth**: Pricing managed in Square Dashboard  
✅ **Real-time Updates**: Changes in Square reflect immediately  
✅ **Inventory Integration**: Square handles stock levels  
✅ **Tax & Discount Support**: Built-in tax and discount rules  
✅ **Multi-location**: Support for multiple business locations  

### Removed from Sanity:

The following Sanity schemas are **no longer used** for pricing:
- ❌ `pricingCategory` 
- ❌ `pricingItem`

These should be managed in **Square Dashboard** instead.

### Setting Up Square Catalog:

1. **Add Categories**:
   ```
   Square Dashboard → Items → Categories → Add Category
   ```

2. **Add Items**:
   ```
   Square Dashboard → Items → Add Item
   - Name
   - Category
   - Price (variations)
   - Description
   ```

3. **Item Variations**:
   - Each item can have multiple variations (sizes, options)
   - Each variation has its own price
   - Example: "Eyebrow Threading" with variations "Basic" and "Premium"

### Testing:

To test with Square sandbox:

1. Create test catalog items in Square Dashboard (sandbox)
2. Set `SQUARE_ENVIRONMENT=sandbox` in `.env`
3. The pricing section will fetch and display your test items

### Future Enhancements:

- Add item images from Square
- Display item descriptions
- Show tax calculations
- Implement discounts from Square
- Add inventory status indicators

### Environment Variables:

```bash
SQUARE_ACCESS_TOKEN="your-square-access-token"
SQUARE_ENVIRONMENT="sandbox" # or "production"
SQUARE_LOCATION_ID="your-location-id"
```

---

**Pricing is now fully integrated with Square Catalog API!** 🎉

All products, prices, and categories are managed through Square Dashboard.

