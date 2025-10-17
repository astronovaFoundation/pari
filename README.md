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
├── src
│   ├── app
│   │   ├── (site)
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── api
│   │   │   └── square
│   │   │       ├── catalog
│   │   │       │   └── route.ts
│   │   │       └── packages
│   │   │           └── route.ts
│   ├── components
│   │   ├── layout
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   │   ├── sections
│   │   │   ├── FAQSection.tsx
│   │   │   ├── GallerySection.tsx
│   │   │   ├── MessageSection.tsx
│   │   │   ├── PackageSection.tsx
│   │   │   ├── PricingSection.tsx
│   │   │   ├── RecentWorkSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   └── TestimonialSection.tsx
│   │   └── ui
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       ├── Modal.tsx
│   │       └── Select.tsx
│   ├── lib
│   │   ├── square.ts
│   │   └── utils.ts
│   ├── sanity
│   │   ├── lib
│   │   │   ├── client.ts
│   │   │   └── helpers.ts
│   │   └── schemaTypes
│   │       ├── Banner.ts
│   │       ├── Package.ts
│   │       ├── PricingCategory.ts
│   │       ├── PricingItem.ts
│   │       ├── RecentWork.ts
│   │       └── Testimonial.ts
│   └── middleware.ts
├── prisma
│   └── schema.prisma
└── public
