

import BookDocumentOptionMenu from '@/components/BookgenieAi/BookDocumentOptionMenu';
import BookgenieSocialShareMenu from '@/components/BookgenieAi/BookgenieSocialShareMenu';
import {  FileText, List, ListOrdered, Menu, Redo2, Undo2, X } from 'lucide-react'
import { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import { IoShareSocialOutline } from 'react-icons/io5';


export const TextEditorPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuVisible, setMenuVisible] = useState<'share' | 'download' | null>(null);

    const toggleMenu = (menu: 'share' | 'download') => {
        setMenuVisible((prev) => (prev === menu ? null : menu));
    };
    return (
        <div className="w-full h-full   bg-white ">
            <div className='bg-white  px-2 py-4'>
                <div className="flex relative flex-col md:flex-row gap-2 justify-between items-center border-b border-gray-300 pb-2 mb-2">
                    <div className="flex items-center gap-2">
                        <FileText className='cursor-pointer' />
                        <h1 className="line-clamp-1">
                            The Ultimate Guide to Real Estate: Buying, Selling, and Investing
                        </h1>
                    </div>
                    {/* <div className="flex items-center gap-2">
                        <Download className='cursor-pointer' />
                        <Share2 className='cursor-pointer' />
                    </div> */}
                    <div className="flex items-center gap-3 space-x-2 sm:space-x-3">
                        {/* Download Button */}
                        <button
                            className="p-2 cursor-pointer rounded-full bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700"
                            aria-label="Download"
                            onClick={() => toggleMenu('download')}
                        >
                            <FiDownload className='text-2xl' />
                        </button>

                        {/* Share Button */}
                        <button
                            className="text-gray-700 cursor-pointer hover:bg-gray-200 rounded-full p-1 text-xl focus:outline-none "
                            aria-label="Share"
                            onClick={() => toggleMenu('share')}
                        >
                            <IoShareSocialOutline className='text-2xl' />
                        </button>
                    </div>
                    {menuVisible === 'share' && (
                        <div className="absolute top-0 right-4 sm:right-6 mt-2 z-30">
                            <BookgenieSocialShareMenu />
                        </div>
                    )}

                    {/* Download Menu Dropdown */}
                    {menuVisible === 'download' && (
                        <div className="absolute top-0 right-4 sm:right-6 mt-2 z-30">
                            <BookDocumentOptionMenu />
                        </div>
                    )}
                </div>
                <div className='flex flex-col md:flex-row gap-2 items-center justify-between'>
                    <div className='flex gap-2 items-center'>
                        <Undo2 className='cursor-pointer'></Undo2>
                        <Redo2 className='cursor-pointer'></Redo2>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className="h-6 w-px bg-gray-300 mx-1 sm:mx-2"></div>
                        <select className='px-2 py-1 text-xs outline-none border-none cursor-pointer'>
                            <option value="Heading1">H1</option>
                            <option value="Heading2">H2</option>
                            <option value="Heading3">H3</option>
                            <option value="Heading4">H4</option>
                        </select>
                        <div className="h-6 w-px bg-gray-300 mx-1 sm:mx-2"></div>
                        <p className='cursor-pointer '>B</p>
                        <p className='cursor-pointer italic '>I</p>
                        <ListOrdered className='cursor-pointer'></ListOrdered>
                        <List className='cursor-pointer'></List>
                    </div>
                </div>

            </div>
            <div className="flex h-auto my-4 relative gap-2 bg-white">
                {/* Sidebar */}
                <div
                    className={`transition-all duration-300 bg-white absolute md:relative text-[#333333] h-full ${isOpen ? 'w-60' : 'w-12'
                        } flex flex-col`}
                >
                    <div className="flex items-center justify-center h-12">
                        {!isOpen ? (
                            <button onClick={() => setIsOpen(true)} aria-label="Open Sidebar">
                                <Menu className='text-black cursor-pointer' size={20} />
                            </button>
                        ) : (
                            <div className="flex justify-between items-center px-3 w-full">
                                <span className="text-sm font-semibold">Blog Table</span>
                                <button onClick={() => setIsOpen(false)} aria-label="Close Sidebar">
                                    <X className='text-black cursor-pointer' size={20} />
                                </button>
                            </div>
                        )}
                    </div>

                    {isOpen && (
                        <div className="p-3 space-y-2 text-sm">
                            <p>Digital Marketing Lead</p>
                            <ul className='text-xs text-[#333333] space-y-2'>
                                <li className='cursor-pointer'>Lesson 4.1: Building Your....</li>
                                <li className='cursor-pointer'>Lesson 4.2: Building Your....</li>
                                <li className='cursor-pointer'>Lesson 4.3: Building Your....</li>
                                <li className='cursor-pointer'>Lesson 4.4: Building Your....</li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-white p-4 ml-12 md:ml-0 space-y-2">
                    <h1 className="text-xl font-bold">Main Content Area</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis assumenda nam nihil et minus eveniet veritatis suscipit cupiditate porro doloribus!</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis assumenda nam nihil et minus eveniet veritatis suscipit cupiditate porro doloribus!</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis assumenda nam nihil et minus eveniet veritatis suscipit cupiditate porro doloribus!</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis assumenda nam nihil et minus eveniet veritatis suscipit cupiditate porro doloribus!</p>
                </div>
            </div>
        </div>
    );
};
// okay
