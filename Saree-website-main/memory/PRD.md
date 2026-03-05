# Tamara's Silk Handloom - E-commerce Frontend PRD

## Project Overview
**Project Name:** Tamara's Silk Handloom - Mobile-First Luxury Saree E-commerce Frontend  
**Created:** March 3, 2026  
**Last Updated:** March 3, 2026  
**Status:** MVP Complete + Image Fix Applied  

## Original Problem Statement
Build a MOBILE-FIRST luxury saree e-commerce FRONTEND website using JSON as data source. Design inspired by Manish Malhotra website with dark/black background, gold accents, rich animations.

## User Personas

### Primary Persona: Affluent Indian Woman
- Age: 25-55
- Interests: Premium ethnic wear, silk sarees, handloom craftsmanship
- Behavior: Shops online, uses Instagram for fashion inspiration
- Pain Points: Difficulty finding authentic handloom sarees, wants personalized service

### Secondary Persona: Gift Buyer
- Looking for special occasion sarees (weddings, festivals)
- Values quality and authenticity
- Appreciates "Price on Request" model for exclusivity

## Core Requirements (Static)

### Design Requirements
- Mobile-first design (360px-430px priority)
- Dark/black background (#050505)
- Gold accents (#D4AF37)
- Playfair Display + Lato fonts
- Rich animations (parallax, staggered reveals)
- Manish Malhotra website aesthetic

### Features
- ✅ Hero section with brand intro
- ✅ Featured collection grid
- ✅ Shop page with filters (fabric, color, work type)
- ✅ Sort functionality (newest, oldest, alphabetical)
- ✅ Product detail page with image gallery
- ✅ "Price on Request" model
- ✅ WhatsApp inquiry integration (+91-7041297390)
- ✅ Instagram integration (@tamara_handloomsilksarees)
- ✅ Contact form
- ✅ Mobile bottom navigation bar
- ✅ Hamburger menu drawer

### Technical Stack
- React (Frontend)
- Tailwind CSS (Styling)
- Framer Motion (Animations)
- Shadcn/UI (Components)
- JSON as data source (18 products)

## What's Been Implemented

### March 3, 2026 - MVP Launch

#### Pages Created
1. **Home Page** (`/`)
   - Full-height hero with parallax effect
   - Featured collection (6 products)
   - About section with craftsmanship story
   - Instagram CTA section

2. **Shop Page** (`/shop`)
   - 18 products displayed in grid
   - Filter drawer for mobile (fabric, color, work type)
   - Desktop filter dropdowns
   - Sort functionality

3. **Product Detail Page** (`/product/:id`)
   - Swipeable image gallery (mobile)
   - Thumbnail gallery (desktop)
   - Product attributes (fabric, color, work type)
   - Price on Request
   - WhatsApp inquiry button
   - Accordion sections (Details, Care, Shipping)
   - Related products

4. **About Page** (`/about`)
   - Brand story
   - Values section
   - Craftsmanship section

5. **Contact Page** (`/contact`)
   - Contact form
   - WhatsApp button
   - Instagram link
   - FAQ section

#### Components Created
- Navbar (with mobile drawer)
- BottomNav (sticky mobile navigation)
- ProductCard (with image proxy)
- ProductGrid
- FilterDrawer
- ImageGallery (with image proxy)
- Footer

### March 3, 2026 - Image Proxy Fix
**Issue:** Instagram CDN URLs blocked external access (403 Forbidden)
**Solution:** Created `/src/utils/imageProxy.js` utility that uses weserv.nl as a proxy service to bypass Instagram CDN restrictions

**Files Updated:**
- `/app/frontend/src/utils/imageProxy.js` (NEW)
- `/app/frontend/src/components/ProductCard.jsx`
- `/app/frontend/src/components/ImageGallery.jsx`
- `/app/frontend/src/data/data.json` (updated with user's JSON)

## Prioritized Backlog

### P0 (Critical) - Complete
- ✅ Core navigation
- ✅ Product display
- ✅ WhatsApp integration
- ✅ Mobile responsiveness

### P1 (High Priority) - For Next Phase
- Search functionality
- Wishlist/Save feature
- Image optimization (WebP conversion)
- SEO meta tags implementation

### P2 (Medium Priority) - Future
- Product categories page
- Size guide section
- Customer testimonials
- Newsletter signup
- Analytics integration

### P3 (Nice to Have)
- Virtual try-on feature
- AR preview
- Customer gallery
- Blog section

## Next Tasks List

1. **Search Feature** - Add search bar in navbar with product filtering
2. **SEO Optimization** - Add meta tags, Open Graph, structured data
3. **Image Optimization** - Implement WebP with fallback, proper srcset
4. **Wishlist** - Allow users to save favorite products
5. **Performance** - Lazy load components, code splitting

## Technical Notes

### Image Handling
- Instagram CDN images from JSON may expire/block
- Unsplash placeholder images used as fallback
- onError handler switches to placeholder

### Data Structure
```json
{
  "brand": { "name", "username", "bio", "profile_image", "instagram_url" },
  "products": [
    { "title", "description", "fabric", "color", "work_type", "media", "instagram_url", "posted_date" }
  ]
}
```

### WhatsApp Integration
- Phone: +91-7041297390
- Pre-filled message with product name

### Instagram
- Profile: @tamara_handloomsilksarees
- URL: https://www.instagram.com/tamara_handloomsilksarees/
