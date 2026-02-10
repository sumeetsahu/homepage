export default function Patents() {
  const patents = [
    {
      title: "Digital Media Environment for Removal of Interference Patterns from Digital Images",
      patentNumber: "US 10,134,113",
      issueDate: "November 20, 2018",
      assignee: "Adobe Inc.",
      icon: "🔬",
      summary: "Invented spatially-adaptive filtering techniques for removing interference patterns from digital images. The patent describes a novel approach where an edge detection system generates context data including distance from edges, color similarity, and luminance data to construct adaptive filters that effectively remove interference patterns while preserving image quality.",
      technicalAreas: [
        "Digital Image Processing",
        "Adaptive Filtering",
        "Pattern Recognition",
        "Computer Vision",
        "Edge Detection"
      ],
      impact: "Core technology for Adobe's PDF scanning and image cleanup solutions"
    }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-2">Patents & Publications</h2>
          <p className="text-gray-600">
            Technical innovations and intellectual property contributions
          </p>
        </div>
        
        <div className="space-y-6">
          {patents.map((patent, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-xl border border-blue-200 hover:border-blue-300 transition"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{patent.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full uppercase tracking-wide">
                      US Patent
                    </span>
                    <span className="text-sm text-blue-700 font-mono font-semibold">
                      {patent.patentNumber}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2 leading-tight">
                    {patent.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">Issued:</span>
                      <span>{patent.issueDate}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">Assignee:</span>
                      <span>{patent.assignee}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">Abstract</h4>
                <p className="text-gray-700 leading-relaxed">
                  {patent.summary}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">Technical Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {patent.technicalAreas.map((area, areaIndex) => (
                    <span 
                      key={areaIndex}
                      className="px-3 py-1 bg-white text-blue-700 text-xs font-medium rounded border border-blue-200"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-blue-100 border-l-4 border-blue-600 rounded">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">Impact:</span> {patent.impact}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Patent details available on{" "}
            <a 
              href="https://patents.google.com/patent/US10134113B1/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium underline"
            >
              Google Patents
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
