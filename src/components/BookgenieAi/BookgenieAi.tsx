// src/components/BookgenieAi.tsx
import React, { useState } from "react";
import { CiTextAlignJustify } from "react-icons/ci";
import { IoShareSocialOutline } from "react-icons/io5";
import BookgenieModule from "./BookgenieModule"; // For the book outline content
import BookgenieQuiz from "./BookgenieQuiz"; // Placeholder for your quiz component
import BookgenieSocialShareMenu from "./BookgenieSocialShareMenu"; // For the share dropdown
import BookDocumentOptionMenu from "./BookDocumentOptionMenu"; // For the download dropdown
import { MdKeyboardDoubleArrowLeft } from "react-icons/md"; // This icon will now be used here
import { LiaArrowLeftSolid } from "react-icons/lia";
import { FiDownload } from "react-icons/fi";

interface BookgenieAiProps {
  isMobileView?: boolean; // New prop to indicate mobile view
  onBackClick?: () => void; // New prop for back button functionality
}

const BookgenieAi: React.FC<BookgenieAiProps> = ({
  isMobileView = false,
  onBackClick,
}) => {
  // Dummy data for the sidebar module list
  const courseData = {
    title: "Real Estate Fundamentals: A Complete Course",
    modules: [
      {
        id: "module1",
        title: "Digital Marketing & Lead ",
        description:
          "Real estate is more than just buying and selling properties—it's about understanding markets, legalities, finance, and the art of negotiation...",
        lessons: [
          {
            id: "lesson1.1",
            title: "Lesson 4.1: Building Your Online Presence",
            description:
              "Understanding the importance of a strong online presence in real estate.",
          },
          {
            id: "lesson1.2",
            title: "Lesson 4.2: Social Media Strategies",
            description:
              "Leveraging social media platforms for lead generation.",
          },
          {
            id: "lesson1.3",
            title:
              "Lesson 4.3: Search Engine Optimization (SEO) for Real Estate",
            description: "Optimizing your content for search engines.",
          },
          {
            id: "lesson1.4",
            title: "Lesson 4.4: Email Marketing Campaigns",
            description:
              "Building and nurturing client relationships through email.",
          },
        ],
      },
      {
        id: "module2",
        title: "Module 2: Real Estate Finance",
        description: "Dive into the financial aspects of real estate...",
        lessons: [
          {
            id: "lesson2.1",
            title: "Lesson 2.1: Understanding Mortgages",
            description: "Types of mortgages and their implications.",
          },
        ],
      },
      // Add more modules as needed for your sidebar
    ],
  };

  const [activeTab, setActiveTab] = useState<string>("Book"); // Set 'Book' as default for demonstration
  const [menuVisible, setMenuVisible] = useState<"share" | "download" | null>(
    null
  );

  const toggleMenu = (menu: "share" | "download") => {
    setMenuVisible((prev) => (prev === menu ? null : menu));
  };

  const [isModuleListVisible, setIsModuleListVisible] = useState(true);
  const toggleModuleListVisibility = () =>
    setIsModuleListVisible(!isModuleListVisible);

  // Control Sidebar visibility based on activeTab
  const isSidebarVisible = activeTab === "Book";
  // Control secondary header visibility based on activeTab
  const isSecondaryHeaderVisible = activeTab === "Book";

  return (
    <div className="flex flex-col  min-h-screen bg-white">
      {/* Main Header */}
      <div className="bg-white shadow  lg:px-6  lg:p-1.5 font-sans relative z-10">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center mb-2 sm:mb-0 w-full sm:w-auto">
            {/* Conditional back button for mobile */}
            {isMobileView && (
              <button
                onClick={onBackClick} // Use the new onBackClick prop
                className="p-1 text-gray-700 hover:bg-gray-200 rounded-full "
                aria-label="Go back to card"
              >

                <LiaArrowLeftSolid className="text-2xl" />

              </button>
            )}
            <CiTextAlignJustify className=" hidden sm:inline text-xl text-gray-700" />
            <span className="text-base hidden sm:inline truncate">
              Real Estate Fundamentals: Real Estate Basics
            </span>
          </div>

          <div className="flex  bg-gray-200 rounded-lg p-1 mb-2 mr-2 w-full sm:w-auto">

            {["Book Cover", "Book"].map((tab) => (
              <button
                key={tab}
                className={`px-3 py-1.5 sm:px-2 sm:py-2 rounded-md text-xs sm:text-base transition-colors duration-200 ${
                  activeTab === tab
                    ? "bg-white shadow text-gray-900"
                    : "text-gray-700 hover:bg-gray-300"
                }`}

                onClick={() => setActiveTab(tab)}
                aria-pressed={activeTab === tab}
              >
                {tab}
              </button>
            ))}
          </div>


          <div className="flex items-center justify-center  gap-3 space-x-2 sm:space-x-3">
            {/* Download Button */}
            <button
              className="p-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700"
              aria-label="Download"
              onClick={() => toggleMenu("download")}
            >

              <FiDownload className="text-2xl" />

            </button>

            {/* Share Button */}
            <button
              className="text-gray-700 hover:bg-gray-200 rounded-full p-1 text-xl focus:outline-none "
              aria-label="Share"
              onClick={() => toggleMenu("share")}
            >

              <IoShareSocialOutline className="text-2xl" />

            </button>
          </div>
        </div>

        {/* Share Menu Dropdown */}
        {menuVisible === "share" && (
          <div className="absolute top-full right-4 sm:right-6 mt-2 z-30">
            <BookgenieSocialShareMenu />
          </div>
        )}

        {/* Download Menu Dropdown */}
        {menuVisible === "download" && (
          <div className="absolute top-full right-4 sm:right-6 mt-2 z-30">
            <BookDocumentOptionMenu />
          </div>
        )}
      </div>

      {/* Secondary Header (Editor Toolbar) - Visible only when 'Book' tab is active */}
      {isSecondaryHeaderVisible && (
        <div className="bg-white border-b border-t border-gray-200 md:px-4 py-2 flex items-center justify-between z-10 text-sm">
          <div className="flex items-center space-x-0">
            {" "}
            {/* Changed space-x-2 to space-x-0 */}
            {/* Undo/Redo Buttons */}
            <button
              className="p-1 rounded hover:bg-gray-100 text-gray-700 h-7 w-7 flex items-center justify-center" // Adjusted size and hover
              aria-label="Undo"
              title="Undo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                {" "}
                {/* Smaller icon */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
            </button>
            <button
              className="p-1 rounded hover:bg-gray-100 text-gray-700 h-7 w-7 flex items-center justify-center" // Adjusted size and hover
              aria-label="Redo"
              title="Redo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                {" "}
                {/* Smaller icon */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"
                />
              </svg>
            </button>
            {/* Vertical Divider */}
            <div className="w-px bg-gray-300 h-5 mx-2"></div> {/* Divider */}
          </div>


          <div className="flex items-center space-x-0">
            {" "}
            {/* Changed space-x-2 to space-x-0 */}

            <div className="w-px bg-gray-300 h-5 mx-2"></div> {/* Divider */}
            {/* Heading Selector */}
            <select
              className="
             text-gray-700 text-sm bg-white focus:ring-blue-500 focus:border-blue-500 " // Adjusted padding, height
              aria-label="Select Heading"
            >
              <option value="heading1">Heading 1</option>
              <option value="heading2">Heading 2</option>
              <option value="heading3">Heading 3</option>
              <option value="paragraph">Paragraph</option>
            </select>
            {/* Vertical Divider */}
            <div className="w-px bg-gray-300 h-5 mx-2"></div> {/* Divider */}
            {/* Formatting Buttons (Bold, Italic, Underline, Bullet List) */}
            <button
              className="p-1 rounded hover:bg-gray-100 text-gray-700 font-bold h-7 w-7 flex items-center justify-center" // Adjusted size and hover
              aria-label="Bold"
              title="Bold"
            >
              B
            </button>
            <button
              className="p-1 rounded hover:bg-gray-100 text-gray-700 italic h-7 w-7 flex items-center justify-center" // Adjusted size and hover
              aria-label="Italic"
              title="Italic"
            >
              I
            </button>
            <button
              className="p-1 rounded hover:bg-gray-100 text-gray-700 underline h-7 w-7 flex items-center justify-center" // Adjusted size and hover
              aria-label="Underline"
              title="Underline"
            >
              U
            </button>
            <button
              className="p-1 rounded hover:bg-gray-100 text-gray-700 md:h-7 md:w-7 flex items-center justify-center" // Adjusted size and hover
              aria-label="Bullet List"
              title="Bullet List"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                {" "}
                {/* Smaller icon */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 10.5h12M8.25 14.25h12m-12 4.5h12M3.75 6.75h.007v.007H3.75zm.007 3.75H3.75v.007h.007zm.007 3.75H3.75v.007h.007zm.007 4.5H3.75v.007h.007z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Main Layout - Grid instead of flex, responsive for all devices */}
      <div className=" grid grid-cols-[auto_1fr]  ">
        {/* Sidebar - Only visible when "Book" tab is selected */}
        {isSidebarVisible && (
          <div

            className={`transition-all duration-300 bg-white text-[#333333] md:h-full h-[84%] absolute md:relative overflow-y-auto custom-scrollbar  p-2 sm:p-4  ${
              isModuleListVisible ? "w-54" : "w-14"
            } `}

          >
            {/* This button is for toggling the sidebar, not for "back" */}
            <button
              className={`flex items-center justify-center p-2 rounded hover:bg-gray-200 transition ${
                isModuleListVisible ? "ml-auto" : "mx-auto"
              }`}
              onClick={toggleModuleListVisibility}
              aria-label={
                isModuleListVisible ? "Collapse sidebar" : "Expand sidebar"
              }
            >
              <MdKeyboardDoubleArrowLeft
                className={`text-xl ${isModuleListVisible ? "" : "rotate-180"}`}
              />
            </button>

            {/* Module header - Adjust visibility based on sidebar state */}
            <div
              className={`flex items-center mb-4 mt-2 w-full text-left focus:outline-none ${
                isModuleListVisible ? "" : "justify-center"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 text-gray-700 ${
                  isModuleListVisible ? "mr-2" : ""
                } flex-shrink-0`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 10.5h12M8.25 14.25h12m-12 4.5h12M3.75 6.75h.007v.007H3.75zm.007 3.75H3.75v.007h.007zm.007 3.75H3.75v.007h.007zm.007 4.5H3.75v.007h.007z"
                />
              </svg>
              {isModuleListVisible && (
                <span className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                  Module: 1
                </span>
              )}
            </div>

            {/* Module list - Only visible when expanded */}
            {isModuleListVisible && (
              <ul className="space-y-2">
                {courseData.modules.map((module) => (
                  <li key={module.id} className="text-gray-700 text-sm">
                    <a
                      href={`#${module.id}`}
                      className="block font-semibold rounded-md hover:bg-blue-100 hover:text-blue-700 py-1 px-2"
                    >
                      {module.title}
                    </a>
                    {module.lessons?.length > 0 && (
                      <ul className="mt-1 space-y-1 pl-4">
                        {module.lessons.map((lesson) => (
                          <li key={lesson.id} className="text-gray-600 text-sm">
                            <a
                              href={`#${lesson.id}`}
                              className=" rounded-md hover:bg-blue-100 hover:text-blue-700 py-1 px-2"
                            >
                              {lesson.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Content Area */}
        <div className="overflow-y-auto  sm:p-4 ml-8 md:ml-0">
          {activeTab === "Book Cover" && <BookgenieQuiz />}
          {activeTab === "Book" && <BookgenieModule />}
        </div>
      </div>
    </div>
  );
};

export default BookgenieAi;
// sss
