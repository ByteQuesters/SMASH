"use client";

import { Plus, Trash } from "lucide-react";
import useStore,{framesState, frIndexState} from "../store";
import { useState,useEffect } from "react";

// interface TimelineProps {
//   frames: { id: number; svg: string }[];
//   onCaptureFrame: () => void;
// }

export default function Timeline() {
  const {frames,setFrames} = useStore() as framesState;
  // const {items,setItems} = useStore() as itemState;
  const {frIndex,setFrIndex} = useStore() as frIndexState;
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);


  const handleDelete = (index: number) => {
    if (frames.length === 1){
      setFrames([[]]);
      setFrIndex(0);
      return;
    }
    const newFrames = frames.filter((_, i) => i !== index);
    setFrames(newFrames);
    setFrIndex(Math.max(0, frIndex - 1));
  };

  const handleFrameClick = (index:number)=>{
    if (isPlaying) return;
    // const tempFrames = [...frames];
    // tempFrames[frIndex] = frames[fraIndex];
    // setFrames(tempFrames);
    setFrIndex(index);
    // setItems([...frames[index]]);
  }
  const handleAdd = ()=>{
    // const tempFrames = [...(frames.slice(0,-1))];
    // setFrames([...tempFrames,frames[frIndex],[]]);
    // setFrIndex(frIndex + 1);
    // setFraIndex(fraIndex + 1);
    // setItems([]);
    setFrames([...frames,[]]);
    setFrIndex(frIndex + 1);
  }

  const handlePlay = ()=>{
    if (isPlaying) return;
    setIsPlaying(true);
    // const tempFrames = [...frames];
    // tempFrames[frIndex] = {...items};
    // console.log(JSON.stringify(tempFrames[frIndex])+" wtk "+ JSON.stringify(items));
    // setFrames([...tempFrames,[]]);
    // setFrames(frames.slice(0,-1));
    // setFrames(tempFrames);
    let index = 0;
    console.log(JSON.stringify(frames));
    const id = setInterval(() => {
      setFrIndex(index);
      // setItems([...frames[index]]);
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
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => handleFrameClick(index)}
          >
            {hoverIndex !== index && <div>{index + 1}</div>}
            {hoverIndex === index && (
              <button
                className="hover:text-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(index);
                }}
              >
                <Trash size={20} />
              </button>
            )}
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
