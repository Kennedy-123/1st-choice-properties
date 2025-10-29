"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Headphones, Loader2 } from "lucide-react";

export default function ChatPage() {
  const license = "19351171"; // your license number
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center gap-3 fixed top-0 left-0 right-0 z-10 mb-5">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>

        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
          <Headphones className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
            Maya - Support Agent
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs sm:text-sm text-gray-500">Online</span>
          </div>
        </div>
      </div>

      {/* Loader */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-20">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
            <p className="text-gray-600 font-medium">Loading chat...</p>
          </div>
        </div>
      )}

      <iframe
        src={`https://secure.livechatinc.com/licence/${license}/open_chat.cgi`}
        style={{ width: "100%", height: "100%", border: 0 }}
        allow="clipboard-read; clipboard-write; microphone; camera"
        title="Support Chat"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
