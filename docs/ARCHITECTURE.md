# Architecture Documentation

## Overview
This is a modern single-page application built with React, TypeScript, and Tailwind CSS, designed for easy maintenance by both humans and AI coding assistants.

## Tech Stack
- **React 18** - Component-based UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling framework
- **Vite** - Fast build tool and dev server
- **GitHub Pages** - Static site hosting

## Project Structure

```
homepage/
├── src/
│   ├── components/          # React components (one per section)
│   │   ├── Header.tsx       # Profile header with photo, name, contact
│   │   ├── Experience.tsx   # Work experience timeline
│   │   ├── Skills.tsx       # Skills grouped by category
│   │   ├── Education.tsx    # Educational background
│   │   └── Footer.tsx       # Footer with copyright
│   ├── data/               # JSON data files (content storage)
│   │   ├── profile.json    # Personal info, contact, socials
│   │   ├── experience.json # Work history
│   │   ├── skills.json     # Skills and certifications
│   │   └── education.json  # Academic background
│   ├── types/              # TypeScript interfaces
│   │   └── index.ts        # Type definitions for all data
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles and Tailwind imports
├── public/                 # Static assets
│   ├── profile.svg         # Profile image placeholder
│   └── favicon.svg         # Site favicon
├── docs/                   # Documentation for AI agents
└── dist/                   # Production build output (generated)
```

## Component Architecture

### Modular Design
Each section of the page is a separate component, making it easy to:
- Update individual sections without affecting others
- Add/remove sections by editing `App.tsx`
- Test and modify components in isolation

### Component Props
All components accept typed props:
```typescript
// Example: Experience component
interface ExperienceProps {
  experiences: Experience[];
}
```

This ensures type safety and helps AI agents understand data requirements.

## Data Flow

1. **JSON Files** → Contain all content data
2. **Type Definitions** → Define structure and validation
3. **Components** → Import and render data
4. **App.tsx** → Orchestrates all components

### Example Data Update Flow:
```
Edit src/data/experience.json
    ↓
TypeScript validates against Experience interface
    ↓
Experience.tsx component automatically uses new data
    ↓
Hot reload shows changes instantly
```

## Styling Approach

### Tailwind CSS Utility Classes
- **Responsive**: Mobile-first with `md:` and `lg:` breakpoints
- **Utility-based**: Classes like `px-6`, `py-16`, `bg-blue-600`
- **Hover states**: `hover:shadow-lg`, `hover:bg-blue-100`
- **Transitions**: `transition` for smooth animations

### Mobile Responsiveness
All components use responsive patterns:
```tsx
// Mobile: vertical stack, Desktop: horizontal row
className="flex flex-col md:flex-row"

// Mobile: center, Desktop: left align
className="text-center md:text-left"

// Different text sizes
className="text-3xl md:text-4xl"
```

## Type Safety

### TypeScript Interfaces
Located in `src/types/index.ts`:
- `ProfileData` - Personal information
- `Experience` - Work experience entries
- `SkillGroup` - Skill categories
- `Education` - Educational entries

These interfaces provide:
- Autocomplete in editors
- Compile-time error checking
- Documentation for AI agents
- Refactoring safety

## Build System

### Development Mode
```bash
npm run dev
```
- Hot module replacement (HMR)
- Fast refresh on file changes
- Runs on http://localhost:5173

### Production Build
```bash
npm run build
```
- TypeScript compilation
- Vite optimization
- Output to `dist/` folder
- Minified CSS and JS
- Tree-shaking for minimal bundle size

### Preview Production Build
```bash
npm run preview
```
- Test production build locally
- Verify before deployment

## Deployment

### GitHub Pages Configuration
The site deploys automatically via GitHub Actions:

1. **Trigger**: Push to `react-revamp` branch
2. **Build**: Runs `npm run build`
3. **Deploy**: Publishes `dist/` to `gh-pages` branch
4. **URL**: `https://sumeetsahu.github.io/`

### Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  base: '/', // Change to '/repo-name/' for non-root deployment
})
```

## AI Agent Optimization

### Why This Stack is AI-Friendly

1. **Component Isolation**
   - Each file has a single responsibility
   - Changes are surgical and contained
   - Easy to understand and modify

2. **Type Definitions**
   - Clear data structures
   - Immediate feedback on errors
   - Self-documenting code

3. **Utility CSS**
   - AI agents excel at Tailwind
   - No CSS file hunting
   - Visual changes are straightforward

4. **JSON Data Separation**
   - Content separate from code
   - Easy to update without touching components
   - Structured and validated

### Common AI Agent Tasks

#### Update Work Experience
```bash
# AI agent edits: src/data/experience.json
# That's it! TypeScript validates, component renders.
```

#### Change Styling
```bash
# AI agent modifies Tailwind classes in component files
# Example: Change blue theme to purple
# Find-replace: blue-600 → purple-600
```

#### Add New Section
```bash
# 1. Create new component: src/components/Projects.tsx
# 2. Add data file: src/data/projects.json
# 3. Add type: src/types/index.ts
# 4. Import in App.tsx
```

## Performance Considerations

### Bundle Size
- React: ~45KB gzipped
- Current bundle: ~65KB total (very small)
- Tailwind: Only used classes included

### Loading Strategy
- Single page load
- No lazy loading needed (bundle is tiny)
- Fast initial render

### Image Optimization
- Profile image in public folder
- Use optimized formats (WebP, SVG)
- Keep images under 500KB

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility
- Semantic HTML
- Alt text on images
- ARIA labels on social links
- Keyboard navigation support
- Color contrast compliant

## Future Enhancements

### Easy Additions
- Dark mode toggle
- Animated scroll sections
- Blog section
- Projects showcase
- Contact form

### Recommended Tools for Future
- `framer-motion` - Animations
- `react-icons` - Icon library
- `react-helmet-async` - SEO meta tags
