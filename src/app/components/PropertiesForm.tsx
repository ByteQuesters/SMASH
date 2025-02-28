/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useState } from "react";
import useStore, { formStore, framesState, frIndexState } from "../store";
import { AnimationPropertyMenu } from "./anime";
import {pageStore} from "../store";

const PropertiesForm = () => {
  const { props, setProps } = formStore() as {
    props: Record<string, any>;
    setProps: (props: Record<string, any>) => void;
  };
  const propKey = Object.keys(props)[0];
  const prop: Record<string, any> = props[propKey];
  const [ind, setInd] = useState<number>(parseInt(props["ind"]));
  const { show, setShow } = formStore();
  const { frames, setFrames } = useStore() as framesState;
  const { frIndex, setFrIndex } = useStore() as frIndexState;
  const { pageWidth, pageHeight } = pageStore();
  const animationOptions = [
    ["None", ""],
    ["Color Change", "animate"],
    ["Rotate", "animateTransform"],
    ["Motion", "animateMotion"],
  ];
    
  const handleChange = (val: string, key: string) => {
    const tempProp = { ...prop };
    tempProp[key] = val;
    if(key === "animation"){
      tempProp["animationProperty"] = AnimationPropertyMenu[val];
    }
    setProps({ [propKey]: tempProp });
  };
  
  const handleAnimationProp = (val: string, key: string) => {
    const tempProp = { ...prop };
    tempProp["animationProperty"][key] = val;
    setProps({ [propKey]: tempProp });
  };

  const handleSubmit = () => {
    const items = frames[frIndex];
    const tempProp = [...items];
    tempProp[ind] = { ...props };
    const tempFrames = [...frames];
    tempFrames[frIndex] = tempProp;
    setFrames(tempFrames);
    setShow(false);

    // window.alert(JSON.stringify(props));

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
            {element !== "left" &&
              element !== "top" &&
              element !== "animationProperty" &&
              element !== "borderRadius" && (
                <label className="text-sm font-semibold capitalize">
                  {element}
                </label>
              )}
            {(element === "width" ||
              element === "height" ||
              element === "border") && (
              <input
                type="number"
                value={parseInt(prop[element] as string) || ""}
                className="border border-gray-300 bg-gray-100 text-gray-900 p-2 rounded-md focus:ring focus:ring-blue-400 w-full"
                onChange={(e) => handleChange(`${e.target.value}px`, element)}
              />
            )}
            {(element === "borderOpacity" || element === "opacity") && (
              <input
                type="number"
                value={parseFloat(prop[element] as string) || ""}
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
                value={(prop[element] as string) || "#000000"}
                className="border border-gray-300 p-1 rounded-md focus:ring focus:ring-blue-400 w-full"
                onChange={(e) => handleChange(e.target.value, element)}
              />
            )}
            {element === "animation" && (
              <select
                value={prop[element] as string}
                onChange={(e) => handleChange(e.target.value, element)}
                className="border border-gray-300 bg-gray-100 text-gray-900 p-3 rounded-md focus:ring focus:ring-blue-400 w-full"
              >
                {animationOptions.map((option, index) => (
                  <option key={index} value={option[1]}>
                    {option[0]}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
        {prop["animation"] && (
          <div>
            {[
              ["Begin", "begin"],
              ["Duration", "dur"],
            ].map((element, index) => (
              <div key={index} className="grid grid-cols-2 items-center gap-3">
                <label className="text-sm font-semibold capitalize">
                  {element[0]}
                </label>
                <input
                  type="number"
                  value={parseInt(
                    prop["animationProperty"][element[1]] as string
                  )}
                  min={0}
                  className="border border-gray-300 bg-gray-100 text-gray-900 p-2 rounded-md focus:ring focus:ring-blue-400 w-full"
                  onChange={(e) =>
                    handleAnimationProp(`${e.target.value}s`, element[1])
                  }
                />
              </div>
            ))}
          </div>
        )}
        {prop["animation"] === "animate" && (
          <div>
            {["from", "to"].map((element, index) => (
              <div key={index} className="grid grid-cols-2 items-center gap-3">
                <label className="text-sm font-semibold capitalize">
                  {element}
                </label>
                <input
                  type="color"
                  value={element==="from" ? prop["backgroundColor"]: "red"}
                  className="border border-gray-300 p-1 rounded-md focus:ring focus:ring-blue-400 w-full"
                  onChange={(e) => handleAnimationProp(`${e.target.value}`, element)}
                />
              </div>
            ))}
          </div>
        )}
        {prop["animation"] === "animateTransform" && (
          <div>
            {["fromDegree", "toDegree"].map((element, index) => (
              <div key={index} className="grid grid-cols-2 items-center gap-3">
                <label className="text-sm font-semibold capitalize">
                  {element}
                </label>
                <input
                  type="number"
                  value={parseInt(prop["animationProperty"][element] as string)}
                  min = {0}
                  max = {360}
                  className="border border-gray-300 bg-gray-100 text-gray-900 p-2 rounded-md focus:ring focus:ring-blue-400 w-full"
                  onChange={(e) =>
                    handleAnimationProp(e.target.value, element)
                  }
                />
              </div>
            ))}
          </div>
        )}
        {prop["animation"] === "animateMotion" && (
          <div>
            {["path"].map((element, index) => (
              <div key={index} className="grid grid-cols-2 items-center gap-3">
                <label className="text-sm font-semibold capitalize">
                  {element}
                </label>
                <input
                  type="text"
                  value={prop["animationProperty"][element]}
                  className="border border-gray-300 bg-gray-100 text-gray-900 p-2 rounded-md focus:ring focus:ring-blue-400 w-full"
                  onChange={(e) =>
                    handleAnimationProp(e.target.value, element)
                  }
                />
              </div>
            ))}
          </div>
        )}
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
