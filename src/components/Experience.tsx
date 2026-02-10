import { Experience } from '../types';

interface ExperienceProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
          Professional Experience
        </h2>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative pl-8 pb-8 border-l-2 border-blue-200 last:pb-0"
            >
              {/* Timeline dot */}
              <div className="absolute left-[-9px] top-0 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>

              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {exp.role}
                  </h3>
                  <span className="text-sm text-blue-600 font-medium mt-1 md:mt-0">
                    {exp.range}
                  </span>
                </div>
                <h4 className="text-lg text-gray-700 mb-3 font-medium">
                  {exp.company}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {exp.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
