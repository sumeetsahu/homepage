export interface Role {
  title: string;
  range: string;
  summary: string;
}

export interface Experience {
  role: string;
  company: string;
  summary: string;
  range: string;
  roles?: Role[]; // Optional: for consolidated experiences with career progression
}

export interface Skill {
  name?: string;
  link?: string;
}

export interface SkillGroup {
  grouping: string;
  skills: (string | Skill)[];
}

export interface Education {
  school: string;
  degree: string;
  major?: string;
  range: string;
  description?: string;
}

export interface PhilosophyData {
  quote: string;
  caption: string;
}

export interface Achievement {
  title: string;
  company: string;
  impact: string;
  description: string;
  icon: string;
  color: string;
}

export interface Patent {
  title: string;
  patentNumber: string;
  patentSlug?: string;
  issueDate: string;
  assignee: string;
  icon: string;
  summary: string;
  technicalAreas: string[];
  impact: string;
  url?: string;
}

export interface PatentsData {
  sectionTitle: string;
  sectionSubtitle: string;
  googlePatentsBaseUrl?: string;
  patents: Patent[];
}

export interface AchievementsData {
  sectionTitle: string;
  sectionSubtitle: string;
  achievements: Achievement[];
}

export interface EarlyInitiativesData {
  sectionTitle: string;
  sectionSubtitle: string;
  learningJourneyText: string;
  initiatives: EarlyInitiative[];
}

export interface EarlyInitiativeAward {
  name: string;
  year: string;
  achievement: string;
  description: string;
}

export interface EarlyInitiative {
  name: string;
  tagline: string;
  year: string;
  description: string;
  icon: string;
  status: string;
  tags: string[];
  awards?: EarlyInitiativeAward[];
}

export interface HeadlineStat {
  value: string;
  label: string;
}

export interface ProfileData {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  profileImage: string;
  socials: {
    linkedin?: string;
    github?: string;
    facebook?: string;
  };
  /** Optional headline stats shown in the header (e.g. "17+", "Years") */
  headlineStats?: HeadlineStat[];
  /** Optional resume download URL or path */
  resumeUrl?: string;
  /** Optional contact section title and tagline */
  contactTitle?: string;
  contactTagline?: string;
}
