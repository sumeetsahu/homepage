# Design System Documentation

## 🎨 Overview

This document defines the design language for Sumeet Sahu's personal profile website. It provides guidelines, patterns, and examples to ensure consistency across all pages and future updates.

**Design Philosophy:**
- Clean, professional, and elegant
- Scalable (handles growing content)
- Accessible and responsive
- Easy to maintain and update

---

## 🎨 Color Palette

### Primary Colors

```css
/* Neutrals (Base) */
--color-white: #ffffff
--color-gray-50: #f9fafb
--color-gray-100: #f3f4f6
--color-gray-200: #e5e7eb
--color-gray-300: #d1d5db
--color-gray-600: #4b5563
--color-gray-700: #374151
--color-gray-800: #1f2937
--color-gray-900: #111827
--color-black: #000000

/* Accent Colors */
--color-blue-50: #eff6ff
--color-blue-100: #dbeafe
--color-blue-600: #2563eb
--color-blue-700: #1d4ed8

--color-purple-50: #faf5ff
--color-purple-100: #f3e8ff
--color-purple-600: #9333ea
--color-purple-700: #7e22ce

--color-green-50: #f0fdf4
--color-green-100: #dcfce7
--color-green-600: #16a34a
--color-green-700: #15803d

--color-pink-50: #fdf2f8
--color-pink-600: #db2777

--color-orange-600: #ea580c
```

### Color Usage

| Use Case | Color | Example |
|----------|-------|---------|
| **Backgrounds** | White, Gray-50 | Main sections |
| **Text Primary** | Gray-900, Black | Headings, body text |
| **Text Secondary** | Gray-600, Gray-700 | Descriptions, metadata |
| **Text Muted** | Gray-500 | Timestamps, labels |
| **Borders** | Gray-200, Gray-300 | Cards, dividers |
| **Current Role Badge** | Green-600 | "Current" badge |
| **Founder Badge** | Orange-600 | "Founder" badge |
| **Feature Cards** | Blue/Purple/Pink/Green gradients | Experience cards |
| **Interactive (Hover)** | Gray-800, Blue-700 | Buttons, links |
| **Philosophy Section** | Gray-900 → Gray-800 gradient | Quote section |
| **Contact Section** | Blue-600 → Purple-600 gradient | Contact CTA |

---

## 📝 Typography

### Font Family

```css
/* Primary Font */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Font Weights

```css
--font-light: 300    /* Large headings, stats */
--font-normal: 400   /* Body text */
--font-medium: 500   /* Subheadings, labels */
--font-semibold: 600 /* Card titles */
--font-bold: 700     /* Main headings */
```

### Type Scale

```css
/* Headings */
--text-6xl: 3.75rem  /* 60px - Main name on hero */
--text-5xl: 3rem     /* 48px - unused */
--text-4xl: 2.25rem  /* 36px - Section titles */
--text-3xl: 1.875rem /* 30px - Experience company names */
--text-2xl: 1.5rem   /* 24px - Role titles */
--text-xl: 1.25rem   /* 20px - Lead paragraphs */
--text-lg: 1.125rem  /* 18px - Secondary titles */

/* Body Text */
--text-base: 1rem    /* 16px - Body text */
--text-sm: 0.875rem  /* 14px - Meta info, tags */
--text-xs: 0.75rem   /* 12px - Labels, badges */
```

### Usage Examples

```tsx
// Hero Name
<h1 className="text-6xl md:text-7xl font-light">
  Sumeet<br/><span className="font-semibold">Sahu</span>
</h1>

// Section Titles
<h2 className="text-4xl font-semibold mb-12">
  Professional Experience
</h2>

// Company Names
<h3 className="text-3xl font-semibold mb-3">
  Amazon India
</h3>

// Role Titles
<p className="text-xl text-gray-700 mb-2">
  Senior Software Development Engineer
</p>

// Body Text
<p className="text-gray-700 leading-relaxed">
  Description text here...
</p>

// Meta Information
<p className="text-sm text-gray-600 mb-4">
  2020 — Present · Transportation Financial Systems
