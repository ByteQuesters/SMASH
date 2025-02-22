"use client";
import { useState } from "react";

export default function CodeSpace() {
  const [code, setCode] = useState("<svg></svg>");

  return (
    <div className="w-1/4 bg-code p-4 border-l flex flex-col h-screen">
      {/* Code Editor */}
      <h2 className="text-black text-center font-bold mb-2">Code Editor</h2>
      <textarea
        className="w-[390px] h-[800px] p-2 border rounded bg-white resize-none overflow-auto"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <div className="flex-grow"></div>

      <div className="flex justify-between mt-4">
        <button className="bg-blue-500 w-[190px] text-white px-4 py-2 rounded hover:bg-blue-600">
          Preview
        </button>
        <button className="bg-green-500 w-[190px] text-white px-4 py-2 rounded hover:bg-green-600">
          Export
        </button>
      </div>
    </div>
  );
}
