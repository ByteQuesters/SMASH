
// "use client";
// import { useState, useRef } from "react";
// import Toolbar from "./toolbar";
// import Canvas from "./canvas";
// import Timeline from "./timeline";

// export default function CanvasPage() {
//   const [svgData, setSvgData] = useState<string | null>(null);
//   const [frames, setFrames] = useState<{ id: number; svg: string }[]>([]);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const canvasRef = useRef<SVGSVGElement | null>(null);

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && file.type === "image/svg+xml") {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setSvgData(reader.result as string);
//       };
//       reader.readAsText(file);
//     }
//   };

//   const handleCaptureFrame = () => {
//     if (canvasRef.current) {
//       const svgString = new XMLSerializer().serializeToString(canvasRef.current);
//       const newFrame = { id: frames.length + 1, svg: svgString };

//       setFrames((prevFrames) => [...prevFrames, newFrame]);
//       console.log("Captured Frame:", newFrame);
//     } else {
//       console.error("Canvas reference is null!");
//     }
//   };

//   const triggerUpload = () => {
//     fileInputRef.current?.click();
//   };

//   return (
//     <div className="relative flex">
//       <Toolbar setSvgData={setSvgData} fileInputRef={fileInputRef} triggerUpload={triggerUpload} />
//       <Canvas
//         ref={canvasRef}
//         width="600"
//         height="400"
//         svgData={svgData}
//         setSvgData={setSvgData}
//         fileInputRef={fileInputRef}
//       />
//       <Timeline frames={frames} onCaptureFrame={handleCaptureFrame} />
//       <input
//         type="file"
//         accept="image/svg+xml"
//         ref={fileInputRef}
//         className="hidden"
//         onChange={handleFileUpload}
//       />
//     </div>
//   );
// }

// "use client";
// import { useState, useRef } from "react";
// import Toolbar from "./toolbar";
// import Canvas from "./canvas";
// import Timeline from "./timeline";

// export default function CanvasPage() {
//   const [svgData, setSvgData] = useState<string | null>(null);
//   const [frames, setFrames] = useState<{ id: number; svg: string }[]>([]);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const canvasRef = useRef<SVGSVGElement | null>(null);

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && file.type === "image/svg+xml") {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setSvgData(reader.result as string);
//       };
//       reader.readAsText(file);
//     }
//   };

//   const handleCaptureFrame = () => {
//     if (canvasRef.current) {
//       const svgString = new XMLSerializer().serializeToString(canvasRef.current);
//       const newFrame = { id: frames.length + 1, svg: svgString };

//       setFrames((prevFrames) => [...prevFrames, newFrame]);
//       console.log("Captured Frame:", newFrame);
//     } else {
//       console.error("Canvas reference is null!");
//     }
//   };

//   const triggerUpload = () => {
//     fileInputRef.current?.click();
//   };

//   return (
//     <div className="relative flex">
//       <Toolbar setSvgData={setSvgData} fileInputRef={fileInputRef} triggerUpload={triggerUpload} />
//       <Canvas
//         ref={canvasRef}
//         width="600"
//         height="400"
//         svgData={svgData}
//         setSvgData={setSvgData}
//         fileInputRef={fileInputRef}
//       />
//       <Timeline frames={frames} onCaptureFrame={handleCaptureFrame} />
//       <input
//         type="file"
//         accept="image/svg+xml"
//         ref={fileInputRef}
//         className="hidden"
//         onChange={handleFileUpload}
//       />
//     </div>
//   );
// }
"use client";
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { pageStore, widthState } from "../store";
import Toolbar from "./toolbar";
import useStore, { shapeState, propState, itemState, svgState, indexState } from "../store";

interface CanvasProps {
  width: string;
  height: string;
  onCaptureFrame?: () => void;
}

const Canvas = forwardRef<SVGSVGElement, CanvasProps>(({ width, height }, ref) => {
  const { items, setItems } = useStore() as itemState;
  const { shape } = useStore() as shapeState;
  const { svg, setSvg } = useStore() as svgState;
  const { index, setIndex } = useStore() as indexState;
  const { properties } = useStore() as propState;
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const frameRef = useRef<SVGSVGElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [svgData, setSvgData] = useState<string | null>(null);

  useImperativeHandle(ref, () => frameRef.current as SVGSVGElement);

  useEffect(() => {
    console.log("Items:", items);
  }, [items]);

  useEffect(() => {
    console.log(JSON.stringify(items));
  }, [index]);

  const draw = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    if (!frameRef.current) return;
    
    const rect = frameRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const foundIndex = items.findIndex(shape => {
      const shapeLeft = parseInt(shape.left);
      const shapeTop = parseInt(shape.top);
      const shapeWidth = parseInt(shape.width);
      const shapeHeight = parseInt(shape.height);
      return x >= shapeLeft && x <= shapeLeft + shapeWidth && y >= shapeTop && y <= shapeTop + shapeHeight;
    });

    if (foundIndex !== -1) {
      setDraggingIndex(foundIndex);
      setStartPoint({ x, y });
      setOffset({ x: event.clientX - (rect.left + parseInt(items[foundIndex].left)), y: event.clientY - (rect.top + parseInt(items[foundIndex].top)) });
    } else if (shape && properties) {
      const style: Record<string, string> = {
        ...properties,
        left: `${x - parseInt(properties.width) / 2}px`,
        top: `${y - parseInt(properties.height) / 2}px`,
        animation: ""
      };
      setSvg([...svg, shape]);
      setItems([...items, style]);
    }
  };

  const handleMouseUp = () => {
    setDraggingIndex(null);
    setStartPoint(null);
  };

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (draggingIndex === null || !frameRef.current) return;
    
    const rect = frameRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left - offset.x;
    const y = event.clientY - rect.top - offset.y;
    
    const updatedItems = [...items];
    updatedItems[draggingIndex] = {
      ...updatedItems[draggingIndex],
      left: `${Math.max(0, Math.min(x, parseInt(width) - parseInt(updatedItems[draggingIndex].width)))}px`,
      top: `${Math.max(0, Math.min(y, parseInt(height) - parseInt(updatedItems[draggingIndex].height)))}px`
    };
    setItems(updatedItems);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name);
      
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const svgContent = e.target?.result as string;
          
          setSvgData(svgContent);
          const newItem = {
            left: "50px", 
            top: "50px", 
            width: "100px", 
            height: "100px", 
            dataUrl:svgContent, 
            type: "image"
          };
          setItems([...items, newItem]);
        };
        reader.readAsDataURL(file);
      } else if (file.type === "image/svg+xml") {
        const reader = new FileReader();
        reader.onload = (e) => {
          const svgContent = e.target?.result as string;
          const newItem = {
            left: "50px", 
            top: "50px", 
            width: "200px", 
            height: "200px", 
            dataUrl: svgContent, 
            type: "svg"
          };
          setItems([...items, newItem]);
        };
        reader.readAsText(file);
      }
    }
  };

  return (
    <div className="flex-1 bg-foreground flex items-center justify-center mt-[-70px]">
      <div className="absolute top-4 left-4 w-16 h-16">
        <img src="/logosmash.png" className="w-auto h-auto max-w-[150px] max-h-[200px]" />
      </div>

      <svg
        ref={frameRef}
        id="frame"
        className="relative bg-white border border-gray-400"
        width={width}
        height={height}
        onMouseDown={draw}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {items.map((item, index) => (
          <g
            key={index}
            transform={`translate(${parseInt(item.left)}, ${parseInt(item.top)})`}
            style={{ cursor: draggingIndex === index ? "grabbing" : "grab" }}
            onMouseDown={() => setDraggingIndex(index)}
            onClick={() => setIndex(index)}
          >
            {item.type === "image" && (
              <image href={item.dataUrl} width={parseInt(item.width)} height={parseInt(item.height)} />
            )}

            {item.type === "svg" && (
              <g dangerouslySetInnerHTML={{ __html: item.dataUrl }} />
            )}

            {svg[index] === "Rectangle" && (
              <rect
                width={parseInt(item.width)}
                height={parseInt(item.height)}
                fill={item.fill}
                stroke={item.borderColor}
                strokeWidth={item.border}
              />
            )}

            {svg[index] === "Ellipse" && (
              <ellipse
                cx={parseInt(item.width) / 2}
                cy={parseInt(item.height) / 2}
                rx={parseInt(item.width) / 2}
                ry={parseInt(item.height) / 2}
                fill={item.fill}
              />
            )}
          </g>
        ))}
      </svg>
      <Toolbar />

      <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
    </div>
  );
});

export default Canvas;
