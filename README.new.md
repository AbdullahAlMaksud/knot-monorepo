# BYOU - Clean Beauty Skincare Website

A modern, responsive e-commerce website for BYOU skincare products built with Next.js 14, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Fully Responsive Design** - Optimized for mobile, tablet, and desktop
- **Multiple Pages**:
  - Home page with hero section, product showcases, philosophy, ingredients, and testimonials
  - Shop page with featured products and product listings
  - Product detail pages with image gallery, benefits, and how-to-use sections
  - Contact page with form validation using React Hook Form and FAQ accordion
  - About, Lab, and Blog pages
- **Modern UI Components**:
  - Sticky header with mobile menu
  - Product image galleries with thumbnails
  - Before/After comparison slider
  - Testimonial cards
  - FAQ accordion with smooth animations
  - Contact form with validation
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Hook Form** for form handling

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. The project is already set up at:

```bash
cd /Users/jabidhasan/Developer/byou
```

2. Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
byou/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── about/
│   │   └── page.tsx        # About page
│   ├── blog/
│   │   └── page.tsx        # Blog page
│   ├── contact/
│   │   └── page.tsx        # Contact page with form
│   ├── lab/
│   │   └── page.tsx        # Lab page
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx    # Dynamic product detail page
│   └── shop/
│       └── page.tsx        # Shop/Product listing page
├── components/
│   ├── Header.tsx          # Navigation header with mobile menu
│   ├── Footer.tsx          # Footer with links and social
│   └── Layout.tsx          # Main layout wrapper
├── public/
│   └── images/             # Product and content images
└── package.json
```

## 🎨 Pages Overview

### Home Page (`/`)

- Hero section with CTA
- Our Story section
- Our Journey section
- Philosophy section with core values
- Ingredients showcase
- Before/After comparison
- Testimonials
- CTA sections

### Shop Page (`/shop`)

- Featured product hero with image gallery
- Core products grid
- Signature serum section
- Multiple product categories
- Testimonials

### Product Detail Page (`/product/[id]`)

- Image gallery with thumbnails
- Product information and pricing
- Quantity selector
- Add to cart / Buy now buttons
- Product features badges
- Benefits section
- How to use guide
- Statistics section
- Related products
- Before/After comparison

### Contact Page (`/contact`)

- Contact form with validation
- Name, email, and message fields
- Other ways to reach us (Email, Phone, Address)
- FAQ accordion
- Testimonials

## 🛠️ Technologies Used

- **Next.js 16.0.3** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form validation and handling
- **Lucide React** - Icon library
- **Inter Font** - Modern typography

## 📱 Responsive Design

The website is fully responsive with breakpoints for:

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

All components adapt seamlessly across different screen sizes.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Key Features Implemented

✅ Fully responsive across all devices
✅ TypeScript for type safety
✅ Tailwind CSS for modern styling
✅ React Hook Form for contact form validation
✅ Dynamic routing for product pages
✅ Mobile-first navigation with hamburger menu
✅ Image galleries with thumbnail selection
✅ FAQ accordion with smooth animations
✅ Testimonial sections
✅ Before/After comparison sections
✅ Multiple page layouts following the design
✅ All pages linked and navigable

## 📝 Notes

- The current implementation uses placeholder gradients for images. Replace these with actual product images in the `/public/images` directory.
- ESLint warnings about gradient class names are style preferences and don't affect functionality.
- The product data is currently static. Connect to a CMS or API for dynamic content.
- Form submissions currently show an alert. Integrate with a backend API or service like Formspree for production.

## 🚀 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
npm run build
vercel deploy
```

Or deploy to other platforms like Netlify, AWS, or your own server.

## 🌐 Current Status

✅ Development server is running at http://localhost:3000
✅ All pages are accessible and responsive
✅ Navigation is fully functional
✅ Forms include validation

## 📄 License

© 2025 BYOU. All rights reserved.