</p>

// Tags/Badges
<span className="px-3 py-1 text-xs font-medium">
  AWS
</span>
```

---

## 📐 Spacing & Layout

### Container System

```tsx
// Standard Container (Most Sections)
<div className="container mx-auto max-w-6xl px-6 py-20">
  {/* Content */}
</div>

// Narrow Container (Hero, Philosophy, Contact)
<div className="container mx-auto max-w-4xl px-6">
  {/* Content */}
</div>
```

### Spacing Scale

```css
/* Padding/Margin */
--spacing-1: 0.25rem   /* 4px */
--spacing-2: 0.5rem    /* 8px */
--spacing-3: 0.75rem   /* 12px */
--spacing-4: 1rem      /* 16px */
--spacing-6: 1.5rem    /* 24px */
--spacing-8: 2rem      /* 32px */
--spacing-12: 3rem     /* 48px */
--spacing-16: 4rem     /* 64px */
--spacing-20: 5rem     /* 80px */
```

### Common Patterns

```tsx
// Section Spacing
<section className="py-20 px-6">

// Card Padding
<div className="p-6">           // Regular card
<div className="p-8">           // Featured card

// Element Gaps
<div className="space-y-8">     // Vertical stacking
<div className="flex gap-4">    // Horizontal layout
<div className="grid gap-6">    // Grid layout

// Margins
<h2 className="mb-12">          // After section titles
<h3 className="mb-3">           // After card titles
<p className="mb-4">            // After paragraphs
```

---

## 🎴 Component Patterns

### 1. Hero Section

```tsx
<section className="py-20 px-6 border-b">
  <div className="container mx-auto max-w-6xl">
    <div className="max-w-4xl">
      {/* Label */}
      <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
        Software Engineer
      </p>
      
      {/* Name */}
      <h1 className="text-6xl md:text-7xl font-light mb-6 leading-tight">
        Sumeet<br/><span className="font-semibold">Sahu</span>
      </h1>
      
      {/* Description */}
      <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
        Description text...
      </p>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-6 max-w-xl mb-8">
        {/* Stat cards */}
      </div>
      
      {/* CTA Buttons */}
      <div className="flex gap-4">
        {/* Buttons */}
      </div>
    </div>
  </div>
</section>
```

**Key Features:**
- Clean hierarchy
- Stats in 3-column grid
- CTA buttons grouped
- Constrained width for readability

---

### 2. Philosophy/Quote Section

```tsx
<section className="py-20 px-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
  <div className="container mx-auto max-w-4xl text-center">
    <p className="text-3xl md:text-4xl font-light leading-relaxed mb-6 italic">
      "Quote text here..."
    </p>
    <p className="text-sm text-gray-400 uppercase tracking-widest">
      — Attribution
    </p>
  </div>
</section>
```

**Key Features:**
- Dark gradient background
- Italic quote text
- Centered layout
- Uppercase attribution

---

### 3. Tab Navigation

```tsx
<div className="border-b border-gray-200 mb-8">
  <div className="flex flex-wrap gap-2">
    <button className="tab-btn px-6 py-3 font-medium text-sm border-b-2 border-black">
      Featured Roles
    </button>
    <button className="tab-btn px-6 py-3 font-medium text-sm border-b-2 border-transparent hover:border-gray-300 text-gray-600">
      All Experience
    </button>
  </div>
