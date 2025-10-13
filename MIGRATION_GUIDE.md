# Migration Guide: From pari-spa to Pari

This document outlines the complete migration from the old `pari-spa` application to the new `Pari` application.

## 🎯 What Changed

### 1. **CMS Migration: Custom Dashboard → Sanity**

**Before (pari-spa):**
- Custom admin dashboard at `/admin`
- Database tables for: banners, menu, packages, testimonials, recent work
- Manual CRUD operations through custom API routes

**After (Pari):**
- Sanity Studio at `/studio`
- All content managed through Sanity CMS
- No custom admin dashboard needed
- Automatic API generation by Sanity

**Migrated Content Types:**
- `Banner` → Sanity `banner` schema
- `Menu` & `MenuCategory` → Sanity `pricingItem` & `pricingCategory` schemas
- `Package` → Sanity `package` schema
- `Testimonial` → Sanity `testimonial` schema
- `RecentWork` → Sanity `recentWork` schema

### 2. **Payment Provider: Stripe → Square**

**Before (pari-spa):**
```typescript
// Stripe payment
const paymentIntent = await stripe.paymentIntents.create({
  amount: totalAmount,
  currency: 'usd',
})
```

**After (Pari):**
```typescript
// Square payment
const payment = await paymentsApi.createPayment({
  sourceId,
  amountMoney: { amount: BigInt(totalAmount * 100), currency: "USD" },
})
```

### 3. **Authentication: Custom Better Auth → Enhanced Better Auth**

**New Features:**
- ✅ Email login (existing)
- ✅ Phone number login (new)
- ✅ Dual authentication support
- ✅ Optional phone field during signup

**Before:**
- Only phone-based auth with temporary email

**After:**
- Email OR phone authentication
- Phone number is optional
- More flexible user registration

### 4. **Database Schema Changes**

**Removed from Prisma (now in Sanity):**
- ❌ `Banner`
- ❌ `Menu`
- ❌ `MenuCategory`
- ❌ `Package`
- ❌ `Testimonial`
- ❌ `RecentWork`
- ❌ `PackagePurchase`

**Kept in Prisma:**
- ✅ `User` (enhanced with email support)
- ✅ `Appointment` (updated with Square fields)
- ✅ `Session`, `Account`, `Verification` (Better Auth)
- ✅ `Newsletter`
- ✅ `DefaultSlot`, `DateOverride` (calendar)

**New Fields in Appointment:**
```prisma
model Appointment {
  // Changed from Stripe to Square
  squareBookingId  String?  @unique  // was: stripePaymentIntentId
  squarePaymentId  String?            // was: stripeChargeId
  
  // Now stores Sanity IDs
  serviceIds       String[]           // Array of Sanity pricing item IDs
  packageId        String?            // Sanity package ID if applicable
}
```

## 🔄 Data Migration Steps

### Step 1: Export Data from pari-spa

If you have existing data, export it:

```bash
# In pari-spa directory
npx prisma db pull
npx prisma migrate dev --create-only --name export_data

# Export data as JSON
node scripts/export-data.js  # Create this script
```

### Step 2: Import to Sanity

Use Sanity's import tool or create content manually in Sanity Studio:

```bash
# In Pari directory
npm run dev

# Visit http://localhost:3000/studio
# Manually recreate content OR use import script
```

### Step 3: Migrate User Data

Users and appointments can be migrated:

```typescript
// Example migration script (create in Pari/scripts/migrate-users.ts)
import { PrismaClient as OldPrisma } from '../pari-spa/node_modules/@prisma/client'
import { PrismaClient as NewPrisma } from '@prisma/client'

const oldDb = new OldPrisma()
const newDb = new NewPrisma()

async function migrateUsers() {
  const users = await oldDb.user.findMany()
  
  for (const user of users) {
    await newDb.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email || `${user.phoneNumber}@temp.com`,
        phoneNumber: user.phoneNumber,
        role: user.role,
      }
    })
  }
}
```

## 🏗️ Architecture Comparison

### File Structure

**pari-spa:**
```
pari-spa/
├── app/
│   ├── admin/          # Custom admin dashboard
│   ├── api/
│   │   ├── admin/      # Admin CRUD operations
│   │   ├── banner/
│   │   ├── menu/
│   │   └── stripe/
│   └── (site)/
└── prisma/
    └── schema.prisma   # All content in database
```

