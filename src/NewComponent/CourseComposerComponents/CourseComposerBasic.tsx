import { useEffect, useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { HiChevronRight } from 'react-icons/hi';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Link, useNavigate } from 'react-router-dom';

interface HistoryItem {
  id: number;
  title: string;
  skills: string;
  time: string;
}

const sampleData: HistoryItem[] = [
  {
    id: 1,
    title: 'Real Estate Agent',
    skills: `Lead Generation, Administrative Support, Real Estate, Office Management, Real Estate Sales, Value Propositions, Property and Real Estate, Sales Process, Customer Relationship Building, Real Estate Transactions, Customer Acquisition Management`,
    time: 'Today 10:00am',
  },
  {
    id: 2,
    title: 'Real Estate Agent',
    skills: `Lead Generation, Administrative Support, Real Estate, Office Management, Real Estate Sales, Value Propositions, Property and Real Estate, Sales Process, Customer Relationship Building, Real Estate Transactions, Customer Acquisition Management`,
    time: 'Today 10:00am',
  },
  {
    id: 3,
    title: 'Real Estate Agent',
    skills: `Lead Generation, Administrative Support, Real Estate, Office Management, Real Estate Sales, Value Propositions, Property and Real Estate, Sales Process, Customer Relationship Building, Real Estate Transactions, Customer Acquisition Management`,
    time: 'Today 10:00am',
  },
];

const CourseComposerBasic: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const navigate = useNavigate();
  const handleStartNew = () => {
    navigate('/dashboard/coursecomposer/1');
  };
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setHistory(sampleData);
  }, []);

  useEffect(() => {
    if (transcript) {
      setInputValue(transcript);
    }
  }, [transcript]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue('');
      resetTranscript();
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleVoiceClick = () => {
    if (!browserSupportsSpeechRecognition) {
      alert('Your browser does not support speech recognition.');
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: false, language: 'en-US' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-1">
            Command Your Creative Process
          </h2>
          <h2 className="text-xl sm:text-2xl font-bold">
            With <span className="text-[#6C4EC8]">AI</span> Studios.
          </h2>
        </div>

        {/* Input Area */}
        <div className="w-full mb-6">
          <div className="relative bg-white border border-gray-300 rounded-xl p-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <input
                type="text"
                placeholder="Describe what you want to see"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow bg-transparent text-black placeholder-gray-500 outline-none text-base sm:text-lg px-2"
              />
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  className={`text-gray-500 hover:text-black ${
                    listening ? 'animate-pulse text-red-500' : ''
                  }`}
                  onClick={handleVoiceClick}
                >
                  <FaMicrophone className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button onClick={handleStartNew} className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm sm:text-base whitespace-nowrap">
                  Generate
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-[#F0F0F0] text-gray-700 rounded-md px-3 py-1 flex items-center text-sm"
                >
                  {tag}
                  <button
                    className="ml-1 hover:text-red-500"
                    onClick={() => handleRemoveTag(index)}
                  >
                    <IoMdClose className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* History */}
        <div className="w-full">
          <h3 className="text-xl font-semibold mb-4">History</h3>
          <div className="space-y-4">
            {history.map((item, index) => (
             <Link to="/dashboard/coursecomposer/:id">
              <div key={item.id} className="hover:scale-105 transition-all ease-in-out delay-300   p-4 mb-3 rounded-lg border border-gray-200 hover:shadow-md  duration-200 bg-white no-underline text-inherit">
                <p className="text-base sm:text-lg font-medium mb-2">
                  {index + 1}. {item.title}
                </p>
                <p className="text-gray-500 text-sm mb-2 line-clamp-2">
                  Skills you'll gain: {item.skills}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <a href="#" className="text-black underline">
                    Read More
                  </a>
                  <span>{item.time}</span>
                </div>
                <hr className="mt-2" />
              </div>
             </Link>
            ))}
          </div>

          {/* See More Button */}
          <div className="text-center mt-6">
            <Link to="/dashboard/coursecomposer/:id"> 
            <button className="text-black hover:underline text-base sm:text-lg flex items-center justify-center mx-auto">
              See More
              <HiChevronRight className="w-5 h-5 ml-1" />
            </button>
            </Link>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseComposerBasic;
