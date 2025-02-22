
"use client";
import { useState } from "react";
import { File, Shapes, Film, Upload } from "lucide-react";
import ShapesPanel from "./shapes";

export default function Toolbar() {
  const [showShapes, setShowShapes] = useState(false);

  return (
    <>
        
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 w-16 h-[300px] bg-time text-white flex flex-col items-center justify-center py-4 space-y-6 rounded-lg shadow-lg border border-gray-300">
        <button className="flex flex-col items-center space-y-1">
          <File size={24} />
          <span className="text-xs">New</span>
        </button>
        
        <button
          className="flex flex-col items-center space-y-1"
          onClick={() => setShowShapes((prev) => !prev)}
        >
          <Shapes size={24} />
          <span className="text-xs">Shapes</span>
        </button>

        <button className="flex flex-col items-center space-y-1">
          <Film size={24} />
          <span className="text-xs">Animation</span>
        </button>

        <button className="flex flex-col items-center space-y-1">
          <Upload size={24} />
          <span className="text-xs">Upload</span>
        </button>
      </div>

      <ShapesPanel isVisible={showShapes} />
    </>
  );
}
