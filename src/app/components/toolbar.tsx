
"use client";
import React, {useState,useRef, useEffect } from "react";
import { File, Shapes, Film, Upload } from "lucide-react";
import ShapesPanel from "./shapes";
import AnimationPanel from "./anime";
import useStore, { framesState, frIndexState,uploadContentState, animePanelStore } from "../store";

export default function Toolbar() {
  const [showShapes, setShowShapes] = useState(false);
  const {showAnimations, setShowAnimations} = animePanelStore();
  const {frames,setFrames} = useStore() as framesState;
  const {frIndex,setFrIndex} = useStore() as frIndexState;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {uploadContent, setUploadContent} = useStore() as uploadContentState;
  const handleAdd = () => {
    setFrames([...frames, []]);
    setFrIndex(frIndex + 1);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click(); // Trigger file input click
  };

  useEffect(() => {
    console.log('Upload Content Updated:', JSON.stringify(uploadContent));
  }, [uploadContent]); // 🔥 Logs only when uploadContent updates
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        if (file.type === 'image/svg+xml') {
          const reader = new FileReader();
          reader.onload = (event) => {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(
              event.target?.result as string,
              'image/svg+xml'
            );
            const svgElement = svgDoc.querySelector('svg');
            if (svgElement) {
              const serializer = new XMLSerializer();
              const svgString = serializer.serializeToString(svgElement);
  
              // ✅ Append SVG with default position for drag & move
              setUploadContent(frIndex, {
                svgCode: svgString,
                x: 0, // Default X position
                y: 0, // Default Y position
              });
            } else {
              console.error('❌ No <svg> element found in the uploaded file.');
            }
          };
          reader.readAsText(file);
        } else {
          alert('⚠️ Please upload a valid SVG file.');
        }
      });
    }
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
            setShowAnimations(!showAnimations);
            setShowShapes(false); 
          }}
        >
          <Film size={24} />
          <span className="text-xs">Animation</span>
        </button>

        <button className="flex flex-col items-center space-y-1" onClick={handleUploadClick}>
          <Upload size={24} />
          <span className="text-xs">Upload</span>
        </button>

        {/* Hidden file input for SVG upload */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".svg"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <ShapesPanel isVisible={showShapes} onClose={() => setShowShapes(false)} />
      <AnimationPanel isVisible={showAnimations} onClose={() => setShowAnimations(false)} />
    </>
  );
}