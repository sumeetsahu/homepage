#!/usr/bin/env node

/**
 * Resume Generator
 *
 * Reads profile data from src/data/ and generates a minimalistic resume in HTML format.
 * When Puppeteer is available, also generates public/Sumeet_Sahu_Resume.pdf for the build.
 *
 * Usage:
 *   node resume-generator/generator.js
 *   OR
 *   npm run generate-resume
 */

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { generateResumeHTML } = require('./template');

// Paths
const ROOT_DIR = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'src', 'data');
const OUTPUT_DIR = path.join(__dirname, 'output');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'resume.html');
const PDF_OUTPUT = path.join(ROOT_DIR, 'public', 'Sumeet_Sahu_Resume.pdf');

function getYearsOfExperience(careerStartDate) {
  const [y, m] = careerStartDate.split('-').map(Number);
  if (!y || Number.isNaN(y)) return 0;
  const start = new Date(y, (m || 1) - 1, 1);
  const now = new Date();
  const years = (now.getTime() - start.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  return Math.floor(years);
}

async function generatePdfIfAvailable() {
  let puppeteer;
  try {
    puppeteer = require('puppeteer');
  } catch {
    console.log('');
    console.log('💡 Install puppeteer (npm install -D puppeteer) and re-run to auto-generate the PDF.');
    return;
  }

  const publicDir = path.join(ROOT_DIR, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log('📄 Generating PDF...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(OUTPUT_FILE).href, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: PDF_OUTPUT,
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });
    console.log(`✅ PDF generated: ${PDF_OUTPUT}`);
  } finally {
    await browser.close();
  }
}

async function main() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Read data files
  console.log('📄 Reading profile data...');

  const profile = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'profile.json'), 'utf8'));
  const experiences = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'experience.json'), 'utf8'));
  const skills = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'skills.json'), 'utf8'));
  const education = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'education.json'), 'utf8'));
  const achievementsData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'achievements.json'), 'utf8'));
  const patentsData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'patents.json'), 'utf8'));

  // One-line bullets for resume from achievements (description is impact-focused)
  const achievements = achievementsData.achievements.map((a) => a.description);

  // Patents in template shape: { title, number, date, assignee }
  const patents = (patentsData.patents || []).map((p) => ({
    title: p.title,
    number: p.patentNumber,
    date: p.issueDate,
    assignee: p.assignee
  }));

  // Resolve {{years}} in profile from careerStartDate (YYYY-MM)
  const profileForResume = { ...profile };
  if (profile.careerStartDate) {
    const years = getYearsOfExperience(profile.careerStartDate);
    const replaceYears = (s) => (typeof s === 'string' ? s.replace(/\{\{years\}\}/g, String(years)) : s);
    profileForResume.summary = replaceYears(profile.summary);
    if (profile.headlineStats) {
      profileForResume.headlineStats = profile.headlineStats.map((stat) => ({
        ...stat,
        value: replaceYears(stat.value)
      }));
    }
  }

  // Generate resume
  console.log('🔨 Generating resume...');

  const resumeHTML = generateResumeHTML({
    profile: profileForResume,
    experiences,
    skills,
    education,
    achievements,
    patents
  });

  // Write to file
  fs.writeFileSync(OUTPUT_FILE, resumeHTML, 'utf8');

  console.log('✅ Resume HTML generated successfully!');
  console.log(`📍 Location: ${OUTPUT_FILE}`);

  // Generate PDF when Puppeteer is available (e.g. in CI or after npm install with puppeteer)
  try {
    await generatePdfIfAvailable();
  } catch (err) {
    console.warn('⚠️  PDF generation skipped:', err.message);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
