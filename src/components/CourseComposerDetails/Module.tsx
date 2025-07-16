const Module = () => {
  const courseData = {
    title: 'Real Estate Fundamentals: A Complete Course',
    modules: [
      {
        id: 'module1',
        title: 'Module 1: Introduction to Real Estate',
        description:
          "Real estate is more than just buying and selling properties—it's about understanding markets, legalities, finance, and the art of negotiation...",
        lessons: [
          {
            id: 'lesson1.1',
            title: 'Lesson 1.1: What is Real Estate?',
            description:
              'Real estate encompasses land and anything permanently attached to it...',
            subtopics: [
              {
                id: 'subtopic1.1.1',
                title: 'Subtopic 1.1.1: Categories of Real Estate',
                description:
                  'The main categories are residential, commercial, industrial, and land...',
                details: [
                  {
                    id: 'detail1.1.1.1',
                    title: 'Detail 1.1.1.1: Residential Real Estate',
                    description:
                      'Residential includes single-family homes, condos, and apartments...',
                    examples: [
                      {
                        id: 'example1.1.1.1.1',
                        title: 'Example 1.1.1.1.1: Renting vs Owning a Home',
                        description:
                          'Understanding the benefits and drawbacks of renting versus owning...',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'module2',
        title: 'Module 2: Real Estate Markets and Economics',
        description:
          "This module explores how market dynamics influence real estate pricing...",
        lessons: [],
      },
    ],
  };


  return (
    <div className="h-[80vh] w-full bg-white rounded-lg flex flex-col md:flex-row shadow-lg overflow-hidden mt-5 max-w-[1200px]">

      {/* Content */}
      <div className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto custom-scrollbar">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          {courseData.title}
        </h1>

        {courseData.modules.map((module) => (
          <div key={module.id} id={module.id} className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
              {module.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {module.description}
            </p>

            {module.lessons.map((lesson) => (
              <div key={lesson.id} id={lesson.id} className="mb-6 ml-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                  {lesson.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {lesson.description}
                </p>

                {lesson.subtopics.map((subtopic) => (
                  <div key={subtopic.id} id={subtopic.id} className="mb-4 ml-4">
                    <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-2">
                      {subtopic.title}
                    </h4>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {subtopic.description}
                    </p>

                    {subtopic.details.map((detail) => (
                      <div key={detail.id} id={detail.id} className="mb-3 ml-4">
                        <h5 className="text-sm sm:text-base font-bold text-gray-800 mb-1">
                          {detail.title}
                        </h5>
                        <p className="text-gray-700 leading-relaxed mb-2">
                          {detail.description}
                        </p>

                        {detail.examples.map((example) => (
                          <div key={example.id} id={example.id} className="mb-2 ml-4">
                            <h6 className="text-sm font-bold text-gray-800 mb-1">
                              {example.title}
                            </h6>
                            <p className="text-gray-700 leading-relaxed">
                              {example.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #888 #f1f1f1;
        }
      `}</style>
    </div>
  );
};

export default Module;
