# Resume Generator

Automated tool to generate a minimalistic, professional resume from your profile data.

## Overview

This tool reads your profile information from `src/data/` JSON files and generates a clean, print-ready HTML resume that matches your website's content. Whenever you update your profile, education, skills, or experience, simply re-run the generator to create an updated resume.

## Quick Start

### Generate Resume

```bash
# From project root
npm run generate-resume

# Or directly
node resume-generator/generator.js
```

### Output

- **HTML:** `resume-generator/output/resume.html`
- **PDF (automatic when Puppeteer is installed):** `public/Sumeet_Sahu_Resume.pdf` — used by the site and included in the build.

If the project has `puppeteer` as a devDependency, running `npm run generate-resume` also generates the PDF and overwrites `public/Sumeet_Sahu_Resume.pdf`. In CI (GitHub Actions), the PDF is generated before every build so the deployed resume stays in sync with your profile data.

### Convert to PDF (manual, if needed)

1. **Open in browser:**
   ```bash
   open resume-generator/output/resume.html
   ```

2. **Print to PDF:**
   - Press `Cmd+P` (Mac) or `Ctrl+P` (Windows)
   - Select "Save as PDF"
   - **Settings:**
     - Paper size: **A4**
     - Margins: **Default**
     - Background graphics: **ON**
     - Headers/footers: **OFF**
   - Save as: `Sumeet_Sahu_Resume.pdf`

3. **Upload for download:**
   - Place PDF in `public/` folder (e.g., `public/Sumeet_Sahu_Resume.pdf`)
   - Link from website: `/Sumeet_Sahu_Resume.pdf`
   - Commit and push to deploy

## How It Works

### Data Sources

The generator automatically pulls from these files:

```
src/data/
├── profile.json      # Name, title, contact, summary
├── experience.json   # Work history
├── skills.json       # Technical skills
└── education.json    # Academic background
```

### Customizable Data

Some data is maintained in `generator.js` for easy editing:

- **Key Achievements** (line 26)
- **Patent Information** (line 33)

You can move these to separate JSON files if preferred.

### Template

The resume design is in `template.js`:
- Clean, minimalistic style
- Black & white color scheme
- A4 page format
- Print-optimized CSS

## Customization

### Update Achievements

Edit `generator.js`, line 26:

```javascript
const achievements = [
  'Your achievement 1',
  'Your achievement 2',
  'Your achievement 3',
  'Your achievement 4'
];
```

### Update Patent

Edit `generator.js`, line 33:

```javascript
const patent = {
  title: 'Your Patent Title',
  number: 'US Patent XXXXXXX',
  date: 'Issue Date',
  assignee: 'Company Name'
};
```

To remove patent section, set to `null`:
```javascript
const patent = null;
```

### Modify Design

Edit `template.js`:
- **Fonts:** Change `font-family` in `body` style
- **Font sizes:** Adjust `font-size` values (currently 9-24pt)
- **Colors:** Modify `color` values (currently black/gray)
- **Spacing:** Adjust `margin` and `padding` values
- **Layout:** Change section order in template

### Add New Sections

1. Add data to `generator.js` or create new JSON file
2. Pass data to `generateResumeHTML()` function
3. Add HTML section in `template.js`

## Workflow

### When Updating Profile

1. **Update source data:**
   ```bash
   # Edit your profile information
   vim src/data/profile.json
   vim src/data/experience.json
   # ... etc
   ```

2. **Regenerate resume:**
   ```bash
   npm run generate-resume
   ```

3. **Review in browser:**
   ```bash
   open resume-generator/output/resume.html
   ```

4. **Convert to PDF** (see instructions above)

5. **Deploy:**
   ```bash
   # Copy PDF to public folder
   cp ~/Downloads/Sumeet_Sahu_Resume.pdf public/
   
   # Commit and push
   git add public/Sumeet_Sahu_Resume.pdf
   git commit -m "Update resume PDF"
   git push origin master
   ```

## File Structure

```
resume-generator/
├── README.md              # This file
├── generator.js           # Main generator script
├── template.js            # HTML template
└── output/
    └── resume.html        # Generated resume (gitignored)
```

## Features

✅ **Auto-sync with profile data** - Single source of truth  
✅ **Minimalistic design** - Clean, professional look  
✅ **Print-optimized** - Perfect A4 PDF output  
✅ **Easy to customize** - Simple JS/CSS editing  
✅ **Fast generation** - Instant resume updates  
✅ **Manual PDF control** - You control when to publish

## Troubleshooting

### Issue: "Cannot find module"

**Solution:** Run from project root:
```bash
cd /Users/ssahu16/Documents/Work/Workspace/homepage
npm run generate-resume
```

### Issue: Missing data

**Solution:** Check that all JSON files exist:
```bash
ls -la src/data/
```

### Issue: PDF looks wrong

**Solution:** Check browser print settings:
- Paper size must be A4
- Enable background graphics
- Disable headers/footers

## Future Enhancements

### Optional: Move achievements/patent to JSON

Create `src/data/achievements.json`:
```json
[
  "Achievement 1",
  "Achievement 2"
]
```

Create `src/data/patent.json`:
```json
{
  "title": "...",
  "number": "...",
  "date": "...",
  "assignee": "..."
}
```

Then update `generator.js` to read from these files.

### Optional: Automated PDF Generation

If you want automatic PDF generation (not recommended unless needed):

1. Install Puppeteer:
   ```bash
   npm install --save-dev puppeteer
   ```

2. Add PDF script to `generator.js`
3. Update `npm run generate-resume` to include PDF generation

This adds complexity but removes manual PDF step.

## Support

For issues or questions:
1. Check this README
2. Review `generator.js` comments
3. Test with sample data
4. Verify file paths

---

**Created:** February 10, 2026  
**Version:** 1.0  
**Maintainer:** Sumeet Sahu
