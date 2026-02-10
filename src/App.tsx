import Header from './components/Header';
import Philosophy from './components/Philosophy';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

import profileData from './data/profile.json';
import experienceData from './data/experience.json';
import skillsData from './data/skills.json';

import { ProfileData, Experience as ExperienceType, SkillGroup } from './types';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header profile={profileData as ProfileData} />
      <Philosophy />
      <Experience experiences={experienceData as ExperienceType[]} />
      <Achievements />
      <Skills skills={skillsData as SkillGroup[]} />
      <Contact profile={profileData as ProfileData} />
      <Footer />
    </div>
  );
}

export default App;
