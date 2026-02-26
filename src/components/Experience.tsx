import { useState } from 'react';
import { Experience as ExperienceType } from '../types';
import { trackEvent } from '../utils/analytics';

interface ExperienceProps {
  experiences: ExperienceType[];
}

// ---------------------------------------------------------------------------
// Color scheme definitions — all class strings are literal so Tailwind's
// JIT scanner picks them up during build. Do NOT construct dynamically.
// ---------------------------------------------------------------------------
interface ColorScheme {
  gradient: string;
  tag: string;
  dot: string;
  badge: string;
  metricValues: [string, string, string];
}

const COLOR_SCHEME_MAP: Record<string, ColorScheme> = {
  green: {
    gradient: 'bg-gradient-to-r from-green-50 to-blue-50 border border-green-100',
    tag: 'bg-green-50 text-green-700',
    dot: 'bg-green-400',
    badge: 'bg-green-600 text-white',
    metricValues: ['text-green-600', 'text-blue-600', 'text-teal-600'],
  },
  orange: {
    gradient: 'bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-100',
    tag: 'bg-orange-50 text-orange-700',
    dot: 'bg-orange-400',
    badge: 'bg-orange-600 text-white',
    metricValues: ['text-orange-600', 'text-yellow-600', 'text-amber-600'],
  },
  red: {
    gradient: 'bg-gradient-to-r from-red-50 to-pink-50 border border-red-100',
    tag: 'bg-red-50 text-red-700',
    dot: 'bg-red-400',
    badge: 'bg-red-600 text-white',
    metricValues: ['text-red-600', 'text-pink-600', 'text-rose-600'],
  },
  blue: {
    gradient: 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100',
    tag: 'bg-blue-50 text-blue-700',
    dot: 'bg-blue-400',
    badge: 'bg-blue-600 text-white',
    metricValues: ['text-blue-600', 'text-indigo-600', 'text-sky-600'],
  },
  purple: {
    gradient: 'bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100',
    tag: 'bg-purple-50 text-purple-700',
    dot: 'bg-purple-400',
    badge: 'bg-purple-600 text-white',
    metricValues: ['text-purple-600', 'text-indigo-600', 'text-violet-600'],
  },
  gray: {
    gradient: 'bg-white border border-gray-200',
    tag: 'bg-gray-50 text-gray-700',
    dot: 'bg-gray-400',
    badge: 'bg-gray-600 text-white',
    metricValues: ['text-gray-700', 'text-gray-600', 'text-gray-500'],
  },
};

const DEFAULT_COLOR_SCHEME = COLOR_SCHEME_MAP.gray;

function getColorScheme(exp: ExperienceType): ColorScheme {
  return COLOR_SCHEME_MAP[exp.colorScheme ?? ''] ?? DEFAULT_COLOR_SCHEME;
}

const isCurrentRole = (range: string) => range.includes('Present');

export default function Experience({ experiences }: ExperienceProps) {
  const [activeTab, setActiveTab] = useState('featured');

  // Sort experiences by date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const getYear = (range: string) => parseInt(range.split('—')[0].trim());
    return getYear(b.range) - getYear(a.range);
  });

  // Featured experiences — driven by the `featured` flag in data
  const featuredExperiences = sortedExperiences.filter((exp) => exp.featured);

  return (
    <section data-analytics-section="experience" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-semibold mb-12">Professional Experience</h2>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              aria-selected={activeTab === 'featured'}
              role="tab"
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
              aria-selected={activeTab === 'all'}
              role="tab"
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
              aria-selected={activeTab === 'enterprise'}
              role="tab"
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
              Enterprise ({sortedExperiences.length})
            </button>
          </div>
        </div>

        {/* Featured Tab */}
        {activeTab === 'featured' && (
          <div className="space-y-8">
            {featuredExperiences.length === 0 && (
              <p className="text-gray-500">No featured experiences configured.</p>
            )}
            {featuredExperiences.map((exp, index) => {
              const cs = getColorScheme(exp);
              return (
                <div key={index} className={`p-8 rounded-xl ${cs.gradient}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-3xl font-semibold">{exp.company}</h3>
                    {isCurrentRole(exp.range) && (
                      <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full font-medium">
                        Current
                      </span>
                    )}
                    {exp.badge && (
                      <span className={`px-3 py-1 ${cs.badge} text-xs rounded-full font-medium`}>
                        {exp.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xl text-gray-700 mb-2">{exp.role}</p>
                  <p className="text-sm text-gray-600 mb-4">{exp.range}</p>
                  <p className="text-gray-700 leading-relaxed mb-6">{exp.summary}</p>

                  {/* Key metrics */}
                  {exp.metrics && exp.metrics.length > 0 && (
                    <div
                      className={`${
                        exp.metrics.length <= 2 ? 'grid grid-cols-2' : 'grid md:grid-cols-3'
                      } gap-4 text-center mb-6`}
                    >
                      {exp.metrics.map((metric, i) => (
                        <div key={i} className="bg-white p-4 rounded-lg">
                          <p className={`text-2xl font-bold ${cs.metricValues[i % cs.metricValues.length]}`}>
                            {metric.value}
                          </p>
                          <p className="text-xs text-gray-600">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* All Experience Tab */}
        {activeTab === 'all' && (
          <div className="space-y-8">
            {sortedExperiences.map((exp, index) => {
              const cs = getColorScheme(exp);
              return (
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
                              <div
                                className={`absolute -left-[26px] w-3 h-3 rounded-full ${cs.dot} border-2 border-white`}
                              ></div>
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

                    {/* Technology tags */}
                    {exp.tags && exp.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className={`px-3 py-1 rounded text-xs ${cs.tag}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Enterprise Tab */}
        {activeTab === 'enterprise' && (
          <>
            <p className="text-sm text-gray-500 mb-8">Large-scale technology companies and entrepreneurial ventures</p>
            <div className="grid md:grid-cols-2 gap-6">
              {sortedExperiences.map((exp, index) => {
                const cs = getColorScheme(exp);
                return (
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
                      {exp.badge && (
                        <span className={`px-2 py-1 ${cs.badge} text-xs rounded`}>{exp.badge}</span>
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
                              <span className="font-medium">•</span> {role.title}{' '}
                              <span className="text-gray-400">({role.range})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
