import { Education } from '../types';

interface EducationProps {
  education: Education[];
}

export default function EducationSection({ education }: EducationProps) {
  return (
    <section id="education" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
          Education
        </h2>

        <div className="max-w-4xl mx-auto space-y-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-6 border border-blue-100 hover:shadow-lg transition"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {edu.degree}
                    {edu.major && (
                      <span className="text-blue-600"> - {edu.major}</span>
                    )}
                  </h3>
                  <h4 className="text-lg text-gray-700 mb-1">
                    {edu.school}
                  </h4>
                </div>
                <span className="text-sm text-gray-600 font-medium mt-2 md:mt-0 md:ml-4">
                  {edu.range}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
