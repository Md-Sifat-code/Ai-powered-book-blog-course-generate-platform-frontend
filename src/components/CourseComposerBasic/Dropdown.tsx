
import { FiShare2, FiEdit2, FiTrash2 } from 'react-icons/fi';
const Dropdown = () => {
  return (
   <div className="w-[160px] bg-white rounded-lg shadow-lg border border-gray-200 p-1.5">
      {/* Tail on left */}
      <div className="absolute -left-2 top-4 w-3 h-3 bg-white rotate-45 border-l border-t border-gray-200"></div>

      <ul className="space-y-1.5 text-sm font-medium text-[#0F172A]">
        <li className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer">
          <FiShare2 className="text-[16px]" />
          Share
        </li>
        <li className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer">
          <FiEdit2 className="text-[16px]" />
          Rename
        </li>
        <li className="flex items-center gap-2 px-3 py-2 rounded-md text-red-600 hover:bg-red-50 cursor-pointer">
          <FiTrash2 className="text-[16px]" />
          Delete
        </li>
      </ul>
    </div>
  )
}

export default Dropdown