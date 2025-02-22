
"use client";
import { useState,useEffect } from "react";
import { pageStore, widthState } from "../store";
import Toolbar from "./toolbar"; 
import useStore, {shapeState, propState, itemState, svgState, indexState} from "../store";

export default function Canvas({width,height}:{width:string,height:string}) {
  const {items,setItems} = useStore() as itemState;
    const {shape,setShape} = useStore() as shapeState;
    const {svg , setSvg} = useStore() as svgState;
    const {index, setIndex} = useStore() as indexState;
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
    const {properties,setProperties} = useStore() as propState;
    const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [triggerAnimation, setTriggerAnimation] = useState(false);

    let frame, rect, X:number, Y:number;
    useEffect(()=>{
      frame = document.getElementById("frame");
      rect = frame?.getBoundingClientRect();
      X = rect?.left as number;
      Y = rect?.top as number;
    })

    useEffect(()=>{
        console.log("Items: ",items);
    },[items]);

    useEffect(()=>{
      console.log(JSON.stringify(items));
    },[index]);
  
    const draw = (event: React.MouseEvent<SVGSVGElement>) => {
        event.preventDefault();
        
        const x = event.clientX -X;
        const y = event.clientY-Y;
        const index = items.findIndex(
            (shape) =>
              {
                const shapeLeft = parseInt(shape.left);
                const shapeTop = parseInt(shape.top);
                const shapeWidth = parseInt(shape.width);
                const shapeHeight = parseInt(shape.height);

                return (
                    x >= shapeLeft &&
                    x <= shapeLeft + shapeWidth &&
                    y >= shapeTop &&
                    y <= shapeTop + shapeHeight
                );
              }
        );
        
        if (index !== -1) {
            setDraggingIndex(index);
            setStartPoint({x:x,y:y});
            const shapeLeft = parseInt(items[index].left);
            const shapeTop = parseInt(items[index].top);
            setOffset({
                x: event.clientX - (X + shapeLeft),
                y: event.clientY - (Y + shapeTop),
            });
        } else {
            if(!shape) return;
            if(!properties) return;
            console.log(`Click position: x = ${x}, y = ${y}`);
            const style: Record<string,string> = {...properties,"left":`${x-parseInt(properties.width)/2}px`,"top":`${y-parseInt(properties.height)/2}px`,"animation":""};
            console.log(properties.width);
            setSvg([...svg, shape]);
            console.log(JSON.stringify(svg));
            setItems([...items,style]);
            console.log(JSON.stringify(items));
        }
        
    }

    const handleMouseUp = () => {
        setDraggingIndex(null);
        setStartPoint(null);
      };

    const handleMouseMove = (event:React.MouseEvent<SVGSVGElement>) => {
        if(draggingIndex==null) return;
        const x = event.clientX - X - offset.x;
        const y = event.clientY - Y - offset.y;

        const updatedItems = [...items];
        const shape = { ...updatedItems[draggingIndex] };
        const shapeWidth = parseInt(shape.width);
        const shapeHeight = parseInt(shape.height);

        // const width = 900; // SVG width
        // const height = 500; // SVG height

        shape.left = `${Math.min(Math.max(x, 0), parseInt(width) - shapeWidth)}px`;
        shape.top = `${Math.min(Math.max(y, 0), parseInt(height) - shapeHeight)}px`;

        updatedItems[draggingIndex] = shape;
        setItems(updatedItems);

    }

  const {pageWidth,setPageWidth} = pageStore() as widthState;
  useEffect(()=>{
    console.log(pageWidth);
  })
  return (
    <div className="flex-1 bg-foreground flex items-center justify-center mt-[-70px]">
        <div className="absolute top-4 left-4 w-16 h-16">
        <img src="/logosmash.png" className="w-auto h-auto max-w-[150px] max-h-[200px] " />
      </div>

      <svg
  id="frame"
  className="relative bg-white border border-gray-400"
  width={width}
  height={height}
  onMouseDown={(e) => draw(e)}
  onMouseMove={(e) => handleMouseMove(e)}
  onMouseUp={handleMouseUp}
>
  {items.map((item, index) => {
    const centerX = parseInt(item.left) + parseInt(item.width) / 2;
    const centerY = parseInt(item.top) + parseInt(item.height) / 2;

    return (
      <g
        key={item.id || index} // Ensure stable key for each shape
        transform={`translate(${parseInt(item.left)}, ${parseInt(item.top)})`}
        style={{ cursor: draggingIndex === index ? "grabbing" : "grab" }}
        onMouseDown={() => setDraggingIndex(index)}
        onClick={() => setIndex(index)}
      >
        {/* Simple motion path for testing */}
        {item.animation === "animateMotion" && (
          <path
            id={`motionPath-${index}`}
            d="M 0,0 C 100,100 200,-100 300,0"
            fill="transparent"
          />
        )}
        {svg[index] === "Rectangle" && (
          <rect
            width={parseInt(item.width)}
            height={parseInt(item.height)}
            fill={item.fill}
            stroke={item.borderColor}
            strokeWidth={item.border}
          >
            {item.animation.includes("animate") && (
              <>
                {item.animation === "animate" && (
                  <animate
                    attributeName="fill"
                    values={`${item.fill};#f56565;${item.fill}`}
                    dur="2s"
                    repeatCount="indefinite"
                  />
                )}
                {item.animation === "animateTransform" && (
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    from={`0 ${parseInt(item.width) / 2} ${parseInt(item.height) / 2}`}
                    to={`360 ${parseInt(item.width) / 2} ${parseInt(item.height) / 2}`}
                    dur="2s"
                    repeatCount="indefinite"
                  />
                )}
                 {item.animation === "animateMotion" && (
              <animateMotion dur="4s" repeatCount="indefinite">
                <mpath xlinkHref={`#motionPath-${index}`} />
              </animateMotion>
            )}
              </>
            )}
          </rect>
        )}

        {svg[index] === "Ellipse" && (
          <ellipse
            cx={parseInt(item.width) / 2}
            cy={parseInt(item.height) / 2}
            rx={parseInt(item.width) / 2}
            ry={parseInt(item.height) / 2}
            fill={item.fill}
          >
            {item.animation.includes("animate") && (
              <>
                {item.animation === "animate" && (
                  <animate
                    attributeName="fill"
                    values={`${item.fill};#f56565;${item.fill}`}
                    dur="2s"
                    repeatCount="indefinite"
                  />
                )}
                {item.animation === "animateTransform" && (
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    from={`0 ${parseInt(item.width) / 2} ${parseInt(item.height) / 2}`}
                    to={`360 ${parseInt(item.width) / 2} ${parseInt(item.height) / 2}`}
                    dur="2s"
                    repeatCount="indefinite"
                  />
                )}
                {item.animation === "animateMotion" && (
              <animateMotion dur="4s" repeatCount="indefinite">
                <mpath xlinkHref={`#motionPath-${index}`} />
              </animateMotion>
            )}
              </>
            )}
          </ellipse>
        )}
      </g>
    );
  })}
</svg>

      < Toolbar />
    </div>
  );
}
