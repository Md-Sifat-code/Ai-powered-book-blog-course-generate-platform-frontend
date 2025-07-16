import { useState } from 'react';
import { CiTextAlignJustify } from 'react-icons/ci';
import { IoShareSocialOutline } from 'react-icons/io5';
import SocialShareMenu from './SocialShareMenu';
import DocumentsOptionsMenu from './DocumentOptionsMenu';
import Module from './Module';
import Quiz from './Quiz';
import { GoArrowLeft } from 'react-icons/go';

const CourseModule = ({ onClose }: { onClose?: () => void }) => {
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

  const [isModuleListVisible, setIsModuleListVisible] = useState(true);
  const toggleModuleListVisibility = () => setIsModuleListVisible(!isModuleListVisible);

  const [activeTab, setActiveTab] = useState<string>('Module');
  const [menuVisible, setMenuVisible] = useState<'share' | 'download' | null>(null);

  const toggleMenu = (menu: 'share' | 'download') => {
    setMenuVisible((prev) => (prev === menu ? null : menu));
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden">

      {/* Removed the outer back arrow here */}

      {/* header start */}
      <div className="w-full bg-white shadow-sm px-2 sm:px-1 lg:px-6 py-2 font-sans relative z-10">
        <div className="w-full flex flex-col sm:flex-row md:justify-between lg:justify-between gap-y-2 sm:gap-y-0">
          {/* Mobile: back arrow + icon + title in one row */}
          <div className="w-full sm:w-auto">
            <div className="flex items-center md:hidden">
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-200 transition mr-2"
                aria-label="Back"
              >
                <div className='p-2 border-1'>
                  <GoArrowLeft className="text-xl sm:text-2xl text-gray-700" />
                </div>
              </button>
              {/* <CiTextAlignJustify className="me-2 text-xl sm:text-2xl text-gray-700" /> */}
              <span className="text-gray-900 font-semibold text-sm sm:text-base lg:text-lg truncate">
                Real Estate Fundamentals
              </span>
            </div>

            {/* Desktop and tablet: only icon + title, no back arrow */}
            <div className="hidden md:flex items-center">
              <CiTextAlignJustify className="me-2 text-xl sm:text-2xl text-gray-700" />
              <span className="text-gray-900 font-semibold text-sm sm:text-base lg:text-lg truncate">
                Real Estate Fundamentals
              </span>
            </div>
          </div>

          <div className="flex flex-nowrap justify-center sm:justify-start bg-gray-200 rounded-lg p-1 text-sm">
            {['Question', 'Module', 'Quiz'].map((tab) => (
              <button
                key={tab}
                className={`px-2 py-1 sm:px-4 sm:py-2 rounded-md font-medium transition-colors ${activeTab === tab
                    ? 'bg-white shadow text-gray-900'
                    : 'text-gray-700 hover:bg-gray-300'
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-1 sm:space-x-3">
            <button
              className="p-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700"
              aria-label="Download"
              onClick={() => toggleMenu('download')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </button>

            <button
              className="text-gray-700 hover:bg-gray-200 rounded-full p-2 text-xl sm:text-2xl focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Share"
              onClick={() => toggleMenu('share')}
            >
              <IoShareSocialOutline />
            </button>
          </div>
        </div>

        {menuVisible === 'share' && (
          <div className="absolute lg:top-8 mt-2 z-30 right-4 sm:right-6 max-w-xs sm:max-w-sm lg:max-w-md rounded">
            <SocialShareMenu />
          </div>
        )}

        {menuVisible === 'download' && (
          <div className="absolute lg:top-8 mt-2 z-30 right-4 sm:right-6 max-w-xs sm:max-w-sm lg:max-w-md rounded">
            <DocumentsOptionsMenu />
          </div>
        )}
      </div>
      {/* header end */}

      <div className="sm:relative w-full bg-white rounded-lg flex flex-col md:flex-row shadow-lg overflow-hidden mt-4 max-w-full min-h-[calc(100vh-120px)]">
        <div
          className={`bg-gray-50 p-2 sm:p-4 border-r border-gray-200 overflow-y-auto custom-scrollbar transition-all duration-300 ${isModuleListVisible ? 'w-full sm:w-1/3 md:w-1/4 lg:w-1/5' : 'w-14'
            }`}
        >
          <button
            className="flex items-center mb-4 w-full text-left focus:outline-none"
            onClick={toggleModuleListVisibility}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-700 mr-2 flex-shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 10.5h12M8.25 14.25h12m-12 4.5h12M3.75 6.75h.007v.007H3.75zm.007 3.75H3.75v.007h.007zm.007 3.75H3.75v.007h.007zm.007 4.5H3.75v.007h.007z"
              />
            </svg>
            {isModuleListVisible && (
              <span className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                Module
              </span>
            )}
          </button>

          {isModuleListVisible && (
            <ul className="space-y-2">
              {courseData.modules.map((module) => (
                <li key={module.id} className="text-gray-700 text-sm">
                  <a
                    href={`#${module.id}`}
                    className="block p-2 rounded-md hover:bg-blue-100 hover:text-blue-700"
                  >
                    {module.title}
                  </a>
                  {module.lessons?.length > 0 && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {module.lessons.map((lesson) => (
                        <li key={lesson.id} className="text-gray-600 text-sm">
                          <a
                            href={`#${lesson.id}`}
                            className="block p-2 rounded-md hover:bg-blue-100 hover:text-blue-700"
                          >
                            {lesson.title}
                          </a>
                          {lesson.subtopics?.length > 0 && (
                            <ul className="ml-4 mt-1 space-y-1">
                              {lesson.subtopics.map((subtopic) => (
                                <li key={subtopic.id} className="text-gray-500 text-xs">
                                  <a
                                    href={`#${subtopic.id}`}
                                    className="block p-2 rounded-md hover:bg-blue-100 hover:text-blue-700"
                                  >
                                    {subtopic.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex-1 p-2 sm:p-4 overflow-auto text-sm sm:text-base">
          {activeTab === 'Module' && <Module />}
          {activeTab === 'Quiz' && <Quiz />}
          {activeTab === 'Question' && (
            <div>
              <p>Question content goes here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseModule;