**Pari:**
```
Pari/
├── src/
│   ├── app/
│   │   ├── studio/     # Sanity Studio (replaces /admin)
│   │   ├── api/
│   │   │   ├── square/ # Square integration
│   │   │   └── auth/   # Better Auth
│   │   └── (site)/
│   ├── sanity/
│   │   └── schemaTypes/ # CMS content schemas
│   └── prisma/
│       └── schema.prisma # Only user/booking data
```

### Component Structure

**Static Components (No CMS):**
- ✅ Header
- ✅ Footer
- ✅ MessageSection
- ✅ GallerySection (uses static images from /public)
- ✅ FAQSection
- ✅ ServiceSection
- ✅ LocationSection
- ✅ ChooseSection

**Dynamic Components (Sanity CMS):**
- 🔄 BannerSection (fetches from Sanity)
- 🔄 PricingSection (fetches from Sanity)
- 🔄 PackageSection (fetches from Sanity)
- 🔄 TestimonialSection (fetches from Sanity)

## 🔧 Configuration Files

### Environment Variables

**pari-spa:**
```env
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
```

**Pari:**
```env
# Square (replaces Stripe)
SQUARE_ACCESS_TOKEN=
SQUARE_ENVIRONMENT=
SQUARE_APPLICATION_ID=
SQUARE_LOCATION_ID=

# Sanity (new)
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
```

## 📋 Feature Comparison

| Feature | pari-spa | Pari |
|---------|----------|------|
| **CMS** | Custom Admin Dashboard | Sanity Studio |
| **Payments** | Stripe | Square |
| **Auth** | Better Auth (phone only) | Better Auth (email + phone) |
| **Content Management** | Database (Prisma) | Sanity CMS |
| **Admin Access** | `/admin` route | `/studio` route |
| **API Routes** | Custom CRUD for each model | Sanity auto-generated |
| **Image Uploads** | Cloudinary | Sanity CDN |
| **Booking System** | Custom implementation | Square Bookings (optional) |

## 🚀 Deployment Checklist

- [ ] Set up PostgreSQL database
- [ ] Create Sanity project
- [ ] Create Square account & get credentials
- [ ] Configure environment variables
- [ ] Run Prisma migrations
- [ ] Deploy Sanity schema
- [ ] Import content to Sanity Studio
- [ ] Test authentication flow
- [ ] Test booking & payment flow
- [ ] Deploy to Vercel/Netlify

## 🔐 Security Improvements

1. **Better Auth Enhancements:**
   - Email verification (optional)
   - Session management
   - CSRF protection

2. **Square Security:**
   - PCI compliance built-in
   - Tokenized payments
   - Secure payment forms

3. **Sanity Security:**
   - Content versioning
   - Role-based access control
   - Audit logs

## 🐛 Common Issues & Solutions

### Issue: Can't access Sanity Studio

**Solution:**
```bash
# Check Sanity project ID
cat sanity.config.ts

# Verify environment variables
echo $NEXT_PUBLIC_SANITY_PROJECT_ID

# Redeploy Sanity schema
npx sanity deploy
```

### Issue: Square payments failing

**Solution:**
```bash
# Check Square environment
echo $SQUARE_ENVIRONMENT

# Verify Square credentials in dashboard
# Use sandbox credentials for testing
```

### Issue: Better Auth session not persisting

**Solution:**
```bash
# Check auth secret
echo $BETTER_AUTH_SECRET

# Verify database connection
npx prisma studio

# Check session table
```

## 📊 Performance Improvements

**pari-spa:**
- Database queries for all content
- Multiple API calls for pages
- Custom caching logic

**Pari:**
- Sanity CDN for content delivery
- Optimized image delivery
- Built-in edge caching
- Faster content updates

## 🎓 Learning Resources

### Sanity
- [Sanity + Next.js Guide](https://www.sanity.io/guides/nextjs-app-router)
- [Sanity Schema Guide](https://www.sanity.io/docs/schema-types)

### Square
- [Square Payments API](https://developer.squareup.com/docs/payments-api)
- [Square Web SDK](https://developer.squareup.com/docs/web-payments/overview)

### Better Auth
- [Better Auth Documentation](https://www.better-auth.com/docs)
- [Better Auth + Next.js](https://www.better-auth.com/docs/integrations/next-js)

## 📞 Support

For migration assistance or questions:
1. Check this migration guide
2. Review the main README.md
3. Check component source code for implementation details

---

**Migration completed successfully! 🎉**

The new Pari app is cleaner, more maintainable, and uses industry-standard tools for CMS and payments.

