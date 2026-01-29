"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderProps {
  images: { id: string; imageUrl: string }[];
  title: string;
}

// Helper function to detect if URL is a video
const isVideo = (url: string): boolean => {
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.wmv', '.flv', '.mkv'];
  return videoExtensions.some(ext => url.toLowerCase().includes(ext));
};

export default function ImageSlider({ images, title }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [imageDimensions, setImageDimensions] = useState<{ [key: string]: { width: number; height: number } }>({});
  const [videoDimensions, setVideoDimensions] = useState<{ [key: string]: { width: number; height: number } }>({});
  const sliderRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // Function to determine object-fit based on media aspect ratio
  const getObjectFit = (mediaId: string, isVideoMedia: boolean = false): string => {
    const dimensions = isVideoMedia ? videoDimensions[mediaId] : imageDimensions[mediaId];
    if (!dimensions) return 'object-cover';
    
    const aspectRatio = dimensions.width / dimensions.height;
    // If media is portrait (height > width), use object-contain to show full content
    // If media is landscape or square, use object-cover for better fill
    return aspectRatio < 1 ? 'object-contain' : 'object-cover';
  };

  // Load image dimensions
  useEffect(() => {
    images.forEach((img) => {
      if (!isVideo(img.imageUrl) && !imageDimensions[img.id]) {
        const imgElement = new window.Image();
        imgElement.onload = () => {
          setImageDimensions(prev => ({
            ...prev,
            [img.id]: { width: imgElement.naturalWidth, height: imgElement.naturalHeight }
          }));
        };
        imgElement.src = img.imageUrl;
      }
    });
  }, [images, imageDimensions]);

  // Load video dimensions
  useEffect(() => {
    images.forEach((img) => {
      if (isVideo(img.imageUrl) && !videoDimensions[img.id]) {
        const videoElement = document.createElement('video');
        videoElement.addEventListener('loadedmetadata', () => {
          setVideoDimensions(prev => ({
            ...prev,
            [img.id]: { width: videoElement.videoWidth, height: videoElement.videoHeight }
          }));
        });
        videoElement.src = img.imageUrl;
      }
    });
  }, [images, videoDimensions]);

  const pauseAllVideos = () => {
    Object.values(videoRefs.current).forEach(video => {
      if (video && !video.paused) {
        video.pause();
      }
    });
  };

  const handlePrev = () => {
    pauseAllVideos();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    pauseAllVideos();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const threshold = 50;
    if (Math.abs(translateX) > threshold) {
      if (translateX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    
    setIsDragging(false);
    setTranslateX(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const threshold = 50;
    if (Math.abs(translateX) > threshold) {
      if (translateX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    
    setIsDragging(false);
    setTranslateX(0);
  };

  const goToSlide = (index: number) => {
    pauseAllVideos();
    setCurrentIndex(index);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setTranslateX(0);
      }
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isDragging]);

  if (!images || images.length === 0) {
    return (
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Slider */}
      <div 
        ref={sliderRef}
        className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex h-full transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          {images.map((img, index) => (
            <div key={img.id} className="w-full h-full flex-shrink-0">
              <div className="relative w-full h-full">
                {isVideo(img.imageUrl) ? (
                  <video
                    ref={(el) => { videoRefs.current[img.id] = el; }}
                    src={img.imageUrl}
                    className={`w-full h-full ${getObjectFit(img.id, true)}`}
                    controls
                    muted
                    preload="metadata"
                    aria-label={`${title} - Video ${index + 1}`}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={img.imageUrl}
                    alt={`${title} - Image ${index + 1}`}
                    fill
                    className={getObjectFit(img.id, false)}
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {images.map((img, index) => (
            <button
              key={img.id}
              onClick={() => goToSlide(index)}
              className={`relative aspect-square rounded overflow-hidden border-2 transition-all ${
                index === currentIndex 
                  ? 'border-green-500 scale-105' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {isVideo(img.imageUrl) ? (
                <div className="relative w-full h-full">
                  <video
                    src={img.imageUrl}
                    className="w-full h-full object-cover"
                    muted
                    preload="metadata"
                    aria-label={`Video thumbnail ${index + 1}`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[8px] border-l-gray-800 border-y-[4px] border-y-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <Image
                  src={img.imageUrl}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
