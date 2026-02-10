# Complete Deployment Guide: Hugo to React Homepage Migration

## Overview
This guide walks you through migrating from the current Hugo-based homepage to the new React-based design on the `react-revamp` branch.

**Current Setup:** Hugo static site on `master` branch  
**New Setup:** React + Vite application on `react-revamp` branch  
**Deployment:** GitHub Pages with custom domain via Dreamhost

---

## Prerequisites Checklist

- [ ] All changes committed to `react-revamp` branch
- [ ] Local build successful (`npm run build`)
- [ ] Dev server tested (`npm run dev`)
- [ ] GitHub account with repository access
- [ ] Dreamhost account with domain access
- [ ] Backup of current site (optional but recommended)

---

## Phase 1: Push Changes to GitHub

### Step 1.1: Push react-revamp Branch

```bash
cd /Users/ssahu16/Documents/Work/Workspace/homepage
git push origin react-revamp
```

**Expected Output:**
```
Enumerating objects: X, done.
Counting objects: 100% (X/X), done.
...
To https://github.com/sumeetsahu/homepage.git
   xxxxxxx..xxxxxxx  react-revamp -> react-revamp
```

**Verification:**
- Visit: `https://github.com/sumeetsahu/homepage/tree/react-revamp`
- Confirm all 5 commits are visible

---

## Phase 2: Create Pull Request

### Step 2.1: Create PR on GitHub

**Option A: Using GitHub Web Interface**

1. Go to: `https://github.com/sumeetsahu/homepage`
2. Click **"Compare & pull request"** (should appear after push)
3. Or: Go to **"Pull requests"** tab → **"New pull request"**
4. Set:
   - **Base branch:** `master`
   - **Compare branch:** `react-revamp`

5. Fill PR details:
   ```
   Title: Migrate to React-based homepage with enhanced features
   
   Description:
   ## Summary
   Complete redesign from Hugo theme to modern React + TypeScript + Tailwind CSS application.
   
   ## Key Features
   - ✅ Principal Engineer profile with GenAI focus
   - ✅ Patents & Publications section (US Patent 10,134,113)
   - ✅ Enhanced experience showcase with featured roles
   - ✅ Key achievements highlighting business impact
   - ✅ Early entrepreneurial initiatives with competition awards
   - ✅ Modern, mobile-responsive design
   - ✅ Comprehensive design system documentation
   
   ## Technical Stack
   - React 18 + TypeScript
   - Vite (fast builds)
   - Tailwind CSS v4
   - GitHub Actions CI/CD
   - GitHub Pages deployment
   
   ## Testing
   - ✅ Build successful
   - ✅ TypeScript checks passing
   - ✅ Linter clean
   - ✅ Mobile responsive verified
   
   ## Documentation
   - Complete docs in `/docs` folder
   - Design system in `/docs/design-system`
   - AI agent guide for future updates
   ```

6. Click **"Create pull request"**

**Option B: Using GitHub CLI**

```bash
gh pr create \
  --base master \
  --head react-revamp \
  --title "Migrate to React-based homepage with enhanced features" \
  --body-file - <<'EOF'
## Summary
Complete redesign from Hugo theme to modern React + TypeScript + Tailwind CSS application.

## Key Features
- ✅ Principal Engineer profile with GenAI focus
- ✅ Patents & Publications section (US Patent 10,134,113)
- ✅ Enhanced experience showcase with featured roles
- ✅ Key achievements highlighting business impact
- ✅ Early entrepreneurial initiatives with competition awards
- ✅ Modern, mobile-responsive design
- ✅ Comprehensive design system documentation

## Technical Stack
- React 18 + TypeScript
- Vite (fast builds)
- Tailwind CSS v4
- GitHub Actions CI/CD
- GitHub Pages deployment
EOF
```

---

### Step 2.2: Review PR

1. Click on **"Files changed"** tab
2. Review key changes:
   - ✅ `.github/workflows/gh-pages.yml` (deployment updated)
   - ✅ `package.json` (new dependencies)
   - ✅ `src/` folder (new React app)
   - ✅ `docs/` folder (comprehensive documentation)
   - ✅ Old Hugo files removed (`config.toml`, `themes/`, etc.)

