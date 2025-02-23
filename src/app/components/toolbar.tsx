
"use client";
import { useState ,RefObject} from "react";
import { File, Shapes, Film, Upload } from "lucide-react";
import ShapesPanel from "./shapes";
import AnimationPanel from "./anime";

interface ToolbarProps {
  setSvgData: React.Dispatch<React.SetStateAction<string | null>>;
  fileInputRef: RefObject<HTMLInputElement | null>;
  triggerUpload: () => void;
}

export default function Toolbar({ setSvgData, fileInputRef, triggerUpload }: ToolbarProps) {
  const [showShapes, setShowShapes] = useState(false);
  const [showAnimations, setShowAnimations] = useState(false);

  return (
    <>
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 w-16 h-[300px] bg-time text-white flex flex-col items-center justify-center py-4 space-y-6 rounded-lg shadow-lg border border-gray-300">
        <button className="flex flex-col items-center space-y-1">
          <File size={24} />
          <span className="text-xs">New</span>
        </button>

        {/* Shapes Button */}
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

        {/* Animations Button */}
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

        {/* Upload Button */}
        <button className="flex flex-col items-center space-y-1" onClick={triggerUpload}>
          <Upload size={24} />
          <span className="text-xs">Upload</span>
        </button>
      </div>

      {/* Render Panels */}
      <ShapesPanel isVisible={showShapes} />
      <AnimationPanel isVisible={showAnimations} />
    </>
  );
}


// const Toolbar = ({ setSvgData, fileInputRef, triggerUpload }) => {
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && file.type === "image/svg+xml") {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setSvgData(reader.result as string); // Update the canvas with the uploaded SVG
//       };
//       reader.readAsText(file);
//     }
//   };

//   return (
//     <>
//       <input
//         type="file"
//         accept=".svg"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         style={{ display: "none" }}
//       />

//       <div className="absolute top-1/2 left-4 transform -translate-y-1/2 w-16 h-[300px] bg-time text-white flex flex-col items-center justify-center py-4 space-y-6 rounded-lg shadow-lg border border-gray-300">
//         <button className="flex flex-col items-center space-y-1">
//           <File size={24} />
//           <span className="text-xs">New</span>
//         </button>

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
//       </div>
//     </>
//   );
// };
