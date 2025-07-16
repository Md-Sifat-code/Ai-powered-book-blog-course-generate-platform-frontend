import bookImg from "@/assets/ImagesLanding/AILand1.jpg";
import videoImg from "@/assets/ImagesLanding/AiLand2.jpg";
import blogImg from "@/assets/ImagesLanding/AiLand3.jpg";
import courseImg from "@/assets/ImagesLanding/AiLand4.jpg";
import { selectUser } from "@/store/features/user/userSlice";
import { useAppSelector } from "@/store/hooks";
import { Camera, LinkIcon, Mic } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Basic = () => {
  const [inputValue, setInputValue] = useState("");
  const handleGenerate = () => {
    console.log("User Input:", inputValue);
  };

const user = useAppSelector(selectUser)
console.log({user})
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center px-4  py-16">
      <h2 className="text-3xl md:text-4xl font-semibold text-center leading-tight mb-12">
        Command Your Creative Process <br />
        With <span className="text-[#6C4EC8]">AI</span> Studios.
      </h2>

      {/* Card grid */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {/* Card 1 */}
        <Link to="/dashboard/bookgenie">
          <div className="flex items-center gap-3 bg-[#F0F0F0] rounded-[12px] border border-gray-300 p-5 
                 hover:scale-105 hover:shadow-md transition-all ease-in-out delay-300 duration-200 
                 no-underline text-inherit">
            <img src={bookImg} alt="Book" className="w-12 h-12 rounded" />
            <div>
              <h3 className="font-semibold text-sm">BookGenie AI</h3>
              <p className="text-xs text-gray-600">Create your Books & Book Covers with AI</p>
            </div>
          </div>
        </Link>
        {/* Card 2 */}
        <Link to="/dashboard/videovision">
          <div className="flex items-center gap-3 bg-[#F0F0F0] rounded-[12px] border border-gray-300 p-5 
                 hover:scale-105 hover:shadow-md transition-all ease-in-out delay-300 duration-200 
                 no-underline text-inherit">
            <img src={videoImg} alt="Video" className="w-12 h-12 rounded" />
            <div>
              <h3 className="font-semibold text-sm">VideoVision AI</h3>
              <p className="text-xs text-gray-600">Create your Videos with AI</p>
            </div>
          </div>
        </Link>
        {/* Card 3 */}
        <Link to="/dashboard/blogbot">
          <div className="flex items-center gap-3 bg-[#F0F0F0] rounded-[12px] border border-gray-300 p-5 
                 hover:scale-105 hover:shadow-md transition-all ease-in-out delay-300 duration-200 
                 no-underline text-inherit">
            <img src={blogImg} alt="Blog" className="w-12 h-12 rounded" />
            <div>
              <h3 className="font-semibold text-sm">BlogBot AI</h3>
              <p className="text-xs text-gray-600">Create your Blogs with AI</p>
            </div>
          </div>
        </Link>
        {/* Card 4 */}
        <Link to="/dashboard/coursecomposer">
          <div className="flex items-center gap-3 bg-[#F0F0F0] rounded-[12px] border border-gray-300 p-5 
                 hover:scale-105 hover:shadow-md transition-all ease-in-out delay-300 duration-200 
                 no-underline text-inherit">
            <img src={courseImg} alt="Course" className="w-12 h-12 rounded" />
            <div>
              <h3 className="font-semibold text-sm">CourseComposer AI</h3>
              <p className="text-xs text-gray-600">Create your Courses with AI</p>
            </div>
          </div>
        </Link>
      </div>



      {/* Search field */}
      {/* Search field */}
      <div className="max-w-4xl w-full mx-auto mt-4 mb-4 px-5 py-4 border border-[#CCCCCC] rounded-[18px] flex flex-col justify-between">
        {/* Input */}
        <input
          type="text"
          placeholder="Write here your command..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className=" text-gray-700 placeholder-gray-400 bg-transparent outline-none text-base w-full"
        />

        {/* Bottom Icons and Button */}
        <div className="flex items-center justify-between">
          {/* Left icons (under input) */}
          <div className="flex gap-4 mt-2">
            <LinkIcon size={20} className="text-gray-500" />
            <Camera size={20} className="text-gray-500" />
          </div>

          {/* Right: Mic + Button */}
          <div className="flex items-center gap-2 mt-2">
            <Mic size={20} className="text-gray-500" />
            <button onClick={handleGenerate} className="cursor-pointer bg-black text-white px-5 py-2 rounded">
              Generate
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Basic;
