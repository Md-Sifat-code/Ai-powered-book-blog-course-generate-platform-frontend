

const BookgenieModule = () => {
  const courseData = {
    title: "Real Estate Fundamentals: A Complete Course",
    modules: [
      {
        id: "module1",
        title: "Digital Marketing & Lead",
        description:
          "Real estate is more than just buying and selling properties—it's about understanding markets, legalities, finance, and the art of negotiation...",
        lessons: [
          {
            id: "lesson1.1",
            title: "Lesson 1.1: What is Real Estate?",
            description:
              "Real estate encompasses land and anything permanently attached to it...",
            subtopics: [
              {
                id: "subtopic1.1.1",
                title: "Subtopic 1.1.1: Categories of Real Estate",
                description:
                  "The main categories are residential, commercial, industrial, and land...",
                details: [
                  {
                    id: "detail1.1.1.1",
                    title: "Detail 1.1.1.1: Residential Real Estate",
                    description:
                      "Residential includes single-family homes, condos, and apartments...",
                    examples: [
                      {
                        id: "example1.1.1.1.1",
                        title: "Example 1.1.1.1.1: Renting vs Owning a Home",
                        description:
                          "Understanding the benefits and drawbacks of renting versus owning...",
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
        id: "module2",
        title: "Real Estate Markets and Economics",
        description:
          "This module explores how market dynamics influence real estate pricing...",
        lessons: [
          {
            id: "lesson2.1",
            title: "Lesson 2.1: Market Trends",
            description: "Understanding how supply and demand affect real estate prices.",
            subtopics: [],
          },
        ],
      },
    ],
  };

  return (
    <div className="h-[80vh] w-full rounded-lg flex flex-col md:flex-row overflow-hidden">
      <div className="flex-1 min-w-0 p-6 overflow-y-auto custom-scrollbar">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {courseData.title}
        </h1>

        {courseData.modules.map((module) => (
          <div key={module.id} className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {module.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {module.description}
            </p>

            {module.lessons.length > 0 ? (
              module.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="mb-6 pl-4 border-l-2 border-gray-200"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {lesson.title}
                  </h3>
                  <p className="text-gray-700 mb-3">{lesson.description}</p>

                  {lesson.subtopics.length > 0 ? (
                    lesson.subtopics.map((subtopic) => (
                      <div
                        key={subtopic.id}
                        className="mb-4 pl-4 border-l-2 border-gray-200"
                      >
                        <h4 className="text-lg font-semibold text-gray-800 mb-1">
                          {subtopic.title}
                        </h4>
                        <p className="text-gray-700 mb-2">{subtopic.description}</p>

                        {subtopic.details.map((detail) => (
                          <div
                            key={detail.id}
                            className="mb-3 pl-4 border-l-2 border-gray-200"
                          >
                            <h5 className="text-base font-semibold text-gray-800 mb-1">
                              {detail.title}
                            </h5>
                            <p className="text-gray-700 mb-2">
                              {detail.description}
                            </p>

                            {detail.examples.map((example) => (
                              <div
                                key={example.id}
                                className="mb-2 pl-4 border-l-2 border-gray-200"
                              >
                                <h6 className="text-sm font-semibold text-gray-800 mb-1">
                                  {example.title}
                                </h6>
                                <p className="text-gray-700">
                                  {example.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No subtopics available.</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No lessons available.</p>
            )}
          </div>
        ))}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #bbb;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #888;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #bbb #f1f1f1;
        }
      `}</style>
    </div>
  );
};

export default BookgenieModule;
