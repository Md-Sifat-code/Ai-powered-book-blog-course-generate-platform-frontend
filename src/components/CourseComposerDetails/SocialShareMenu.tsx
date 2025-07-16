import { FaYoutube, FaFacebookF, FaInstagram, FaXTwitter, FaTiktok } from "react-icons/fa6";
import { LuCopy } from "react-icons/lu";

const links = [
  { name: "You tube", icon: <FaYoutube className="text-red-600" /> },
  { name: "Facebook", icon: <FaFacebookF className="text-blue-600" /> },
  { name: "Instagram", icon: <FaInstagram className="text-pink-500" /> },
  { name: "X", icon: <FaXTwitter className="text-black" /> },
  { name: "TikTok", icon: <FaTiktok className="text-black" /> },
  { name: "Copy Link", icon: <LuCopy className="text-indigo-600" /> },
];

const SocialShareMenu = () => {
  return (
   <div className="relative w-max mx-auto mt-10">
      {/* Pointer */}
      <div className="absolute -top-2 left-10 w-4 h-4 bg-white rotate-45 shadow -z-0" />

      {/* Menu */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden border w-52 z-10 relative">
        {links.map((item, i) => (
          <div key={i}>
            <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer">
              <div className="text-lg">{item.icon}</div>
              <p className="text-sm text-gray-800">{item.name}</p>
            </div>
            {/* Render <hr> except after last item */}
            {i !== links.length - 1 && (
              <hr className="border-gray-100 mx-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialShareMenu;
