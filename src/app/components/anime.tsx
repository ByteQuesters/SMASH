"use client";
import useStore, {indexState, itemState} from "../store";

interface AnimationPanelProps {
isVisible: boolean;
}

export default function AnimationPanel({ isVisible }: AnimationPanelProps) {
if (!isVisible) return null;
const {index,setIndex} = useStore() as indexState;
const {items,setItems} = useStore() as itemState;
const handleAnimation = (type:string) => {
    if (index !== -1) {
      const updatedItems = items.map((item, i) =>
        i === index ? { ...item, animation: type } : { ...item}
      );
      setItems(updatedItems);
      setIndex(-1);
    }
  };
return (
    <div className="absolute top-[50%] left-[90px] w-56 bg-white shadow-lg border rounded-lg p-4">
        <h2 className="text-black font-semibold mb-3">Animations</h2>
        <ul className="space-y-2">
            <li className="p-2 bg-gray-300 text-black rounded" onClick={()=>handleAnimation("animate")}>animate</li>
            <li className="p-2 bg-gray-300 text-black rounded" onClick={()=>handleAnimation("animateTransform")}>animateTransform</li>
            <li className="p-2 bg-gray-300 text-black rounded" onClick={()=>handleAnimation("animateMotion")}>animateMotion</li>
            
        </ul>
    </div>
    );
}