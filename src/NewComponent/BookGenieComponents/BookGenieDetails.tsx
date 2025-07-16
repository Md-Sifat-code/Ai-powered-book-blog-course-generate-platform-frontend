import { useState } from "react";
import BookgenieAi from "@/components/BookgenieAi/BookgenieAi";
import BookgenieAiCard from "@/components/BookgenieAi/BookgenieAiCard";
// MdKeyboardDoubleArrowRight is no longer directly used here, but keeping the import just in case
// import { MdKeyboardDoubleArrowRight } from "react-icons/md"; 

const BookGenieDetails = () => {
  const [showSidePanel, setShowSidePanel] = useState(false);

  return (
    <div className="min-h-screen grid grid-cols-1 w-full bg-gray-50 overflow-x-hidden">
      {/* Mobile View */}
      <div className="lg:hidden">
        {!showSidePanel ? (
          <BookgenieAiCard setShowSidePanel={setShowSidePanel} />
        ) : (
          <div className="md:px-2 sm:px-4 bg-gray-100 flex flex-col min-h-screen">
            {/* BookgenieAi now handles its own "back" button for mobile */}
            <div className="flex-grow ">
              <BookgenieAi isMobileView={true} onBackClick={() => setShowSidePanel(false)} />
            </div>
          </div>
        )}
      </div>

      {/* Desktop / Large Screen View */}
      <div className="hidden lg:grid grid-cols-[1fr_3fr] xl:grid-cols-[1fr_2fr] min-h-screen">
        <aside className="border-r border-gray-200 bg-white shadow-sm overflow-y-auto">
          <div className="md:px-2 sm:px-4">
            <BookgenieAiCard setShowSidePanel={setShowSidePanel} />
          </div>
        </aside>

        <main className="h-full overflow-y-auto   bg-white  md:px-2 sm:px-4">
          {/* isMobileView is false for desktop */}
          <BookgenieAi isMobileView={false} /> 
        </main>
      </div>
    </div>
  );
};

export default BookGenieDetails;