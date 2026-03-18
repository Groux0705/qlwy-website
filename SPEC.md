# QLWY - AI-Powered Web Design Agency Landing Page

## 1. Concept & Vision

A dark, premium, Apple-inspired single-page landing page for an AI-powered web design agency. The aesthetic features a custom "liquid glass" morphism effect against pure black backgrounds, creating depth through translucent layers with subtle gradient borders. The experience feels futuristic, exclusive, and technically sophisticated—like stepping into a high-end tech showroom.

## 2. Design Language

### Aesthetic Direction
Dark luxury tech meets frosted glass elegance. Inspired by Apple's spatial computing interfaces and high-end watch marketing. Every element floats on the black canvas with subtle luminosity effects.

### Color Palette
- `--background`: 213 45% 67% (blue-gray tint for glass blending)
- `--foreground`: 0 0% 100% (pure white)
- `--primary`: 0 0% 100% (white)
- `--primary-foreground`: 213 45% 67% (blue-gray)
- `--border`: 0 0% 100% / 0.2 (20% white opacity)
- `--radius`: 9999px (pill shapes throughout)

### Typography
- **Headings**: Instrument Serif (italic) - elegant, editorial feel
- **Body**: Barlow (300, 400, 500, 600) - clean, modern readability
- Headings: `font-heading italic text-white tracking-tight leading-[0.9]`
- Body: `font-body font-light text-white/60 text-sm`

### Spatial System
- Sections use generous padding: `py-24 px-6 md:px-16 lg:px-24`
- Large breathing room between elements
- 1000px hero height for dramatic entrance

### Motion Philosophy
- Word-by-word blur-to-clear animations on headings (BlurText component)
- Fade-in with blur for body text
- Smooth scroll behavior
- HLS video backgrounds with gradient fades
- Staggered reveals using intersection observer

### Visual Assets
- Lucide React icons (Zap, Palette, BarChart3, Shield, ArrowUpRight, Play)
- Hero: MP4 video background
- Section videos: HLS streams via hls.js
- Logo: 48×48 image placeholder

## 3. Layout & Structure

### Page Structure
1. **Navbar** - Fixed, floating pill navigation
2. **Hero** - 1000px with video background, blur text animation
3. **Partners Bar** - Horizontal trust signals
4. **How It Works** - HLS video background section
5. **Features Chess** - Alternating image/text rows
6. **Features Grid** - 4-column capability cards
7. **Stats** - HLS video with metrics
8. **Testimonials** - 3-column social proof
9. **CTA Footer** - HLS video with conversion section

### Responsive Strategy
- Mobile-first with breakpoints at md (768px) and lg (1024px)
- Single column on mobile, expand to grids on larger screens
- Navigation collapses to single button on mobile

## 4. Features & Interactions

### BlurText Animation
- Splits text by words
- Each word animates via IntersectionObserver
- Animation: blur(10px) → blur(5px) → blur(0px)
- Opacity: 0 → 0.5 → 1
- Y: 50 → -5 → 0
- Step duration: 0.35s per word, 100ms stagger

### Liquid Glass Components
- `.liquid-glass`: backdrop-blur(4px), subtle inset shadow, gradient border mask
- `.liquid-glass-strong`: backdrop-blur(50px), stronger shadows, higher gradient opacity

### Video Handling
- Hero: MP4 with poster fallback
- Other sections: HLS via hls.js with Safari canPlayType fallback
- Gradient overlays at top/bottom (200px black ↔ transparent)

### Navigation
- Fixed at top-4 with z-50
- Liquid glass pill containing nav links
- Solid white "Get Started" CTA button

## 5. Component Inventory

### LiquidGlass (base component)
- States: subtle (default), strong (more blur/shadow)
- Rounded-full or rounded-2xl variants
- Gradient border via pseudo-element mask

### Navbar
- Logo (48×48), nav links, CTA button
- Sticky positioning with blur backdrop

### BlurText
- Animates words from blurred to clear
- Configurable delay per word

### VideoBackground
- Handles HLS and MP4 sources
- Gradient fade overlays
- Desaturation option

### Badge
- Liquid glass pill with text
- Inline block styling

### FeatureCard
- Icon, title, description
- Liquid glass container

### StatCard
- Large value, label
- Grid layout support

### TestimonialCard
- Quote, author name, role
- Liquid glass container

### Button Variants
- liquid-glass-strong: outlined with glass effect
- solid: bg-white text-black for primary CTAs

## 6. Technical Approach

### Stack
- React 18 + Vite + TypeScript
- Tailwind CSS with custom config
- shadcn/ui components (Button)
- Framer Motion for animations
- hls.js for HLS video playback
- Lucide React for icons

### Architecture
- Single page application
- Component-based structure
- Custom hooks for video/HLS handling
- IntersectionObserver for scroll animations

### Key Files
- `tailwind.config.js` - Extended fonts and colors
- `index.css` - CSS variables and liquid glass classes
- `components/BlurText.tsx` - Word animation component
- `components/VideoBackground.tsx` - HLS/MP4 handler
- `components/LiquidGlass.tsx` - Reusable glass component
- `App.tsx` - Main page composition
