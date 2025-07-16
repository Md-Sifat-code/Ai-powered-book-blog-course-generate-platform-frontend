import React, { useState, useRef, useEffect } from "react"
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaFile,
} from "react-icons/fa"
import {
  FiPaperclip,
  FiMic,
  FiX,
} from "react-icons/fi"
import { IoChevronDownOutline, IoShareSocialOutline } from "react-icons/io5"
import { BsGrid1X2 } from "react-icons/bs"
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"
import videos from "../../assets/gnvd.mp4"
import SocialShareMenu from "@/components/CourseComposerDetails/SocialShareMenu"
import DocumentsOptionsMenu from "@/components/CourseComposerDetails/DocumentOptionsMenu"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp?: string
  hasDocument?: boolean
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

const MessageBubble = ({
  message,
  onOpenVideo,
}: {
  message: Message
  onOpenVideo?: () => void
}) => (
  <div className={`space-y-2 ${message.type === "user" ? "ml-8 text-T-900" : "text-T-600"}`}>
    {message.type === "user" ? (
      <div className="bg-T-300 rounded-lg p-3 text-sm">{message.content}</div>
    ) : (
      <div className="space-y-1">
        <p className="text-sm">{message.content}</p>
        {message.hasDocument && (
          <div className="p-3 bg-gray-100 border rounded flex items-center space-x-2 justify-between">
            <div className="flex items-center space-x-2">
              <FaFile className="text-gray-500" />
              <div className="flex-1">
                <p className="font-medium text-sm">{message.content}</p>
                {message.timestamp && (
                  <p className="text-xs text-gray-500">{message.timestamp}</p>
                )}
              </div>
            </div>
            {/* Open button only on mobile */}
            {onOpenVideo && (
              <button
                onClick={onOpenVideo}
                className="block sm:hidden text-sm bg-T-900 px-3 py-2 rounded-md text-primary-0"
              >
                Open
              </button>
            )}
          </div>
        )}
      </div>
    )}
  </div>
)

