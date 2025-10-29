"use client";

import React from "react";

interface LoaderProps {
  size?: string; // Tailwind size like w-5 h-5
  color?: string; // Tailwind color like border-blue-600
  text?: string; // Optional loading text
}

const Loader: React.FC<LoaderProps> = ({
  size = "w-5 h-5",
  color = "border-white",
  text,
}) => {
  return (
    <div
      className={`${
        text
          ? "flex flex-col items-center space-y-2"
          : "inline-flex items-center"
      }`}
    >
      <span
        className={`inline-block ${size} border-2 border-t-transparent rounded-full animate-spin ${color}`}
      ></span>
      {text && <span className="text-sm text-gray-600">{text}</span>}
    </div>
  );
};

export default Loader;
