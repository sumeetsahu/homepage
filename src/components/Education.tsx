import { Education as EducationType } from '../types';

interface EducationProps {
  items: EducationType[];
}

export default function Education({ items }: EducationProps) {
  return (
    <section data-analytics-section="education" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-semibold mb-12">Education</h2>
        
        <div className="space-y-6 max-w-3xl">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl">🎓</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {item.school}
                  </h3>
                  <p className="text-lg text-gray-700 mb-1">{item.degree}</p>
                  {item.major && (
                    <p className="text-md text-gray-600 mb-4">{item.major}</p>
                  )}
                  <p className="text-sm text-gray-500 mb-4">{item.range}</p>
                  
                  {item.description && (
                    <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        <span className="font-semibold text-blue-900">Premier Engineering Institution:</span>{' '}
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