3. Check **Checks** tab:
   - GitHub Actions should run automatically
   - Wait for build to pass (green checkmark)

---

### Step 2.3: Merge PR

**Before Merging:**
1. Ensure GitHub Actions build passed ✅
2. Review all file changes one final time
3. Consider adding reviewers (if team)

**Merge Options:**

**Option A: Merge Commit (Recommended)**
- Preserves full history
- Click **"Merge pull request"** → **"Confirm merge"**

**Option B: Squash and Merge**
- Cleaner history (one commit)
- Click dropdown → **"Squash and merge"**
- Edit commit message if needed

**After Merge:**
- PR will show "Merged" status with purple badge
- `master` branch now has React code
- GitHub Actions will trigger deployment

---

## Phase 3: GitHub Repository Settings

### Step 3.1: Verify GitHub Pages Settings

1. Go to: `https://github.com/sumeetsahu/homepage/settings/pages`

2. **Verify/Update Settings:**
   ```
   Source: Deploy from a branch
   Branch: gh-pages
   Folder: / (root)
   ```

3. **Custom Domain:**
   - Check if `sumeetsahu.com` is listed
   - If not, add it:
     - Enter: `sumeetsahu.com` (or `www.sumeetsahu.com`)
     - Click **"Save"**
     - Check **"Enforce HTTPS"** (after DNS propagation)

**Important Notes:**
- GitHub Actions deploys to `gh-pages` branch automatically
- Don't change source to "GitHub Actions" (we're using custom workflow)
- Custom domain takes 24-48 hours to fully propagate

---

### Step 3.2: Check GitHub Actions Deployment

1. Go to: `https://github.com/sumeetsahu/homepage/actions`

2. Find latest workflow run: **"Deploy to GitHub Pages"**

3. Click on it → Should see:
   ```
   ✓ Setup Node.js
   ✓ Install dependencies
   ✓ Build
   ✓ Deploy
   ```

4. **If deployment failed:**
   - Click on failed step to see error
   - Common issues:
     - Build errors (check `npm run build` locally)
     - Permissions (check workflow has write access)
     - Branch protection rules

5. **Check gh-pages branch:**
   - Go to: `https://github.com/sumeetsahu/homepage/tree/gh-pages`
   - Should see `dist/` contents deployed
   - Look for `index.html`, `assets/` folder

---

### Step 3.3: Test GitHub Pages URL

Before configuring custom domain, test the default GitHub Pages URL:

1. Visit: `https://sumeetsahu.github.io/homepage/`
   - **OR:** `https://<username>.github.io/<repo-name>/`

2. **Verification Checklist:**
   - [ ] Page loads without errors
   - [ ] All sections visible (Hero, Experience, Patents, etc.)
   - [ ] Images load (profile.svg, favicon.svg)
   - [ ] Links work (contact, social media)
   - [ ] Mobile responsive (resize browser)
   - [ ] No console errors (F12 → Console tab)

3. **Common Issues:**
   - **404 errors:** Check `base` in `vite.config.ts` (should be `/` for custom domain)
   - **Broken assets:** Check file paths in `index.html`
   - **Blank page:** Check browser console for JavaScript errors

---

## Phase 4: Dreamhost DNS Configuration

### Step 4.1: Access Dreamhost Panel

1. Login to Dreamhost: `https://panel.dreamhost.com/`
2. Navigate to: **Domains** → **Manage Domains**
3. Find your domain: `sumeetsahu.com`

---

### Step 4.2: Configure DNS Records

**Option A: Using Custom DNS Records (Recommended for GitHub Pages)**

1. Click **"DNS"** next to `sumeetsahu.com`

2. **Add/Update A Records** (for apex domain):
   ```
   Type: A
   Name: @ (or leave blank)
   Value: 185.199.108.153
   TTL: Automatic (or 14400)
   ```
   
   **Add 3 more A records** (GitHub Pages IPs):
   ```
   A    @    185.199.109.153
   A    @    185.199.110.153
   A    @    185.199.111.153
   ```

