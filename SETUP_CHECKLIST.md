# Setup Checklist - Quick Start Guide

Follow these steps to get your Pari application up and running.

## ✅ Prerequisites Setup

### 1. Database (PostgreSQL)
- [ ] Install PostgreSQL locally OR use a hosted service (Neon, Supabase, etc.)
- [ ] Create a new database named `pari`
- [ ] Get connection string: `postgresql://user:password@host:5432/pari`

### 2. Sanity Account
- [ ] Create account at [sanity.io](https://www.sanity.io/)
- [ ] Create new project
- [ ] Get Project ID from project settings
- [ ] Create API token with write permissions

### 3. Square Account
- [ ] Create account at [squareup.com/developers](https://developer.squareup.com/)
- [ ] Create application in Square Dashboard
- [ ] Get Sandbox credentials:
  - Access Token
  - Application ID
  - Location ID
- [ ] (Later) Switch to Production credentials when ready to go live

## 🔧 Installation Steps

### Step 1: Install Dependencies
```bash
cd Pari
npm install
# or
bun install
```

### Step 2: Environment Configuration
```bash
# Copy example env file
cp .env.example .env

# Edit .env with your credentials
nano .env
```

Required environment variables:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/pari"

# Better Auth
BETTER_AUTH_SECRET="generate-random-secret-here"  # Use: openssl rand -base64 32
BETTER_AUTH_URL="http://localhost:3000"

# Square (Sandbox)
SQUARE_ACCESS_TOKEN="your-sandbox-access-token"
SQUARE_ENVIRONMENT="sandbox"
SQUARE_APPLICATION_ID="your-sandbox-app-id"
SQUARE_LOCATION_ID="your-sandbox-location-id"

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="your-token-with-write-access"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Step 3: Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to verify
npx prisma studio
```

### Step 4: Sanity Setup
```bash
# Deploy Sanity schema
npx sanity deploy

# Login to Sanity (if needed)
npx sanity login
```

### Step 5: Start Development Server
```bash
npm run dev
# or
bun dev
```

Visit:
- **Frontend**: http://localhost:3000
- **Sanity Studio**: http://localhost:3000/studio

## 📝 Content Setup (First Time)

### In Sanity Studio (http://localhost:3000/studio)

#### 1. Create Pricing Categories
- Navigate to "Pricing Categories"
- Click "Create"
- Add categories like:
  - Threading (order: 0)
  - Waxing (order: 1)
  - Facial (order: 2)
  - Lashes (order: 3)

#### 2. Add Pricing Items
- Navigate to "Pricing Items"
- Click "Create"
- For each service:
  - Name: "Eyebrow Threading"
  - Price: 12
  - Category: Select "Threading"
  - Duration: 15 (minutes)

Example services:
```
Threading:
- Eyebrow Threading - $12 - 15min
- Upper Lip - $8 - 10min
- Full Face - $35 - 30min

Waxing:
- Arms - $25 - 20min
- Legs - $35 - 30min
- Full Body - $99 - 60min
```

#### 3. Create Packages
- Navigate to "Packages"
- Click "Create"
- Example package:
  - Name: "Bridal Package"
  - Total Price: 150
  - Upload Image
  - Featured: Yes
  - Services: Select multiple services
  - Order: 0

#### 4. Add Banners
- Navigate to "Banners"
- Click "Create"
- Upload banner image (recommended: 1920x600px)
- Title: "Welcome Banner"
- Order: 0

#### 5. Add Testimonials
- Navigate to "Testimonials"
- Click "Create"
- Name: "Sarah Johnson"
- Upload customer photo
- Testimonial: Write review
- Subtitle: "Regular Customer"
- Rating: 5
- Order: 0

## 🧪 Testing

### 1. Test Authentication
- [ ] Visit http://localhost:3000/auth
- [ ] Sign up with email & password
- [ ] Logout and login again
- [ ] Check user in database: `npx prisma studio`

### 2. Test Booking Flow
- [ ] Login to application
- [ ] Click "Book Appointment"
- [ ] Select services
- [ ] Choose date & time
- [ ] Complete payment (use Square sandbox)
- [ ] Verify booking in dashboard
- [ ] Check appointment in database

### 3. Test CMS
- [ ] Visit /studio
- [ ] Create/edit content
- [ ] Check changes appear on frontend
- [ ] Test image uploads

### 4. Test Square Payment (Sandbox)
Square Sandbox test cards:
```
Success: 4111 1111 1111 1111
CVV: 111
ZIP: 12345
Expiry: Any future date
```

## 🚀 Going to Production

### 1. Database
- [ ] Create production PostgreSQL database
- [ ] Update DATABASE_URL in production env

### 2. Square
- [ ] Switch to production credentials
- [ ] Update SQUARE_ENVIRONMENT="production"
- [ ] Update access token, app ID, location ID
- [ ] Complete Square account verification

### 3. Sanity
- [ ] Keep using same project (or create production dataset)
- [ ] Update SANITY_API_TOKEN for production

### 4. Deploy
- [ ] Push code to GitHub
- [ ] Deploy to Vercel/Netlify
- [ ] Add environment variables in hosting platform
- [ ] Run production migrations: `npx prisma migrate deploy`
- [ ] Test production deployment

## 📱 Mobile Testing
- [ ] Test responsive design on mobile
- [ ] Check booking flow on phone
- [ ] Verify payment form on mobile
- [ ] Test touch interactions

## 🔒 Security Checklist
- [ ] Change BETTER_AUTH_SECRET to strong random value
- [ ] Use production Square credentials (not sandbox)
- [ ] Restrict Sanity API token permissions
- [ ] Enable CORS properly
- [ ] Add rate limiting (production)
- [ ] Set up monitoring (Sentry, etc.)

## 📊 Optional Enhancements

### Analytics
```bash
# Install analytics
npm install @vercel/analytics

# Add to layout.tsx
import { Analytics } from '@vercel/analytics/react'
```

### Email Notifications
- Set up email service (SendGrid, Resend)
- Send booking confirmations
- Send password reset emails

### Admin Features
- Create admin role check
- Add admin-only routes
- Implement booking management
- Add customer management

## 🐛 Troubleshooting

### Can't connect to database
```bash
# Test connection
npx prisma db pull

# Reset database
npx prisma migrate reset
```

### Sanity Studio not loading
```bash
# Check Sanity config
cat sanity.config.ts

# Redeploy
npx sanity deploy
```

### Square payments failing
- Verify credentials in .env
- Check Square Dashboard for errors
- Use sandbox test cards
- Check browser console for errors

### Build errors
```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install

# Regenerate Prisma client
npx prisma generate
```

## 📞 Getting Help

1. Check README.md for detailed documentation
2. Check MIGRATION_GUIDE.md for migration info
3. Review error messages carefully
4. Check browser console for frontend errors
5. Check terminal for backend errors

## ✨ You're All Set!

Your Pari application should now be running with:
- ✅ Authentication working
- ✅ Content managed in Sanity
- ✅ Payments through Square
- ✅ Bookings stored in database
- ✅ Beautiful responsive UI

**Next Steps:**
1. Customize content in Sanity Studio
2. Test the entire booking flow
3. Adjust styling/branding as needed
4. Deploy to production when ready

---

**Happy coding! 🎉**

