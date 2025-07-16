"use client";
import { useState, useEffect } from "react";
import {
  FiPaperclip,
  FiMic,
  FiX,
  FiChevronRight,
} from "react-icons/fi";
import { BsGrid1X2 } from "react-icons/bs";
import { IoChevronDownOutline } from "react-icons/io5";
import flat1 from "../../assets/flat-1.png";
import flat2 from "../../assets/flat-2.png";
import flat3 from "../../assets/flat-3.png";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Link, useNavigate } from "react-router-dom";

export default function VideoVisionBasic() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [ratio, setRatio] = useState("2:1");
  const [duration, setDuration] = useState("20s");
  const [textInput, setTextInput] = useState("");
 const navigate = useNavigate();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setTextInput((prev) => (prev ? prev + " " + transcript : transcript));
      resetTranscript(); // optional: clears transcript after adding to input
    }
  }, [transcript]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleRatioChange = () => {
    setRatio((prev) => (prev === "2:1" ? "16:9" : "2:1"));
  };

  const handleDurationChange = () => {
    setDuration((prev) => (prev === "20s" ? "30s" : "20s"));
  };
  const handlegenerate = () => {
    navigate("/dashboard/videovision/1");
  }

  const handleMicClick = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: false });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
          Command Your Creative Process
        </h1>
        <h1 className="text-3xl sm:text-4xl font-semibold">
          With <span className="text-purple-600">AI</span> Studios.
        </h1>
      </div>

      {/* Input Bar */}
      <div className="w-full max-w-5xl mb-12">
        <div className="border border-gray-200 rounded-2xl bg-white px-4 py-4 flex flex-col gap-4 shadow-sm">
          {/* Textarea */}
          <textarea
            placeholder="Describe what you want to see"
            className="w-full resize-none outline-none text-gray-700 placeholder-gray-400 px-2 py-1 min-h-[80px] text-base"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center flex-wrap gap-2">
              {fileName && (
                <div className="bg-gray-100 rounded-full py-1 px-3 flex items-center gap-1">
                  <span className="text-sm truncate max-w-[120px]">
                    {fileName}
                  </span>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setFileName(null)}
                  >
                    <FiX size={16} />
                  </button>
                </div>
              )}

              {/* File Upload */}
              <label className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <FiPaperclip size={20} />
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {/* Aspect Ratio */}
              <button
                onClick={handleRatioChange}
                className="flex items-center gap-1 border-x px-3 border-gray-200 text-gray-400 hover:text-gray-600"
              >
                <BsGrid1X2 size={16} />
                <span className="text-sm">{ratio}</span>
              </button>

              {/* Duration */}
              <button
                onClick={handleDurationChange}
                className="flex items-center gap-1 text-gray-400 hover:text-gray-600"
              >
                <span className="text-sm">{duration}</span>
                <IoChevronDownOutline size={16} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Mic Button */}
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={handleMicClick}
                type="button"
              >
                <FiMic size={20} />
              </button>

              <button onClick={handlegenerate} className="bg-gray-800 text-white px-5 py-2 rounded-md hover:bg-gray-700 transition">
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="w-full max-w-5xl text-start">
        <h2 className="text-lg font-semibold mb-6">History</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[flat1, flat2, flat3].map((imgSrc, i) => (
           <Link to="/dashboard/videovision/:id">
            <div
              key={i}
              className="hover:scale-105 transition-all ease-in-out delay-300   p-4 rounded-lg border border-gray-200 hover:shadow-md  duration-200 bg-white no-underline text-inherit"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={imgSrc}
                  alt={`Generated thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-base">
                  {i === 1
                    ? "Real Estate Tips That Save You Money"
                    : "Touring Luxury Homes You Have to See to Believe"}
                </h3>
                <p className="text-sm text-gray-500">
                  {i === 1 ? "Tomorrow at 10:00am" : "Apr 19, 2022"}
                </p>
              </div>
            </div></Link>
          ))}
        </div>

        {/* See More */}
        <div className="flex justify-center mt-8">
          <Link to="/dashboard/videovision/:id">
           <button className="flex items-center text-gray-600 hover:text-gray-800 font-medium transition">
            See More <FiChevronRight className="ml-1" />
          </button>
          </Link>
         
        </div>
      </div>
    </div>
  );
}
