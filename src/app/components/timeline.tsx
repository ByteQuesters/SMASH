"use client";

import { Plus } from "lucide-react";
import useStore,{framesState, itemState} from "../store";
import { useState,useEffect } from "react";

interface TimelineProps {
  frames: { id: number; svg: string }[];
  onCaptureFrame: () => void;
}

export default function Timeline() {
  const {frames,setFrames} = useStore() as framesState;
  const {items,setItems} = useStore() as itemState;
  const [frIndex,setFrIndex] = useState(0);
  const [fraIndex,setFraIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const handleFrameClick = (index:number)=>{
    if (isPlaying) return;
    const tempFrames = [...frames];
    tempFrames[frIndex] = items;
    setFrames(tempFrames);
    setFrIndex(index);
    setItems([...frames[index]]);
  }
  const handleAdd = ()=>{
    setFrIndex(frIndex+1);
    const tempFrames = [...(frames.slice(0,-1))];
    setFrames([...tempFrames,items,[]]);
    setItems([]);
  }

  const handlePlay = ()=>{
    if (isPlaying) return;
    setIsPlaying(true);
    const tempFrames = [...frames];
    tempFrames[frIndex] = {...items};
    console.log(JSON.stringify(tempFrames[frIndex])+" wtk "+ JSON.stringify(items));
    setFrames([...tempFrames,[]]);
    setFrames(frames.slice(0,-1));
    setFrames(tempFrames);
    let index = 0;
    console.log(JSON.stringify(frames));
    const id = setInterval(() => {
      setFrIndex(index);
      setItems([...frames[index]]);
      // console.log(JSON.stringify(items));
      index = (index + 1) % frames.length;
    }, 500); 
    setIntervalId(id);
    
  }

  const handleStop = () => {
    if (intervalId) clearInterval(intervalId);
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);
  return (
    <div className="absolute bottom-[20px] left-[3%] w-[95%] h-[100px] flex border-t border-gray-600 rounded-lg shadow-lg overflow-x-auto items-center bg-[#faf3e0] px-2">
      <div className="px-4 bg-gray-700 text-white flex items-center justify-center whitespace-nowrap">
        Timeline
      </div>
      <div className="flex items-center space-x-2">
        {frames.map((frame, index) => (
          <div
            key={index}
            className={`w-16 h-16 border bg-gray-300 flex items-center justify-center rounded-md overflow-hidden ${
              index === frIndex ? "border-blue-500 border-2" : ""
            }`}
            onClick={() => handleFrameClick(index)}
          >
            {index + 1}
          </div>
        ))}
        <button
          onClick={handleAdd}
          className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600"
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="flex space-x-2 ml-4">
        <button
          onClick={handlePlay}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800"
        >
          Play Animation
        </button>
        <button
          onClick={handleStop}
          className="px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-800"
        >
          Pause Animation
        </button>
      </div>
    </div>
  );
}
