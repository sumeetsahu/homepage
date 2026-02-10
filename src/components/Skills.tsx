import { SkillGroup } from '../types';

interface SkillsProps {
  skills: SkillGroup[];
}

export default function Skills({ skills }: SkillsProps) {
  const renderSkill = (skill: string | { name?: string; link?: string }, index: number) => {
    if (typeof skill === 'string') {
      return (
        <span
          key={index}
          className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition"
        >
          {skill}
        </span>
      );
    }

    if (skill.link) {
      return (
        <a
          key={index}
          href={skill.link}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition"
        >
          {skill.name}
        </a>
      );
    }

    return (
      <span
        key={index}
        className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition"
      >
        {skill.name}
      </span>
    );
  };

  return (
    <section id="skills" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
          Skills & Expertise
        </h2>

        <div className="max-w-5xl mx-auto space-y-8">
          {skills.map((group, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {group.grouping}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, skillIndex) => renderSkill(skill, skillIndex))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
