import React, { useState, useEffect, useRef } from "react";
import { FaDownload } from "react-icons/fa";
import { RxDividerVertical } from "react-icons/rx";
import { FaMicrophone, FaStop, FaCheck } from "react-icons/fa"; // Added icons for microphone and checkmark
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaArrowUpLong } from "react-icons/fa6";

// Define interfaces for type safety
interface BookgenieAiCardProps {
  buttonText?: string;
  title?: string;
  time?: string;
  description?: string;
  setShowSidePanel?: (val: boolean) => void; // NEW PROP
}

const BookgenieAiCard: React.FC<BookgenieAiCardProps> = ({
  buttonText = "Generate a Real Estate book cover",
  title = "Real Estate Course Module: Digital Marketing & Lead Generation",
  time = "May 25, 10:15 AM",
  description:
    initialDescription = "Would you like me to generate more book cover options, or perhaps help with other aspects of your book, like an outline or some sample chapters?",
  setShowSidePanel,
}) => {
  // --- States for the main input and generation features ---
  const [inputValue, setInputValue] = useState<string>(""); // For the textarea input
  // uploadedImage state and setUploadedImage are no longer needed
  // const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  // --- States for Aspect Ratio Popover ---
  const [bookGenieAiSelected, setBookGenieAiSelected] = useState<boolean>(true);
  const [isAspectRatioPopoverOpen, setIsAspectRatioPopoverOpen] =
    useState<boolean>(false);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>("1:1"); // Current displayed aspect ratio
  const [selectedOrientation, setSelectedOrientation] = useState<
    "portrait" | "landscape" | null
  >(null);
  const [customWidth, setCustomWidth] = useState<string>("1024");
  const [customHeight, setCustomHeight] = useState<string>("1024");

  // --- States for Color Palette Popover ---
  const [isColorPalettePopoverOpen, setIsColorPalettePopoverOpen] =
    useState<boolean>(false);
  const [color, setColor] = useState<string>(""); // For the color picker, could be a hex string

  // --- Refs for Popovers and File Input (fileInputRef is no longer needed) ---
  const aspectRatioPopoverRef = useRef<HTMLDivElement>(null);
  const colorPalettePopoverRef = useRef<HTMLDivElement>(null);
  // const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Speech Recognition hook ---
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // --- Effects ---
  // Effect to update input value when speech transcript changes
  useEffect(() => {
    setInputValue(transcript);
  }, [transcript]);

  // Effect to handle click outside popovers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        aspectRatioPopoverRef.current &&
        !aspectRatioPopoverRef.current.contains(event.target as Node)
      ) {
        setIsAspectRatioPopoverOpen(false);
      }
      if (
        colorPalettePopoverRef.current &&
        !colorPalettePopoverRef.current.contains(event.target as Node)
      ) {
        setIsColorPalettePopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // --- Helper Data ---
  const predefinedAspectRatios = {
    portrait: ["1:3", "1:2", "9:16", "10:16", "2:3", "3:4", "4:5"],
    landscape: ["3:1", "2:1", "16:9", "16:10", "3:2", "4:3", "5:4"],
  };

  const colorPalettes = {
    Auto: [],
    Ember: ["#E74C3C", "#F1C40F", "#2ECC71", "#3498DB", "#9B59B6", "#34495E"],
    Fresh: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#BE5A83"],
    Jungle: ["#1ABC9C", "#27AE60", "#2C3E50", "#E67E22", "#D35400"],
    Magic: ["#9B59B6", "#8E44AD", "#3498DB", "#2980B9", "#E74C3C"],
    Melon: ["#FF6F61", "#FFD700", "#A0C4FF", "#C7F5DE", "#FFC72C"],
    Mosaic: ["#B3E0FF", "#85C1E9", "#5DADE2", "#3498DB", "#2874A6", "#1F618D"],
    Pastel: ["#FADBD8", "#D5F5E3", "#D4ECF9", "#F7DC6F", "#ABB2B9"],
    Ultrnarine: ["#34495E", "#2C3E50", "#1ABC9C", "#2ECC71", "#3498DB"],
  };

  // --- Event Handlers ---

  // Speech Recognition
  const toggleListening = () => {
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

  // Image Upload (REMOVED)
  // const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setUploadedImage(file);
  //     console.log("Image selected:", file.name);
  //   }
  // };

  // Aspect Ratio Popover
  const handleAspectRatioSelect = (ratio: string) => {
    setSelectedAspectRatio(ratio);
    setIsAspectRatioPopoverOpen(false);
  };

  const handleOrientationChange = (orientation: "portrait" | "landscape") => {
    setSelectedOrientation(orientation);
    // You might want to set a default aspect ratio based on orientation here
    if (orientation === "portrait") {
      setSelectedAspectRatio("2:3"); // Example default
    } else {
      setSelectedAspectRatio("3:2"); // Example default
    }
  };

  const handleCustomApply = () => {
    setSelectedAspectRatio(`${customWidth}x${customHeight}`);
    setIsAspectRatioPopoverOpen(false);
  };

  // Color Palette Popover
  const handleColorSelect = (selectedColor: string) => {
    setColor(selectedColor);
    setIsColorPalettePopoverOpen(false);
  };

  // Generate Button
  const handleGenerate = () => {
    console.log("Generate clicked!");
    console.log("Description:", inputValue);
    console.log("Aspect Ratio:", selectedAspectRatio);
    console.log("Color:", color);
    console.log(" bookGenieAiSelected:", bookGenieAiSelected);
    // uploadedImage is no longer relevant here
    // console.log("Uploaded Image:", uploadedImage ? uploadedImage.name : "None");
    // Add your generation logic here (e.g., API call)
  };

  // --- Render ---
  return (
    <div className="w-full min-h-screen bg-white text-black flex flex-col md:p-2 p-1  ">
      {/* Top Button */}
      <button className="bg-[#F5F5F5] text-black font-medium py-3 rounded-sm mb-3 text-sm sm:text-base md:text-lg lg:text-xl">
        {buttonText}
      </button>

      {/* Scrollable Content Area */}
      <div className="flex-grow overflow-y-auto pb-2">
        <p className="text-xs sm:text-sm md:text-base text-gray-800 mb-4 leading-relaxed">
          Here's a professional book cover design for a real estate instructor:
          The cover features a clean, contemporary layout with a subtle image of
          a house or a modern cityscape in the background, hinting at the
          instructor's knowledge and the scope of real estate expertise. The
          color palette is minimalist and elegant, utilizing shades of dark blue
          and gray to communicate trustworthiness and stability. The title,
          'Real Estate Instructor's Guide', is written in a clear, easy-to-read
          font, along with the author's name and credentials. The overall
          impression of the book cover is one of sophistication and authority,
          making it a compelling and informative guide for real estate
          
        </p>

        {/* Module Card */}
        <div className="bg-[#F5F5F5] p-2 rounded-md mb-4 relative flex justify-between items-center">
          <div className="max-w-[70%] sm:max-w-[80%] md:max-w-[85%] lg:max-w-[90%]">
            <p className="font-medium text-xs sm:text-sm md:text-base">
              {title}
            </p>
            <p className="text-[9px] sm:text-xs md:text-sm text-gray-500">
              {time}
            </p>
          </div>
          <button className="text-black flex-shrink-0 ml-2">
            <FaDownload className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 hidden  sm:inline" />
            <div
              onClick={() => setShowSidePanel?.(true)}
              className="bg-black py-1 px-2 rounded-md text-white sm:hidden"
            >
              open
            </div>
          </button>
        </div>

        {/* Module Description */}
        <p className="text-xs sm:text-sm md:text-base text-gray-800 leading-relaxed">
          {initialDescription}
        </p>
      </div>

      {/* Input + Tags Area (Sticky Bottom) */}
      <div className="sticky bottom-0 bg-white pt-4 border-t  border-gray-200">
        <div className="relative ">
          <textarea
            className="w-full pb-8 md:pb-2 pt-4 pl-4 md:pr-32 rounded-lg border-2 border-gray-300 focus:outline-none text-gray-900 resize-none"
            placeholder="Describe what you want to see"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            rows={4}
          />
          <div className="flex flex-row justify-between items-center  absolute bottom-4 left-0 w-full px-2">
            <div className="flex  items-center gap-2">
              {/* Uncomment if you want to manage bookGenieAiSelected state */}
              {bookGenieAiSelected && (
                <span className="flex items-center bg-gray-200 text-gray-800 text-[10px] px-2 py-1.5 rounded-full mr-2">
                  BookGenie AI
                  <button
                    className="ml-2 text-gray-600 hover:text-gray-900 text-[16px] leading-none"
                    onClick={() => setBookGenieAiSelected(false)}
                  >
                    &times;
                  </button>
                </span>
              )}

              {/* Uploaded image display removed */}
              {/* {uploadedImage && (
                <span className="flex items-center bg-gray-200 text-gray-800 text-[12px] px-3 py-1.5 rounded-full mr-2">
                  {uploadedImage.name}
                  <button
                    className="ml-2 text-gray-600 hover:text-gray-900 text-[20px] leading-none"
                    onClick={() => setUploadedImage(null)}
                  >
                    &times;
                  </button>
                </span>
              )} */}

              {/* Aspect Ratio Trigger */}
              <span
                className="md:w-3 md:h-3 w-2 h-2 border border-gray-300 transition-all duration-200"
                onClick={() => setIsAspectRatioPopoverOpen(true)}
              ></span>
              <span className="text-gray-400 text-[12px] mr-2 cursor-pointer hover:text-gray-600 relative">
                {selectedAspectRatio}
              </span>

              <div className="flex items-center md:gap-2">
                <RxDividerVertical className="md:text-xl text-gray-400" />
                {/* "color" text and indicator */}
                <p
                  className="text-gray-400 text-[12px] cursor-pointer"
                  onClick={() => setIsColorPalettePopoverOpen(true)}
                >
                  color
                </p>
                {/* <div
                  className="w-4 h-4 rounded-sm border border-gray-300 ml-1 cursor-pointer"
                  style={{ backgroundColor: color || "transparent" }}
                  title={color || "No color selected"}
                
                ></div> */}
              </div>
            </div>
            <div className="flex gap-1 items-center mt-4 md:mt-0">
              {/* Microphone Button */}
              {browserSupportsSpeechRecognition && (
                <button
                  onClick={toggleListening}
                  className={`p-2 rounded-full ${
                    listening
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-gray-300 transition-colors`}
                  title={listening ? "Stop listening" : "Start listening"}
                >
                  {listening ? (
                    <FaStop className=" w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    <FaMicrophone className="w-5 h-5" />
                  )}
                </button>
              )}

              {/* Camera Icon for Upload removed */}
              {/* <>
                <IoCameraOutline
                  className="text-3xl cursor-pointer text-gray-600 hover:text-gray-900"
                  onClick={() => fileInputRef.current?.click()}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </> */}
              <button
                onClick={handleGenerate}
                className="flex items-center gap-2"
              >
                {/* Icon button for small devices */}
                <FaArrowUpLong className="w-5  h-5   sm:hidden" />

                {/* Text button for larger devices */}
                <div
                  onClick={handleGenerate}
                  className="hidden sm:block bg-black py-1 px-3 rounded-md text-white"
                >
                  Generate
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Color Palette Popover */}
        {isColorPalettePopoverOpen && (
          <div
            ref={colorPalettePopoverRef}
            className="absolute z-20 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-11/12 max-w-xs mt-2
                     bottom-24 right-4 md:right-1/4 transform md:translate-x-1/2" // Adjusted positioning to align with the "color" text, above the input
          >
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Color palette
            </h3>
            {Object.entries(colorPalettes).map(([name, colors]) => (
              <div
                key={name}
                className="flex justify-between items-center mb-3"
              >
                <span className="text-sm font-medium text-gray-700 w-1/4">
                  {name}
                </span>
                <div className="flex flex-wrap gap-1 w-3/4 justify-end">
                  {colors.length > 0 ? (
                    colors.map((c, index) => (
                      <div
                        key={index}
                        className="w-5 h-5 rounded-sm cursor-pointer border border-gray-200 hover:border-gray-400 transition-colors"
                        style={{ backgroundColor: c }}
                        onClick={() => handleColorSelect(c)}
                        title={c}
                      ></div>
                    ))
                  ) : name === "Auto" ? (
                    <select className="text-xs text-gray-600 border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-1 focus:ring-blue-300">
                      <option value="auto">Auto</option>
                      {/* Add more options if needed */}
                    </select>
                  ) : null}
                </div>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Custom</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Code</span>
                <input
                  type="text"
                  className="flex-grow p-2 border border-gray-300 rounded-md text-gray-800 outline-none focus:ring-1 focus:ring-blue-300 text-sm"
                  placeholder="#RRGGBB or color name"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
                <div
                  className="w-6 h-6 rounded-sm cursor-pointer border border-gray-200"
                  style={{ backgroundColor: color || "transparent" }}
                  title={color || "No color selected"}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Aspect Ratio Popover */}
        {isAspectRatioPopoverOpen && (
          <div
            ref={aspectRatioPopoverRef}
            className="absolute z-10 bg-white rounded-lg shadow-xl border border-gray-200 p-4 md:p-6 w-11/12 sm:w-96 mt-2
                     bottom-24 left-4 md:left-1/4 transform md:-translate-x-1/2" // Adjusted positioning to align with the "1:1" text, above the input
          >
            <div className="flex flex-col sm:flex-row mb-4 space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
              {/* Aspect Ratio Display */}
              <div className="w-24 h-24 border border-gray-300 rounded flex items-center justify-center text-xl font-medium text-gray-700 flex-shrink-0 mx-auto sm:mx-0">
                {selectedAspectRatio}
              </div>
              {/* Orientation and Predefined Ratios */}
              <div className="flex-grow">
                <div className="flex justify-around mb-3">
                  <label className="flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600 rounded"
                      checked={selectedOrientation === "portrait"}
                      onChange={() => handleOrientationChange("portrait")}
                    />
                    <span className="ml-2">Portrait</span>
                  </label>
                  <label className="flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600 rounded"
                      checked={selectedOrientation === "landscape"}
                      onChange={() => handleOrientationChange("landscape")}
                    />
                    <span className="ml-2">Landscape</span>
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                  <div>
                    {predefinedAspectRatios.portrait.map((ratio) => (
                      <div
                        key={ratio}
                        className={`px-3 py-1 rounded cursor-pointer hover:bg-gray-100 ${
                          selectedAspectRatio === ratio
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : ""
                        }`}
                        onClick={() => handleAspectRatioSelect(ratio)}
                      >
                        {ratio}
                      </div>
                    ))}
                  </div>
                  <div>
                    {predefinedAspectRatios.landscape.map((ratio) => (
                      <div
                        key={ratio}
                        className={`px-3 py-1 rounded cursor-pointer hover:bg-gray-100 ${
                          selectedAspectRatio === ratio
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : ""
                        }`}
                        onClick={() => handleAspectRatioSelect(ratio)}
                      >
                        {ratio}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Custom Dimensions */}
            <div className=" mt-2 md:mt-4 md:pt-4 pt-2 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Custom</p>
              <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
                <div className="flex-grow flex items-center bg-gray-100 rounded-md">
                  <span className="px-3 text-gray-500 text-sm">Width</span>
                  <input
                    type="number"
                    className="w-full p-2 bg-transparent text-gray-800 outline-none focus:ring-0 text-sm"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value)}
                  />
                  <span className="px-2 text-gray-500 text-sm">px</span>
                </div>
                <div className="hidden md:block">
                  <RxDividerVertical className="text-2xl text-gray-400" />
                </div>
                <div className="flex-grow flex items-center bg-gray-100 rounded-md">
                  <span className="px-3 text-gray-500 text-sm">Height</span>
                  <input
                    type="number"
                    className="w-full p-2 bg-transparent text-gray-800 outline-none focus:ring-0 text-sm"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(e.target.value)}
                  />
                  <span className="px-2 text-gray-500 text-sm">px</span>
                </div>
                <button
                  className="bg-gray-800 text-white p-3 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full md:w-auto"
                  onClick={handleCustomApply}
                >
                  <FaCheck className="w-4 h-4 mx-auto" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookgenieAiCard;
