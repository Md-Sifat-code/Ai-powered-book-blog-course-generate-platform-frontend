import { IoDocumentTextSharp } from "react-icons/io5";
import { FaFilePdf } from "react-icons/fa6";
import { FaRegFileExcel } from "react-icons/fa";

const links = [
  { name: "Doc", icon: <IoDocumentTextSharp className="text-blue-600" /> },
  { name: "PDF", icon: <FaFilePdf/> },
  { name: "Excel", icon: <FaRegFileExcel className="text-green-400" /> },
];

const BookDocumentOptionMenu = () => {
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

export default BookDocumentOptionMenu;
