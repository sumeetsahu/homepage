# Resume - Conversion to PDF

Your minimalistic resume has been created in `resume.html`.

## Quick PDF Conversion (Recommended)

The resume HTML file should have opened in your default browser. To save as PDF:

### Option 1: Using Browser Print (Easiest)
1. The file is already open in your browser
2. Press `Cmd+P` (Mac) or `Ctrl+P` (Windows/Linux)
3. Select "Save as PDF" as the destination
4. **Important Settings:**
   - Paper size: **A4** or **Letter**
   - Margins: **Default** or **Minimum**
   - Background graphics: **Enabled** (for borders)
   - Headers/Footers: **Disabled**
5. Click "Save" and choose location: `Sumeet_Sahu_Resume.pdf`

### Option 2: Re-open if needed
```bash
open resume.html
# Then follow Option 1 above
```

### Option 3: Install Automated Tools (Advanced)

If you want automated PDF generation for future updates:

**Using Python + WeasyPrint:**
```bash
# Install weasyprint
pip3 install weasyprint

# Generate PDF
weasyprint resume.html Sumeet_Sahu_Resume.pdf
```

**Using Node.js + Puppeteer:**
```bash
# Install puppeteer
npm install --save-dev puppeteer

# Create and run conversion script
node scripts/generate-resume-pdf.js
```

## Resume Features

✅ **Minimalistic Design:**
- Clean typography with professional fonts
- Black and white color scheme
- Optimal spacing and readability
- Single-page format (A4)

✅ **Content Sections:**
- Professional Summary (highlights 17+ years, key achievements)
- Experience (7 roles: Intuit, Amazon, Adobe, Microsoft, myPNRstatus, CA)
- Key Achievements (quantified impact)
- Patents & Publications (US Patent 10,134,113)
- Technical Skills (GenAI, Architecture, Languages, Cloud)
- Education (NITK)

✅ **Print-Optimized:**
- A4 page size
- Professional margins
- Page break control
- Clean rendering

## Customization

To modify the resume:

1. **Edit content:** Open `resume.html` in any text editor
2. **Update styling:** Modify the `<style>` section
3. **Preview:** Refresh browser (`Cmd+R`)
4. **Export:** Print to PDF again

## File Location

```
/Users/ssahu16/Documents/Work/Workspace/homepage/resume.html
```

---

**Generated:** February 10, 2026  
**Version:** 1.0 - Minimalistic Single-Page Resume