</div>
```

**States:**
- **Active:** `border-black`, no `text-gray-600`
- **Inactive:** `border-transparent text-gray-600`
- **Hover:** `hover:border-gray-300`

---

### 4. Featured Experience Card (Large)

```tsx
<div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-100">
  {/* Header with Badge */}
  <div className="flex items-center gap-2 mb-3">
    <h3 className="text-3xl font-semibold">Company Name</h3>
    <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full font-medium">
      Current
    </span>
  </div>
  
  {/* Role & Meta */}
  <p className="text-xl text-gray-700 mb-2">Role Title</p>
  <p className="text-sm text-gray-600 mb-4">2020 — Present · Team Name</p>
  
  {/* Description */}
  <p className="text-gray-700 leading-relaxed mb-6">
    Description...
  </p>
  
  {/* Metrics (Optional) */}
  <div className="grid md:grid-cols-3 gap-4 text-center mb-6">
    <div className="bg-white p-4 rounded-lg">
      <p className="text-2xl font-bold text-blue-600">1.5B</p>
      <p className="text-xs text-gray-600">Transactions/Day</p>
    </div>
  </div>
  
  {/* Technology Tags */}
  <div className="flex flex-wrap gap-2">
    <span className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium">
      AWS
    </span>
  </div>
</div>
```

**Gradient Colors by Company:**
- Amazon: `from-blue-50 to-purple-50` + `border-blue-100`
- Adobe: `from-purple-50 to-pink-50` + `border-purple-100`
- myPNRstatus: `from-green-50 to-emerald-50` + `border-green-100`

---

### 5. Compact Experience List Item

```tsx
<div className="grid md:grid-cols-4 gap-6 pb-8 border-b">
  {/* Date Column */}
  <div>
    <p className="text-sm text-gray-500">2020 — Present</p>
  </div>
  
  {/* Content Column */}
  <div className="md:col-span-3">
    <div className="flex items-center gap-2 mb-2">
      <h3 className="text-2xl font-semibold">Company Name</h3>
      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">
        Current
      </span>
    </div>
    <p className="text-lg text-gray-600 mb-3">Role Title</p>
    <p className="text-gray-700 leading-relaxed mb-4">
      Description...
    </p>
    <div className="flex flex-wrap gap-2">
      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-xs">
        Technology
      </span>
    </div>
  </div>
</div>
```

---

### 6. Grid View Card (Enterprise Tab)

```tsx
<div className="border border-gray-200 p-6 rounded-xl hover:shadow-lg transition">
  <h3 className="text-xl font-semibold mb-1">Company Name</h3>
  <p className="text-sm text-gray-500 mb-3">2020 — Present</p>
  <p className="text-sm text-gray-700">Role Title, Team Name</p>
</div>
```

**Hover Effect:**
- `hover:shadow-lg transition`
- Optional: `bg-blue-50` for current role

---

### 7. Contact Cards

```tsx
<a href="mailto:email@example.com" 
   className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl hover:bg-white/20 transition">
  <div className="text-4xl mb-3">✉️</div>
  <h3 className="font-semibold mb-2">Email</h3>
  <p className="text-sm text-blue-100">email@example.com</p>
</a>
```

**Background:**
- Section: `bg-gradient-to-r from-blue-600 to-purple-600 text-white`
- Cards: Glass morphism effect with `bg-white/10 backdrop-blur-sm`

---

### 8. Buttons

```tsx
// Primary Button
<button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium">
  Get in Touch
</button>

// Secondary Button
<button className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-900 transition font-medium">
  LinkedIn
</button>
```

---

### 9. Badges

```tsx
// Current Role Badge
<span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full font-medium">
  Current
</span>

// Founder Badge
<span className="px-3 py-1 bg-orange-600 text-white text-xs rounded-full font-medium">
  Founder
</span>

// Status Badge (in lists)
<span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">
  Current
</span>
```

---

### 10. Technology Tags

```tsx
// Large Tags (Featured Cards)
<span className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium">
  AWS
</span>

// Small Tags (Lists)
<span className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-xs">
  AWS
</span>
```

**Color Coding by Company:**
- Amazon: `bg-blue-50 text-blue-700`
- Adobe: `bg-purple-50 text-purple-700`
- Microsoft: `bg-cyan-50 text-cyan-700`
- myPNRstatus: `bg-green-50 text-green-700`
- Generic: `bg-gray-100 text-gray-700`

---

### 11. Stats Cards

```tsx
// Hero Stats
<div className="text-center p-4 bg-gray-50 rounded-lg">
  <p className="text-3xl font-semibold mb-1">1.5B</p>
  <p className="text-xs text-gray-600 uppercase tracking-wide">TXN/Day</p>
