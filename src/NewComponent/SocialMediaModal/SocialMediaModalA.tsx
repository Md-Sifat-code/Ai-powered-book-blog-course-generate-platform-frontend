import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";

interface SocialMediaModalProps {
  onClose: () => void;
}

type View = "profile" | "social" | "account";

const SocialMediaModal: React.FC<SocialMediaModalProps> = ({ onClose }) => {
  const [activeView, setActiveView] = useState<View>("profile");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [profileName, setProfileName] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative bg-white rounded-xl w-full max-w-[865px] h-auto p-4 md:p-6 flex flex-col md:flex-row shadow-lg overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r pr-0 md:pr-4 pb-4 md:pb-0">
          <h3 className="font-semibold text-gray-700 mb-4">Settings</h3>
          <ul className="space-y-3">
            <li
              onClick={() => setActiveView("profile")}
              className={`rounded-md p-2 font-medium text-sm flex items-center gap-2 cursor-pointer ${
                activeView === "profile" ? "bg-gray-100 text-black" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>👤</span> Profile
            </li>
            <li
              onClick={() => setActiveView("social")}
              className={`rounded-md p-2 font-medium text-sm flex items-center gap-2 cursor-pointer ${
                activeView === "social" ? "bg-gray-100 text-black" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>🔗</span> Link Social Medias
            </li>
            <li
              onClick={() => setActiveView("account")}
              className={`rounded-md p-2 font-medium text-sm flex items-center gap-2 cursor-pointer ${
                activeView === "account" ? "bg-gray-100 text-black" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>⚙️</span> Accounts Settings
            </li>
          </ul>
        </div>

        {/* Right Content Area */}
        <div className="w-full md:w-2/3 px-0 md:px-6   rounded-2xl bg-T-600 min-h-[400px]">
          {activeView === "profile" && (
            <div className="flex flex-col items-center justify-center mt-6 space-y-6">
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
                className="text-sm px-4 py-1 rounded bg-black text-white flex items-center gap-2"
                onClick={handleUploadClick}
              >
                Uploads <Upload size={16} />
              </button>

              {selectedFileName && (
                <p className="text-xs text-gray-500 truncate w-full text-center">
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

              <div className="w-full space-y-4">
                <div>
                  <label className="block mb-1 font-medium text-sm text-gray-700">Profile Name:</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-sm text-gray-700">Designation:</label>
                  <input
                    type="text"
                    placeholder="Real Estate Instructor"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                </div>
              </div>
            </div>
          )}

          {activeView === "social" && (
            <div className="mt-6 space-y-4">
              {["Facebook", "Instagram", "YouTube", "X", "TikTok"].map((platform) => (
                <div
                  key={platform}
                  className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2 bg-white"
                >
                  <div className="flex items-center gap-2">
                    <span>{platform}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Profile Link"
                      className="border border-gray-300 rounded px-2 py-1 text-sm w-48"
                    />
                    <button className="bg-black text-white px-3 py-1 text-sm rounded">Add</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeView === "account" && (
            <div className="mt-6 p-4 text-gray-700 text-sm">
              <h2 className="font-bold text-lg mb-2">Account Settings</h2>
              <p>Here you can configure account-level options. (Add your settings UI here)</p>
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-lg"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default SocialMediaModal;
