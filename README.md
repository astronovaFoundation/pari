# Pari Eyebrow Threading Palace - Next.js Application

A modern, full-featured beauty salon booking platform built with Next.js 15, Sanity CMS, and Square payments.

## 🚀 Features

### Frontend
- **Responsive Design**: Beautiful UI that works on all devices
- **Dynamic CMS Content**: Managed through Sanity Studio
  - Banners (carousel)
  - Pricing/Services
  - Packages
  - Testimonials
  - Gallery (static assets)
- **Static Sections**:
  - Message Section
  - Services Showcase
  - FAQ
  - Location & Hours
  - Gallery

### Booking System
- Service selection
- Date & time picker
- Square payment integration
- Booking confirmation
- User dashboard

### Payments
- **Square Integration**
  - Secure payment processing
  - Payment verification
  - Refund support

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **CMS**: Sanity.io
- **Payments**: Square
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom components with Lucide icons
- **Image Slider**: Swiper.js
- **Notifications**: Sonner (toast notifications)

## 📁 Project Structure

```
Pari/
├── src/
│   ├── app/
│   │   ├── (site)/          # Main site pages
│   │   │   ├── booking/     # Booking flow
│   │   │   ├── dashboard/   # User dashboard
│   │   │   └── page.tsx     # Homepage
│   │   ├── api/             # API routes
│   │   │   ├── newsletter/  # Newsletter subscription
│   │   │   └── square/      # Square payments & bookings
│   │   └── studio/          # Sanity Studio
│   ├── components/
│   │   ├── layout/          # Header, Footer
│   │   ├── sections/        # Page sections
│   │   └── ui/              # Reusable UI components
│   ├── lib/
│   │   ├── square.ts        # Square SDK
│   │   └── utils.ts         # Utility functions
│   ├── sanity/
│   │   ├── lib/             # Sanity client & helpers
│   │   └── schemaTypes/     # Sanity schemas
│   └── middleware.ts        # Next.js middleware
├── prisma/
│   └── schema.prisma        # Database schema
└── public/                  # Static assets
```

## 🔧 Setup Instructions

### 1. Prerequisites

- Node.js 18+ or Bun
- Sanity account
- Square account

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
# Square
SQUARE_ACCESS_TOKEN="your-square-access-token"
SQUARE_ENVIRONMENT="sandbox" # or "production"
SQUARE_APPLICATION_ID="your-square-application-id"
SQUARE_LOCATION_ID="your-square-location-id"

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID="your-sanity-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="your-sanity-api-token"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Installation

```bash
# Install dependencies
npm install
# or
bun install
```

### 4. Run Development Server

```bash
npm run dev
# or
bun dev
```

Visit `http://localhost:3000` to see your application.

### 5. Access Sanity Studio

Visit `http://localhost:3000/studio` to access the Sanity CMS admin panel.

## 📊 Content Management

### CMS Content (Sanity)

- **Banner**: Homepage carousel images
- **PricingCategory**: Service categories
- **PricingItem**: Individual services with pricing
- **Package**: Service packages
- **Testimonial**: Customer reviews
- **RecentWork**: Portfolio items

### Package Integration with Square

Packages are now fetched directly from Square API instead of Sanity CMS. To set up packages:

1. In your Square Dashboard, create items that represent packages
2. Set appropriate prices for each package
3. The application will automatically fetch and display these packages

## 🎨 Customization

### Colors (globals.css)

```css
:root {
  --primary: #A94CCC;      /* Main purple */
  --secondary: #7a7992;    /* Text gray */
  --foreground: #2D2C40;   /* Dark text */
  --background: #ffffff;   /* White background */
}
```

### Fonts

- **Poppins**: Main body font
- **Arizonia**: Decorative script font

## 💳 Payment Flow

1. User selects services/package
2. Chooses date & time
3. Proceeds to payment
4. Square processes payment
5. Booking created in database
6. Confirmation sent to user

## 📱 Key Features Implementation

### Booking Flow
1. **Service Selection** (`/booking/services`)
2. **Date & Time** (`/booking/calendar`)
3. **Payment** (`/booking/payment`)
4. **Success** (`/booking/success`)

### Dashboard
- View all appointments
- See booking status
- Quick book new appointment
- Account management

### Admin (Sanity Studio)
- Manage banners
- Update pricing/services
- Edit packages
- Moderate testimonials

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 📝 Development Notes

### Key Differences from pari-spa

1. **CMS**: Moved from custom database tables to Sanity
2. **Payments**: Square instead of Stripe
3. **No Authentication**: Simplified flow without user accounts
4. **No Admin Dashboard**: Use Sanity Studio instead
5. **Simplified Schema**: CMS content in Sanity

### Important Files

- `src/lib/square.ts`: Square SDK setup
- `src/sanity/schemaTypes/index.ts`: All Sanity schemas
- `src/components/sections/PackageSection.tsx`: Package display component
- `src/app/api/square/packages/route.ts`: Square packages API endpoint

## 🐛 Troubleshooting

### Square Issues
```bash
# Check Square config
npx square check

# Deploy Square schema
npx square deploy
```

### Sanity Issues
```bash
# Check Sanity config
npx sanity check

# Deploy Sanity schema
npx sanity deploy
```

### Build Issues
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install
```

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Sanity Docs](https://www.sanity.io/docs)
- [Square Developer Docs](https://developer.squareup.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)

## 🤝 Support

For issues or questions, please refer to the documentation or create an issue in the repository.

## 📄 License

All rights reserved - Pari Eyebrow Threading Palace

---

**Built with ❤️ using Next.js, Sanity, and Square**