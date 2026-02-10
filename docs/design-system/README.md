# Design System Quick Start Guide

**For AI Agents:** Read this FIRST before making any design changes!

---

## 🎯 Design Philosophy

**Chosen Design:** Option 9 Enhanced - Tabbed Experience with Philosophy & Contact

**Core Principles:**
1. **Clean & Professional** - Minimalist aesthetic, plenty of white space
2. **Scalable** - Tabbed layout handles unlimited experience entries
3. **Elegant** - Refined typography, subtle gradients
4. **Interactive** - Tab navigation for different views
5. **Accessible** - Mobile-responsive, keyboard-friendly

---

## 🎨 Quick Color Reference

```
Backgrounds:
- White (#ffffff)
- Light gray (gray-50: #f9fafb)
- Dark sections (gray-900 to gray-800 gradient)

Text:
- Primary: gray-900 or black
- Secondary: gray-600, gray-700
- Muted: gray-500

Gradients for Experience Cards:
- Amazon: from-blue-50 to-purple-50
- Adobe: from-purple-50 to-pink-50  
- myPNRstatus: from-green-50 to-emerald-50
- Contact section: from-blue-600 to-purple-600

Badges:
- Current role: green-600
- Founder: orange-600
```

---

## 📐 Layout Structure

```
1. Header (Hero)
   - Name, title, description
   - 3 stat cards
   - CTA buttons

2. Philosophy Quote
   - Dark gradient background
   - Centered italic quote

3. Professional Experience (TABS)
   - Featured Roles (default)
   - All Experience
   - Enterprise
   - Startup

4. Skills & Expertise
   - 4-column grid
   - White cards

5. Contact Section
   - Blue-purple gradient
   - 3 contact cards (glass morphism)
   - Location badge

6. Footer
   - Dark background
   - Social links
```

---

## 🔄 Common Update Scenarios

### Add New Job
```typescript
// 1. Edit: src/data/experience.json
{
  "role": "New Role Title",
  "company": "Company Name - Location",
  "summary": "Description of role and achievements",
  "range": "2024 — Present"
}

// 2. Component automatically:
// - Adds to all tabs
// - Sorts by date
// - Shows "Current" badge if range includes "Present"
// - Picks gradient color based on company name
```

### Update Philosophy Quote
```typescript
// Edit: src/components/Philosophy.tsx
<p className="text-3xl md:text-4xl font-light leading-relaxed mb-6 italic">
  "Your new quote here..."
</p>
```

### Change Contact Information
```typescript
// Edit: src/data/profile.json
{
  "email": "newemail@example.com",
  "phone": "new-phone",
  "location": "New Location"
}
```

### Add New Section
```typescript
// 1. Create: src/components/NewSection.tsx
// 2. Follow pattern from existing sections:
<section className="py-20 px-6 bg-white">
  <div className="container mx-auto max-w-6xl">
    <h2 className="text-4xl font-semibold mb-12">Section Title</h2>
    {/* Content */}
  </div>
</section>

// 3. Import in App.tsx
// 4. Add to render tree
```

---

## 🎴 Component Checklist

When creating/modifying components:

✅ **Spacing:**
- Section: `py-20 px-6`
- Container: `max-w-6xl` (standard) or `max-w-4xl` (narrow)
- Title margin: `mb-12`

✅ **Typography:**
- Section title: `text-4xl font-semibold`
- Card title: `text-2xl` or `text-3xl font-semibold`
- Body: `text-gray-700 leading-relaxed`

✅ **Colors:**
- Use palette from DESIGN_SYSTEM.md
- Follow gradient patterns for featured cards
- Maintain contrast ratios

✅ **Responsive:**
- Add `md:` modifiers for desktop
- Test at < 768px width
- Use `flex-col md:flex-row` pattern

✅ **Interactive:**
- Add `hover:` states
- Include `transition` class
- Use `cursor-pointer` for clickable elements

---

## 📖 Full Documentation

For detailed information, see:

1. **`DESIGN_SYSTEM.md`** - Complete design system specification
2. **`COMPONENT_EXAMPLES.md`** - Copy-paste component patterns
3. **`../AI_AGENT_GUIDE.md`** - AI agent workflow guide

---

## ⚠️ Important Rules

**DO:**
- ✅ Use existing patterns from COMPONENT_EXAMPLES.md
- ✅ Maintain color consistency
- ✅ Follow spacing scale (4, 6, 8, 12, 20)
- ✅ Test responsive behavior
- ✅ Add TypeScript types

**DON'T:**
- ❌ Create new arbitrary spacing values
- ❌ Use inline styles
- ❌ Mix different design patterns
- ❌ Skip hover states on interactive elements
- ❌ Forget mobile responsive classes

---

## 🚀 Quick Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for deployment

# Check Types
tsc --noEmit            # Type check without building
```

---

**Remember:** Consistency is key. When in doubt, copy an existing pattern and modify it!
