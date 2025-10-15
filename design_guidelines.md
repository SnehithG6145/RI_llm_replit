# Design Guidelines: Research Infographic Platform

## Design Approach
**Reference-Based Approach** drawing from Instagram (feed & social interactions), Medium (content discovery & readability), and Behance (visual portfolio presentation). This platform bridges academic rigor with social media engagement, requiring visual appeal to make research accessible while maintaining credibility.

**Core Principle:** Transform complex research into visually engaging, swipeable stories that educate and inspire action.

---

## Color Palette

### Light Mode
- **Primary Background:** 0 0% 99% (off-white, reduces eye strain)
- **Surface/Cards:** 0 0% 100% (pure white)
- **Primary Brand:** 210 100% 56% (trustworthy blue, academic association)
- **Accent:** 160 84% 39% (credibility green for verified content)
- **Text Primary:** 220 13% 18% (near-black for readability)
- **Text Secondary:** 220 9% 46% (muted for metadata)

### Dark Mode
- **Primary Background:** 220 13% 10% (deep charcoal)
- **Surface/Cards:** 220 13% 14% (elevated surfaces)
- **Primary Brand:** 210 100% 62% (brightened for dark mode)
- **Accent:** 160 84% 45% (adjusted for contrast)
- **Text Primary:** 0 0% 98% (near-white)
- **Text Secondary:** 220 9% 64% (muted for metadata)

### Semantic Colors
- **Success (Approved):** 142 76% 36%
- **Warning (Pending):** 38 92% 50%
- **Error (Rejected):** 0 84% 60%
- **Info Tags:** 200 98% 39%

---

## Typography

### Font Families
- **Primary (Interface):** Inter (Google Fonts) - clean, modern, excellent readability
- **Accent (Headlines):** Playfair Display (Google Fonts) - academic gravitas for research titles
- **Data/Stats:** JetBrains Mono (Google Fonts) - for statistics and numerical data

### Type Scale
- **Hero Title:** text-5xl md:text-6xl font-serif (Playfair)
- **Infographic Title:** text-3xl md:text-4xl font-serif leading-tight
- **Section Headers:** text-2xl font-semibold
- **Body Text:** text-base leading-relaxed (optimal for long-form reading)
- **Metadata:** text-sm text-secondary
- **Tags:** text-xs font-medium uppercase tracking-wide

---

## Layout System

### Spacing Primitives
**Core units:** 2, 4, 8, 12, 16, 24 (tailwind units)
- **Micro spacing:** p-2, gap-2 (8px) - tight UI elements
- **Standard spacing:** p-4, gap-4 (16px) - default component padding
- **Section spacing:** py-8, py-12 (32px-48px) - between content blocks
- **Large spacing:** py-16, py-24 (64px-96px) - major section separators

### Grid System
- **Feed Layout:** Single column on mobile, 2-column grid on md:, 3-column on lg: (Masonry-style for varied infographic heights)
- **Container:** max-w-7xl mx-auto px-4 (global wrapper)
- **Reading Width:** max-w-prose (optimal for text-heavy sections)

---

## Component Library

### Navigation
- **Top Nav:** Fixed header with glass morphism effect (backdrop-blur-lg bg-white/80 dark:bg-slate-900/80)
- **Role Indicator:** Subtle badge showing user type (Researcher/Customer/Admin)
- **Search:** Prominent tag-based search bar with autocomplete dropdown
- **Profile Avatar:** Circular with online status indicator

### Feed Components

#### Infographic Card (Cover)
- **Structure:** Card with hover lift effect (hover:shadow-2xl transition-all)
- **Cover Image:** aspect-[3/4] object-cover (portrait orientation like Instagram)
- **Title Overlay:** Gradient overlay bottom-to-top (from-black/70 to-transparent) with white text
- **Tag Pills:** Absolute positioned top-right, glass morphism chips
- **Metadata Footer:** Researcher name, verification badge, date, save/share icons

#### Full Infographic Viewer (Modal/Overlay)
- **Container:** Full-screen overlay with dark backdrop (bg-black/90)
- **Navigation:** Swipe gestures + arrow buttons for section navigation
- **Progress Indicator:** Dot navigation showing current section (a, b, c1, c2, etc.)
- **Section Cards:** max-w-4xl centered, white cards with shadow-2xl
- **Close Button:** Top-right with backdrop blur

