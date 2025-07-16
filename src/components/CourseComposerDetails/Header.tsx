import { useState } from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import { CiTextAlignJustify } from "react-icons/ci";
import SocialShareMenu from "./SocialShareMenu";
import DocumentOptionsMenu from "./DocumentOptionsMenu";

const Header = () => {
  const [activeTab, setActiveTab] = useState<string>("Module");
  const [menuVisible, setMenuVisible] = useState<"share" | "download" | null>(null);

  const toggleMenu = (menu: "share" | "download") => {
    setMenuVisible((prev) => (prev === menu ? null : menu));
  };

  return (
    <div className="w-full bg-white rounded-none shadow-sm px-2 sm:px-4 lg:px-6 py-2 font-sans relative z-10">
      {/* Main header content */}
      <div className="w-full max-w-full flex flex-col sm:flex-row items-center justify-between relative z-20">
        {/* Left Section: Title */}
        <div className="flex items-center mb-2 sm:mb-0 text-center sm:text-left w-full sm:w-auto">
          <CiTextAlignJustify className="me-3 text-2xl text-gray-700" />
          <span className="text-gray-900 font-semibold text-base sm:text-lg lg:text-xl whitespace-nowrap overflow-hidden text-ellipsis">
            Real Estate Fundamentals: Real Estate Basics
          </span>
        </div>

        {/* Middle Section: Tabs */}
        <div className="flex bg-gray-200 rounded-lg p-1 mb-2 sm:mb-0 sm:mx-4">
          {["Question", "Module", "Quiz"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-md text-sm sm:text-base font-medium transition-colors duration-200 ${
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

        {/* Right Section: Icons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            className="p-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700"
            aria-label="Download"
            onClick={() => toggleMenu("download")}
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
            className="text-gray-700 hover:bg-gray-200 rounded-full p-2 text-2xl focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Share"
            onClick={() => toggleMenu("share")}
          >
            <IoShareSocialOutline />
          </button>
        </div>
      </div>

      {/* Conditionally render menus below header */}
      {menuVisible === "share" && (
        <div className="absolute top-8 mt-2 z-30 right-4 sm:right-6 max-w-xs sm:max-w-sm lg:max-w-mdrounded">
          <SocialShareMenu />
        </div>
      )}

    {menuVisible === "download" && (
  <div className="absolute top-8 mt-2 z-30 right-4 sm:right-6 max-w-xs sm:max-w-sm lg:max-w-md rounded">
    <DocumentOptionsMenu />
  </div>
)}

    </div>
  );
};

export default Header;
