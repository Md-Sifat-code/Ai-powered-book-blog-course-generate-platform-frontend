import React, { useState, useEffect } from "react";
import { FaDownload, FaMicrophone } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import button1 from "../../assets/Button (1).png";

interface CourseModuleCardProps {
  buttonText?: string;
  title?: string;
  time?: string;
  description?: string;
  onOpen?: () => void;
}

const CourseModuleCard: React.FC<CourseModuleCardProps> = ({
  buttonText = "Make a course module",
  title = "Real Estate Course Module: Digital Marketing & Lead Generation",
  time = "May 25, 10:15 AM",
  description = `This module provides a solid foundation for real estate agents looking to enhance their digital marketing skills. You can use this as a template to generate detailed lesson content, quizzes, and assignments for each section using the AI Course Content Builder interface we discussed earlier!`,
  onOpen,
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setInputValue(transcript);
  }, [transcript]);

  const handleVoiceInput = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Browser does not support voice recognition.");
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({
        continuous: false,
        language: "en-US",
      });
    }
  };

  

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full min-h-screen bg-white text-black px-4 py-6 flex flex-col sm:px-6 md:px-8 lg:px-12">
      {/* Top Button */}
      <button className="w-full bg-[#F5F5F5] text-black font-medium py-3 rounded-md mb-5 text-sm sm:text-base md:text-lg lg:text-xl">
        {buttonText}
      </button>

      {/* Scrollable Content Area */}
      <div className="flex-grow overflow-auto">
        <p className="text-xs sm:text-sm md:text-base text-gray-800 mb-4 leading-relaxed">
          Here is a sample course module focusing on "Foreword: The AI
          Revolution – A Call for Foresight and Action." This module is designed
          to be comprehensive, with clear learning objectives and a breakdown
          into individual lessons.
        </p>

        {/* Module Card */}
        <div className="bg-[#F5F5F5] p-4 rounded-md mb-4 relative flex justify-between items-center">
          <div className="max-w-[70%] sm:max-w-[80%] md:max-w-[85%] lg:max-w-[90%]">
            <p className="font-medium text-xs sm:text-sm md:text-base">
              {title}
            </p>
            <p className="text-[9px] sm:text-xs md:text-sm text-gray-500">
              {time}
            </p>
          </div>
          <button className="text-black flex-shrink-0 ml-2">
            <FaDownload className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Open Button (calls onOpen if defined) */}
        <div className="flex justify-end mb-2 cursor-pointer md:hidden lg:hidden">
          <button
            className="px-7 py-2 bg-black text-white rounded-xl"
            onClick={onOpen}
          >
            Open
          </button>
        </div>

        {/* Module Description */}
        <p className="text-xs sm:text-sm md:text-base text-gray-800 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Input + Tags Area (Sticky Bottom) */}
      <div className="w-full mt-4 sticky bottom-0 bg-white z-10 pb-4">
        <div className="relative flex flex-col bg-white rounded-xl p-3 border border-gray-300">
          {/* Input Section */}
          <div className="input-ai flex w-full items-center">
            <textarea
              placeholder="Describe what you want to see"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && inputValue.trim()) {
                  e.preventDefault();
                  if (!tags.includes(inputValue.trim())) {
                    setTags([...tags, inputValue.trim()]);
                  }
                  setInputValue("");
                  resetTranscript();
                }
              }}
              rows={1}
              className="flex-grow bg-transparent text-black placeholder-gray-500 outline-none text-xs sm:text-sm md:text-base px-2 resize-none"
            />
            <div className="flex items-center space-x-2 ml-2">
              <button
                className={`text-gray-400 hover:text-black ${listening ? "text-red-500 animate-pulse" : ""
                  }`}
                onClick={handleVoiceInput}
              >
                <FaMicrophone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>
              <img src={button1} alt="Generate" className="h-8 sm:h-10 md:h-12" />
            </div>
          </div>

          {/* Tags Section */}
          <div className="flex flex-wrap gap-2 mt-2 w-full">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="bg-[#F0F0F0] text-gray-700 rounded-md px-3 py-1 sm:py-2 flex items-center text-[14px] sm:text-base"
              >
                {tag}
                <button
                  className="ml-1 text-gray-400 hover:text-white"
                  onClick={() => handleRemoveTag(index)}
                >
                  <IoMdClose className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModuleCard;
