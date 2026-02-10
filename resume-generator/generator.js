#!/usr/bin/env node

/**
 * Resume Generator
 * 
 * Reads profile data from src/data/ and generates a minimalistic resume in HTML format.
 * 
 * Usage:
 *   node resume-generator/generator.js
 *   OR
 *   npm run generate-resume
 */

const fs = require('fs');
const path = require('path');
const { generateResumeHTML } = require('./template');

// Paths
const ROOT_DIR = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'src', 'data');
const OUTPUT_DIR = path.join(__dirname, 'output');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'resume.html');

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

// Define key achievements (you can move this to a separate JSON file later if needed)
const achievements = [
  'Pioneered GenAI code generation initiative impacting 8,000+ developers with 50% productivity improvement',
  'Delivered $600K annual cost savings through Apache Beam migration processing 1.5B daily transactions',
  'Scaled myPNRstatus startup from zero to 600,000 users as solo founder',
  'Architected multi-cloud orchestration platform serving millions of Adobe Experience Cloud users'
];

// Patent information (you can move this to a separate JSON file later if needed)
const patent = {
  title: 'Digital Media Environment for Removal of Interference Patterns from Digital Images',
  number: 'US Patent 10,134,113',
  date: 'November 20, 2018',
  assignee: 'Adobe Inc.'
};

// Generate resume
console.log('🔨 Generating resume...');

const resumeHTML = generateResumeHTML({
  profile,
  experiences,
  skills,
  education,
  achievements,
  patent
});

// Write to file
fs.writeFileSync(OUTPUT_FILE, resumeHTML, 'utf8');

console.log('✅ Resume generated successfully!');
console.log(`📍 Location: ${OUTPUT_FILE}`);
console.log('');
console.log('Next steps:');
console.log('1. Open resume.html in your browser');
console.log('2. Press Cmd+P (Mac) or Ctrl+P (Windows/Linux)');
console.log('3. Save as PDF with these settings:');
console.log('   - Paper: A4');
console.log('   - Margins: Default');
console.log('   - Background graphics: ON');
console.log('   - Headers/footers: OFF');
console.log('4. Upload the PDF to your website');
console.log('');
console.log('To preview now, run: open resume-generator/output/resume.html');
