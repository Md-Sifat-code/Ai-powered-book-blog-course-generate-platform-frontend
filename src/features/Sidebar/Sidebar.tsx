import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Sparkles,
  Video,
  FileText,
  LayoutList,
  LogOut,
  User,
  Book,
  Edit,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SocialMediaModal from "@/NewComponent/BlogBotComponents/SocialMediaModal";
import { useAppDispatch } from "@/hooks/useRedux";
import { useGetHistoryQuery } from "@/store/api/history/historyApi";
import { logoutUser } from "@/store/features/user/userSlice";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false); // Modal state
  const navigate = useNavigate();
  const handlestartNew = () => {
    // Navigate to the start new page or perform any action
    navigate("/dashboard");
  };
  const dispatch = useAppDispatch()
  const { data: historyData = [], isLoading } = useGetHistoryQuery(null);
  console.log("History Data:", historyData, isLoading);
  // Auto-collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 640;
      if (isMobile && isOpen) {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const sidebarVariants = {
    open: { width: "16rem" },
    closed: { width: "4rem" },
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const toolItems = [
    {
      to: "/dashboard/bookgenie",
      icon: <Sparkles size={20} />,
      text: "BookGenie AI",
    },
    {
      to: "/dashboard/videovision",
      icon: <Video size={20} />,
      text: "VideoVision AI",
    },
    {
      to: "/dashboard/blogbot",
      icon: <FileText size={20} />,
      text: "BlogBot AI",
    },
    {
      to: "/dashboard/coursecomposer",
      icon: <LayoutList size={20} />,
      text: "CourseComposer AI",
    },
  ];

  const historyItems = [
    {
      to: "",
      icon: <Video size={20} />,
      text: "Video: Drone shot of a Duplex",
    },
    {
      to: "",
      icon: <FileText size={20} />,
      text: "Blog: Best Solution For Real...",
    },
    {
      to: "",
      icon: <Book size={20} />,
      text: "Course: Your First Step to the ...",
    },
    { to: "", icon: <Book size={20} />, text: "Book: Real Estate Fundamen..." },
  ];

  const getNavLinkClassesOpen = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-start p-2 rounded-lg transition-colors ${
      isActive ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100 text-gray-700"
    }`;

  const getNavLinkClassesClosed = ({ isActive }: { isActive: boolean }) =>
    `w-10 h-10 flex items-center justify-center p-2 rounded-lg relative transition-colors ${
      isActive ? "bg-black text-white" : "hover:bg-gray-100 text-gray-700"
    }`;

  const handleEdit = () => {
    console.log("Edit clicked");
  };

  return (
    <>
      <motion.aside
        initial={isOpen ? "open" : "closed"}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className=" bg-white text-gray-800 border-r border-gray-200 min-h-screen p-4 overflow-hidden flex flex-col"
      >
        {/* Profile and Toggle */}
        <div
          className={`p-0 flex  items-center ${
            isOpen ? "justify-between" : "justify-center"
          } mb-4`}
        >
          <div
            className={`flex items-center cursor-pointer ${
              isOpen ? "space-x-2" : "justify-center w-10 h-10"
            }`}
            onClick={() => setShowModal(true)}
          >
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User size={20} className="text-gray-600" />
            </div>
            {isOpen && (
              <span className="font-semibold text-gray-800 text-sm whitespace-nowrap">
                Profile Name
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-full hover:bg-gray-200 text-gray-600  sm:flex hidden"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isOpen ? <ChevronLeft size={10} /> : <ChevronRight size={10} />}
          </Button>
        </div>

        {/* Start New Button */}
        <div className="p-0 mb-6">
          <Button
            onClick={handlestartNew}
            className={`w-full flex items-center justify-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 ${
              isOpen ? "space-x-2" : "justify-center"
            }`}
            variant="ghost"
            size="sm"
          >
            <Plus size={20} />
            {isOpen && <span className="whitespace-nowrap">Start a new</span>}
          </Button>
        </div>

        <TooltipProvider delayDuration={100}>
          {/* Tools Section */}
          <nav className="mb-6">
            <h3
              className={`text-xs uppercase font-semibold text-gray-500 mb-2 px-2 ${
                isOpen ? "" : "hidden"
              } whitespace-nowrap`}
            >
              Tools
            </h3>
            <ul className="space-y-1">
              {toolItems.map((item) => (
                <motion.li
                  key={item.to}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {!isOpen ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <NavLink
                          to={item.to}
                          className={getNavLinkClassesClosed}
                        >
                          {({ isActive }) => (
                            <>
                              {item.icon}
                              {isActive && (
                                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
                              )}
                            </>
                          )}
                        </NavLink>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="ml-2">
                        {item.text}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <NavLink to={item.to} className={getNavLinkClassesOpen}>
                      {item.icon}
                      <span className="ml-2 font-medium whitespace-nowrap">
                        {item.text}
                      </span>
                    </NavLink>
                  )}
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* History Section */}
          <nav className="flex-1 overflow-y-auto pr-2">
            <h3
              className={`text-xs uppercase font-semibold text-gray-500 mb-2 px-2 ${
                isOpen ? "" : "hidden"
              } whitespace-nowrap`}
            >
              History
            </h3>
            <ul className="space-y-1">
              {historyItems.map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {!isOpen ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          to={item.to}
                          className="w-10 h-10 flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                        >
                          {item.icon}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="ml-2">
                        {item.text}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Link
                      to={item.to}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                    >
                      {item.icon}
                      <span className="ml-2 font-medium truncate whitespace-nowrap flex-grow">
                        {item.text}
                      </span>
                      <div className="cursor-pointer" onClick={handleEdit}>
                        <Edit
                          size={16}
                          className="text-gray-400 flex-shrink-0"
                        />
                      </div>
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </nav>
        </TooltipProvider>

        {/* Logout Button */}
        <div className="mt-auto pt-4 border-t border-gray-200">
          {!isOpen ? (
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => console.log("Logout clicked")}
                    className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 text-gray-700"
                  >
                    <LogOut size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="ml-2">
                  Logout
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full flex items-center p-2 rounded-lg hover:bg-gray-100 text-gray-700 space-x-2"
            >
              <LogOut size={20} />
              <span className="whitespace-nowrap">Logout</span>
            </Button>
          )}
        </div>
      </motion.aside>

      {/* Modal rendered here */}
      {showModal && <SocialMediaModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Sidebar;
