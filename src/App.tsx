import Header from './components/Header';
import ExperienceSection from './components/Experience';
import Skills from './components/Skills';
import EducationSection from './components/Education';
import Footer from './components/Footer';

import profileData from './data/profile.json';
import experienceData from './data/experience.json';
import skillsData from './data/skills.json';
import educationData from './data/education.json';

import { ProfileData, Experience, SkillGroup, Education } from './types';

function App() {
  return (
    <div className="min-h-screen">
      <Header profile={profileData as ProfileData} />
      <ExperienceSection experiences={experienceData as Experience[]} />
      <Skills skills={skillsData as SkillGroup[]} />
      <EducationSection education={educationData as Education[]} />
      <Footer />
    </div>
  );
}

export default App;
