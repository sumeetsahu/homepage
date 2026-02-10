export default function EarlyInitiatives() {
  const initiatives = [
    {
      name: "DialAuto.com",
      tagline: "SMS-Based Auto-Rickshaw Booking",
      year: "2010",
      description: "Launched in 2010, this service bridged the digital divide in urban India by allowing commuters to book auto-rickshaws (three-wheeled \"tuk-tuk\" taxis) via SMS. It provided a high-tech dispatch solution for users without smartphones or reliable mobile data. The platform aimed to formalize a fragmented market, ensuring predictable ride-hailing for passengers and steady demand for drivers years before the widespread adoption of modern ride-sharing apps like Uber or Ola.",
      icon: "🛺",
      status: "Early Stage Initiative",
      tags: ["SMS Gateway", "Urban Mobility", "Pre-Smartphone Era"]
    },
    {
      name: "ShareTheRide.in",
      tagline: "Corporate Carpooling Platform",
      year: "2010",
      description: "This was an intuitive ride-sharing portal designed specifically for daily office commutes, initially launched for employees at CA Technologies (now Broadcom) in Hyderabad. The platform helped users find colleagues or professionals from reputable companies for carpooling or bike-sharing. To solve for safety and trust, the service included a verification system to ensure users were active employees of recognized organizations, focusing on reducing commuting costs and traffic congestion through a secure professional community.",
      icon: "🚗",
      status: "Early Stage Initiative",
      tags: ["Carpooling", "Employee Verification", "Sustainability"]
    }
  ];

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-2">Early Entrepreneurial Initiatives</h2>
          <p className="text-gray-600">
            Experimental ventures exploring mobility and community solutions in India's emerging tech landscape
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
            <span className="font-semibold">Learning Journey:</span> These early-stage initiatives explored innovative solutions 
            for India's mobility challenges during the pre-smartphone era. While they didn't scale to full launch, the experience 
            of building user-centric products informed the successful development of <span className="font-semibold">myPNRstatus</span>, 
            which reached 600,000 users and operated for 6 years.
          </p>
        </div>
      </div>
    </section>
  );
}
