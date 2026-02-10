# TODO List for Homepage Enhancements

## Active Tasks

### 1. Add Professional Profile Photo to Hero Section

**Priority:** Medium  
**Status:** Pending Review  
**Estimated Effort:** 30 minutes

#### Background
User has a professional photo from Intuit office that could enhance the hero section. Initial implementation was reverted due to visual concerns.

#### Requirements

**Photo Details:**
- **Source file:** `IMG20241104083048` (second photo)
- **Location:** Intuit office green wall with logo
- **Format:** PNG (will convert to optimized JPG)
- **Subject framing:** Upper body, face prominent, Intuit branding visible

**Design Specifications:**

1. **Layout:**
   - Two-column responsive grid on desktop
   - Left column: Name, title, summary, stats, CTA buttons
   - Right column: Profile photo
   - Mobile: Photo stacked above or below content (decide during review)

2. **Photo Styling Options to Review:**
   - **Option A:** Circular crop (320px diameter)
   - **Option B:** Rounded square (320px with 24px border-radius)
   - **Option C:** Subtle rounded (320px with 12px border-radius)
   - Include shadow: `shadow-2xl`
   - Include ring: `ring-4 ring-gray-100`

3. **Technical Requirements:**
   - Optimize image size (target: < 200KB)
   - Use WebP format with JPG fallback if possible
   - Lazy loading for performance
   - Alt text: "Sumeet Sahu - Principal Engineer at Intuit"
   - Object-fit: cover, object-position: center

4. **Accessibility:**
   - Proper alt text
   - Maintain readable text contrast
   - Ensure layout doesn't break on small screens

#### Implementation Steps

1. **Local Testing (Required):**
   ```bash
   # Copy image to public folder
   cp [source] public/profile-photo.jpg
   
   # Test locally
   npm run dev
   # Preview at http://localhost:5173/
   ```

2. **Create Feature Branch:**
   ```bash
   git checkout -b feature/add-profile-photo
   ```

3. **Make Changes:**
   - Copy optimized image to `public/profile-photo.jpg`
   - Update `src/components/Header.tsx` with two-column layout
   - Test responsive design (mobile, tablet, desktop)

4. **Commit and Push:**
   ```bash
   git add public/profile-photo.jpg src/components/Header.tsx
   git commit -m "Add professional profile photo to hero section"
   git push origin feature/add-profile-photo
   ```

5. **Create Pull Request:**
   - Include screenshot of local preview
   - Tag for review before merging

#### Code Reference (Starting Point)

**Header.tsx changes needed:**
```typescript
// Update return statement to use grid layout
<div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">
  {/* Left: Existing content */}
  <div className="max-w-4xl">
    {/* existing hero content */}
  </div>
  
  {/* Right: Profile photo */}
  <div className="flex justify-center md:justify-end">
    <img 
      src="/profile-photo.jpg" 
      alt="Sumeet Sahu - Principal Engineer at Intuit"
      className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-2xl ring-4 ring-gray-100"
    />
  </div>
</div>
```

#### Design Alternatives to Consider

1. **Minimal:** No photo, keep text-only (current state)
2. **Subtle:** Small circular photo (160px) in top-right corner
3. **Prominent:** Large photo as implemented, needs refinement
4. **Background:** Photo as subtle background with overlay

#### Open Questions

- [ ] Circular vs. rounded square crop?
- [ ] Photo size: 256px, 320px, or 384px?
- [ ] Mobile placement: above name or below CTA buttons?
- [ ] Should Intuit branding be visible or cropped out?
- [ ] Shadow intensity: subtle vs. prominent?

#### Success Criteria

- [ ] Photo looks professional and polished
- [ ] Layout is balanced (not overcrowded)
- [ ] Responsive design works on all screen sizes
- [ ] Image loads quickly (< 200KB)
- [ ] User approves visual design before merge

#### Notes

- User preference: Second photo (IMG20241104083048) over first
- Initial implementation reverted due to visual concerns - need user feedback on specific issues
- Remember: Test locally → Branch → PR → Review → Merge (never direct to master)

---

## Workflow for Future Changes

**CRITICAL: Never commit directly to master branch**

### Standard Development Workflow

1. **Test Locally First:**
   ```bash
   npm run dev
   # Preview changes at http://localhost:5173/
   # Verify design, functionality, responsiveness
   ```

2. **Create Feature Branch:**
   ```bash
   git checkout -b feature/descriptive-name
   # or: fix/bug-description
   # or: update/content-change
   ```

3. **Make Changes:**
   - Edit files
   - Test thoroughly
   - Check for linter errors: `npm run lint`
   - Build test: `npm run build`

4. **Commit with Clear Message:**
   ```bash
   git add [files]
   git commit -m "Clear description of change"
   ```

5. **Push to Feature Branch:**
   ```bash
   git push origin feature/descriptive-name
   ```

6. **Create Pull Request:**
   - Use GitHub UI or `gh pr create`
   - Include:
     - What changed
     - Why it changed
     - Screenshots if visual change
     - Testing notes
   - Wait for review/approval

7. **Merge After Approval:**
   - User reviews PR
   - User approves
   - Then merge to master
   - GitHub Actions deploys automatically

### Emergency Hotfixes Only

Direct to master is acceptable only for:
- Critical security fixes
- Site-breaking bug fixes
- Emergency content updates (typos in live site)

Even then, create PR afterward for documentation.

---

## Future Enhancement Ideas

### Content Enhancements
- [ ] Add blog section for technical articles
- [ ] Add speaking engagements/conferences section
- [ ] Add GitHub contribution stats
- [ ] Add recommendations/testimonials

### Design Enhancements
- [ ] Dark mode toggle
- [ ] Animated statistics counters
- [ ] Smooth scroll animations
- [ ] Interactive timeline for experience

### Technical Enhancements
- [ ] Add Google Analytics
- [ ] Add sitemap.xml
- [ ] Add robots.txt
- [ ] Implement proper Open Graph images
- [ ] Add schema.org structured data for SEO

### Performance Optimizations
- [ ] Implement image lazy loading
- [ ] Add service worker for offline support
- [ ] Optimize font loading strategy
- [ ] Implement code splitting

---

## Recently Completed

- [x] Fix GitHub Pages deployment (workflow trigger, base path, CNAME)
- [x] Configure Dreamhost DNS for custom domain
- [x] Update meta tags to reflect Principal Engineer role
- [x] Remove premature CNAME redirect
- [x] Add Education section (NITK)
- [x] Add Patents & Publications section
- [x] Add Early Entrepreneurial Initiatives section
- [x] Add Key Achievements section
- [x] Create minimalistic resume in HTML format (see `resume.html`)

---

## Deployment Status

**Current Live Sites:**
- Production: `https://sumeetsahu.com` (pending DNS propagation)
- GitHub Pages: `https://sumeetsahu.github.io/homepage/`

**Next Steps for DNS:**
- Wait for full DNS propagation (24-48 hours)
- Enable HTTPS in GitHub Pages settings
- Verify SSL certificate provisioning
- Test all redirects work correctly

---

*Last Updated: February 10, 2026*