export default function VideoVisionDetails() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [videoDuration] = useState(20)
  const [fileName, setFileName] = useState<string | null>(null)
  const [ratio, setRatio] = useState("2:1")
  const [duration, setDuration] = useState("20s")
  const [textInput, setTextInput] = useState("")
  const [isMobileVideoVisible, setIsMobileVideoVisible] = useState(false)
  const [visibleMenu, setVisibleMenu] = useState<"share" | "docs" | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "user",
      content: "Generate a 20sec video with the selected avatar",
    },
    {
      id: "2",
      type: "assistant",
      content: "Here's an image with the selected avatar you chose.",
    },
    {
      id: "3",
      type: "assistant",
      content: "20-Second Real Estate Video Script",
      timestamp: "May 25, 10:15 AM",
      hasDocument: true,
    },
  ])

  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!videoRef.current) return
    videoRef.current.muted = isMuted
    isPlaying ? videoRef.current.play() : videoRef.current.pause()
  }, [isPlaying, isMuted])

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition()

  useEffect(() => {
    if (transcript) {
      setTextInput((prev) => (prev ? prev + " " + transcript : transcript))
      resetTranscript()
    }
  }, [transcript])

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect()
      const newTime = ((e.clientX - rect.left) / rect.width) * videoDuration
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleSendMessage = () => {
    if (!textInput.trim()) return
    const newMsg: Message = {
      id: Date.now().toString(),
      type: "user",
      content: textInput.trim(),
    }
    setMessages((prev) => [...prev, newMsg])
    setTextInput("")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setFileName(file.name)
  }

  const handleRatioChange = () => {
    setRatio((prev) => (prev === "2:1" ? "16:9" : "2:1"))
  }

  const handleDurationChange = () => {
    setDuration((prev) => (prev === "20s" ? "30s" : "20s"))
  }

  const handleMicClick = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Speech recognition is not supported in this browser.")
      return
    }

    if (listening) {
      SpeechRecognition.stopListening()
    } else {
      SpeechRecognition.startListening({ continuous: false })
    }
  }

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gray-50 text-sm">
      {/* Sidebar */}
      <aside className={`w-full sm:w-96 border-r bg-white flex-col h-screen ${isMobileVideoVisible ? "hidden sm:flex" : "flex"}`}>
        <header className="p-4 border-b">
          <div className="bg-gray-100 p-3 rounded text-sm text-gray-700">
            Generate a 20sec video with the selected avatar
          </div>
        </header>

        <main className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              onOpenVideo={
                msg.hasDocument ? () => setIsMobileVideoVisible(true) : undefined
              }
            />
          ))}
        </main>

        <footer className="p-4 border-t bg-white">
          <div className="flex flex-col gap-4">
            <textarea
              placeholder="Describe what you want to see"
              className="w-full resize-none outline-none text-gray-700 placeholder-gray-400 px-3 py-2 min-h-[80px] text-base border border-gray-200 rounded"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center flex-wrap gap-2">
                {fileName && (
                  <div className="bg-gray-100 rounded-full py-1 px-3 flex items-center gap-1">
                    <span className="text-sm truncate max-w-[120px]">{fileName}</span>
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => setFileName(null)}>
                      <FiX size={16} />
                    </button>
                  </div>
                )}

                <label className="text-gray-400 hover:text-gray-600 cursor-pointer">
                  <FiPaperclip size={20} />
                  <input type="file" onChange={handleFileChange} className="hidden" />
                </label>

                <button
                  onClick={handleRatioChange}
                  className="flex items-center gap-1 border-x px-3 border-gray-200 text-gray-400 hover:text-gray-600"
                >
                  <BsGrid1X2 size={16} />
                  <span className="text-sm">{ratio}</span>
                </button>

                <button
                  onClick={handleDurationChange}
                  className="flex items-center gap-1 text-gray-400 hover:text-gray-600"
                >
                  <span className="text-sm">{duration}</span>
                  <IoChevronDownOutline size={16} />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button className="text-gray-400 hover:text-gray-600" onClick={handleMicClick}>
                  <FiMic size={20} />
                </button>

                <button
                  className="bg-gray-800 text-white px-5 py-2 rounded-md hover:bg-gray-700 transition"
                  onClick={handleSendMessage}
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </footer>
      </aside>

      {/* Video Section */}
   <section
      className={`flex-1 flex-col ${isMobileVideoVisible ? "flex" : "hidden"} sm:flex`}
    >
      <header className="flex justify-between items-center p-4 border-b bg-white">
        <div className="flex items-center gap-2">
          <FaFile />
          <span className="font-medium">Video Preview</span>
        </div>

        {/* Button Group with Floating Menus */}
        <div className="flex gap-2 items-center relative">
          {/* Floating Menus */}
          {visibleMenu === "share" && (
            <div className="absolute top-full right-16 z-30 rounded-lg">
              <SocialShareMenu />
            </div>
          )}
          {visibleMenu === "docs" && (
            <div className="absolute top-full right-8 z-30 rounded-lg">
              <DocumentsOptionsMenu />
            </div>
          )}

          {/* Trigger Buttons */}
                <button
              className="p-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 me-5"
              aria-label="Download"
              onClick={() => setVisibleMenu((prev) => (prev === "docs" ? null : "docs"))}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </button>
          <button className="text-gray-700 hover:bg-gray-200 rounded-full p-2 text-xl sm:text-2xl focus:outline-none focus:ring-2 focus:ring-gray-300" onClick={() => setVisibleMenu((prev) => (prev === "share" ? null : "share"))}>
           <IoShareSocialOutline />
          </button>

          {/* Back button on mobile */}
          <button
            className="sm:hidden text-sm text-blue-600 ml-4"
            onClick={() => setIsMobileVideoVisible(false)}
          >
            ← Back
          </button>
        </div>
      </header>

      <div className="flex-1 flex items-start justify-center p-8">
        <div className="relative w-full max-w-4xl">
          <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
            <video
              src={videos}
              ref={videoRef}
              className="w-full h-full object-cover"
              onTimeUpdate={handleTimeUpdate}
              muted={isMuted}
              autoPlay={isPlaying}
            />

            {/* Play/Pause Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying((prev) => !prev)}
                className="bg-black/60 text-white rounded-full w-16 h-16 flex items-center justify-center hover:bg-black/80"
              >
                {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
              </button>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center gap-3 text-white">
                <button onClick={() => setIsPlaying((p) => !p)}>
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>

                <button onClick={() => setIsMuted((p) => !p)}>
                  {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>

                <div
                  className="flex-1 h-1 bg-white/30 rounded cursor-pointer"
                  ref={progressRef}
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full bg-white rounded transition-all"
                    style={{ width: `${(currentTime / videoDuration) * 100}%` }}
                  />
                </div>

                <span className="text-xs font-mono">
                  {formatTime(currentTime)} / {formatTime(videoDuration)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
