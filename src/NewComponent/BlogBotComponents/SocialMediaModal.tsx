import React, { useRef, useState } from "react";
import { Upload, Eye, EyeOff } from "lucide-react";
import { SocialIcon } from "react-social-icons";

interface SocialMediaModalProps {
  onClose: () => void;
}

const SocialMediaModal: React.FC<SocialMediaModalProps> = ({ onClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [profileName, setProfileName] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [activeView, setActiveView] = useState<"profile" | "social" | "account">("profile");
 const [isEditingEmail, setIsEditingEmail] = useState(false);
const [email, setEmail] = useState("yourmail@gmail.com");


  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    Facebook: "",
    YouTube: "",
    Instagram: "",
    X: "",
    TikTok: "",
  });

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
      console.log("Selected file:", file);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileName(e.target.value);
    console.log("Profile Name:", e.target.value);
  };

  const handleDesignationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesignation(e.target.value);
    console.log("Designation:", e.target.value);
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setSocialLinks((prev) => ({ ...prev, [platform]: value }));
    console.log(`${platform} Link:`, value);
  };

  const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
    console.log("Old Password:", e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    console.log("New Password:", e.target.value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative bg-white rounded-xl w-full max-w-[865px] h-auto p-4 md:p-6 flex flex-col md:flex-row justify-center md:justify-start items-center md:items-start shadow-lg overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r pr-0 md:pr-4 pb-4 md:pb-0">
          <h3 className="font-semibold text-gray-700 mb-4">Settings</h3>
          <ul className="space-y-3">
            <li
              onClick={() => setActiveView("profile")}
              className={`cursor-pointer rounded-md p-2 font-medium text-sm flex items-center gap-2 ${
                activeView === "profile" ? "bg-gray-100 text-black" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>👤</span> Profile
            </li>
            <li
              onClick={() => setActiveView("social")}
              className={`cursor-pointer rounded-md p-2 font-medium text-sm flex items-center gap-2 ${
                activeView === "social" ? "bg-gray-100 text-black" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>🔗</span> Link Social Medias
            </li>
            <li
              onClick={() => setActiveView("account")}
              className={`cursor-pointer rounded-md p-2 font-medium text-sm flex items-center gap-2 ${
                activeView === "account" ? "bg-gray-100 text-black" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>⚙️</span> Accounts Settings
            </li>
          </ul>
        </div>

        {/* Content Area */}
<div className="w-full sm:mx-auto md:mx-auto md:w-2/3 px-0 md:px-6 md:ml-[5px] lg:ml-[5px] m-4 rounded-2xl bg-[#F0F0F0] min-h-[400px]">


          {/* Profile View */}
          {activeView === "profile" && (
            <div className="flex flex-col items-center justify-center mt-6">
              {imagePreviewUrl ? (
                <img
                  src={imagePreviewUrl}
                  alt="Profile Preview"
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-400"
                />
              ) : (
                <div className="w-16 h-16 border-2 border-gray-400 rounded-full flex items-center justify-center text-gray-500 text-2xl">
                  👤
                </div>
              )}
              <button
                className="mt-3 text-sm px-4 py-1 rounded bg-black text-white flex items-center gap-2"
                onClick={handleUploadClick}
              >
                Upload <Upload size={16} />
              </button>
              {selectedFileName && (
                <p className="text-xs text-gray-500 mt-1 truncate w-full text-center">
                  Selected: {selectedFileName}
                </p>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="mt-10 space-y-6 px-4 md:px-0 w-full">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={profileName}
                  onChange={handleProfileChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none text-sm"
                />
                <input
                  type="text"
                  placeholder="Real Estate Instructor"
                  value={designation}
                  onChange={handleDesignationChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none text-sm"
                />
              </div>
            </div>
          )}

          {/* Social Links */}
          {activeView === "social" && (
            <div className="mt-6 space-y-4 px-4">
              {Object.entries(socialLinks).map(([name, value]) => (
                <div
                  key={name}
                  className="flex items-center gap-2 bg-white border border-gray-300 rounded px-4 py-2"
                >
                  <SocialIcon url={`https://${name.toLowerCase()}.com`} style={{ height: 24, width: 24 }} />
                  <input
                    type="text"
                    placeholder={`${name} Profile Link`}
                    value={value}
                    onChange={(e) => handleSocialLinkChange(name, e.target.value)}
                    className="flex-grow border border-gray-300 rounded px-2 py-1 text-sm"
                  />
                  <button className="bg-black text-white px-3 py-1 text-sm rounded">Add</button>
                </div>
              ))}
            </div>
          )}

          {/* Account View */}
         {/* Account View */}
{activeView === "account" && (
  <div className="p-6 space-y-4">
    {/* Email field with toggle */}
    <div className="flex items-center justify-between bg-white border border-gray-300 rounded px-4 py-2">
      {isEditingEmail ? (
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            console.log("Email:", e.target.value);
          }}
          placeholder="Gmail: yourmail@gmail.com"
          className="flex-grow text-sm border-none outline-none bg-transparent"
        />
      ) : (
        <p className="text-sm text-gray-800">Gmail: {email}</p>
      )}

      <button
        onClick={() => setIsEditingEmail(!isEditingEmail)}
        className="text-sm border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 ml-2"
      >
        {isEditingEmail ? "Save" : "Edit"}
      </button>
    </div>

    {/* Password field */}
    <div className="flex items-center justify-between bg-white border border-gray-300 rounded px-4 py-2">
      <p className="text-sm text-gray-800">Password: ********</p>
      <button
        onClick={() => setShowPasswordModal(true)}
        className="text-sm bg-black text-white px-3 py-1 rounded hover:bg-gray-800 ml-2"
      >
        Change Password
      </button>
    </div>
  </div>
)}


        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-lg"
        >
          ✕
        </button>

        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1 font-medium text-gray-700">Old Password:</label>
                  <div className="relative">
                    <input
                      type={oldPasswordVisible ? "text" : "password"}
                      value={oldPassword}
                      onChange={handleOldPasswordChange}
                      className="w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setOldPasswordVisible(!oldPasswordVisible)}
                      className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                    >
                      {oldPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1 font-medium text-gray-700">New Password:</label>
                  <div className="relative">
                    <input
                      type={newPasswordVisible ? "text" : "password"}
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      className="w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                      className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                    >
                      {newPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="px-6 py-2 border border-black rounded text-sm hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button className="px-6 py-2 bg-black text-white rounded text-sm hover:bg-gray-800">
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMediaModal;
