import { AchievementsData } from '../types';

interface AchievementsProps {
  data: AchievementsData;
}

export default function Achievements({ data }: AchievementsProps) {
  const { sectionTitle, sectionSubtitle, achievements } = data;

  return (
    <section data-analytics-section="achievements" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-semibold mb-4">{sectionTitle}</h2>
        <p className="text-gray-600 mb-12">{sectionSubtitle}</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition group"
            >
              <div className="flex items-start gap-4">
                <div className={`text-4xl p-3 rounded-lg bg-gradient-to-r ${achievement.color} bg-opacity-10`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{achievement.title}</h3>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">{achievement.company}</span>
                  </div>
                  <p className="text-sm font-medium text-blue-600 mb-3">{achievement.impact}</p>
                  <p className="text-gray-700 leading-relaxed">{achievement.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
