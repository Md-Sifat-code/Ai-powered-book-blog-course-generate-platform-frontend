import {
  FaBook,
  FaVideo,
  FaBlog,
  FaChalkboardTeacher,
  FaSignOutAlt,
  FaPlus,
} from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import layer from '../../assets/layer.png';
import history from '../../assets/history.png';
import vector from '../../assets/Vector.png';
import Dropdown from './Dropdown';
const historyData = [
  { id: 1, title: 'Video: Drone shot of a Duplex' },
  { id: 2, title: 'Blog: Best Solution For Real...' },
  { id: 3, title: 'Course: Your First Step to the' },
  { id: 4, title: 'Book: Real Estate Fundamen...' },
];

const Sidebar = () => {
  return (
    <div className="relative w-full max-w-[350px] h-screen bg-white border-r border-gray-200 p-5 flex flex-col justify-between">
      <div>
        {/* Profile */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
          <div>
            <p className="text-[16px] font-semibold text-gray-900">Profile Name</p>
            <p className="text-xs text-gray-500">Real Estate Instructor</p>
          </div>
          <div className="ml-auto text-[#4D4D4D] cursor-pointer border-1 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </div>
        </div>

        {/* Start New Button */}
        <button className="w-full bg-gray-900 text-white py-2 rounded-lg text-[16px] flex items-center justify-center gap-2 mb-5 mt-3 hover:bg-gray-800 transition">
          <FaPlus className="text-white" /> Start a new
        </button>

        {/* Tools */}
        <div className="mb-6">
          <div className="flex items-center gap-x-3 mb-5">
            <img src={layer} alt="Tools Icon" />
            <span className="text-[18px] text-black font-semibold">Tools</span>
          </div>
          <ul className="space-y-5 ms-5">
            <li className="flex items-center gap-2 text-sm text-gray-800 font-medium">
              <FaBook className="text-lg text-gray-600" /> BookGenie AI
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-800 font-medium">
              <FaVideo className="text-lg text-gray-600" /> VideoVision AI
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-800 font-medium">
              <FaBlog className="text-lg text-gray-600" /> BlogBot AI
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-800 font-medium bg-gray-100 rounded-md px-2 py-1">
              <FaChalkboardTeacher className="text-lg text-gray-600" /> CourseComposer AI
            </li>
          </ul>
        </div>

        {/* History */}
        <div>
          <div className="flex items-center gap-x-3 mb-3">
            <img src={history} alt="History Icon" />
            <p className="text-[18px] text-black font-semibold">History</p>
          </div>
          <ul className="space-y-4 text-sm text-gray-800">
            {historyData.map((item, idx) => (
              <li key={item.id} className="flex justify-between items-center group">
                <span className="truncate max-w-[200px]">{item.title}</span>
                {idx < historyData.length - 1 ? (
                  <img src={vector} alt="processing" className="w-4 h-4 opacity-70" />
                ) : (
                  <BsThreeDots className="text-gray-400 group-hover:text-black cursor-pointer" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Logout */}
      <div className="pt-4 border-t border-gray-200">
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition">
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Centered Dropdown */}
      <div className="absolute top-1/2 left-[115%] transform -translate-x-1/2 -translate-y-1/2 z-50">
        <Dropdown />
      </div>
    </div>
  );
};

export default Sidebar;
