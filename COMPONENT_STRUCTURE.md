# BYOU Website - Component Structure

## Overview

All major pages have been broken down into manageable, reusable components for better maintainability and code organization.

## Component Directory Structure

```
components/
├── home/
│   ├── HeroSection.tsx
│   ├── OurStorySection.tsx
│   ├── OurJourneySection.tsx
│   ├── PhilosophySection.tsx
│   └── IngredientsSection.tsx
├── about/
│   ├── AboutStorySection.tsx
│   ├── AboutJourneySection.tsx
│   ├── AboutPhilosophySection.tsx
│   └── AboutIngredientsSection.tsx
├── shop/
│   ├── FeaturedProductHero.tsx
│   ├── CoreProductsSection.tsx
│   ├── SignatureSerumSection.tsx
│   └── TheCreamSection.tsx
├── product/
│   ├── ProductDetailsSection.tsx
│   ├── WhyChooseSection.tsx
│   ├── MakeSwitchSection.tsx
│   ├── HowToUseSection.tsx
│   ├── FromUsToYouSection.tsx
│   └── MoreProductsSection.tsx
├── contact/
│   ├── ContactFormSection.tsx
│   ├── ContactMethodsSection.tsx
│   └── FAQSection.tsx
├── checkout/
│   ├── ShippingForm.tsx
│   ├── PaymentMethodSection.tsx
│   └── OrderSummary.tsx
├── account/
│   ├── AccountTabs.tsx
│   ├── UserInfoForm.tsx
│   ├── ShippingAddressForm.tsx
│   ├── PasswordChangeForm.tsx
│   └── OrderHistorySection.tsx
├── orders/
│   ├── OrderHeader.tsx
│   ├── OrderItemsList.tsx
│   ├── ShippingAddressCard.tsx
│   ├── TrackingProgress.tsx
│   └── SupportSection.tsx
├── auth/
│   ├── AuthHero.tsx
│   ├── SignInForm.tsx
│   └── SignUpForm.tsx
└── shared/
    ├── CTASection.tsx
    ├── BeforeAfterSection.tsx
    └── TestimonialsSection.tsx
```

## Page Breakdown

### 1. Home Page (`/app/page.tsx`)

**Components Used:**

- HeroSection - Main hero banner with CTA
- OurStorySection - Story content with image
- OurJourneySection - Journey timeline
- PhilosophySection - Philosophy principles in black card
- IngredientsSection - Ingredient cards grid
- CTASection (shared) - Call-to-action
- BeforeAfterSection (shared) - Before/After slider
- TestimonialsSection (shared) - Customer testimonials

### 2. About Page (`/app/about/page.tsx`)

**Components Used:**

- AboutStorySection - About story with image
- AboutJourneySection - About journey content
- AboutPhilosophySection - Philosophy section
- AboutIngredientsSection - Detailed ingredients
- CTASection (shared)
- BeforeAfterSection (shared)
- TestimonialsSection (shared)

### 3. Shop Page (`/app/shop/page.tsx`)

**Components Used:**

- FeaturedProductHero - Featured product showcase
- CoreProductsSection - Core products grid
- SignatureSerumSection - Signature serum highlight
- TheCreamSection - Cream product highlight
- CTASection (shared)
- BeforeAfterSection (shared)
- TestimonialsSection (shared)

### 4. Product Detail Page (`/app/product/[id]/page.tsx`)

**Components Used:**

- ProductDetailsSection - Gallery, pricing, add to cart (with state)
- WhyChooseSection - Product benefits
- MakeSwitchSection - Statistics and social proof
- HowToUseSection - Step-by-step guide
- CTASection (shared)
- BeforeAfterSection (shared)
- FromUsToYouSection - Image gallery
- MoreProductsSection - Related products
- TestimonialsSection (shared)

### 5. Contact Page (`/app/contact/page.tsx`)

**Components Used:**

- ContactFormSection - Contact form with validation (React Hook Form)
- ContactMethodsSection - Email, phone, address
- FAQSection - Accordion FAQ (with state)
- TestimonialsSection (shared)

