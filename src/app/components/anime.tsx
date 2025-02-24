"use client";
import { useRef, useEffect, useState } from "react";
import useStore, { framesState, frIndexState, indexState,  } from "../store";

interface AnimationPanelProps {
  isVisible: boolean;
  onClose: () => void; 
}

export default function AnimationPanel({ isVisible, onClose }: AnimationPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { index, setIndex } = useStore() as indexState;
  // const { items, setItems } = useStore() as itemState;
  const {frames,setFrames} = useStore() as framesState;
  const {frIndex,setFrIndex} = useStore() as frIndexState;
  const items = frames[frIndex];
  const [isDragging, setIsDragging] = useState(false);

  const handleAnimation = (type: string) => {
    const animationUpdater = (item: any) => {
      const key = Object.keys(item)[0];
      const val = item[key];
      const ret = { [key]: {...val, animation: type} };
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
          animate
        </li>
        <li
          className="p-2 bg-gray-300 text-black rounded cursor-pointer hover:bg-gray-400"
          onClick={() => handleAnimation("animateTransform")}
        >
          animateTransform
        </li>
        <li
          className="p-2 bg-gray-300 text-black rounded cursor-pointer hover:bg-gray-400"
          onClick={() => handleAnimation("animateMotion")}
        >
          animateMotion
        </li>
      </ul>
    </div>
  );
}