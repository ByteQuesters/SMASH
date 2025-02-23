
"use client";
import { useState, useEffect } from "react";
import useStore, { svgCodeState,itemState,framesState,indexState,frIndexState } from "../store";
import PropertiesForm from "./PropertiesForm";

export default function CodeSpace() {
  const { svgCode } = useStore() as svgCodeState;
  const { items,setItems } = useStore() as itemState;
  const { frames,setFrames } = useStore() as framesState;
  const { index ,setIndex} = useStore() as indexState;
  const { frIndex,setFrIndex } = useStore() as frIndexState;
  const [properties, setProperties] = useState({
    height: "100px",
    width: "100px",
    borderColor: "#000000",
    fillColor: "#ffffff",
    borderOpacity: "1",
  });

  const [appliedProperties, setAppliedProperties] = useState(properties);

  useEffect(() => {
    // Sync properties from the store if necessary
  }, [svgCode]);

  const handleExport = () => {
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
  };

  const handleClearShape = () => {
    const updatedItems = items.filter((_, i) => i !== index);

  const updatedFrames = frames.map((frame, fIdx) =>
    fIdx === frIndex ? frame.filter((_, i) => i !== index) : frame
  );

  setItems(updatedItems);
  setFrames(updatedFrames);
  };

  const handleChange = (key: string, value: string) => {
    setProperties((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    setAppliedProperties(properties);
  };

  return (
    <div className="w-1/4 bg-code p-4 border-l flex flex-col h-screen">
      {/* Code Editor Section (Top 50%) */}
      <div className="h-1/2 flex flex-col">
        <h2 className="text-black text-center font-bold mb-2">Code Editor</h2>
        <textarea
          className="w-full h-full p-2 border rounded bg-white text-black resize-none overflow-auto"
          value={svgCode}
          readOnly
        />
      </div>

      {/* Buttons Section */}
      <div className="flex justify-between mt-4">
        <button className="bg-red-700 w-[48%] text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={handleClearShape}>
          Delete
        </button>
        <button
          className="bg-green-700 w-[48%] text-white px-4 py-2 rounded hover:bg-green-800"
          onClick={handleExport}
        >
          Export
        </button>
      </div>
    </div>
  );
}