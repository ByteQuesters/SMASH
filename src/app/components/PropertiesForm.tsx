"use client";
import { useEffect, useState } from "react";
import useStore, { formStore, framesState, frIndexState } from "../store";

const PropertiesForm = () => {
  const { props, setProps } = formStore() as {
    props: Record<string, any>;
    setProps: (props: Record<string, any>) => void;
  };
  const propKey = Object.keys(props)[0];
  const prop: Record<string, string> = props[propKey];
  // const ind: number = parseInt(props["ind"]);
  const [ind, setInd] = useState<number>(parseInt(props["ind"])); 
  // const { ind, setInd } = formStore() as { ind: number; setInd: (ind: number) => void };
  const { show, setShow } = formStore();
  const { frames, setFrames } = useStore() as framesState;
  const { frIndex, setFrIndex } = useStore() as frIndexState;
  console.log(ind+"\n\n\nwhy this kolaveri??");

  const handleChange = (val: string, key: string) => {
    const tempProp = { ...prop };
    tempProp[key] = val;
    setProps({ [propKey]: tempProp });
    // console.log(JSON.stringify(props) + "\n\n\nwtk");

      const items = frames[frIndex];
      const tProp = [...items];
      tProp[ind] = { ...props };
      const tempFrames = [...frames];
      tempFrames[frIndex] = tProp;
      setFrames(tempFrames);
  };
  useEffect(() => {
    console.log(JSON.stringify(frames)+"\n\n\n\n\nAfter changing");
  },[frames]);
  
  const handleSubmit = () => {
    console.log(JSON.stringify(frames)+"\n\n\n\n\nBefore chaning\n\n"+ind);
    const items = frames[frIndex];
    const tempProp = [...items];
    tempProp[ind] = { ...props };
    const tempFrames = [...frames];
    tempFrames[frIndex] = tempProp;
    setFrames(tempFrames);
    setShow(false);
    console.log("\n\n\nImaye...Imaye..."+ind);
  };

  return (
    <div className="bg-white text-gray-900 p-3 pt-2 rounded-lg shadow-md w-full h-full max-h-full overflow-auto border border-gray-300">
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {Object.keys(prop).map((element, index) => (
          <div key={index} className="grid grid-cols-2 items-center gap-3">
            {(element !== "left" && element !== "top" && element !== "animation" && element !=="borderRadius") && (
              <label className="text-sm font-semibold capitalize">
                {element}
              </label>
            )}
            {(element === "width" ||
              element === "height" ||
              element === "border") && (
              <input
                type="number"
                value={parseInt(prop[element]) || ""}
                className="border border-gray-300 bg-gray-100 text-gray-900 p-2 rounded-md focus:ring focus:ring-blue-400 w-full"
                onChange={(e) => handleChange(`${e.target.value}px`, element)}
              />
            )}
            {(element === "borderOpacity" || element === "opacity") && (
              <input
                type="number"
                value={parseFloat(prop[element]) || ""}
                min={0}
                max={1}
                step={0.1}
                className="border border-gray-300 bg-gray-100 text-gray-900 p-2 rounded-md focus:ring focus:ring-blue-400 w-full"
                onChange={(e) => handleChange(e.target.value, element)}
              />
            )}
            {(element === "backgroundColor" || element === "borderColor") && (
              <input
                type="color"
                value={prop[element] || "#000000"}
                className="border border-gray-300 p-1 rounded-md focus:ring focus:ring-blue-400 w-full"
                onChange={(e) => handleChange(e.target.value, element)}
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 w-full transition-all mt-3"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default PropertiesForm;
