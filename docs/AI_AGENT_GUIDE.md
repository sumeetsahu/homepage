# AI Agent Guide

This document is specifically designed to help AI coding assistants (like Cursor, GitHub Copilot, Claude, etc.) understand and work with this codebase efficiently.

## 🎯 Quick Context

**What is this?** Personal portfolio/resume website for Sumeet Sahu  
**Tech Stack:** React + TypeScript + Tailwind CSS  
**Build Tool:** Vite  
**Hosting:** GitHub Pages  
**Design:** Option 9 Enhanced - Tabbed Experience with Philosophy & Contact

## 🎨 Design System (IMPORTANT!)

**Before making ANY design changes, read:**
- [`design-system/README.md`](design-system/README.md) - Quick start guide
- [`design-system/DESIGN_SYSTEM.md`](design-system/DESIGN_SYSTEM.md) - Complete specification
- [`design-system/COMPONENT_EXAMPLES.md`](design-system/COMPONENT_EXAMPLES.md) - Copy-paste patterns

**Key Design Features:**
- Clean, minimalist aesthetic
- Tabbed experience layout (Featured/All/Enterprise/Startup)
- Philosophy quote section
- Contact section with glass morphism
- Scalable for unlimited experience entries  

## 📁 File Location Cheatsheet

| What to Update | File Path |
|----------------|-----------|
| Personal info (name, email, etc.) | `src/data/profile.json` |
| Work experience | `src/data/experience.json` |
| Skills & certifications | `src/data/skills.json` |
| Philosophy quote | `src/components/Philosophy.tsx` |
| Header/Hero section | `src/components/Header.tsx` |
| Experience tabs/layout | `src/components/Experience.tsx` |
| Skills section | `src/components/Skills.tsx` |
| Contact section | `src/components/Contact.tsx` |
| Footer | `src/components/Footer.tsx` |
| Type definitions | `src/types/index.ts` |
| Profile image | `public/profile.svg` (or .jpg/.png) |
| **Design system** | `docs/design-system/` |

## 🔄 Common Update Patterns

### 1. Update Content (Most Common)
**User says:** "Update my current role to Senior SDE-3"

**Action:**
```json
// Edit: src/data/experience.json
{
  "role": "Senior Software Development Engineer - 3",  // ← Change this
  "company": "Amazon India - Bangalore",
  "summary": "...",
  "range": "February 2020 - Present"
}
```

### 2. Change Styling
**User says:** "Make the header background purple instead of blue"

**Action:**
```tsx
// Edit: src/components/Header.tsx
// Find: bg-gradient-to-r from-blue-600 to-blue-800
// Replace: bg-gradient-to-r from-purple-600 to-purple-800
```

### 3. Add New Section
**User says:** "Add a projects section"

**Action:**
1. Create `src/data/projects.json`
2. Add `Project` interface to `src/types/index.ts`
3. Create `src/components/Projects.tsx`
4. Import and add to `src/App.tsx`

### 4. Responsive Design Fix
**User says:** "The experience cards look cramped on mobile"

**Action:**
```tsx
// Edit the component's className
// Add responsive spacing:
className="p-4 md:p-6"  // Smaller padding on mobile
className="text-base md:text-lg"  // Smaller text on mobile
className="gap-2 md:gap-4"  // Smaller gaps on mobile
```

## 🎨 Tailwind CSS Quick Reference

### Responsive Breakpoints
```tsx
className="hidden md:block"  // Hidden on mobile, visible on desktop
className="flex-col md:flex-row"  // Stack on mobile, row on desktop
className="text-sm md:text-base lg:text-lg"  // Responsive text size
```

### Common Colors (Blue Theme)
- `bg-blue-50` - Very light blue background
- `bg-blue-600` - Primary blue
- `text-blue-700` - Blue text
- `border-blue-200` - Light blue border

### Spacing
- `p-6` = padding: 1.5rem
- `px-4` = padding left/right: 1rem
- `mt-8` = margin-top: 2rem
- `gap-4` = gap: 1rem (in flex/grid)

### Hover Effects
```tsx
className="hover:shadow-lg transition"  // Shadow on hover with smooth transition
className="hover:bg-blue-600 hover:text-white"  // Color change on hover
```

## 📊 Data Structure Patterns

### Experience Entry
```json
{
  "role": "Job Title",
  "company": "Company Name - Location",
  "summary": "Description of role and responsibilities",
  "range": "Start Date - End Date"
}
```

### Skill Group
```json
{
  "grouping": "Category Name",
  "skills": [
    "Simple Skill",
    {"name": "Linked Skill", "link": "https://..."}
  ]
}
```

