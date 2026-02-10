# Personal Homepage - Sumeet Sahu

[![Deploy to GitHub Pages](https://github.com/sumeetsahu/homepage/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/sumeetsahu/homepage/actions)

Modern, responsive personal profile page built with React, TypeScript, and Tailwind CSS. Optimized for easy updates by both humans and AI coding assistants.

🌐 **Live Site:** [https://sumeetsahu.github.io/](https://sumeetsahu.github.io/)

## ✨ Features

- 📱 **Fully Responsive** - Mobile-first design, looks great on all devices
- ⚡ **Lightning Fast** - Vite build system, minimal bundle size (~65KB)
- 🎨 **Modern Design** - Clean UI with elegant typography and subtle gradients
- 🔧 **Easy to Update** - JSON-based content management
- 🤖 **AI Agent Friendly** - Component-based architecture with TypeScript
- 🚀 **Auto Deploy** - Push to GitHub, auto-deploys via GitHub Actions
- 🔄 **Scalable** - Tabbed experience layout handles unlimited growth
- 💬 **Philosophy Section** - Showcase thought leadership
- 📧 **Contact Section** - Multiple ways to connect

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | Component-based UI |
| **TypeScript** | Type safety and better DX |
| **Tailwind CSS v4** | Utility-first styling |
| **Vite** | Fast build tool & dev server |
| **GitHub Pages** | Free hosting |
| **GitHub Actions** | CI/CD pipeline |

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+ (check with `node --version`)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/sumeetsahu/homepage.git
cd homepage

# Switch to react-revamp branch
git checkout react-revamp

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will open at `http://localhost:5173/` with hot reload enabled.

## 📝 Making Updates

### 1. Update Content (Easiest Way)

All content is stored in JSON files. Just edit and save:

```bash
src/data/profile.json     # Name, email, socials, summary
src/data/experience.json  # Work history
src/data/skills.json      # Skills and certifications  
src/data/education.json   # Academic background
```

**Example:** Updating your current job title

```json
// Edit: src/data/experience.json
{
  "role": "Senior Software Development Engineer - 3",  // ← Change here
  "company": "Amazon India - Bangalore",
  "summary": "Your updated job description...",
  "range": "February 2020 - Present"
}
```

The page updates automatically in dev mode! 🎉

### 2. Update Profile Image

```bash
# 1. Add your photo to public/ folder
public/profile.jpg  # (or .png, .webp)

# 2. Update the path in src/data/profile.json
"profileImage": "/profile.jpg"
```

**Recommendation:** Use square images (400x400px), keep under 500KB

### 3. Change Colors/Styling

```bash
# Edit component files directly
src/components/Header.tsx  # Header styling
src/components/Skills.tsx  # Skills section styling
# etc.
```

**Example:** Change blue theme to purple

Find and replace in component files:
- `blue-600` → `purple-600`
- `blue-50` → `purple-50`
- `blue-100` → `purple-100`

## 📁 Project Structure

```
homepage/
├── 📂 src/
│   ├── 📂 components/          # React components (modular)
│   │   ├── Header.tsx          # Hero section with stats
│   │   ├── Philosophy.tsx      # Quote section
│   │   ├── Experience.tsx      # Tabbed experience (Featured/All/Enterprise/Startup)
│   │   ├── Skills.tsx          # Skills grid
│   │   ├── Contact.tsx         # Contact section
│   │   └── Footer.tsx          # Footer
│   ├── 📂 data/                # Content (JSON files)
│   │   ├── profile.json        # Personal info
│   │   ├── experience.json     # Work history
│   │   ├── skills.json         # Skills & tech
│   │   └── education.json      # Academic background
│   ├── 📂 types/               # TypeScript types
│   │   └── index.ts            # Type definitions
│   ├── App.tsx                 # Main component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── 📂 public/                  # Static assets
│   ├── profile.svg             # Profile image
│   └── favicon.svg             # Site icon
├── 📂 docs/                    # Documentation
│   ├── 📂 design-system/       # Design system docs
│   │   ├── README.md           # Quick start guide
│   │   ├── DESIGN_SYSTEM.md    # Complete spec
│   │   └── COMPONENT_EXAMPLES.md # Copy-paste examples
│   ├── ARCHITECTURE.md         # Technical details
│   ├── AI_AGENT_GUIDE.md       # Guide for AI tools
│   ├── DEPLOYMENT.md           # Deployment instructions
│   └── MOBILE_RESPONSIVE.md    # Responsiveness verification
├── 📂 design-options/          # Design mockups (reference)
├── 📂 .github/workflows/       # CI/CD
│   └── gh-pages.yml            # Auto-deployment
└── 📂 dist/                    # Build output (generated)
```

## 🎨 Customization Guide

### Mobile Responsiveness

This site is **fully responsive** and uses mobile-first design:

```tsx
// All components use responsive patterns:
className="flex-col md:flex-row"        // Stack on mobile, row on desktop
className="text-center md:text-left"    // Center on mobile, left on desktop
className="text-3xl md:text-4xl"        // Smaller text on mobile
className="px-4 md:px-6"                // Less padding on mobile
```

**Test mobile view:**
1. Dev server: Resize browser to < 768px
2. Or use Chrome DevTools device emulation (F12 → Toggle device toolbar)

### Adding New Sections

```bash
# 1. Create data file
src/data/projects.json

# 2. Add TypeScript interface
src/types/index.ts

# 3. Create component
src/components/Projects.tsx

# 4. Import in App.tsx
import Projects from './components/Projects';
<Projects projects={projectsData} />
```

## 🚀 Deployment

### Automatic Deployment (Recommended)

The site **auto-deploys** to GitHub Pages on every push:

```bash
# 1. Make your changes
# 2. Commit and push to react-revamp branch
git add .
git commit -m "Update profile"
git push origin react-revamp

# 3. GitHub Actions automatically:
#    - Builds the site
#    - Deploys to gh-pages branch
#    - Site live at https://sumeetsahu.github.io/
```

Check deployment status:
- GitHub repo → **Actions** tab
- Look for green checkmark ✅

### Manual Deployment

```bash
# Build locally
npm run build

# Output in dist/ folder
# Upload dist/ contents to any static host
```

### GitHub Pages Setup

**First-time setup:**

1. Go to repository **Settings** → **Pages**
2. Source: Deploy from branch
3. Branch: `gh-pages` (auto-created by Actions)
4. Folder: `/ (root)`
5. Save

**Custom Domain (Optional):**
```bash
# Add CNAME file to public/ folder
echo "yoursite.com" > public/CNAME
```

## 📚 Documentation for AI Agents

This project is **optimized for AI coding assistants** like Cursor, GitHub Copilot, Claude Code, etc.

📖 **Essential Reading for AI Agents:**
- [`docs/design-system/README.md`](docs/design-system/README.md) - **START HERE** for design changes
- [`docs/design-system/DESIGN_SYSTEM.md`](docs/design-system/DESIGN_SYSTEM.md) - Complete design specification
- [`docs/design-system/COMPONENT_EXAMPLES.md`](docs/design-system/COMPONENT_EXAMPLES.md) - Copy-paste patterns
- [`docs/AI_AGENT_GUIDE.md`](docs/AI_AGENT_GUIDE.md) - Quick reference for AI tools
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) - Detailed technical documentation

**Design System:**
- 🎨 Chosen design: Option 9 Enhanced (Tabbed Experience)
- 📐 Complete color palette, typography, spacing guidelines
- 🎴 Reusable component patterns with examples
- ♿ Accessibility and responsive design patterns

**Why AI-friendly?**
- ✅ Component-based architecture (isolated changes)
- ✅ TypeScript interfaces (clear data structures)
- ✅ JSON data files (easy content updates)
- ✅ Tailwind CSS (AI agents excel at utility classes)
- ✅ Comprehensive design system (consistent changes)

## 🧪 Development Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:5173)

# Production
npm run build        # Build for production (output: dist/)
npm run preview      # Preview production build locally

# Troubleshooting
npm install          # Reinstall dependencies
rm -rf node_modules dist && npm install  # Clean install
```

## 🔍 Troubleshooting

### Build Fails
```bash
# Check TypeScript errors
npm run build

# Common fix: JSON data doesn't match types
# Verify: src/data/*.json matches src/types/index.ts
```

### Styles Not Working
```bash
# Ensure Tailwind classes are correct
# Check: src/components/*.tsx for typos
```

### Image Not Loading
```bash
# Images in public/ → Reference as /image.jpg
# Update: src/data/profile.json "profileImage" field
```

### Deployment Failed
```bash
# Check GitHub Actions logs (repo → Actions tab)
# Verify: npm run build works locally
```

## 📱 Mobile Testing

The site is **100% mobile responsive**. Test on:

- **Chrome DevTools**: F12 → Toggle device toolbar
- **Physical devices**: iPhone, Android, iPad
- **Browser resize**: Make browser narrow (< 768px)

All components adapt:
- ✅ Responsive layout (stack on mobile)
- ✅ Touch-friendly tap targets
- ✅ Readable text sizes
- ✅ Optimized spacing

## 🎯 Performance

- ⚡ **Bundle Size:** ~65KB gzipped (React + app code)
- 🚀 **Load Time:** < 1 second on 3G
- 📊 **Lighthouse Score:** 95+ on all metrics

## 🤝 Contributing

This is a personal portfolio, but feel free to:
- Fork for your own use
- Submit issues for bugs
- Suggest improvements

## 📄 License

MIT - Feel free to use this as a template for your own site!

## 🙏 Credits

- **Template**: Built from scratch
- **Theme**: Inspired by modern portfolio designs
- **Icons**: SVG icons (no icon library needed)

---

**Made with ❤️ by Sumeet Sahu**  
**Optimized for humans and AI agents** 🤖