### 6. Checkout Page (`/app/checkout/page.tsx`)

**Components Used:**

- ShippingForm - Shipping information form with validation
- PaymentMethodSection - Payment method selection (Bank Transfer, Bkash, Nagad)
- OrderSummary - Cart items and order total

### 7. My Account Page (`/app/account/page.tsx`)

**Components Used:**

- AccountTabs - Profile and Order History tab switcher
- UserInfoForm - User profile information with avatar
- ShippingAddressForm - Shipping address management
- PasswordChangeForm - Change password with validation
- OrderHistorySection - Order history display

### 8. Order Tracking Page (`/app/orders/[orderId]/page.tsx`)

**Components Used:**

- OrderHeader - Order details header with status badge
- OrderItemsList - Order items with pricing breakdown
- ShippingAddressCard - Shipping address display
- TrackingProgress - Shipping progress tracker with timeline
- SupportSection - Contact support and review buttons

### 9. Sign In Page (`/app/auth/signin/page.tsx`)

**Components Used:**

- AuthHero - Decorative product image section
- SignInForm - Sign in form with email/password validation

### 10. Sign Up Page (`/app/auth/signup/page.tsx`)

**Components Used:**

- AuthHero - Decorative product image section (shared with sign in)
- SignUpForm - Sign up form with name, email, password validation

## Shared Components

### CTASection

Used on: Home, About, Shop, Product
Purpose: Reusable call-to-action section with "Shop Now" button

### BeforeAfterSection

Used on: Home, About, Shop, Product
Purpose: Reusable before/after comparison slider UI

### TestimonialsSection

Used on: Home, About, Shop, Product, Contact
Purpose: Reusable customer testimonials grid

## Benefits of This Structure

### 1. **Maintainability**

- Each component is focused on a single responsibility
- Easier to locate and update specific sections
- Changes to shared components update across all pages

### 2. **Reusability**

- Shared components eliminate code duplication
- Easy to use same sections across multiple pages
- Consistent UI/UX across the website

### 3. **Scalability**

- Easy to add new pages using existing components
- Simple to create variations of components
- Clear structure for team collaboration

### 4. **Testing**

- Components can be tested in isolation
- Easier to write unit tests for each section
- Better test coverage

### 5. **Performance**

- Components can be lazy-loaded if needed
- Better code-splitting opportunities
- Easier to optimize specific sections

## State Management

### Client Components (with "use client")

**Home/Shop/Product Pages:**

- ProductDetailsSection - Manages image selection and quantity

**Contact Page:**

- ContactFormSection - Manages form state with React Hook Form
- FAQSection - Manages accordion open/close state

**Checkout Page:**

- ShippingForm - Form validation with React Hook Form
- PaymentMethodSection - Payment method state

**Account Page:**

- AccountTabs - Tab switching state
- UserInfoForm - Profile form with React Hook Form
- ShippingAddressForm - Shipping form with React Hook Form
- PasswordChangeForm - Password form with React Hook Form

**Auth Pages:**

- SignInForm - Sign in form with React Hook Form
- SignUpForm - Sign up form with React Hook Form

### Server Components (default)

- All other components are server components
- Better performance and SEO
- Reduced JavaScript bundle size

## Future Enhancements

1. **Add Prop Interfaces**

   - Make components more flexible with props
   - Allow customization of content from parent pages

2. **Create Storybook**

   - Document all components visually
   - Show all component variations

3. **Add Component Tests**

   - Unit tests for each component
   - Integration tests for complex interactions

4. **Optimize Images**

   - Add Next.js Image component
   - Implement proper image loading strategies

5. **Add Animations**
   - Framer Motion for smooth transitions
   - Scroll animations for sections

## Notes

- All ESLint gradient warnings are cosmetic (bg-gradient-to-_ vs bg-linear-to-_)
- React Hook Form warnings in client components are expected
- Unused variables in some components can be cleaned up if needed
