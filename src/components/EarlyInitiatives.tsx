import { EarlyInitiativesData } from '../types';

interface EarlyInitiativesProps {
  data: EarlyInitiativesData;
}

export default function EarlyInitiatives({ data }: EarlyInitiativesProps) {
  const { sectionTitle, sectionSubtitle, learningJourneyText, initiatives } = data;

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-2">{sectionTitle}</h2>
          <p className="text-gray-600">
            {sectionSubtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {initiatives.map((initiative, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{initiative.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-semibold">{initiative.name}</h3>
                    <span className="text-xs text-gray-500 font-medium">{initiative.year}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{initiative.tagline}</p>
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    {initiative.status}
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {initiative.description}
              </p>
              
              {/* Awards Section - only for DialAuto */}
              {initiative.awards && (
                <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🏆</span>
                    <h4 className="text-sm font-semibold text-amber-900">Awards & Recognition</h4>
                  </div>
                  <div className="space-y-3">
                    {initiative.awards.map((award, awardIndex) => (
                      <div key={awardIndex} className="border-l-2 border-amber-300 pl-3">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-gray-900">{award.name}</p>
                          <span className="text-xs text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                            {award.year}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-amber-800 mb-1">{award.achievement}</p>
                        <p className="text-xs text-gray-600 leading-relaxed">{award.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2">
                {initiative.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded border border-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Learning Journey:</span> {learningJourneyText}
          </p>
        </div>
      </div>
    </section>
  );
}
