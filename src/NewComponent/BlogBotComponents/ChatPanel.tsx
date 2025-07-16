import { useState } from "react";
import btn from "../../assets/Frame 68.png";

const ChatPanel = ({ onToggle }: { onToggle: () => void }) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([
        {
            sender: "user",
            text: "Generate a blog about Understanding the Real Estate Buying, Selling, and Investing",
        },
        {
            sender: "bot",
            text: `Here's an image that you can use for your blog post: Here's a blog post about real estate, incorporating a placeholder for an image to illustrate the content.`,
        },
    ]);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessage = { sender: "user" as const, text: "Generate a blog about Understanding the Real Estate Buying, Selling, and Investing" };
        const botReply = { sender: "bot" as const, text: "Here's an image that you can use for your blog post: Here's a blog post about real estate, incorporating a placeholder for an image to illustrate the content." };

        setMessages((prev) => [...prev, newMessage, botReply]);
        setInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleClick = () => {
        onToggle(); // Toggle visibility of TextEditorPage
    };

    return (
        <div className="w-full min-h-screen border-r border-gray-300 flex flex-col bg-white">
            {/* Chat area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`max-w-[80%] px-4 py-2 rounded-lg text-[#333333] text-sm ${msg.sender === "user" ? "bg-gray-100 self-end ml-auto" : "bg-gray-200 self-start mr-auto"}`}
                    >
                        {msg.text}
                        {msg.sender === "bot" && (
                            <div className="flex justify-end">
                                <button
                                    className="cursor-pointer text-end mt-2 px-3 py-1 bg-black text-white text-xs rounded hover:bg-gray-900 transition"
                                    onClick={handleClick}
                                >
                                    Open
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Input area */}
            <div className="p-4 relative border-t border-gray-200 flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message"
                    className="w-full px-3 py-2 border rounded-2xl focus:outline-none pb-4"
                />
                <button onClick={handleSend} className="cursor-pointer text-blue-600 absolute right-5 hover:text-blue-800" aria-label="Send message">
                    <img src={btn} className="w-6 h-6" alt="" />
                </button>
            </div>
        </div>
    );
};

export default ChatPanel;
