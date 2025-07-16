// src/components/BookGenieBasic.tsx
import React, { useState, useRef, useEffect } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { RxDividerVertical } from "react-icons/rx";
import { FaCheck } from "react-icons/fa"; // For the checkmark icon in the custom dimensions

// Make sure your asset paths are correct
import img1 from "../../assets/book-1.png";
import img2 from "../../assets/book-2.png";
import img3 from "../../assets/book-3.png";
import img4 from "../../assets/book-4.png";
import { Link } from "react-router-dom";
import { FaArrowUpLong } from "react-icons/fa6";
import { useCreateBookMutation } from "@/store/api/book/bookApi";
import { toast } from "sonner";

// Define interfaces for type safety
interface BookCover {
  id: string;
  imageSrc: string;
  title: string;
  timeAgo: string;
}

const BookGenieBasic: React.FC = () => {
  const [description, setDescription] = useState<string>("");
  const [bookGenieAiSelected, setBookGenieAiSelected] = useState<boolean>(true);
  const [color, setColor] = useState<string>(""); // For the color picker, could be a hex string
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for the Aspect Ratio Popover
  const [isAspectRatioPopoverOpen, setIsAspectRatioPopoverOpen] =
    useState<boolean>(false);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>("1:1"); // Current displayed aspect ratio
  const [selectedOrientation, setSelectedOrientation] = useState<
    "portrait" | "landscape" | null
  >(null);
  const [customWidth, setCustomWidth] = useState<string>("1024");
  const [customHeight, setCustomHeight] = useState<string>("1024");

  // State for Color Palette Popover
  const [isColorPalettePopoverOpen, setIsColorPalettePopoverOpen] =
    useState<boolean>(false);

  // Ref for click outside detection for Aspect Ratio Popover
  const aspectRatioPopoverRef = useRef<HTMLDivElement>(null);
  // Ref for click outside detection for Color Palette Popover
  const colorPalettePopoverRef = useRef<HTMLDivElement>(null);

  // Close popovers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close Aspect Ratio Popover
      if (
        aspectRatioPopoverRef.current &&
        !aspectRatioPopoverRef.current.contains(event.target as Node)
      ) {
        setIsAspectRatioPopoverOpen(false);
      }
      // Close Color Palette Popover
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

  const predefinedAspectRatios = {
    portrait: ["1:3", "1:2", "9:16", "10:16", "2:3", "3:4", "4:5"],
    landscape: ["3:1", "2:1", "16:9", "16:10", "3:2", "4:3", "5:4"],
  };

  // Predefined color palettes based on your screenshot
  const colorPalettes = {
    Auto: [], // Placeholder for auto, maybe dynamically generated or no specific colors
    Ember: ["#E74C3C", "#F1C40F", "#2ECC71", "#3498DB", "#9B59B6", "#34495E"],
    Fresh: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#BE5A83"],
    Jungle: ["#1ABC9C", "#27AE60", "#2C3E50", "#E67E22", "#D35400"],
    Magic: ["#9B59B6", "#8E44AD", "#3498DB", "#2980B9", "#E74C3C"],
    Melon: ["#FF6F61", "#FFD700", "#A0C4FF", "#C7F5DE", "#FFC72C"],
    Mosaic: ["#B3E0FF", "#85C1E9", "#5DADE2", "#3498DB", "#2874A6", "#1F618D"],
    Pastel: ["#FADBD8", "#D5F5E3", "#D4ECF9", "#F7DC6F", "#ABB2B9"],
    Ultrnarine: ["#34495E", "#2C3E50", "#1ABC9C", "#2ECC71", "#3498DB"],
  };

  const handleAspectRatioSelect = (ratio: string) => {
    setSelectedAspectRatio(ratio);
    setIsAspectRatioPopoverOpen(false); // Close popover after selection
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
    setIsAspectRatioPopoverOpen(false); // Close popover after applying custom
  };

  const handleColorSelect = (selectedColor: string) => {
    setColor(selectedColor);
    setIsColorPalettePopoverOpen(false); // Close popover after selecting a color
  };

  const [bookCovers] = useState<BookCover[]>([
    {
      id: "1",
      imageSrc: img1,
      title: "REAL ESTATE SELLING SOLUTIONS",
      timeAgo: "Today 10:50am",
    },
    {
      id: "2",
      imageSrc: img2,
      title: "THE MONARCH OF EXPANSION",
      timeAgo: "Tomorrow 10:00am",
    },
    {
      id: "3",
      imageSrc: img3,
      title: "THE INVESTMENT OF A LIFETIME",
      timeAgo: "One week ago 10:00am",
    },
    {
      id: "4",
      imageSrc: img4,
      title: "REAL ESTATE BOOK FOR PROMISES",
      timeAgo: "Last month 10:00am",
    },
  ]);
  const [createBook] = useCreateBookMutation();
  const handleGenerate = async () => {
    const toastId = toast.loading("Generating book cover...");
    console.log({
      description,
      bookGenieAiSelected,
      aspectRatio: selectedAspectRatio,
      color,
    });
    const formData = new FormData();
    formData.append("prompt", description);
    formData.append("aspectRatio", selectedAspectRatio);
    formData.append("color", color);
    formData.append("image", uploadedImage as Blob);

    try {
      const result = await createBook(formData).unwrap();
      console.log({ result });
      if (result?.success || result?.status === "success") {
        toast.success("Book cover generated successfully!", { id: toastId });
      } else {
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to generate book cover", {
        id: toastId,
      });
    }
  };

  const handleSeeMore = () => {
    console.log("See More clicked!");
    // This is where you'd fetch more history items (e.g., pagination)
    // and append them to the 'bookCovers' state.
  };

  return (
    <div className="bg-gray-50 font-sans p-4 min-h-screen">
      {/* Header Section */}
      <div className="text-center  mb-12">
        <h1 className="text-2xl font-bold text-gray-900">
          Command Your Creative Process
        </h1>
        <h2 className="text-2xl font-semibold text-gray-900 mt-2">
          With <span className="text-[#6C4EC8] mr-2">AI</span>
          Studios.
        </h2>
      </div>

      {/* Search Bar Section */}
      <div className="w-full max-w-6xl mx-auto px-4 mb-6 relative">
        {/* Added relative for popover positioning */}
        <div className="relative">
          <textarea
            className="w-full pb-4 md:pb-10 md:pt-4 pl-4 md:pr-32 rounded-lg border-2 border-gray-300 focus:outline-none  text-gray-900 resize-none" // Use textarea for multi-line input
            placeholder="Describe what you want to see"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4} // Default rows for textarea
          />
          <div className="flex flex-row justify-between items-center absolute  -mt-14 w-full md:px-4 px-2">
            <div className="flex   md:gap-4 items-center">
              {bookGenieAiSelected && (
                <span className="flex items-center bg-gray-200 text-gray-800 text-[10px]  md:text-[12px] px-2 py-2 md:px-3 md:py-1.5  rounded-full mr-2">
                  BookGenie AI
                  <button
                    className="ml-2 text-gray-600 hover:text-gray-900 text-[20px] leading-none"
                    onClick={() => setBookGenieAiSelected(false)}
                  >
                    &times;
                  </button>
                </span>
              )}

              {uploadedImage && (
                <span className="flex items-center bg-gray-200 text-gray-800 text-[12px] px-3 py-1.5 rounded-full mr-2">
                  {uploadedImage.name}
                  <button
                    className="ml-2 text-gray-600 hover:text-gray-900 text-[20px] leading-none"
                    onClick={() => setUploadedImage(null)}
                  >
                    &times;
                  </button>
                </span>
              )}

              {/* This span is now purely a visual indicator, no onClick */}

              <span
                className="md:w-5 md:h-5 w-2 h-2 border border-gray-300 transition-all duration-200"
                onClick={() => setIsAspectRatioPopoverOpen(true)}
              ></span>
              {/* Aspect Ratio Trigger - Only this will open the aspect ratio popover */}
              <span className="text-gray-400 text-[10px] md:text-sm mr-0 md:mr-2 cursor-pointer hover:text-gray-600 relative">
                {selectedAspectRatio}
              </span>

              <div className="flex items-center md:gap-2">
                <RxDividerVertical className="md:text-2xl sm:text-[5px] text-gray-400" />
                {/* "color" text - This will open the color palette popover */}
                <p
                  className="text-gray-400 sm:text-[5px] md:text-[14px] cursor-pointer"
                  onClick={() => setIsColorPalettePopoverOpen(true)}
                >
                  color
                </p>
                {/* New: Color indicator box next to "color" text - This will also open the color palette popover */}
                {/* <div
                  className="w-4 h-4 rounded-sm border border-gray-300 ml-1 cursor-pointer"
                  style={{ backgroundColor: color || "transparent" }}
                  title={color || "No color selected"}
                ></div> */}
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <>
                <IoCameraOutline
                  className="text-2xl md:text-3xl cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setUploadedImage(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
              </>
              <Link to="">
                <button
                  onClick={handleGenerate}
                  className="flex items-center gap-2"
                >
                  {/* Icon button for small devices */}
                  <FaArrowUpLong className="w-5  h-5   sm:hidden" />

                  {/* Text button for larger devices */}
                  <div className="hidden sm:block bg-black py-1 px-3 rounded-md text-white">
                    Generate
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* Color Palette Popover */}
        {isColorPalettePopoverOpen && (
          <div
            ref={colorPalettePopoverRef}
            className="absolute z-20 bg-white rounded-lg shadow-xl border border-gray-200 p-2 w-80 mt-2
                     top-full  md:right-auto "
            style={{ left: "calc(50% - 160px)" }} // Adjust positioning as needed
          >
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Color palette
            </h3>
            {Object.entries(colorPalettes).map(([name, colors]) => (
              <div key={name} className=" flex justify-around mb-2 ">
                <div className="flex gap-3 justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {name}
                  </span>
                  {name === "Auto" && (
                    <select className="text-sm text-gray-600 border border-gray-300 rounded-md py-1 px-2 focus:outline-none">
                      <option value="auto">Auto</option>
                      {/* Add more options if needed */}
                    </select>
                  )}
                </div>
                <div className="flex  gap-1">
                  {colors.length > 0 ? (
                    colors.map((c, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-sm cursor-pointer border border-gray-200"
                        style={{ backgroundColor: c }}
                        onClick={() => handleColorSelect(c)}
                        title={c}
                      ></div>
                    ))
                  ) : name === "Auto" ? (
                    <div className="text-sm text-gray-500">
                      (No specific colors for Auto)
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
            <div className="  border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-1">Custom</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Code</span>
                <input
                  type="text"
                  className="flex-grow p-1 border border-gray-300 rounded-md text-gray-800 outline-none focus:ring-0 text-sm"
                  placeholder="auto"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
                <div
                  className="w-6 h-6 rounded-sm cursor-pointer border border-gray-200"
                  style={{ backgroundColor: color || "transparent" }}
                  title={color || "No color selected"}
                  // No specific onClick needed here, as the input handles the color change
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
                 top-full left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0"
          >
            <div className="flex mb-4 space-x-4">
              {/* Aspect Ratio Display */}
              <div className="w-24 h-24 border border-gray-300 rounded flex items-center justify-center text-xl font-medium text-gray-700 flex-shrink-0">
                {selectedAspectRatio}
              </div>
              {/* Orientation and Predefined Ratios */}
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row justify-around  mb-3">
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
            <div className="mt-4 pt-4 border-t border-gray-200">
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
      {/* History Section */}
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">History</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bookCovers.map((cover) => (
            <Link to="/dashboard/bookgenie/id">
              <div
                key={cover.id}
                className=" hover:scale-105 transition-all ease-in-out delay-300   p-2 rounded-lg border border-gray-200 hover:shadow-md  duration-200 bg-white no-underline text-inherit"
              >
                <div className="w-full flex flex-col">
                  <div className="w-full rounded overflow-hidden">
                    <img
                      src={cover.imageSrc}
                      alt={cover.title}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <h3 className="mt-2 text-left text-gray-800 font-medium text-sm">
                    {cover.title}
                  </h3>
                  <p className="text-left text-gray-500 text-xs mt-1">
                    {cover.timeAgo}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link to="/dashboard/bookgenie/id">
            <button
              className="text-black font-bold text-sm flex items-center justify-center mx-auto"
              onClick={handleSeeMore}
            >
              See More
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookGenieBasic;
