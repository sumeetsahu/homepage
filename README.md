# Personal Homepage - Sumeet Sahu

Modern personal profile page built with React, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool & dev server
- **GitHub Pages** - Hosting

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
/
├── src/
│   ├── components/      # React components
│   │   ├── Header.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Education.tsx
│   │   └── Footer.tsx
│   ├── data/           # JSON data files
│   │   ├── profile.json
│   │   ├── experience.json
│   │   ├── skills.json
│   │   └── education.json
│   ├── types/          # TypeScript interfaces
│   │   └── index.ts
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
└── index.html          # HTML template
```

## ✏️ Making Updates

### Update Profile Info
Edit `src/data/profile.json`

### Update Experience
Edit `src/data/experience.json`

### Update Skills
Edit `src/data/skills.json`

### Update Education
Edit `src/data/education.json`

## 🎨 Customization

The site uses Tailwind CSS for styling. You can:
- Modify colors in `tailwind.config.js`
- Edit component styles in individual `.tsx` files
- Update global styles in `src/index.css`

## 📦 Deployment

The site automatically deploys to GitHub Pages when you push to the `react-revamp` branch.

## 📄 License

MIT