### Education Entry
```json
{
  "school": "Institution Name",
  "degree": "Degree Name",
  "major": "Major/Field",
  "range": "Year - Year"
}
```

## 🔍 Type Safety Checks

### Before Making Changes
1. Check `src/types/index.ts` for the data structure
2. Ensure your JSON matches the TypeScript interface
3. Run `npm run build` to verify no type errors

### Common Type Errors

**Error:** "Property 'role' does not exist"  
**Fix:** Check the interface name - you might be using wrong property name

**Error:** "Type 'string' is not assignable to type 'Skill'"  
**Fix:** Skills can be strings OR objects with name/link

## 🚀 Development Commands

```bash
# Start dev server (hot reload enabled)
npm run dev

# Build for production (checks TypeScript)
npm run build

# Preview production build locally
npm run preview

# Install dependencies (after cloning)
npm install
```

## 🎯 Mobile Responsiveness

### All Components Follow This Pattern:

1. **Mobile First**: Base styles work on mobile
2. **Breakpoint Modifiers**: `md:` for tablet/desktop
3. **Flex Direction**: `flex-col md:flex-row`
4. **Text Alignment**: `text-center md:text-left`
5. **Spacing**: Smaller on mobile, larger on desktop

### Testing Mobile View
- Dev server: Resize browser to < 768px width
- Or use browser dev tools device emulation

## 🌐 GitHub Pages Deployment

### Automatic Deployment
- Push to `react-revamp` branch → Auto-deploys
- GitHub Actions workflow: `.github/workflows/gh-pages.yml`
- Build output: `dist/` folder → `gh-pages` branch

### If Deployment Fails
1. Check GitHub Actions tab for errors
2. Verify `npm run build` works locally
3. Check `vite.config.ts` base path is correct

### Base URL Configuration
```typescript
// vite.config.ts
export default defineConfig({
  base: '/',  // For username.github.io
  // OR
  base: '/repo-name/',  // For username.github.io/repo-name
})
```

## 🐛 Common Issues & Solutions

### Issue: Build fails with TypeScript error
**Solution:** Check JSON data matches TypeScript interfaces in `src/types/index.ts`

### Issue: Styles not working
**Solution:** Ensure Tailwind classes are spelled correctly (they're validated at build time)

### Issue: Image not loading
**Solution:** 
- Images in `public/` → Reference as `/image.jpg`
- Update `profileImage` in `src/data/profile.json`

### Issue: Page blank after deployment
**Solution:** Check browser console for errors, verify base path in `vite.config.ts`

## 🎨 Color Theme Customization

### Current Theme: Blue
To change to another color (e.g., purple, green):

1. Find all instances of `blue-` in component files
2. Replace with your color: `purple-`, `green-`, `red-`, etc.
3. Tailwind supports: slate, gray, zinc, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose

### Example: Blue → Purple
```bash
# In all component files (.tsx):
blue-50  → purple-50   # Light background
blue-600 → purple-600  # Primary color
blue-700 → purple-700  # Text
blue-100 → purple-100  # Hover states
blue-200 → purple-200  # Borders
```

## 📝 Component Modification Guide

### Adding a Field to Experience
1. Update TypeScript interface in `src/types/index.ts`
2. Add field to JSON in `src/data/experience.json`
3. Render field in `src/components/Experience.tsx`

Example:
```typescript
// 1. src/types/index.ts
export interface Experience {
  role: string;
  company: string;
  summary: string;
  range: string;
  technologies?: string[];  // ← New field
}

// 2. src/data/experience.json
{
  "role": "...",
  "technologies": ["React", "TypeScript"]  // ← Add data
}

// 3. src/components/Experience.tsx
{exp.technologies && (
  <div className="flex gap-2 mt-2">
    {exp.technologies.map(tech => (
      <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
        {tech}
      </span>
    ))}
  </div>
)}
```

## ✅ Pre-commit Checklist

Before committing changes:
- [ ] Run `npm run build` - Ensures no TypeScript errors
- [ ] Test on mobile width (< 768px)
- [ ] Check hot reload in dev mode works
- [ ] Verify all links work
- [ ] Check console for errors

## 🎯 AI Agent Best Practices

1. **Read Before Writing**: Check existing patterns in components
2. **Type Safety First**: Always update types before changing data
3. **Test Responsively**: Changes should work on mobile and desktop
4. **Consistent Styling**: Match existing Tailwind patterns
5. **Commit Atomically**: One logical change per commit

## 📚 Learn More

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
