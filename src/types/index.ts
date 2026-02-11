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
}
