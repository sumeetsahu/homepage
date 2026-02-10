export default function Education() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-semibold mb-12">Education</h2>
        
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition max-w-3xl">
          <div className="flex items-start gap-4">
            <div className="text-5xl">🎓</div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                National Institute of Technology Karnataka
              </h3>
              <p className="text-lg text-gray-700 mb-1">Bachelor of Technology</p>
              <p className="text-md text-gray-600 mb-4">Electronics and Communication Engineering</p>
              <p className="text-sm text-gray-500 mb-4">2003 - 2007</p>
              
              <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-semibold text-blue-900">Premier Engineering Institution:</span> NITK is one of India's most prestigious engineering colleges, 
                  consistently ranked among the top tier engineering colleges in India and recognized for academic excellence 
                  and innovation in engineering education.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
