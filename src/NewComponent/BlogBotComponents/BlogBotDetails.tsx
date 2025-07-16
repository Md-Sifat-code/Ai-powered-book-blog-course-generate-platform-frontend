import { useState, useEffect } from "react";
import ChatPanel from "./ChatPanel";
import { TextEditorPage } from "./TextEditorPage";
import { ArrowLeftIcon } from "lucide-react";

const BlogBotDetails = () => {
  const [isEditorVisible, setEditorVisible] = useState(true);
  // const {}=useGenerateBlogMutation();

  const toggleEditorVisibility = () => {
    setEditorVisible(!isEditorVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 650) {
        setEditorVisible(false);
      } else {
        setEditorVisible(true);
      }
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize); // Listen for resize

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-gray-100 px-2 grid grid-cols-4 gap-2 relative">

      {/* ChatPanel */}
      <div className="col-span-4 lg:col-span-1 bg-white">
        <div className={`${isEditorVisible ? "hidden" : "block"} md:block`}>
          <ChatPanel onToggle={toggleEditorVisibility} />
        </div>
      </div>

      {/* TextEditorPage */}
      <div className="col-span-4 lg:col-span-3 bg-white">
        <div className={`${isEditorVisible ? "block" : "hidden"} md:block`}>
          <TextEditorPage />
          {isEditorVisible ? (
            <div className="bg-white w-full">
              <button className="block md:hidden absolute top-16 left-6 cursor-pointer" onClick={toggleEditorVisibility}><ArrowLeftIcon></ArrowLeftIcon></button>
            </div>
          ) : ("")}
        </div>
      </div>
    </div>
  );
};
// s

export default BlogBotDetails;
