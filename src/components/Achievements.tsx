export default function Achievements() {
  const achievements = [
    {
      title: "GenAI Developer Platform",
      company: "Intuit",
      impact: "8,000+ developers, 50% productivity improvement",
      description: "Pioneered enterprise-wide GenAI code generation initiative, transforming SDLC for thousands of developers",
      icon: "🚀",
      color: "from-green-500 to-blue-500"
    },
    {
      title: "Financial System Optimization",
      company: "Amazon",
      impact: "$600K annual savings, 1.5B daily transactions",
      description: "Redesigned allocation system using Apache Beam, reducing costs by 60% while processing billions of transactions",
      icon: "💰",
      color: "from-orange-500 to-yellow-500"
    },
    {
      title: "myPNRstatus Platform",
      company: "Startup",
      impact: "600K users, 6 years of impact",
      description: "Founded and scaled automated travel alert service for Indian Railways from zero to 600,000 users",
      icon: "🎯",
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Multi-Cloud Orchestration",
      company: "Adobe",
      impact: "Millions of users across Adobe Experience Cloud",
      description: "Architected Gyarados, central async service platform syncing digital assets in multi-cloud containerized environment",
      icon: "☁️",
      color: "from-red-500 to-pink-500"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-semibold mb-4">Key Achievements</h2>
        <p className="text-gray-600 mb-12">Measurable impact across enterprise and startup environments</p>
        
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
