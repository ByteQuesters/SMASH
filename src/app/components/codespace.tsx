"use client";
import { useState } from "react";
import useStore, {
  svgCodeState,
  framesState,
  indexState,
  frIndexState,
  formStore,
} from "../store";
import PropertiesForm from "./PropertiesForm";

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
  const handleExportGIF = () => {
    console.log("Exporting animation as GIF...");
    setShowExportOptions(false);
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
