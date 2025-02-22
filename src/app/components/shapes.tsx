"use client";
import { useEffect, useState } from "react";
import useStore, { propState, shapeState } from "../store";

interface Shape {
  name: string;
  type: string;
  attributes: Record<string, string>;
  properties: Record<string,string>;
}

export default function ShapesPanel({ isVisible }: { isVisible: boolean }) {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const { shape, setShape } = useStore() as shapeState;
  const {properties,setProperties} = useStore() as propState;
  useEffect(() => {
    fetch("/shapes.json")
      .then((res) => res.json())
      .then((data) => setShapes(data.shapes))
      .catch((err) => console.error("Failed to load shapes:", err));
  }, []);

  if (!isVisible) return null;

  const handleSelect = (shape:Shape) => {
    setShape(shape.name);
    setProperties(shape.properties);
  }
  
  return (
    <div className="absolute top-[42%] left-[85px] w-48 bg-white border border-gray-300 shadow-lg rounded-lg p-2">
      <h3 className="text-sm font-bold mb-2 text-center">Shapes</h3>
      <div className="grid grid-cols-2 gap-2 p-2">
        {shapes.map((shape, index) => (
          <button
            key={index}
            className="flex items-center justify-center w-20 h-20 p-2 border rounded hover:bg-gray-200"
            onClick={() => {handleSelect(shape)}}
          >
            <svg
              viewBox="0 0 100 100"
              width="40"
              height="40"
              className="fill-current text-black"
            >
              {shape.type === "rect" && (
                <rect {...shape.attributes}  />
              )}
              {/* {shape.type === "circle" && (
                <circle {...shape.attributes} />
              )} */}
              {shape.type === "ellipse" && (
                <ellipse {...shape.attributes} />
              )}
              {/* {shape.type === "line" && (
                <line {...shape.attributes} strokeWidth="2" stroke="black" />
              )} */}
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
