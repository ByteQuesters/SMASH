
"use client";
import React, {useState } from "react";
import { File, Shapes, Film, Upload } from "lucide-react";
import ShapesPanel from "./shapes";
import AnimationPanel from "./anime";
import useStore, { framesState, frIndexState } from "../store";

export default function Toolbar() {
  const [showShapes, setShowShapes] = useState(false);
  const [showAnimations, setShowAnimations] = useState(false);
  const {frames,setFrames} = useStore() as framesState;
  const {frIndex,setFrIndex} = useStore() as frIndexState;

  const handleAdd = () => {
    setFrames([...frames, []]);
    setFrIndex(frIndex + 1);
  };

  return (
    <>
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 w-16 h-[300px] bg-time text-white flex flex-col items-center justify-center py-4 space-y-6 rounded-lg shadow-lg border border-gray-300">
        <button className="flex flex-col items-center space-y-1" onClick={() => {handleAdd();}}>
          <File size={24} />
          <span className="text-xs">New</span>
        </button>

        <button
          className="flex flex-col items-center space-y-1"
          onClick={() => {
            setShowShapes((prev) => !prev);
            setShowAnimations(false);
          }}
        >
          <Shapes size={24} />
          <span className="text-xs">Shapes</span>
        </button>

        <button
          className="flex flex-col items-center space-y-1"
          onClick={() => {
            setShowAnimations((prev) => !prev);
            setShowShapes(false); 
          }}
        >
          <Film size={24} />
          <span className="text-xs">Animation</span>
        </button>

        <button className="flex flex-col items-center space-y-1">
          <Upload size={24} />
          <span className="text-xs">Upload</span>
        </button>
      </div>

      <ShapesPanel isVisible={showShapes} onClose={() => setShowShapes(false)} />
      <AnimationPanel isVisible={showAnimations} onClose={() => setShowAnimations(false)} />
    </>
  );
}