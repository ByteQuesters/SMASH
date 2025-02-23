
"use client";
import { useState,useEffect } from "react";
import { framesState, pageStore, widthState } from "../store";
import Toolbar from "./toolbar";
import  useSvgCode  from "../store";
import useStore, {shapeState, propState, itemState, svgState, indexState,svgCodeState} from "../store";

export default function Canvas({width,height}:{width:string,height:string}) {
  const {items,setItems} = useStore() as itemState;
    const {shape,setShape} = useStore() as shapeState;
    const {svg , setSvg} = useStore() as svgState;
    const {frames,setFrames} = useStore() as framesState;
    const {index, setIndex} = useStore() as indexState;
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
    const {properties,setProperties} = useStore() as propState;
    const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    // const [triggerAnimation, setTriggerAnimation] = useState(false);
    const { setSvgCode } = useStore() as svgCodeState;

    let frame, rect, X:number, Y:number;
    useEffect(()=>{
      frame = document.getElementById("frame");
      rect = frame?.getBoundingClientRect();
      X = rect?.left as number;
      Y = rect?.top as number;
    })

    // useEffect(()=>{
    //     console.log("Items: ",items);
    // },[items]);

    useEffect(()=>{
      console.log(JSON.stringify(items));
    },[index]);

    const generateSvgCode = (items: any[], width: string, height: string, svg: string[]) => {
      const shapes = items
        .map((item, index) => {
          let pathTag = "";
          let animationTag = "";
    
          const centerX = parseInt(item.left) + parseInt(item.width) / 2;
          const centerY = parseInt(item.top) + parseInt(item.height) / 2;
    
          // Handling Animations
          if (item.animation === "animate") {
            animationTag = `
              <animate
                attributeName="fill"
                values="${item.backgroundColor};#f56565;${item.backgroundColor}"
                dur="2s"
                repeatCount="indefinite"
              />
            `;
          } else if (item.animation === "animateTransform") {
            animationTag = `
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 ${centerX} ${centerY}"
                to="360 ${centerX} ${centerY}"
                dur="2s"
                repeatCount="indefinite"
              />
            `;
          } else if (item.animation === "animateMotion") {
            pathTag = `
              <path
                id="motionPath-${index}"
                d="M 0,0 C 100,100 200,-100 300,0"
                fill="transparent"
              />
            `;
            animationTag = `
              <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
                <mpath xlink:href="#motionPath-${index}" />
              </animateMotion>
            `;
          }
    
          // Rendering Shapes with pathTag above the shape
          if (svg[index] === "Rectangle") {
            return `
              ${pathTag}
              <rect x="${item.left}" y="${item.top}" width="${item.width}" height="${item.height}" 
                    fill="${item.backgroundColor}" stroke="${item.borderColor}" stroke-width="${item.border}">
                ${animationTag}
              </rect>
            `;
          } else if (svg[index] === "Ellipse") {
            return `
              ${pathTag}
              <ellipse cx="${centerX}" cy="${centerY}" 
                       rx="${parseInt(item.width) / 2}" ry="${parseInt(item.height) / 2}" 
                       fill="${item.backgroundColor}" stroke="${item.borderColor}" stroke-width="${item.border}">
                ${animationTag}
              </ellipse>
            `;
          }
          return "";
        })
        .join("\n");
    
      return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n${shapes}\n</svg>`;
    };
    
    
    
    
    useEffect(() => {
      const newSvgCode = generateSvgCode(items, width, height, svg);
      setSvgCode(newSvgCode);
    }, [items, svg]);
  
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
            const tempItems = [...items,style];
            setItems(tempItems);
            console.log(JSON.stringify(items));
            setShape('');
            setProperties({});
            // const tempFrames = frames.slice(0,-1);
            // const dumArr = [...tempFrames,items];
            // console.log(JSON.stringify(dumArr)+"hi");
            // setFrames(dumArr);
            // console.log(JSON.stringify(frames)+"frames")
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
        <img src="/logosmash.png" className="w-auto h-auto max-w-[150px] max-h-[200px]" />
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
            fill={item.backgroundColor}
            stroke={item.borderColor}
            strokeWidth={item.border}
          >
            {item.animation.includes("animate") && (
              <>
                {item.animation === "animate" && (
                  <animate
                    attributeName="fill"
                    values={`${item.backgroundColor};#f56565;${item.backgroundColor}`}
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
          fill={item.backgroundColor}
          style={{
            stroke: item.borderColor,
            strokeWidth: item.border,
          }}
        >
            {item.animation.includes("animate") && (
              <>
                {item.animation === "animate" && (
                  <animate
                    attributeName="fill"
                    values={`${item.backgroundColor};#f56565;${item.backgroundColorl}`}
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
