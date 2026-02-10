# Deployment Guide

## GitHub Pages Deployment (Current Setup)

This site is configured to automatically deploy to GitHub Pages using GitHub Actions.

### How It Works

1. **Trigger**: Push to `react-revamp` branch
2. **GitHub Actions** runs the workflow (`.github/workflows/gh-pages.yml`)
3. **Build**: Runs `npm ci && npm run build`
4. **Deploy**: Publishes `dist/` folder to `gh-pages` branch
5. **Live**: Site available at `https://sumeetsahu.github.io/`

### First-Time Setup

#### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in sidebar)
3. Under "Source":
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages` (will be auto-created)
   - **Folder**: `/ (root)`
4. Click **Save**

#### Step 2: Verify Workflow Permissions

1. Go to **Settings** → **Actions** → **General**
2. Scroll to "Workflow permissions"
3. Select **Read and write permissions**
4. Check **Allow GitHub Actions to create and approve pull requests**
5. Click **Save**

#### Step 3: Trigger First Deployment

```bash
# Make sure you're on react-revamp branch
git checkout react-revamp

# Push to trigger deployment
git push origin react-revamp
```

#### Step 4: Check Deployment Status

1. Go to **Actions** tab in your repository
2. Click on the latest workflow run
3. Wait for green checkmark ✅ (takes ~2-3 minutes)
4. Visit `https://yourusername.github.io/`

### Base URL Configuration

#### For User/Organization Pages (`username.github.io`)

No changes needed! Default config works:

```typescript
// vite.config.ts
export default defineConfig({
  base: '/',  // ✅ Correct for username.github.io
})
```

Your site will be at: `https://sumeetsahu.github.io/`

#### For Project Pages (`username.github.io/repo-name`)

If you want to deploy to a different repo:

```typescript
// vite.config.ts
export default defineConfig({
  base: '/repo-name/',  // Change to your repo name
})
```

Update workflow to deploy from `main` or your default branch:

```yaml
# .github/workflows/gh-pages.yml
on:
  push:
    branches:
      - main  # Change from react-revamp to main
```

### Deployment Workflow

Every time you push to `react-revamp` branch:

```bash
git add .
git commit -m "Your changes"
git push origin react-revamp
```

GitHub Actions will:
1. ✅ Install dependencies
2. ✅ Run TypeScript compilation
3. ✅ Build production bundle
4. ✅ Deploy to `gh-pages` branch
5. ✅ Update live site

Check progress at: `https://github.com/yourusername/homepage/actions`

### Merging to Main Branch

When ready to make this the primary version:

```bash
# Create PR or merge directly
git checkout master
git merge react-revamp
git push origin master

# Update workflow to deploy from master
# Edit: .github/workflows/gh-pages.yml
# Change: branches: [react-revamp] to branches: [master]
```

## Alternative Deployment Options

### Option 1: Vercel (Recommended Alternative)

**Pros:** Automatic SSL, custom domains, preview deployments

1. Sign up at [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Framework Preset: **Vite**
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Deploy!

Your site will be at: `https://yourproject.vercel.app`

### Option 2: Netlify

**Pros:** Easy custom domains, form handling, serverless functions

1. Sign up at [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy!

Your site will be at: `https://yourproject.netlify.app`

### Option 3: Cloudflare Pages

**Pros:** Fast global CDN, unlimited bandwidth

1. Sign up at [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy!

### Option 4: Manual Static Hosting

For any static host (Amazon S3, DigitalOcean Spaces, etc.):

```bash
# Build locally
npm run build

# Upload dist/ folder contents to your host
# dist/
#   ├── index.html
#   ├── assets/
#   │   ├── index-*.js
#   │   └── index-*.css
#   └── profile.svg
```

## Custom Domain Setup

### For GitHub Pages

1. Add `CNAME` file to `public/` folder:

```bash
echo "yoursite.com" > public/CNAME
```

2. Commit and push:

```bash
git add public/CNAME
git commit -m "Add custom domain"
git push origin react-revamp
```

3. In GitHub repository settings:
   - Go to **Settings** → **Pages**
   - Under "Custom domain", enter: `yoursite.com`
   - Save

4. Configure DNS at your domain provider:

```
Type: CNAME
Name: www
Value: yourusername.github.io

Type: A
Name: @
Value: 185.199.108.153
      185.199.109.153
      185.199.110.153
      185.199.111.153
```

5. Wait for DNS propagation (can take up to 48 hours)

### SSL Certificate

GitHub Pages provides free SSL automatically once custom domain is configured!

## Troubleshooting Deployment

### Build Fails in GitHub Actions

**Check the logs:**
1. Go to **Actions** tab
2. Click on failed workflow
3. Expand the "Build" step
4. Read error message

**Common issues:**

**TypeScript errors:**
```bash
# Test locally
npm run build

# Fix errors in code, then push again
```

**Missing dependencies:**
```bash
# Verify package.json is committed
git status
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

### Site Shows 404

**Check base URL in `vite.config.ts`:**
- User page: `base: '/'`
- Project page: `base: '/repo-name/'`

**Check GitHub Pages settings:**
- Source branch: `gh-pages`
- Folder: `/ (root)`

### Blank Page After Deployment

**Check browser console (F12):**
- Look for 404 errors on assets
- Usually indicates wrong `base` path

**Fix:**
```typescript
// vite.config.ts
export default defineConfig({
  base: '/',  // For username.github.io
  // OR
  base: '/homepage/',  // For username.github.io/homepage
})
```

### Old Version Still Showing

**Clear browser cache:**
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Or open in incognito/private window

**Check deployment timestamp:**
- GitHub Actions → Latest workflow → Timestamp
- Should be recent

### GitHub Actions Workflow Not Triggering

**Check workflow file location:**
- Must be in: `.github/workflows/gh-pages.yml`
- Check file is committed

**Check branch name:**
```yaml
# .github/workflows/gh-pages.yml
on:
  push:
    branches:
      - react-revamp  # Must match your branch name
```

**Check Actions are enabled:**
- Settings → Actions → General
- Allow all actions and reusable workflows

## Monitoring & Analytics

### Google Analytics (Optional)

Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Deployment Status Badge

Add to README.md:

```markdown
[![Deploy to GitHub Pages](https://github.com/USERNAME/REPO/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/USERNAME/REPO/actions)
```

## Security Best Practices

1. **Never commit secrets** (API keys, tokens)
2. **Use environment variables** for sensitive data
3. **Keep dependencies updated**: `npm update`
4. **Review GitHub Actions logs** after deployment

## Performance Optimization

### Already Optimized:
- ✅ Vite code splitting
- ✅ CSS minification
- ✅ Tree shaking
- ✅ Asset optimization

### Further Optimization:
- Use WebP format for images
- Lazy load heavy components
- Add service worker for offline support

## Rollback Procedure

If deployment breaks the site:

```bash
# Option 1: Revert last commit
git revert HEAD
git push origin react-revamp

# Option 2: Reset to previous working commit
git log  # Find working commit hash
git reset --hard <commit-hash>
git push --force origin react-revamp
```

## Support

For deployment issues:
- Check [GitHub Pages docs](https://docs.github.com/en/pages)
- Check [Vite deployment guide](https://vitejs.dev/guide/static-deploy.html)
- Open issue in this repository
