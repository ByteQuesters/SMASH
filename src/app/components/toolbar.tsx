
"use client";
import React, {useState , Dispatch, SetStateAction, RefObject } from "react";
import { File, Shapes, Film, Upload } from "lucide-react";
import ShapesPanel from "./shapes";
import AnimationPanel from "./anime";

export default function Toolbar() {
  const [showShapes, setShowShapes] = useState(false);
  const [showAnimations, setShowAnimations] = useState(false);

  return (
    <>
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 w-16 h-[300px] bg-time text-white flex flex-col items-center justify-center py-4 space-y-6 rounded-lg shadow-lg border border-gray-300">
        <button className="flex flex-col items-center space-y-1">
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


// "use client";
// import React, { useState, Dispatch, SetStateAction, RefObject } from "react";
// import { File, Shapes, Film, Upload } from "lucide-react";
// import ShapesPanel from "./shapes";
// import AnimationPanel from "./anime";

// interface ToolbarProps {
//   setSvgData: Dispatch<SetStateAction<string | null>>;
//   fileInputRef: RefObject<HTMLInputElement>;
//   triggerUpload: () => void;
// }

// const Toolbar: React.FC<ToolbarProps> = ({ setSvgData, fileInputRef, triggerUpload }) => {
//   const [showShapes, setShowShapes] = useState(false);
//   const [showAnimations, setShowAnimations] = useState(false);

//   return (
//     <>
//       <div className="absolute top-1/2 left-4 transform -translate-y-1/2 w-16 h-[300px] bg-time text-white flex flex-col items-center justify-center py-4 space-y-6 rounded-lg shadow-lg border border-gray-300">
//         {/* New File Button */}
//         <button className="flex flex-col items-center space-y-1">
//           <File size={24} />
//           <span className="text-xs">New</span>
//         </button>

//         {/* Shapes Panel Button */}
//         <button
//           className="flex flex-col items-center space-y-1"
//           onClick={() => {
//             setShowShapes((prev) => !prev);
//             setShowAnimations(false);
//           }}
//         >
//           <Shapes size={24} />
//           <span className="text-xs">Shapes</span>
//         </button>

//         {/* Animation Panel Button */}
//         <button
//           className="flex flex-col items-center space-y-1"
//           onClick={() => {
//             setShowAnimations((prev) => !prev);
//             setShowShapes(false);
//           }}
//         >
//           <Film size={24} />
//           <span className="text-xs">Animation</span>
//         </button>

//         {/* Upload Button */}
//         <button className="flex flex-col items-center space-y-1" onClick={triggerUpload}>
//           <Upload size={24} />
//           <span className="text-xs">Upload</span>
//         </button>

//         {/* Hidden File Input for Uploading */}
//         <input
//           type="file"
//           ref={fileInputRef}
//           style={{ display: "none" }}
//           accept=".svg"
//           onChange={(e) => {
//             const file = e.target.files?.[0];
//             if (file) {
//               const reader = new FileReader();
//               reader.onload = (event) => {
//                 if (event.target?.result) {
//                   setSvgData(event.target.result as string);
//                 }
//               };
//               reader.readAsText(file);
//             }
//           }}
//         />
//       </div>

//       {/* Panels */}
//       <ShapesPanel isVisible={showShapes} onClose={() => setShowShapes(false)} />
//       <AnimationPanel isVisible={showAnimations} onClose={() => setShowAnimations(false)} />
//     </>
//   );
// };

// export default Toolbar;