</div>

// Featured Card Stats
<div className="bg-white p-4 rounded-lg text-center">
  <p className="text-2xl font-bold text-blue-600">1.5B</p>
  <p className="text-xs text-gray-600">Transactions/Day</p>
</div>
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile First Approach */
sm: 640px   /* Tablets */
md: 768px   /* Small laptops */
lg: 1024px  /* Desktops */
xl: 1280px  /* Large desktops */
```

### Common Patterns

```tsx
// Text Sizing
className="text-6xl md:text-7xl"  // Larger on desktop

// Layout Direction
className="flex-col md:flex-row"  // Stack on mobile, row on desktop

// Grid Columns
className="grid-cols-1 md:grid-cols-3"  // 1 col mobile, 3 desktop

// Spacing
className="gap-4 md:gap-6"  // Tighter on mobile

// Visibility
className="hidden md:block"  // Hide on mobile
```

---

## ♿ Accessibility

### Guidelines

1. **Color Contrast:**
   - Text on white: Gray-900 or Black (AAA)
   - Text on dark bg: White (AAA)
   - Links: Blue-600 with underline on hover

2. **Interactive Elements:**
   - Minimum tap target: 44px × 44px
   - Focus states: `focus:ring-2 focus:ring-blue-600`
   - Hover states: Color change + transition

3. **Semantic HTML:**
   - Use proper heading hierarchy (h1 → h2 → h3)
   - `<section>` for major sections
   - `<nav>` for tab navigation
   - `<button>` for interactive elements

4. **ARIA Labels:**
   ```tsx
   <a href="#" aria-label="LinkedIn Profile">
     LinkedIn
   </a>
   ```

---

## 🎯 Implementation Guidelines for AI Agents

### When Adding New Content

1. **New Experience Entry:**
   - Add to appropriate data file (`experience.json`)
   - Choose gradient color (blue/purple/pink/green for variety)
   - Add relevant technology tags with color coding
   - Include metrics if available (users, TPS, scale)

2. **New Section:**
   - Use standard container: `<section className="py-20 px-6">`
   - Alternate backgrounds: white, gray-50
   - Follow spacing patterns (mb-12 for section titles)

3. **New Component:**
   - Check if similar pattern exists in this document
   - Follow naming conventions (PascalCase for components)
   - Use TypeScript interfaces for props
   - Add to appropriate category

### Maintaining Consistency

✅ **DO:**
- Use existing color combinations
- Follow spacing scale (4, 6, 8, 12, 20)
- Match font weights to purpose
- Keep hover/active states consistent
- Use gradients for featured content

❌ **DON'T:**
- Introduce new colors without updating palette
- Mix spacing values (e.g., py-15)
- Create inconsistent button styles
- Skip responsive modifiers
- Use inline styles

---

## 📦 Component Library Reference

### Quick Copy-Paste Templates

All components above can be copied and modified. Key files:

```
src/
├── components/
│   ├── Header.tsx          → Hero section
│   ├── Philosophy.tsx      → Quote section
│   ├── Experience.tsx      → Tabbed experience
│   ├── Skills.tsx          → Skills grid
│   ├── Contact.tsx         → Contact section
│   └── Footer.tsx          → Footer
├── data/
│   ├── profile.json        → Personal info
│   ├── experience.json     → Work history
│   └── skills.json         → Skills list
└── types/
    └── index.ts            → TypeScript interfaces
```

---

## 🔄 Version History

- **v2.0.0** (2026-02-10): Initial design system based on Option 9 Enhanced
  - Tabbed experience layout
  - Philosophy section
  - Contact section
  - Scalable architecture

---

## 📞 Questions?

This design system should cover most use cases. For edge cases:
1. Check if similar pattern exists
2. Follow spacing/color guidelines
3. Maintain consistency with examples
4. Document new patterns here

**Remember:** Consistency > Perfection. When in doubt, use simpler, existing patterns.
