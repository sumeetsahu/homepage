import { useEffect } from 'react';
import Header from './components/Header';
import Philosophy from './components/Philosophy';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Patents from './components/Patents';
import EarlyInitiatives from './components/EarlyInitiatives';
import Education from './components/Education';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

import profileData from './data/profile.json';
import experienceData from './data/experience.json';
import skillsData from './data/skills.json';
import philosophyData from './data/philosophy.json';
import achievementsData from './data/achievements.json';
import patentsData from './data/patents.json';
import earlyInitiativesData from './data/earlyInitiatives.json';
import educationData from './data/education.json';

import {
  ProfileData,
  Experience as ExperienceType,
  SkillGroup,
  PhilosophyData,
  AchievementsData,
  PatentsData,
  EarlyInitiativesData,
  Education as EducationType,
} from './types';
import { initScrollDepthTracking, initSectionViewTracking } from './utils/analytics';

function App() {
  useEffect(() => {
    initScrollDepthTracking();
    initSectionViewTracking();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header profile={profileData as ProfileData} />
      <Philosophy data={philosophyData as PhilosophyData} />
      <Experience experiences={experienceData as ExperienceType[]} />
      <Achievements data={achievementsData as AchievementsData} />
      <Patents data={patentsData as PatentsData} />
      <EarlyInitiatives data={earlyInitiativesData as EarlyInitiativesData} />
      <Education items={educationData as EducationType[]} />
      <Skills skills={skillsData as SkillGroup[]} />
      <Contact profile={profileData as ProfileData} />
      <Footer profile={profileData as ProfileData} />
    </div>
  );
}

export default App;
