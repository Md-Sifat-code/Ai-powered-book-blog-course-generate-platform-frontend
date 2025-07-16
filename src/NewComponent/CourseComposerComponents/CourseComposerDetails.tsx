import { useState, useEffect } from "react";
import CourseModule from "@/components/CourseComposerDetails/CourseModule";
import CourseModuleCard from "@/components/CourseComposerDetails/CourseModuleCard";

const CourseComposerDetails = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showModule, setShowModule] = useState(false);

  // Handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      // Reset view on switching to desktop
      if (!mobile) setShowModule(false);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpen = () => {
    if (isMobile) setShowModule(true);
  };

  const handleClose = () => {
    if (isMobile) setShowModule(false);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-50">
      {/* Sidebar: Show only when not mobile or module isn't active */}
      {(!isMobile || !showModule) && (
        <aside className="w-full lg:w-1/3 h-auto border-r border-gray-200 bg-white shadow-sm overflow-y-auto">
          <div className="p-4 sm:p-6">
            <CourseModuleCard onOpen={handleOpen} />
          </div>
        </aside>
      )}

      {/* Main Content */}
      {(!isMobile || showModule) && (
        <main className="w-full lg:w-2/3 h-auto overflow-y-auto bg-white p-4 sm:p-6">
          <CourseModule onClose={handleClose} />
        </main>
      )}
    </div>
  );
};

export default CourseComposerDetails;
