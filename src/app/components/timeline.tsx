
// "use client";

// import { Plus } from "lucide-react";

// interface TimelineProps {
//   frames: { id: number; svg: string }[];
//   onCaptureFrame: () => void;
// }

// export default function Timeline({ frames, onCaptureFrame }: TimelineProps) {
//   return (
//     <div className="absolute bottom-[20px] left-[3%] w-[95%] h-[100px] flex border-t border-gray-600 rounded-lg shadow-lg overflow-x-auto items-center bg-[#faf3e0] px-2">
//       <div className="px-4 bg-gray-700 text-white flex items-center justify-center whitespace-nowrap">
//         Timeline
//       </div>
//       <div className="flex items-center space-x-2">
//         {frames.map((frame) => (
//           <div key={frame.id} className="w-16 h-16 border bg-gray-300 flex items-center justify-center rounded-md overflow-hidden">
//             <div dangerouslySetInnerHTML={{ __html: frame.svg }} className="w-full h-full" />
//           </div>
//         ))}
//         <button
//           onClick={onCaptureFrame}
//           className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600"
//         >
//           <Plus size={20} />
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";

import { Plus } from "lucide-react";
import useStore,{framesState, itemState} from "../store";

interface TimelineProps {
  frames: { id: number; svg: string }[];
  onCaptureFrame: () => void;
}

export default function Timeline() {
  const {frames,setFrames} = useStore() as framesState;
  const {items,setItems} = useStore() as itemState;
  const handleFrameClick = (index:number)=>{
    setItems([...frames[index]]);
  }
  const handleAdd = ()=>{
    const tempFrames = frames.slice(0,-1);
    setFrames([...tempFrames,items,[]]);
    setItems([]);
  }
  return (
    <div className="absolute bottom-[20px] left-[3%] w-[95%] h-[100px] flex border-t border-gray-600 rounded-lg shadow-lg overflow-x-auto items-center bg-[#faf3e0] px-2">
      <div className="px-4 bg-gray-700 text-white flex items-center justify-center whitespace-nowrap">
        Timeline
      </div>
      <div className="flex items-center space-x-2">
        {frames.map((frame,index) => (
          <div key={index} className="w-16 h-16 border bg-gray-300 flex items-center justify-center rounded-md overflow-hidden" onClick={(e)=>{handleFrameClick(index)}}>
            {index+1}
          </div>
        ))}
        <button
          onClick={handleAdd}
          className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
}
