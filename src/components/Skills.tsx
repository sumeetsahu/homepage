import { SkillGroup } from '../types';

interface SkillsProps {
  skills: SkillGroup[];
}

export default function Skills({ skills }: SkillsProps) {
  return (
    <section data-analytics-section="skills" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-semibold mb-12">Skills & Expertise</h2>

        {/* Responsive grid: 1 col on mobile → 2 on small → 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((group, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition"
            >
              <h3 className="font-semibold mb-3">{group.grouping}</h3>
              <div className="space-y-2">
                {group.skills.map((skill, skillIndex) => {
                  if (typeof skill === 'string') {
                    return (
                      <p key={skillIndex} className="text-sm text-gray-600">
                        {skill}
                      </p>
                    );
                  } else {
                    return (
                      <p key={skillIndex} className="text-sm text-gray-600">
                        {skill.link ? (
                          <a
                            href={skill.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 hover:underline transition-colors"
                          >
                            {skill.name}
                          </a>
                        ) : (
                          skill.name
                        )}
                      </p>
                    );
                  }
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
