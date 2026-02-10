# Component Examples Library

This document provides visual examples and code snippets for all reusable components in the design system.

## 📋 Table of Contents

1. [Layout Components](#layout-components)
2. [Typography Examples](#typography-examples)
3. [Card Components](#card-components)
4. [Button Variations](#button-variations)
5. [Badge & Tag Components](#badge--tag-components)
6. [Tab Navigation](#tab-navigation)
7. [Form Elements](#form-elements)
8. [Section Patterns](#section-patterns)

---

## Layout Components

### Standard Section Container

```tsx
// Use for most sections
<section className="py-20 px-6 bg-white">
  <div className="container mx-auto max-w-6xl">
    <h2 className="text-4xl font-semibold mb-12">Section Title</h2>
    {/* Content */}
  </div>
</section>
```

### Narrow Section Container

```tsx
// Use for hero, philosophy, contact
<section className="py-20 px-6">
  <div className="container mx-auto max-w-4xl">
    {/* Content */}
  </div>
</section>
```

### Alternating Backgrounds

```tsx
// Pattern for multiple sections
<section className="py-20 px-6 bg-white">...</section>
<section className="py-20 px-6 bg-gray-50">...</section>
<section className="py-20 px-6 bg-white">...</section>
```

---

## Typography Examples

### Hero Name Pattern

```tsx
<h1 className="text-6xl md:text-7xl font-light mb-6 leading-tight">
  Firstname<br/>
  <span className="font-semibold">Lastname</span>
</h1>
```

**Visual:**
```
Firstname          (60px, light)
Lastname           (60px, semibold)
```

### Section Title

```tsx
<h2 className="text-4xl font-semibold mb-12">
  Professional Experience
</h2>
```

### Subsection Title with Label

```tsx
<p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
  Software Engineer
</p>
<h1 className="text-6xl font-light">Name</h1>
```

### Quote/Philosophy Text

```tsx
<p className="text-3xl md:text-4xl font-light leading-relaxed mb-6 italic">
  "Your philosophical quote here..."
</p>
<p className="text-sm text-gray-400 uppercase tracking-widest">
  — ATTRIBUTION TEXT
</p>
```

---

## Card Components

### 1. Featured Experience Card (Gradient)

```tsx
<div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-100">
  {/* Header */}
  <div className="flex items-center gap-2 mb-3">
    <h3 className="text-3xl font-semibold">Amazon India</h3>
    <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full font-medium">
      Current
    </span>
  </div>
  
  {/* Meta Information */}
  <p className="text-xl text-gray-700 mb-2">
    Senior Software Development Engineer
  </p>
  <p className="text-sm text-gray-600 mb-4">
    2020 — Present · Transportation Financial Systems
  </p>
  
  {/* Description */}
  <p className="text-gray-700 leading-relaxed mb-6">
    Leading the cost allocation team processing 1.5B transactions per day.
  </p>
  
  {/* Stats Grid */}
  <div className="grid md:grid-cols-3 gap-4 text-center mb-6">
    <div className="bg-white p-4 rounded-lg">
      <p className="text-2xl font-bold text-blue-600">1.5B</p>
      <p className="text-xs text-gray-600">Transactions/Day</p>
    </div>
    <div className="bg-white p-4 rounded-lg">
      <p className="text-2xl font-bold text-purple-600">15K</p>
      <p className="text-xs text-gray-600">TPS at Scale</p>
    </div>
    <div className="bg-white p-4 rounded-lg">
      <p className="text-2xl font-bold text-pink-600">4+</p>
      <p className="text-xs text-gray-600">Years</p>
    </div>
  </div>
  
  {/* Technology Tags */}
  <div className="flex flex-wrap gap-2">
    <span className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium">
      AWS
    </span>
    <span className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium">
      Event-Driven Architecture
    </span>
  </div>
</div>
```

**Gradient Variations:**
- Amazon: `from-blue-50 to-purple-50` + `border-blue-100`
- Adobe: `from-purple-50 to-pink-50` + `border-purple-100`
- Startup: `from-green-50 to-emerald-50` + `border-green-100`

---

### 2. Simple White Card (Skills, etc.)

```tsx
<div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
  <h3 className="font-semibold mb-3">Architecture</h3>
  <p className="text-sm text-gray-600">
    Event-Driven, Microservices, Serverless
  </p>
</div>
```

---

### 3. Grid Card (Enterprise View)

```tsx
<div className="border border-gray-200 p-6 rounded-xl hover:shadow-lg transition">
  <h3 className="text-xl font-semibold mb-1">Company Name</h3>
  <p className="text-sm text-gray-500 mb-3">2020 — Present</p>
  <p className="text-sm text-gray-700">Role Title, Team Name</p>
</div>
```

**For Current Role:** Add `bg-blue-50` to className

---

### 4. Contact Card (Glass morphism)

```tsx
<a href="mailto:email@example.com" 
   className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl hover:bg-white/20 transition">
  <div className="text-4xl mb-3">✉️</div>
  <h3 className="font-semibold mb-2">Email</h3>
  <p className="text-sm text-blue-100">email@example.com</p>
</a>
```

**Note:** Used on gradient background:
```tsx
<section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
```

---

### 5. Stats Card (Hero Section)

```tsx
<div className="text-center p-4 bg-gray-50 rounded-lg">
  <p className="text-3xl font-semibold mb-1">1.5B</p>
  <p className="text-xs text-gray-600 uppercase tracking-wide">TXN/Day</p>
</div>
```

**Layout:**
```tsx
<div className="grid grid-cols-3 gap-6 max-w-xl">
  {/* 3 stat cards */}
</div>
```

---

## Button Variations

### Primary Button (CTA)

```tsx
<button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium">
  Get in Touch
</button>
```

### Secondary Button (Outline)

```tsx
<button className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-900 transition font-medium">
  LinkedIn
</button>
```

### Button Group

```tsx
<div className="flex gap-4">
  <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium">
    Primary
  </button>
  <button className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-900 transition font-medium">
    Secondary
  </button>
</div>
```

### Link Button

```tsx
<a href="#" className="text-sm border-b-2 border-black pb-1 hover:text-gray-600 transition">
  LinkedIn
</a>
```

---

## Badge & Tag Components

### Status Badges

```tsx
// Current Role (Prominent)
<span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full font-medium">
  Current
</span>

// Founder Badge
<span className="px-3 py-1 bg-orange-600 text-white text-xs rounded-full font-medium">
  Founder
</span>

// Current Role (Subtle, for lists)
<span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">
  Current
</span>
```

### Technology Tags

```tsx
// Large Tags (Featured Cards)
<div className="flex flex-wrap gap-2">
  <span className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium">
    AWS
  </span>
  <span className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium">
    Java
  </span>
</div>

// Small Tags (Compact Lists)
<div className="flex flex-wrap gap-2">
  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-xs">
    AWS
  </span>
  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-xs">
    Java
  </span>
</div>
```

**Color Coding:**
```tsx
// Amazon/AWS
className="bg-blue-50 text-blue-700"

// Adobe/Azure
className="bg-purple-50 text-purple-700"

// Microsoft
className="bg-cyan-50 text-cyan-700"

// Startup/Open Source
className="bg-green-50 text-green-700"

// Generic/Other
className="bg-gray-100 text-gray-700"
```

---

## Tab Navigation

### Tab Container

```tsx
<div className="border-b border-gray-200 mb-8">
  <div className="flex flex-wrap gap-2">
    {/* Tab buttons here */}
  </div>
</div>
```

### Tab Button States

```tsx
// Active Tab
<button className="tab-btn px-6 py-3 font-medium text-sm border-b-2 border-black">
  Featured Roles
</button>

// Inactive Tab
<button className="tab-btn px-6 py-3 font-medium text-sm border-b-2 border-transparent hover:border-gray-300 text-gray-600">
  All Experience
</button>
```

### Tab Content

```tsx
// Hidden content
<div id="tab1-content" className="tab-content">
  {/* Content */}
</div>

// Active content
<div id="tab2-content" className="tab-content active">
  {/* Content */}
</div>
```

**CSS:**
```css
.tab-content { display: none; }
.tab-content.active { display: block; }
```

---

## Form Elements

### Contact Link (Email)

```tsx
<a href="mailto:contactme@sumeetsahu.com"
   className="text-blue-600 hover:underline">
  contactme@sumeetsahu.com
</a>
```

### External Link

```tsx
<a href="https://linkedin.com/in/username"
   target="_blank"
   rel="noopener noreferrer"
   className="hover:text-gray-600 transition">
  LinkedIn
</a>
```

---

## Section Patterns

### 1. Hero Pattern

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
      
      {/* Lead */}
      <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
        Description...
      </p>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 max-w-xl mb-8">
        {/* Stat cards */}
      </div>
      
      {/* CTAs */}
      <div className="flex gap-4">
        {/* Buttons */}
      </div>
    </div>
  </div>
</section>
```

---

### 2. Philosophy/Quote Pattern

```tsx
<section className="py-20 px-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
  <div className="container mx-auto max-w-4xl text-center">
    <p className="text-3xl md:text-4xl font-light leading-relaxed mb-6 italic">
      "Quote text..."
    </p>
    <p className="text-sm text-gray-400 uppercase tracking-widest">
      — Attribution
    </p>
  </div>
</section>
```

---

### 3. Experience List Pattern (All Tab)

```tsx
<div className="space-y-8">
  <div className="grid md:grid-cols-4 gap-6 pb-8 border-b">
    <div>
      <p className="text-sm text-gray-500">2020 — Present</p>
    </div>
    <div className="md:col-span-3">
      {/* Content */}
    </div>
  </div>
  {/* More items... */}
</div>
```

---

### 4. Grid View Pattern (Enterprise Tab)

```tsx
<div className="grid md:grid-cols-2 gap-6">
  {/* Grid cards */}
</div>
```

---

### 5. Contact Section Pattern

```tsx
<section id="contact" className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
  <div className="container mx-auto max-w-4xl text-center">
    <h2 className="text-4xl font-semibold mb-6">Let's Connect</h2>
    <p className="text-xl mb-8 text-blue-50">
      Description...
    </p>
    
    {/* Contact Cards Grid */}
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {/* Glass morphism cards */}
    </div>

    {/* Location Badge */}
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl inline-block">
      <p className="text-sm mb-2">📍 Based in</p>
      <p className="text-lg font-semibold">Location</p>
    </div>
  </div>
</section>
```

---

### 6. Footer Pattern

```tsx
<footer className="py-12 px-6 bg-gray-900 text-gray-400">
  <div className="container mx-auto max-w-6xl">
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-sm">© 2026 Name. All rights reserved.</p>
      <div className="flex gap-6 text-sm">
        <a href="#" className="hover:text-white transition">LinkedIn</a>
        <a href="#" className="hover:text-white transition">GitHub</a>
      </div>
    </div>
  </div>
</footer>
```

---

## Spacing Patterns

### Consistent Section Spacing

```tsx
// Standard section padding
className="py-20 px-6"

// Section title margin
className="mb-12"

// Card/item spacing
className="space-y-8"  // Between major items
className="space-y-6"  // Between medium items
className="space-y-4"  // Between small items

// Element margins
className="mb-3"       // After subtitles
className="mb-4"       // After meta info
className="mb-6"       // After descriptions
className="mb-8"       // Between major elements
```

---

## Responsive Patterns

### Common Responsive Classes

```tsx
// Typography
className="text-6xl md:text-7xl"
className="text-3xl md:text-4xl"
className="text-xl md:text-2xl"

// Layout
className="flex-col md:flex-row"
className="grid-cols-1 md:grid-cols-2"
className="grid-cols-1 md:grid-cols-3"
className="grid-cols-2 md:grid-cols-4"

// Spacing
className="gap-4 md:gap-6"
className="p-6 md:p-8"

// Columns
className="md:col-span-3"
```

---

## Usage Tips

1. **Copy Full Patterns:** Copy entire sections to maintain consistency
2. **Modify Content Only:** Keep classNames, change text/data
3. **Test Responsive:** Always check mobile view (< 768px)
4. **Use TypeScript:** Define interfaces for data structures
5. **Follow Hierarchy:** h1 → h2 → h3 for SEO and accessibility

---

## Quick Reference Checklist

✅ **Before Adding New Component:**
- [ ] Check if similar pattern exists above
- [ ] Use existing color combinations
- [ ] Follow spacing scale (4, 6, 8, 12, 20)
- [ ] Add responsive modifiers (md:)
- [ ] Include hover/transition states
- [ ] Test on mobile width

✅ **Component Must Have:**
- [ ] Proper semantic HTML
- [ ] Consistent spacing
- [ ] Hover states (if interactive)
- [ ] Responsive design
- [ ] Accessibility (aria-label if needed)

---

This library covers all major patterns. For edge cases, follow these principles and maintain consistency with existing designs.
