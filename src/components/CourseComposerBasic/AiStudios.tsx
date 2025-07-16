import { FaMicrophone } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { HiChevronRight } from 'react-icons/hi';

const data = [
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

const AiStudios = () => {
  return (
    <div className="bg-black min-h-screen text-white px-4 py-6 md:px-20">
      {/* Heading */}
      <h1 className="text-3xl font-semibold mb-8 text-center">
        <span className="text-[#756BEE]">AI</span> Studios
      </h1>

      {/* Search Box */}
      <div className="bg-white text-black rounded-2xl p-4 shadow-md flex flex-col md:flex-row items-center gap-3 md:gap-4 max-w-5xl mx-auto mb-10">
        <textarea
          rows={4}
          placeholder="Describe what you want to see"
          className="flex-1 text-sm bg-transparent outline-none px-3 py-2 w-full resize-none"
        />
        <div className="flex items-center flex-wrap gap-2 w-full md:w-auto">
          <div className="flex items-center bg-[#F3F3F3] text-sm px-3 py-1 rounded-full">
            CourseComposer AI
            <IoMdClose className="ml-2 cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3 md:mt-0 w-full md:w-auto justify-between">
          <FaMicrophone className="text-gray-400 cursor-pointer" />
          <button className="bg-[#333] text-white px-5 py-2 rounded-lg text-sm hover:bg-[#444]">
            Generate
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={item.id} className="border-t border-gray-700 pt-4">
            <h2 className="text-gray-300 font-medium text-sm mb-1">
              {index + 1}. {item.title}
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed mb-2">
              Skills you’ll gain: {item.skills}...
            </p>
            <div className="flex justify-between items-center">
              <button className="text-xs text-gray-400 hover:underline">Read More</button>
              <span className="text-xs text-gray-500">{item.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* See More */}
      <div className="text-center mt-8">
        <button className="text-sm text-gray-400 hover:text-white flex items-center justify-center gap-1 mx-auto">
          See More <HiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default AiStudios;
