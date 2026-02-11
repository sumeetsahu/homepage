/**
 * Resume HTML Template Generator
 * Generates a clean, minimalistic resume in HTML format
 */

function socialDisplay(url) {
  if (!url) return '';
  try {
    const u = new URL(url);
    return (u.hostname.replace(/^www\./, '') + u.pathname).replace(/\/$/, '');
  } catch {
    return url;
  }
}

function generateResumeHTML(data) {
  const { profile, experiences, skills, education, achievements, patents } = data;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${profile.name} - Resume</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        @page {
            size: A4;
            margin: 0;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
            font-size: 10pt;
            line-height: 1.5;
            color: #1a1a1a;
            background: white;
            max-width: 210mm;
            margin: 0 auto;
            padding: 15mm 20mm;
        }

        /* Header */
        .header {
            border-bottom: 2px solid #000;
            padding-bottom: 12pt;
            margin-bottom: 16pt;
        }

        .name {
            font-size: 24pt;
            font-weight: 600;
            letter-spacing: -0.5px;
            margin-bottom: 4pt;
        }

        .title {
            font-size: 12pt;
            color: #4a4a4a;
            margin-bottom: 8pt;
        }

        .contact {
            font-size: 9pt;
            color: #666;
            line-height: 1.6;
        }

        .contact a {
            color: #666;
            text-decoration: none;
        }

        /* Sections */
        .section {
            margin-bottom: 16pt;
        }

        .section-title {
            font-size: 11pt;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 4pt;
            margin-bottom: 8pt;
        }

        /* Summary */
        .summary {
            font-size: 10pt;
            line-height: 1.6;
            text-align: justify;
        }

        /* Experience */
        .experience-item {
            margin-bottom: 12pt;
            page-break-inside: avoid;
        }

        .experience-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 3pt;
        }

        .role {
            font-size: 10.5pt;
            font-weight: 600;
        }

        .company {
            font-size: 10pt;
            color: #4a4a4a;
            margin-bottom: 3pt;
        }

        .date {
            font-size: 9pt;
            color: #666;
            white-space: nowrap;
        }

        .experience-summary {
            font-size: 9.5pt;
            line-height: 1.5;
            text-align: justify;
        }

        /* Skills */
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8pt;
        }

        .skill-group {
            margin-bottom: 6pt;
        }

        .skill-category {
            font-size: 9.5pt;
            font-weight: 600;
            margin-bottom: 3pt;
        }

        .skill-items {
            font-size: 9pt;
            color: #4a4a4a;
            line-height: 1.5;
        }

        /* Education */
        .education-item {
            margin-bottom: 8pt;
            page-break-inside: avoid;
        }

        .education-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
        }

        .school {
            font-size: 10pt;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 3pt;
        }

        .degree {
            font-size: 9pt;
            color: #666;
        }

        /* Achievements */
        .achievements-list {
            margin-left: 15pt;
        }

        .achievements-list li {
            font-size: 9.5pt;
            margin-bottom: 4pt;
            line-height: 1.5;
        }

        /* Patent */
        .patent-item {
            margin-bottom: 8pt;
        }

        .patent-title {
            font-size: 10pt;
            font-weight: 600;
            margin-bottom: 3pt;
        }

        .patent-number {
            font-size: 9pt;
            color: #666;
            margin-bottom: 3pt;
        }

        /* Print optimization */
        @media print {
            body {
                padding: 10mm 15mm;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <div class="name">${profile.name.toUpperCase()}</div>
        <div class="title">${profile.title}</div>
        <div class="contact">
            <span class="contact-line">${profile.phone} • <a href="mailto:${profile.email}">${profile.email}</a> • ${profile.location}</span>
            <br>
            <span class="contact-line">${profile.website ? `<a href="${profile.website.startsWith('http') ? profile.website : 'https://' + profile.website}">${socialDisplay(profile.website)}</a> • ` : ''}<a href="${profile.socials.linkedin}">${socialDisplay(profile.socials?.linkedin)}</a> • <a href="${profile.socials.github}">${socialDisplay(profile.socials?.github)}</a></span>
        </div>
    </div>

    <!-- Summary -->
    <div class="section">
        <div class="section-title">Professional Summary</div>
        <div class="summary">
            ${profile.summary}
        </div>
    </div>

    <!-- Experience -->
    <div class="section">
        <div class="section-title">Professional Experience</div>
        ${experiences.map(exp => `
        <div class="experience-item">
            <div class="experience-header">
                <div>
                    <div class="role">${exp.role}</div>
                    <div class="company">${exp.company}</div>
                </div>
                <div class="date">${exp.range}</div>
            </div>
            <div class="experience-summary">
                ${exp.summary}
            </div>
        </div>`).join('\n')}
    </div>

    <!-- Key Achievements -->
    <div class="section">
        <div class="section-title">Key Achievements</div>
        <ul class="achievements-list">
            ${achievements.map(achievement => `<li>${achievement}</li>`).join('\n            ')}
        </ul>
    </div>

    <!-- Patents -->
    ${patents && patents.length > 0 ? `
    <div class="section">
        <div class="section-title">Patents & Publications</div>
        ${patents.map(p => `
        <div class="patent-item">
            <div class="patent-title">${p.title}</div>
            <div class="patent-number">${p.number} • Issued ${p.date} • ${p.assignee}</div>
        </div>`).join('\n')}
    </div>` : ''}

    <!-- Technical Skills -->
    <div class="section">
        <div class="section-title">Technical Skills</div>
        <div class="skills-grid">
            ${skills.map(skillGroup => `
            <div class="skill-group">
                <div class="skill-category">${skillGroup.grouping}</div>
                <div class="skill-items">${formatSkills(skillGroup.skills)}</div>
            </div>`).join('\n')}
        </div>
    </div>

    <!-- Education -->
    <div class="section">
        <div class="section-title">Education</div>
        ${education.filter(edu => edu.school.includes('NITK') || edu.school.includes('National Institute')).map(edu => `
        <div class="education-item">
            <div class="education-header">
                <div>
                    <div class="school">${edu.school}</div>
                    <div class="degree">${edu.degree} in ${edu.major}</div>
                </div>
                <div class="date">${edu.range}</div>
            </div>
        </div>`).join('\n')}
    </div>

</body>
</html>`;
}

function formatSkills(skills) {
  if (Array.isArray(skills)) {
    return skills.map(skill => {
      if (typeof skill === 'object' && skill.name) {
        return skill.name;
      }
      return skill;
    }).join(', ');
  }
  return skills;
}

module.exports = { generateResumeHTML };
