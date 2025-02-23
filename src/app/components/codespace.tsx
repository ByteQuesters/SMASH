"use client";
import { useState } from "react";
import  useStore,{svgCodeState}  from "../store";

export default function CodeSpace() {
  const { svgCode } = useStore() as svgCodeState;

  const handleExport = () => {
    const blob = new Blob([svgCode], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "exported_svg.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-1/4 bg-code p-4 border-l flex flex-col h-screen">
      {/* Code Editor */}
      <h2 className="text-black text-center font-bold mb-2">Code Editor</h2>
      <textarea
        className="w-[390px] h-[800px] p-2 border rounded bg-white text-black resize-none overflow-auto"
        value={svgCode}
        readOnly
      />
      <div className="flex-grow"></div>

      <div className="flex justify-between mt-4">
        <button className="bg-blue-500 w-[190px] text-white px-4 py-2 rounded hover:bg-blue-600">
          Preview
        </button>
        <button className="bg-green-500 w-[190px] text-white px-4 py-2 rounded hover:bg-green-600" 
        onClick={handleExport}>
          Export
        </button>
      </div>
    </div>
  );
}