3. **Add CNAME Record** (for www subdomain):
   ```
   Type: CNAME
   Name: www
   Value: sumeetsahu.github.io
   TTL: Automatic
   ```

4. **Remove Old Records:**
   - Delete any old A records pointing to Hugo/previous hosting
   - Delete conflicting CNAME records

**Option B: Using Dreamhost's GitHub Pages Support**

Some hosting providers have built-in GitHub Pages support:
1. Look for **"GitHub Pages"** option in domain settings
2. Enter your GitHub username and repository
3. Dreamhost will configure DNS automatically

---

### Step 4.3: Add CNAME File to Repository

GitHub Pages requires a CNAME file for custom domains:

1. **Create CNAME file in public folder:**

```bash
cd /Users/ssahu16/Documents/Work/Workspace/homepage
echo "sumeetsahu.com" > public/CNAME
git add public/CNAME
git commit -m "Add CNAME file for custom domain"
git push origin master
```

2. **Verify CNAME file:**
   - After next deployment, check: `https://sumeetsahu.github.io/homepage/CNAME`
   - Should contain: `sumeetsahu.com`

---

### Step 4.4: Enable HTTPS on GitHub

1. Wait 24-48 hours for DNS propagation
2. Go to: `https://github.com/sumeetsahu/homepage/settings/pages`
3. Under **Custom domain**, check **"Enforce HTTPS"**
4. GitHub will provision SSL certificate automatically (via Let's Encrypt)

---

## Phase 5: Verification & Testing

### Step 5.1: DNS Propagation Check

**Check DNS Propagation:**
```bash
# Check A records
dig sumeetsahu.com +short

# Should return GitHub Pages IPs:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153

# Check CNAME for www
dig www.sumeetsahu.com +short
# Should return: sumeetsahu.github.io
```

**Online Tools:**
- https://www.whatsmydns.net/
- Enter: `sumeetsahu.com`
- Select: `A` record type
- Check multiple locations globally

**Timeline:**
- Dreamhost DNS: Usually 4-6 hours
- Global propagation: 24-48 hours
- HTTPS certificate: Additional 24 hours after DNS

---

### Step 5.2: Test Custom Domain

**After DNS propagates (4-6 hours):**

1. Visit: `http://sumeetsahu.com`
2. Visit: `http://www.sumeetsahu.com`
3. Visit: `https://sumeetsahu.com` (after HTTPS enabled)

**Verification Checklist:**
- [ ] Domain resolves to new React site
- [ ] All sections load correctly
- [ ] No broken images or assets
- [ ] Mobile responsive
- [ ] HTTPS works (green padlock)
- [ ] www redirects to non-www (or vice versa)
- [ ] Old Hugo site is gone

---

### Step 5.3: Cross-Browser Testing

Test on multiple browsers and devices:

**Desktop Browsers:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Mobile Testing:**
- [ ] iPhone Safari
- [ ] Android Chrome
- [ ] Tablet (iPad/Android)

**Test Points:**
- Navigation works
- Contact forms/links work
- Social media links work
- Patent links open correctly
- Images load properly
- No console errors

---

### Step 5.4: SEO & Performance Check

**Google Search Console:**
1. Visit: `https://search.google.com/search-console`
2. Add property: `sumeetsahu.com`
3. Verify ownership (DNS TXT record or HTML file)
4. Request indexing for new site

**Performance Test:**
- PageSpeed Insights: `https://pagespeed.web.dev/`
- Enter: `sumeetsahu.com`
- Target: 90+ score

**Check Metadata:**
- View page source (`Ctrl+U` or `Cmd+U`)
- Verify `<title>` tag
- Verify `<meta name="description">` tag
- Check Open Graph tags (for social sharing)

---

## Phase 6: Cleanup & Maintenance

### Step 6.1: Clean Up Old Branches (Optional)

After successful deployment:

```bash
# Delete local react-revamp branch (merged to master)
git branch -d react-revamp

# Delete remote react-revamp branch
git push origin --delete react-revamp

# Keep master branch active for future updates
```

---

### Step 6.2: Update Repository Settings

**Branch Protection (Optional but Recommended):**
1. Go to: `Settings` → `Branches` → `Add rule`
2. Branch name pattern: `master`
3. Enable:
   - ✅ Require pull request reviews
   - ✅ Require status checks to pass
   - ✅ Include administrators

**About Section:**
1. Click ⚙️ next to "About" on repo homepage
2. Update:
   - **Description:** "Personal profile website - Principal Engineer at Intuit"
   - **Website:** `https://sumeetsahu.com`
   - **Topics:** `react`, `typescript`, `portfolio`, `vite`, `tailwindcss`

---

### Step 6.3: Monitor & Maintain

**Set Up Monitoring:**
1. **Uptime Robot:** `https://uptimerobot.com/` (free tier)
   - Monitor: `https://sumeetsahu.com`
   - Alert if site goes down

2. **GitHub Actions Email Notifications:**
   - Go to: `Settings` → `Notifications`
   - Enable: "Actions" notifications
   - Get alerts if deployment fails

**Regular Maintenance:**
- [ ] Update dependencies quarterly: `npm update`
- [ ] Check for security vulnerabilities: `npm audit`
- [ ] Update content as career progresses
- [ ] Refresh design every 1-2 years

---

## Troubleshooting Guide

### Issue 1: GitHub Actions Deployment Fails

**Symptoms:**
- Red X on workflow run
- Site doesn't update after merge

**Solutions:**
1. Check workflow logs: `Actions` tab → Click failed run
2. Common fixes:
   ```bash
   # Locally test build
   npm ci
   npm run build
   
   # If build fails, fix errors and push
   git add .
   git commit -m "Fix build errors"
   git push origin master
   ```
3. Check workflow file permissions:
   - `Settings` → `Actions` → `General`
   - Enable: "Read and write permissions"

---

### Issue 2: Custom Domain Not Working

**Symptoms:**
- `sumeetsahu.com` shows 404 or old site
- DNS not resolving

**Solutions:**
1. **Check CNAME file exists:**
   ```bash
   curl https://sumeetsahu.github.io/homepage/CNAME
   # Should return: sumeetsahu.com
   ```

2. **Verify DNS records:**
   ```bash
   dig sumeetsahu.com +short
   # Should show: 185.199.108.153 (and other GitHub IPs)
   ```

3. **Check GitHub Pages settings:**
   - `Settings` → `Pages`
   - Ensure custom domain is set
   - Check for error messages

4. **Wait for DNS propagation:**
   - Can take 24-48 hours
   - Use: https://www.whatsmydns.net/

---

### Issue 3: HTTPS Not Working

**Symptoms:**
- Browser shows "Not Secure"
- No green padlock

**Solutions:**
1. Wait 24 hours after DNS propagation
2. Go to: `Settings` → `Pages`
3. Uncheck then recheck "Enforce HTTPS"
4. GitHub will retry SSL certificate
5. If still failing:
   - Remove custom domain
   - Wait 10 minutes
   - Re-add custom domain
   - Wait 24 hours

---

### Issue 4: Assets Not Loading (404 Errors)

**Symptoms:**
- Broken images
- Missing CSS
- Console shows 404 errors

**Solutions:**
1. **Check vite.config.ts base path:**
   ```typescript
   export default defineConfig({
     base: '/', // Should be '/' for custom domain
   })
   ```

2. **Check asset paths in index.html:**
   ```html
   <!-- Should be absolute paths -->
   <link rel="icon" href="/favicon.svg">
   <img src="/profile.svg" alt="Profile">
   ```

3. **Rebuild and redeploy:**
   ```bash
   npm run build
   git add dist/
   git commit -m "Fix asset paths"
   git push origin master
   ```

---

### Issue 5: Old Hugo Site Still Showing

**Symptoms:**
- Visitors see old Hugo site
- Browser cache issue

**Solutions:**
1. **Hard refresh:**
   - Chrome/Firefox: `Ctrl+Shift+R` or `Cmd+Shift+R`
   - Safari: `Cmd+Option+R`

2. **Clear Dreamhost cache** (if using Cloudflare):
   - Dreamhost panel → Cloudflare → Purge Cache

3. **Check correct branch deployed:**
   - `https://github.com/sumeetsahu/homepage/tree/gh-pages`
   - Should contain React build files

4. **Force new deployment:**
   ```bash
   # Make empty commit to trigger deployment
   git commit --allow-empty -m "Force redeploy"
   git push origin master
   ```

---

## Timeline Expectations

| Task | Expected Time |
|------|---------------|
| Push branch to GitHub | Immediate |
| Create & review PR | 10-30 minutes |
| Merge PR | Immediate |
| GitHub Actions build & deploy | 2-5 minutes |
| Test GitHub Pages URL | Immediate |
| Configure Dreamhost DNS | 10-20 minutes |
| DNS propagation (partial) | 4-6 hours |
| DNS propagation (complete) | 24-48 hours |
| HTTPS certificate provisioning | 24 hours after DNS |
| **Total time to live site** | **1-3 days** |

---

## Rollback Plan (If Needed)

If something goes critically wrong:

### Quick Rollback to Hugo Site

1. **Revert master branch:**
   ```bash
   # Find commit hash before merge
   git log --oneline

   # Revert to Hugo version (find hash before React merge)
   git revert <commit-hash> -m 1
   git push origin master
   ```

2. **Or create new branch from old master:**
   ```bash
   # Create backup branch from old master
   git checkout -b hugo-backup <old-commit-hash>
   git push origin hugo-backup
   
   # Reset master to hugo-backup
   git checkout master
   git reset --hard hugo-backup
   git push origin master --force
   ```

3. **Redeploy old site:**
   - GitHub Actions will automatically deploy old Hugo site
   - Wait 2-5 minutes for deployment

---

## Success Checklist

Before considering migration complete:

**GitHub:**
- [ ] PR merged to master
- [ ] GitHub Actions deployment successful
- [ ] gh-pages branch has latest build
- [ ] Repository settings updated

**Domain:**
- [ ] DNS A records pointing to GitHub Pages
- [ ] CNAME record for www subdomain
- [ ] CNAME file in repository
- [ ] HTTPS enabled and working

**Testing:**
- [ ] Site loads on custom domain
- [ ] All sections visible and functional
- [ ] Mobile responsive
- [ ] Cross-browser tested
- [ ] No console errors
- [ ] Social media links work
- [ ] Contact section functional

**Performance:**
- [ ] PageSpeed score 90+
- [ ] All assets loading quickly
- [ ] No broken links
- [ ] SEO metadata present

**Documentation:**
- [ ] README.md updated
- [ ] Deployment docs in /docs folder
- [ ] Future update guide available

---

## Post-Deployment Tasks

**Week 1:**
- [ ] Monitor site daily
- [ ] Check Google Analytics (if configured)
- [ ] Test all functionality
- [ ] Share new site on LinkedIn/social media

**Week 2-4:**
- [ ] Submit to Google Search Console
- [ ] Check for any reported issues
- [ ] Monitor uptime
- [ ] Gather feedback

**Ongoing:**
- [ ] Update content quarterly
- [ ] Check dependencies monthly: `npm outdated`
- [ ] Security updates: `npm audit fix`
- [ ] Backup regularly (Git already handles this)

---

## Support Resources

**GitHub Pages Documentation:**
- https://docs.github.com/en/pages

**Dreamhost DNS Help:**
- https://help.dreamhost.com/hc/en-us/articles/360035516812

**GitHub Actions:**
- https://docs.github.com/en/actions

**Vite Documentation:**
- https://vitejs.dev/guide/

**React Documentation:**
- https://react.dev/

**Tailwind CSS:**
- https://tailwindcss.com/docs

---

## Conclusion

This migration replaces your Hugo-based homepage with a modern React application featuring:
- ✅ Enhanced professional profile
- ✅ Patents & publications showcase
- ✅ Mobile-responsive design
- ✅ Automated CI/CD pipeline
- ✅ Comprehensive documentation

**Estimated Total Time:** 1-3 days (mostly waiting for DNS propagation)

**Complexity:** Medium (requires GitHub, DNS, and web development knowledge)

**Maintenance:** Low (automated deployments, occasional content updates)

Good luck with your deployment! 🚀
