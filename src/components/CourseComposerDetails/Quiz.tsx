
export default function Quiz() {
  const quizData = [
    {
      title: 'Quiz 1: Real Estate Basics',
      questions: [
        {
          id: 1,
          question: 'What is the equity in real state?',
          options: [
            'A. To showcase the agent\'s photography skills.',
            'B. To build trust and create a personal connection',
            'C. To meet a legal requirement for online advertising.',
            'D. To fill empty space on the \'About Me\' page.',
          ],
          answer: 'D',
        },
        {
          id: 2,
          question: 'Which of the following is a benefit of real estate investing?',
          options: [
            'A. Unlimited liability',
            'B. Depreciation tax advantages',
            'C. No maintenance responsibilities',
            'D. To fill empty space on the \'About Me\' page.'
          ],
          answer: 'B',
        },
      ],
    },
    {
      title: 'Quiz 2: Real Estate Terminology',
      questions: [
        {
          id: 1,
          question: 'What is an appraisal?',
          options: [
            'A. A home inspection',
            'B. An estimate of a property\'s value',
            'C. A legal document',
            'D. A renovation plan',
          ],
          answer: 'B',
        },
        {
          id: 2,
          question: 'What does "escrow" refer to?',
          options: [
            'A. To showcase the agent\'s photography skills.',
            'B. To build trust and create a personal connection',
            'C. To meet a legal requirement for online advertising.',
          ],
          // The image does not provide an answer for this question, so leaving it undefined.
          // In a real application, you would have the correct answer here.
          answer: undefined,
        },
      ],
    },
  ];
  

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans shadow-lg">
      <div className="w-full max-w-2xl bg-white rounded-lg">
        {quizData.map((quiz, quizIndex) => (
          <div key={quizIndex} className="mb-8 p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
              {quiz.title}
            </h2>
            {quiz.questions.map((q) => (
              <div key={q.id} className="mb-6">
                <p className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
                  {q.id}. {q.question}
                </p>
                <ul className="space-y-2">
                  {q.options.map((option, optionIndex) => (
                    <li key={optionIndex} className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {option}
                    </li>
                  ))}
                </ul>
                {q.answer && (
                  <p className="text-gray-900 font-bold mt-4 text-sm sm:text-base">
                    Answer: {q.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
