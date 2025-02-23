// "use client";
// import useStore, {indexState, itemState} from "../store";

// interface AnimationPanelProps {
// isVisible: boolean;
// }

// export default function AnimationPanel({ isVisible }: AnimationPanelProps) {
// if (!isVisible) return null;
// const {index,setIndex} = useStore() as indexState;
// const {items,setItems} = useStore() as itemState;
// const handleAnimation = (type:string) => {
//     if (index !== -1) {
//       const updatedItems = items.map((item, i) =>
//         i === index ? { ...item, animation: type } : { ...item}
//       );
//       setItems(updatedItems);
//       setIndex(-1);
//     }
//   };
// return (
//     <div className="absolute top-[50%] left-[90px] w-56 bg-white shadow-lg border rounded-lg p-4">
//         <h2 className="text-black font-semibold mb-3">Animations</h2>
//         <ul className="space-y-2">
//             <li className="p-2 bg-gray-300 text-black rounded" onClick={()=>handleAnimation("animate")}>animate</li>
//             <li className="p-2 bg-gray-300 text-black rounded" onClick={()=>handleAnimation("animateTransform")}>animateTransform</li>
//             <li className="p-2 bg-gray-300 text-black rounded" onClick={()=>handleAnimation("animateMotion")}>animateMotion</li>
            
//         </ul>
//     </div>
//     );
// }


"use client";
import { useRef, useEffect, useState } from "react";
import useStore, { indexState, itemState } from "../store";

interface AnimationPanelProps {
  isVisible: boolean;
  onClose: () => void; 
}

export default function AnimationPanel({ isVisible, onClose }: AnimationPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { index, setIndex } = useStore() as indexState;
  const { items, setItems } = useStore() as itemState;
  const [isDragging, setIsDragging] = useState(false);

  const handleAnimation = (type: string) => {
    if (index !== -1) {
      const updatedItems = items.map((item, i) =>
        i === index ? { ...item, animation: type } : item
      );
      setItems(updatedItems);
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