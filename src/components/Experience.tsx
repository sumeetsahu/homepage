import { useState } from 'react';
import { Experience as ExperienceType } from '../types';

interface ExperienceProps {
  experiences: ExperienceType[];
}

export default function Experience({ experiences }: ExperienceProps) {
  const [activeTab, setActiveTab] = useState('featured');

  // Sort experiences by date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const getYear = (range: string) => parseInt(range.split('—')[0].trim());
    return getYear(b.range) - getYear(a.range);
  });

  // Featured experiences (top 3 most impressive)
  const featuredExperiences = sortedExperiences.slice(0, 3);

  // Enterprise companies
  const enterpriseExperiences = sortedExperiences.filter(exp => 
    !exp.company.includes('myPNRstatus')
  );

  // Startup/entrepreneurial
  const startupExperiences = sortedExperiences.filter(exp =>
    exp.company.includes('myPNRstatus')
  );

  const getCompanyGradient = (company: string) => {
    if (company.includes('Amazon')) {
      return 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100';
    } else if (company.includes('Adobe')) {
      return 'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100';
    } else if (company.includes('myPNRstatus')) {
      return 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100';
    }
    return 'bg-white border border-gray-200';
  };

  const getTechTagColor = (company: string) => {
    if (company.includes('Amazon')) return 'bg-blue-50 text-blue-700';
    if (company.includes('Adobe')) return 'bg-purple-50 text-purple-700';
    if (company.includes('Microsoft')) return 'bg-cyan-50 text-cyan-700';
    if (company.includes('myPNRstatus')) return 'bg-green-50 text-green-700';
    return 'bg-gray-100 text-gray-700';
  };

  const isCurrentRole = (range: string) => range.includes('Present');

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-semibold mb-12">Professional Experience</h2>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition ${
                activeTab === 'featured'
                  ? 'border-black'
                  : 'border-transparent hover:border-gray-300 text-gray-600'
              }`}
            >
              Featured Roles
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition ${
                activeTab === 'all'
                  ? 'border-black'
                  : 'border-transparent hover:border-gray-300 text-gray-600'
              }`}
            >
              All Experience
            </button>
            <button
              onClick={() => setActiveTab('enterprise')}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition ${
                activeTab === 'enterprise'
                  ? 'border-black'
                  : 'border-transparent hover:border-gray-300 text-gray-600'
              }`}
            >
              Enterprise ({enterpriseExperiences.length})
            </button>
            <button
              onClick={() => setActiveTab('startup')}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition ${
                activeTab === 'startup'
                  ? 'border-black'
                  : 'border-transparent hover:border-gray-300 text-gray-600'
              }`}
            >
              Startup ({startupExperiences.length})
            </button>
          </div>
        </div>

        {/* Featured Tab */}
        {activeTab === 'featured' && (
          <div className="space-y-8">
            {featuredExperiences.map((exp, index) => (
              <div key={index} className={`p-8 rounded-xl ${getCompanyGradient(exp.company)}`}>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-3xl font-semibold">{exp.company}</h3>
                  {isCurrentRole(exp.range) && (
                    <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full font-medium">
                      Current
                    </span>
                  )}
                  {exp.company.includes('myPNRstatus') && (
                    <span className="px-3 py-1 bg-orange-600 text-white text-xs rounded-full font-medium">
                      Founder
                    </span>
                  )}
                </div>
                <p className="text-xl text-gray-700 mb-2">{exp.role}</p>
                <p className="text-sm text-gray-600 mb-4">{exp.range}</p>
                <p className="text-gray-700 leading-relaxed mb-6">{exp.summary}</p>
                
                {/* Show metrics for Amazon and myPNRstatus */}
                {exp.company.includes('Amazon') && (
                  <div className="grid md:grid-cols-3 gap-4 text-center mb-6">
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">1.5B</p>
                      <p className="text-xs text-gray-600">Transactions/Day</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">15K</p>
                      <p className="text-xs text-gray-600">TPS at Scale</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-2xl font-bold text-pink-600">4+</p>
                      <p className="text-xs text-gray-600">Years</p>
                    </div>
                  </div>
                )}

                {exp.company.includes('myPNRstatus') && (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-green-600">400K</p>
                      <p className="text-xs text-gray-600">Unique Users</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-emerald-600">6</p>
                      <p className="text-xs text-gray-600">Years Active</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* All Experience Tab */}
        {activeTab === 'all' && (
          <div className="space-y-8">
            {sortedExperiences.map((exp, index) => (
              <div key={index} className="grid md:grid-cols-4 gap-6 pb-8 border-b last:border-0">
                <div>
                  <p className="text-sm text-gray-500">{exp.range}</p>
                </div>
                <div className="md:col-span-3">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-semibold">{exp.company}</h3>
                    {isCurrentRole(exp.range) && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-lg text-gray-600 mb-3">{exp.role}</p>
                  <p className="text-gray-700 leading-relaxed mb-4">{exp.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.company.includes('Amazon') && (
                      <>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>AWS</span>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>Event-Driven</span>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>Java</span>
                      </>
                    )}
                    {exp.company.includes('Adobe') && (
                      <>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>Azure</span>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>Microservices</span>
                      </>
                    )}
                    {exp.company.includes('Microsoft') && (
                      <>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>C#</span>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>Bing</span>
                      </>
                    )}
                    {exp.company.includes('myPNRstatus') && (
                      <>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>PHP</span>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>MySQL</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Enterprise Tab */}
        {activeTab === 'enterprise' && (
          <>
            <p className="text-sm text-gray-500 mb-8">Large-scale technology companies</p>
            <div className="grid md:grid-cols-2 gap-6">
              {enterpriseExperiences.map((exp, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl hover:shadow-lg transition ${
                    isCurrentRole(exp.range) ? 'bg-blue-50 border border-blue-200' : 'border border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{exp.company}</h3>
                    {isCurrentRole(exp.range) && (
                      <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">Current</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{exp.range}</p>
                  <p className="text-sm text-gray-700">{exp.role}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Startup Tab */}
        {activeTab === 'startup' && (
          <>
            <p className="text-sm text-gray-500 mb-8">Entrepreneurial ventures</p>
            {startupExperiences.map((exp, index) => (
              <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl border border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-2xl font-semibold">{exp.company}</h3>
                  <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full font-medium">
                    Founder
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{exp.range}</p>
                <p className="text-gray-700 leading-relaxed mb-6">{exp.summary}</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-green-600">400K</p>
                    <p className="text-xs text-gray-600">Unique Users</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-emerald-600">6</p>
                    <p className="text-xs text-gray-600">Years Active</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white text-gray-900 rounded text-sm">PHP</span>
                  <span className="px-3 py-1 bg-white text-gray-900 rounded text-sm">MySQL</span>
                  <span className="px-3 py-1 bg-white text-gray-900 rounded text-sm">SMS Gateway</span>
                  <span className="px-3 py-1 bg-white text-gray-900 rounded text-sm">400K Users</span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
