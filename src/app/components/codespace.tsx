"use client";
import { useState,useRef } from "react";
import useStore, {
  svgCodeState,
  framesState,
  indexState,
  frIndexState,
  formStore,
} from "../store";
import PropertiesForm from "./PropertiesForm";
import html2canvas from "html2canvas";
import GIF from "gif.js";
// import Whammy from 'whammy';

export default function CodeSpace() {
  const { svgCode } = useStore() as svgCodeState;
  const { show, setShow } = formStore();
  // const { items, setItems } = useStore() as itemState;
  const { frames, setFrames } = useStore() as framesState;
  const { index } = useStore() as indexState;
  const { frIndex } = useStore() as frIndexState;
  const { ind, setInd, setProps } = formStore();
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [copy,setCopy] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const handleExportSVG = () => {
    const blob = new Blob([svgCode], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "smashsvg.svg";
    // link.download="smashsvg.gif";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setShowExportOptions(false);
  };
  const handleShow = () => {
    console.log("showing");
    setShowExportOptions(true);
    console.log(showExportOptions);
  };
  const handleExportGIF = async () => {
    const gif = new GIF({
      workers: 2,
      quality: 10,
      width: 500, // Adjust width
      height: 500, // Adjust height
    });
  
    const frames = animationRef.current?.querySelectorAll('svg') || [];
  
    // Collect frames from the animation
    for (const frame of frames) {
      await new Promise<void>((resolve) => {
        const canvas = document.createElement('canvas');
        canvas.width = 500;
        canvas.height = 500;
        const ctx = canvas.getContext('2d');
  
        const svgData = new XMLSerializer().serializeToString(frame);
        const img = new Image();
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
  
        img.onload = () => {
          if (ctx) {
            ctx.drawImage(img, 0, 0);
          }
          URL.revokeObjectURL(url);
          gif.addFrame(canvas, { delay: 200, copy: true });
          resolve(); // Wait for image to load before proceeding
        };
        img.src = url;
      });
    }
  
    // When GIF is finished rendering
    gif.on('finished', (blob: Blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'animation.gif';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  
    gif.render(); // Render the GIF
  };
  

  const handleClearShape = () => {
    // const updatedItems = items.filter((_, i) => i !== index);
    const updatedFrames = frames.map((frame, fIdx) =>
      fIdx === frIndex ? frame.filter((_, i) => i !== index) : frame
    );
    // setItems(updatedItems);
    setFrames(updatedFrames);
  };

  const handleCopy = () => {
    const text = document.createElement("textarea");
    text.value = svgCode;
    document.body.appendChild(text);
    text.select();
    document.execCommand("copy");
    document.body.removeChild(text);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  }

  return (
    <div className="w-1/4 bg-code p-4 border-l flex flex-col h-screen">
      <div
        className={`flex flex-col transition-all duration-300 ${
          show ? "h-1/2" : "h-full"
        }`}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-black text-center font-bold">Code Editor</h2>
          <button
            className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
            onClick={handleCopy}
          >
            {copy ? "Copied!" : "Copy"}
          </button>
        </div>
        <textarea
          className="w-full h-full p-2 border rounded bg-white text-black resize-none overflow-auto"
          value={svgCode}
          readOnly
        />

        <div className="flex flex-col mt-4 gap-3">
          <button
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleClearShape}
          >
            Delete
          </button>

          <div className="relative">
            {!showExportOptions && (
              <button
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 w-full"
                onClick={() => {
                  handleShow();
                }}
              >
                Export
              </button>
            )}

            {showExportOptions && (
              <div>
                <button
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 w-full"
                  onClick={handleExportSVG}
                >
                  Export as SVG
                </button>
                <button
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 w-full"
                  onClick={handleExportGIF}
                >
                  Export Animation as GIF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {show && (
        <div className="h-1/2 flex justify-center items-center ">
          <PropertiesForm />
        </div>
      )}
    </div>
  );
}
