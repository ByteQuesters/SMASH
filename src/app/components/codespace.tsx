
"use client";
import { useState, useEffect } from "react";
import useStore, { svgCodeState,itemState,framesState,indexState,frIndexState } from "../store";

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

      {/* Property Editor Section (Bottom 50%) */}
      <div className="h-1/2 flex flex-col gap-4 p-4 bg-white text-black rounded-lg shadow mt-4">
        <h2 className="text-lg font-bold text-center">Edit Shape Properties</h2>
        <div className="flex gap-4">
  {/* Height */}
  <div className="flex flex-col w-1/2">
    <label className="font-semibold mb-1">Height</label>
    <input
      type="number"
      value={parseInt(properties.height) || ""}
      className="border p-2 rounded-md focus:ring focus:ring-blue-300 w-full"
      onChange={(e) => handleChange("height", `${e.target.value}px`)}
    />
  </div>

  {/* Width */}
  <div className="flex flex-col w-1/2">
    <label className="font-semibold mb-1">Width</label>
    <input
      type="number"
      value={parseInt(properties.width) || ""}
      className="border p-2 rounded-md focus:ring focus:ring-blue-300 w-full"
      onChange={(e) => handleChange("width", `${e.target.value}px`)}
    />
  </div>
</div>
        {/* Border & Fill Color Side-by-Side */}
        <div className="flex gap-4">
          {/* Fill Color */}
          <div className="flex flex-col w-1/2">
            <label className="font-semibold mb-1">Fill Color</label>
            <input
              type="color"
              value={properties.fillColor}
              className="border p-1 rounded-md"
              onChange={(e) => handleChange("fillColor", e.target.value)}
            />
            <span className="mt-1 text-sm">Selected: {properties.fillColor}</span>
          </div>

          {/* Border Color */}
          <div className="flex flex-col w-1/2">
            <label className="font-semibold mb-1">Border Color</label>
            <input
              type="color"
              value={properties.borderColor}
              className="border p-1 rounded-md"
              onChange={(e) => handleChange("borderColor", e.target.value)}
            />
            <span className="mt-1 text-sm">Selected: {properties.borderColor}</span>
          </div>
        </div>

        {/* Border Opacity */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Border Opacity</label>
          <input
            type="number"
            value={parseFloat(properties.borderOpacity) || ""}
            min={0}
            max={1}
            step={0.1}
            className="border p-2 rounded-md focus:ring focus:ring-blue-300"
            onChange={(e) => handleChange("borderOpacity", e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-time text-white px-4 py-2 rounded hover:bg-time-400"
        >
          Apply Changes
        </button>
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