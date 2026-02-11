import { useState } from 'react';
import { Experience as ExperienceType } from '../types';
import { trackEvent } from '../utils/analytics';

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

  // Featured experiences - manually select the most impactful roles
  const featuredExperiences = [
    sortedExperiences.find(exp => exp.company.includes('Intuit')),
    sortedExperiences.find(exp => exp.company.includes('Amazon')),
    sortedExperiences.find(exp => exp.company.includes('myPNRstatus')),
  ].filter(Boolean) as ExperienceType[];

  // Enterprise companies (all experiences since myPNRstatus is now featured separately)
  const enterpriseExperiences = sortedExperiences;

  const getCompanyGradient = (company: string) => {
    if (company.includes('Intuit')) {
      return 'bg-gradient-to-r from-green-50 to-blue-50 border border-green-100';
    } else if (company.includes('Amazon')) {
      return 'bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-100';
    } else if (company.includes('Adobe')) {
      return 'bg-gradient-to-r from-red-50 to-pink-50 border border-red-100';
    } else if (company.includes('myPNRstatus')) {
      return 'bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100';
    }
    return 'bg-white border border-gray-200';
  };

  const getTechTagColor = (company: string) => {
    if (company.includes('Intuit')) return 'bg-green-50 text-green-700';
    if (company.includes('Amazon')) return 'bg-orange-50 text-orange-700';
    if (company.includes('Adobe')) return 'bg-red-50 text-red-700';
    if (company.includes('Microsoft')) return 'bg-blue-50 text-blue-700';
    if (company.includes('myPNRstatus')) return 'bg-purple-50 text-purple-700';
    if (company.includes('CA Technology')) return 'bg-gray-50 text-gray-700';
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
              onClick={() => {
                setActiveTab('featured');
                trackEvent('experience_tab', { event_label: 'featured', event_category: 'engagement' });
              }}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition ${
                activeTab === 'featured'
                  ? 'border-black'
                  : 'border-transparent hover:border-gray-300 text-gray-600'
              }`}
            >
              Featured Roles
            </button>
            <button
              onClick={() => {
                setActiveTab('all');
                trackEvent('experience_tab', { event_label: 'all', event_category: 'engagement' });
              }}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition ${
                activeTab === 'all'
                  ? 'border-black'
                  : 'border-transparent hover:border-gray-300 text-gray-600'
              }`}
            >
              All Experience
            </button>
            <button
              onClick={() => {
                setActiveTab('enterprise');
                trackEvent('experience_tab', { event_label: 'enterprise', event_category: 'engagement' });
              }}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition ${
                activeTab === 'enterprise'
                  ? 'border-black'
                  : 'border-transparent hover:border-gray-300 text-gray-600'
              }`}
            >
              Enterprise ({enterpriseExperiences.length})
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
                
                {/* Show metrics for Intuit, Amazon and myPNRstatus */}
                {exp.company.includes('Intuit') && (
                  <div className="grid md:grid-cols-3 gap-4 text-center mb-6">
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">8,000+</p>
                      <p className="text-xs text-gray-600">Developers Impacted</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">50%</p>
                      <p className="text-xs text-gray-600">Productivity Boost</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-2xl font-bold text-teal-600">1 Year</p>
                      <p className="text-xs text-gray-600">Time to Impact</p>
                    </div>
                  </div>
                )}

                {exp.company.includes('Amazon') && (
                  <div className="grid md:grid-cols-3 gap-4 text-center mb-6">
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">$600K</p>
                      <p className="text-xs text-gray-600">Annual Savings</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-2xl font-bold text-yellow-600">1.5B</p>
                      <p className="text-xs text-gray-600">Transactions/Day</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-2xl font-bold text-amber-600">30</p>
                      <p className="text-xs text-gray-600">Team Size</p>
                    </div>
                  </div>
                )}

                {exp.company.includes('myPNRstatus') && (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-purple-600">600K</p>
                      <p className="text-xs text-gray-600">Unique Users</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-indigo-600">6</p>
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
                  
                  {/* Hierarchical roles for consolidated experiences */}
                  {exp.roles && exp.roles.length > 0 ? (
                    <div className="mb-4">
                      <p className="text-gray-700 leading-relaxed mb-4">{exp.summary}</p>
                      <div className="ml-4 border-l-2 border-gray-300 pl-6 space-y-6">
                        {exp.roles.map((role, roleIndex) => (
                          <div key={roleIndex} className="relative">
                            <div className="absolute -left-[26px] w-3 h-3 rounded-full bg-red-400 border-2 border-white"></div>
                            <div className="mb-2">
                              <p className="font-semibold text-gray-800">{role.title}</p>
                              <p className="text-sm text-gray-500">{role.range}</p>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">{role.summary}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700 leading-relaxed mb-4">{exp.summary}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.company.includes('Intuit') && (
                      <>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>GenAI</span>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>Claude/ChatGPT</span>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>Python</span>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>Automation</span>
                      </>
                    )}
                    {exp.company.includes('Amazon') && (
                      <>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>Java</span>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>Apache Beam</span>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>AWS</span>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>Distributed Systems</span>
                      </>
                    )}
                    {exp.company.includes('Adobe') && (
                      <>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>Java</span>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>Docker</span>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>Azure</span>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>Microservices</span>
                      </>
                    )}
                    {exp.company.includes('Microsoft') && (
                      <>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>C#</span>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>ASP.NET</span>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>Bing</span>
                      </>
                    )}
                    {exp.company.includes('myPNRstatus') && (
                      <>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>PHP</span>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>MySQL</span>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>SMS Gateway</span>
                      </>
                    )}
                    {exp.company.includes('CA Technology') && (
                      <>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>EITM</span>
                        <span className={`px-3 py-1 rounded text-xs ${getTechTagColor(exp.company)}`}>Service Desk</span>
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
            <p className="text-sm text-gray-500 mb-8">Large-scale technology companies and entrepreneurial ventures</p>
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
                    {exp.company.includes('myPNRstatus') && (
                      <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded">Founder</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{exp.range}</p>
                  <p className="text-sm text-gray-700 mb-2">{exp.role}</p>
                  
                  {/* Show role progression for consolidated experiences */}
                  {exp.roles && exp.roles.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-2">Career Progression:</p>
                      <div className="space-y-1">
                        {exp.roles.map((role, roleIndex) => (
                          <div key={roleIndex} className="text-xs text-gray-600">
                            <span className="font-medium">•</span> {role.title} <span className="text-gray-400">({role.range})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