### Infographic Section Layouts

#### Section (a) - Overview
- **Layout:** Single column, centered
- **Title:** Large serif font (text-4xl) with generous line-height
- **Stats Display:** Grid of 2-3 stat cards with large numbers (text-6xl font-mono) and labels
- **Sources:** Small text at bottom with citation format
- **Visual:** Background pattern or subtle gradient

#### Section (b) - Methods (Researcher View)
- **Layout:** Two-column on desktop (methodology left, participants/data right)
- **Technical Terms:** Highlighted with tooltip/popover on hover
- **Participant Count:** Large number display with icon
- **Visual:** Diagrammatic representation if applicable

#### Section (c) - Solutions (Multiple Pages)
- **Layout:** Card-based, each solution on separate page
- **Solution Card:** Icon/illustration at top, title, description, actionable steps (numbered list)
- **CTA:** "Try This" or "Learn More" buttons
- **Visual:** Icons from Heroicons, simple illustrations

### Admin Dashboard

#### Tag Management
- **Tag Grid:** Sortable, filterable grid of tag chips
- **Create Tag:** Modal with color picker, icon selector, category assignment
- **Tag Analytics:** Usage count, trending indicators

#### Verification Queue
- **Card Layout:** Similar to feed but with admin actions (Approve/Reject/Request Changes)
- **Detail Panel:** Side-by-side comparison of sections, source verification checklist
- **Status Indicators:** Color-coded badges (yellow pending, green approved, red rejected)

### User Profile

#### Interest Tags Section
- **Selected Tags:** Larger, filled chips (bg-primary text-white)
- **Recommended Tags:** Outlined chips with "+" icon (border-2 border-primary)
- **All Tags:** Search/filter interface with category grouping

#### Feed Toggle
- **Tabs:** "For You" (personalized) and "Explore" (outside interests)
- **Visual Indicator:** Active tab with bottom border animation

---

## Interactions & Animations

### Micro-interactions (Minimal Use)
- **Card Hover:** Subtle lift (translateY(-4px)) with shadow increase
- **Tag Selection:** Scale pulse on click (scale-105)
- **Swipe Indicator:** Fade-in arrow hint on first visit to full viewer
- **Loading States:** Skeleton screens matching card layouts

### Page Transitions
- **Feed to Viewer:** Scale-up from card position with fade-in backdrop
- **Section Navigation:** Horizontal slide with slight fade

---

## Images

### Hero Section (Landing/About Pages)
- **Large hero image:** Full-width, 60vh height, showcasing diverse researchers and visual research data
- **Placement:** Top of landing page with overlay text
- **Style:** Split-screen showing research paper transforming into colorful infographic

### Infographic Covers
- **Required:** AI-generated or researcher-uploaded cover image for each post
- **Fallback:** Gradient backgrounds with large typography if no image provided
- **Aspect Ratio:** Consistent 3:4 portrait for grid uniformity

### Profile Headers
- **Small cover image:** Subtle pattern or gradient, not prominent
- **Avatar:** Circular, 120px on profile, 40px in nav

---

## Accessibility

- **Color Contrast:** WCAG AAA for all text (7:1 minimum ratio)
- **Keyboard Navigation:** Full support for swipe navigation via arrow keys
- **Screen Readers:** Semantic HTML with ARIA labels for infographic sections
- **Focus Indicators:** Visible 2px ring with primary color on all interactive elements
- **Dark Mode:** Automatic based on system preference with manual toggle

---

## Responsive Breakpoints

- **Mobile (base):** Single column feed, full-screen infographic viewer
- **Tablet (md: 768px):** 2-column feed grid, side panel for profile
- **Desktop (lg: 1024px):** 3-column masonry feed, split-view admin dashboard
- **Wide (xl: 1280px):** Maximum content width capped at 1400px

---

**Key Design Philosophy:** Create a platform where academic research feels as engaging as social media, where every swipe reveals actionable insights, and where visual design builds trust in scientific credibility.