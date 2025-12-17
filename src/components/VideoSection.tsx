"use client";

import { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import Link from 'next/link';

const VideoSection = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play the video when component mounts
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      });
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2 relative pb-[100%] h-[500px] md:pb-[70%]">
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
            onClick={togglePlayPause}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
          >
            <source src="/videos/get-started.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={togglePlayPause}
              className="p-2 bg-black/60 rounded-full text-white hover:bg-black/80 transition-colors"
              aria-label={isPlaying ? "Pause video" : "Play video"}
              style={{
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isPlaying ? (
                <Pause size={20} className="w-5 h-5" />
              ) : (
                <Play size={20} className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={toggleMute}
              className="p-2 bg-black/60 rounded-full text-white hover:bg-black/80 transition-colors"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              style={{
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isMuted ? (
                <VolumeX size={20} className="w-5 h-5" />
              ) : (
                <Volume2 size={20} className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Text Content - Hidden on mobile, visible on md and up */}
        <div className="hidden md:block w-full md:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Discover Your Dream Home
          </h2>
          <p className="text-lg text-gray-600">
            Explore our exclusive collection of properties and find the
            perfect place to call home. Our team of experts is here to guide
            you through every step of your real estate journey.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Premium properties in prime locations
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Expert guidance and support
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Secure and transparent transactions
            </li>
          </ul>
          <Link href={'/rent'} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
            View Properties
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
