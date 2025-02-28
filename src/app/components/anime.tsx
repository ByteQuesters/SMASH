/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useRef, useEffect, useState } from "react";
import useStore, { framesState, frIndexState, indexState,  } from "../store";

type AnimationPanelProps = {
  isVisible: boolean;
  onClose: () => void; 
}
export const AnimationPropertyMenu: Record<string, Record<string, string>> = {
  animate: {
    attribute: "fill",
    from: "",
    to: "red",
    dur: "2s",
    begin: "0s",
    repeatCount: "indefinite",
  },
  animateTransform: {
    fromDegree: "0",
    fromOriginX: "",
    fromOriginY: "",
    toDegree: "360",
    toOriginX: "",
    toOriginY: "",
    dur: "2s",
    begin: "0s",
    repeatCount: "indefinite",
  },
  animateMotion: {
    path: "M 0,0 C 100,100 200,-100 300,0",
    dur: "2s",
    begin: "0s",
    repeatCount: "indefinite"
  },
};
export default function AnimationPanel({ isVisible, onClose }: AnimationPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { index, setIndex } = useStore() as indexState;
  const {frames,setFrames} = useStore() as framesState;
  const {frIndex,setFrIndex} = useStore() as frIndexState;
  const items = frames[frIndex];
  const [isDragging, setIsDragging] = useState(false);

  const handleAnimation = (type: string) => {
    const animationUpdater = (item: any) => {
      const key = Object.keys(item)[0];
      const val = item[key];
      const ret = { [key]: {...val, animation: type, animationProperty: AnimationPropertyMenu[type]} };
      // console.log(JSON.stringify(ret)+"\n\n\n\nWTK");
      return ret;
    };
    if (index !== -1) {
      const updatedItems: Record<string, any>[] = items.map((item: Record<string, any>, i: number) =>
        i === index ? animationUpdater(item) : item
      );
      // setItems(updatedItems);
      const tempFrames = [...frames];
      tempFrames[frIndex] = updatedItems;
      setFrames(tempFrames);
      setIndex(-1);
      onClose(); 
    }
  };

  useEffect(() => {
    if (!isVisible) return;

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        !isDragging // Only close if not dragging
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isVisible, isDragging, onClose]);

  if (!isVisible) return null;

  return (
    <div
      ref={panelRef}
      tabIndex={0}
      className="absolute top-[50%] left-[90px] w-56 bg-white shadow-lg border rounded-lg p-4 focus:outline-none"
    >
      <h2 className="text-black font-semibold mb-3 text-center">Animations</h2>
      <ul className="space-y-2">
        <li
          className="p-2 bg-gray-300 text-black rounded cursor-pointer hover:bg-gray-400"
          onClick={() => handleAnimation("animate")}
        >
          Color Change
        </li>
        <li
          className="p-2 bg-gray-300 text-black rounded cursor-pointer hover:bg-gray-400 capitalize"
          onClick={() => handleAnimation("animateTransform")}
        >
          Rotate
        </li>
        <li
          className="p-2 bg-gray-300 text-black rounded cursor-pointer hover:bg-gray-400"
          onClick={() => handleAnimation("animateMotion")}
        >
          Motion
        </li>
        <li
          className="p-2 bg-red-300 text-black rounded cursor-pointer hover:bg-red-400"
          onClick={() => handleAnimation("")}
        >
          Delete Animation
        </li>
      </ul>
    </div>
  );
}