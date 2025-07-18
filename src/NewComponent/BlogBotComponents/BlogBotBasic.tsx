
import { useGenerateBlogMutation } from "@/store/api/blog/blog.api";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BlogBotBasic: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState(["Blogbot AI"]);
  const navigate = useNavigate();
  const [generateBlog, { isLoading }] = useGenerateBlogMutation();

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(inputValue);

    try {
      const result = await generateBlog({ prompt: inputValue }).unwrap();
      if (result.status === "success") {
        navigate(`/dashboard/blogbot/${result.historyId}`);
      }
    } catch (error) {
      console.log(error);
    }

    // Add your generation logic here
  };

  // Example data for articles (you'd likely fetch this from an API)
  const articles = [
    {
      title: "Thinking about an Adjustable-Rate Mortgage? Read This First.",
      description: "If you've been house hunting lately, you've probably felt the sting of today's mortgage rates.",
      date: "May 22, 2025",
    },
    {
      title: "You Could Use Some of Your Equity To Give Your Children the Gift of Home",
      description:
        "If you're a homeowner, chances are you've built up a lot of wealth - just by living in your house and watching its value grow over time.",
      date: "May 21, 2025",
    },
    {
      title: "More Homes for Sale Isn't a Warning Sign – It's Your Buying Opportunity",
      description:
        "If you're a homeowner, chances are you've built up a lot of wealth - just by living in your house and watching its value grow over time.",
      date: "May 21, 2025",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center px-4 ">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold mb-2">Command Your Creative Process</h1>
          <h1 className="text-3xl sm:text-4xl font-semibold">
            With <span className="text-purple-600">AI</span> Studios.
          </h1>
        </div>

        {/* Input Section */}
        <form onSubmit={handleGenerate}>
          <div className="flex flex-col max-w-6xl mb-12 items-center justify-center  px-2">
            <div className="w-full  border border-gray-300 rounded-lg p-3  transition-all duration-200">
              {/* Input field */}
              <textarea
                placeholder="Describe what you want to see"
                className="w-full resize-none outline-none text-gray-700 placeholder-gray-400 px-2 py-1 min-h-[80px] text-base"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />

              {/* Tags and Generate button - positioned below input, justified */}
              <div className="flex justify-between items-center mt-3 flex-wrap gap-2">
                {/* Tags on the left */}
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="flex items-center bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="cursor-pointer ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>

                {/* Generate button on the right */}
                <button
                  type="submit"
                  className={` cursor-pointer px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200 shrink-0 `}
                >
                  {isLoading ? "Generating...." : "Generate"}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* History Section Title */}
        <div className="mb-6 mt-12 px-2">
          <h2 className="text-xl font-semibold text-gray-700">History</h2>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 ">
          {articles.map((article, index) => (
            <Link to="/dashboard/blogbot/:id">
              <div
                key={index}
                className="hover:scale-105 transition-all ease-in-out delay-300   p-4 rounded-lg border border-gray-200 hover:shadow-md  duration-200 bg-white no-underline text-inherit"
              >
                <h3 className="text-lg font-semibold mb-2 text-gray-900 leading-snug">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.description}</p>
                <p className="text-gray-500 text-xs">{article.date}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* See More Link */}
        <div className="flex justify-center mb-16 mt-8">
          <Link to="/dashboard/blogbot/:id">
            <button className="cursor-pointer flex items-center text-indigo-600 hover:text-indigo-800 font-medium group focus:outline-none">
              See More
              <svg
                className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default BlogBotBasic;
