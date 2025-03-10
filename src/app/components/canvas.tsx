/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

    "use client";
    import { useState,useEffect } from "react";
    import { animePanelState, formStore, framesState, frIndexState } from "../store";
    import Toolbar from "./toolbar";
    // import  useSvgCode  from "../store";
    import shapesJson from "../../../public/shapes.json";
    import useStore, {shapeState, svgState, indexState,svgCodeState,uploadContentState,animePanelStore} from "../store";

    export default function Canvas({width,height}:{width:string,height:string}) {
      // const {items,setItems} = useStore() as itemState;
        const {shape,setShape} = useStore() as shapeState;
        const {svg , setSvg} = useStore() as svgState;
        const {frames,setFrames} = useStore() as framesState;
        const {frIndex,setFrIndex} = useStore() as frIndexState;
        const {index, setIndex} = useStore() as indexState;
        const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
        const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
        // const {properties,setProperties} = useStore() as propState;
        const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
        // const {ind,setInd} = formStore() as {ind:number,setInd:(index:number)=>void};
        const {show,setShow} = formStore() as {show:boolean,setShow:(show:boolean)=>void};
        const {uploadContent,setUploadContent} = useStore() as uploadContentState;
        const {props,setProps} = formStore() as {props:Record<string,string>,setProps:(props:Record<string,string>)=>void};

        // data for the upload image
        const [position, setPosition] = useState<{x: number; y: number}>({ x: 50, y: 50 });
        const [isDragging, setIsDragging] = useState(false);
        const [dragOffset, setDragOffset] = useState<{x: number; y: number}>({ x: 0, y: 0 });
        const [uploadIndex, setUploadIndex] = useState<number | null>(null);

            const { showAnimations, setShowAnimations } = animePanelStore() as animePanelState;
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
          console.log(shape + "   \n hi  \n");
        },[shape])

        // useEffect(()=>{
        //   console.log(JSON.stringify(items));
        // },[index]);

        const generateSvgCode = (
          items: any[],
          width: string,
          height: string,
          svg: string[],
          uploadContent: { svgCode: string; x: number; y: number }[]
        ) => {
          const shapes = items
            .map((element, index) => {
              const item: any = Object.values(element)[0];
              const key = Object.keys(element)[0];
              let pathTag = "";
              let animationTag = "";
        
              const centerX = parseInt(item.left) + parseInt(item.width) / 2;
              const centerY = parseInt(item.top) + parseInt(item.height) / 2;
        
              // ⚡ Handle Animations
              if (item.animation === "animate") {
                animationTag = `
                  <animate
                   attributeName="${item.animationProperty.attribute}"
                begin="${item.animationProperty.begin}"
                from="${item.animationProperty.from || item.backgroundColor}"
                to="${item.animationProperty.to}"
                dur="${item.animationProperty.dur}"
                repeatCount="${item.animationProperty.repeatCount}"
                  />
                `;
              } else if (item.animation === "animateTransform") {
                animationTag = `
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    from="${item.animationProperty.fromDegree} ${item.animationProperty.fromOriginX || centerX} ${item.animationProperty.fromOriginY || centerY}"
                to="${item.animationProperty.toDegree} ${item.animationProperty.toOriginX || centerX} ${item.animationProperty.toOriginY || centerY}"
                dur="${item.animationProperty.dur}"
                repeatCount="${item.animationProperty.repeatCount}"
                  />
                `;
              } else if (item.animation === "animateMotion") {
                pathTag = `
                  <path
                    id="motionPath-${index}"
                    d="${item.animationProperty.path}"
                    fill="transparent"
                  />
                `;
                animationTag = `
                  <animateMotion dur="${item.animationProperty.dur}" repeatCount="${item.animationProperty.repeatCount}" rotate="auto" begin="${item.animationProperty.begin}">
                <mpath xlink:href="#motionPath-${index}" />
              </animateMotion>
                `;
              }
        
              // ⚡ Render Shapes with Animations and Paths
              if (key === "Rectangle") {
                return `
                  ${pathTag}
                  <rect x="${item.left}" y="${item.top}" width="${item.width}" height="${item.height}" 
                        fill="${item.backgroundColor}" stroke="${item.borderColor}" stroke-width="${item.border}">
                    ${animationTag}
                  </rect>
                `;
              } else if (key === "Ellipse") {
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
        
          // 🔗 Combine multiple uploaded SVGs into one
          const combinedUploadedSVGs = uploadContent
          .map(
            (item) => `
            <g transform="translate(${item.x}, ${item.y})">
              ${item.svgCode}
            </g>
          `
          )
          .join("\n");
      
        return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          ${combinedUploadedSVGs}
          ${shapes}
        </svg>`;
      };
        
        
        
        
        
        useEffect(() => {
          if (frames && frames[frIndex]) {
            const items = frames[frIndex];
            const newSvgCode = generateSvgCode(
              items,
              width,
              height,
              svg,
              uploadContent[frIndex] || []
            );
            setSvgCode(newSvgCode);
          }
        }, [frames, frIndex, svg, uploadContent]);
        
      
        const draw = (event: React.MouseEvent<SVGGElement>) => {
          if (uploadContent ) {
            setIsDragging(true);
            const updatedContent = [...(uploadContent[frIndex] || [])];
          
            if (uploadIndex !== null) {
              const updatedItem = {
                ...updatedContent[uploadIndex],
                x: event.clientX - X,
                y: event.clientY - Y,
              };
          
              updatedContent[uploadIndex] = updatedItem;
          
              // 🔄 ✅ Corrected setUploadContent call to update existing item
              setUploadContent(frIndex, updatedItem, uploadIndex);
            }
          
            setDragOffset({
              x: event.clientX - position.x,
              y: event.clientY - position.y,
            });
          }
          
          
          
            event.preventDefault();
            const itemsKey = frames[frIndex];
            const items:any[] = []
            for(const itr of itemsKey){
              items.push(Object.values(itr)[0])
            }
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
                // if(!properties) return;
                let properties:any = {};
                for(const itr of shapesJson["shapes"]){
                  console.log(itr);
                  if(itr["name"]===shape){
                    properties = itr["properties"];
                    break;
                  }
                }
                // console.log(`Click position: x = ${x}, y = ${y}`);
                console.log("canva\n\n"+shape+"\n\n\n"+JSON.stringify(properties));
                // const style: Record<string,string> = {shape:{...properties,"left":`${x-parseInt(properties.width)/2}px`,"top":`${y-parseInt(properties.height)/2}px`,"animation":""}};
                const style: Record<string, string> = {};
                style[shape] = {
                  ...properties,
                  left: `${x - parseInt(properties.width) / 2}px`,
                  top: `${y - parseInt(properties.height) / 2}px`,
                  animation: "",
                };
                console.log(properties.width);
                setSvg([...svg, shape]);
                console.log(JSON.stringify(svg));
                const tempItems = [...(frames[frIndex]),style];
                const tempFrame = [...frames];
                tempFrame[frIndex] = tempItems;
                setFrames(tempFrame);
                // setItems(tempItems);
                console.log(JSON.stringify(items));
                setShape('');
                // setProperties({});
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

        if(uploadContent){
          setUploadIndex(null);
          setIsDragging(false);
        }

      };
        const handleOpenForm = (prop:Record<string,string>,ind:number) => {
          setShowAnimations(false);
      setShow(true);
          setProps({...prop,"ind":`${ind}`});
          // setInd(ind);
          console.log(ind);
    }
          const handleMouseMove = (event:React.MouseEvent<SVGSVGElement>) => {
            if (uploadContent && isDragging && uploadIndex !== null) {
              const newX = event.clientX - dragOffset.x;
              const newY = event.clientY - dragOffset.y;
            
              // Update the position state
              setPosition({
                x: newX,
                y: newY,
              });
            
              // 🔄 ✅ Update uploadContent position dynamically without adding a new one
              setUploadContent(
                frIndex,
                {
                  svgCode: uploadContent[frIndex]?.[uploadIndex]?.svgCode || "",
                  x: newX,
                  y: newY,
                },
                uploadIndex // 🔥 Pass the index to update the existing item
              );
            }
            
            
            

              if(draggingIndex==null) return;
              const x = event.clientX - X - offset.x;
              const y = event.clientY - Y - offset.y;

              const updatedItems = [...(frames[frIndex])];
              const shapeKP = { ...updatedItems[draggingIndex] };
              const shapeKey = Object.keys(shapeKP)[0];
              const shape:any = shapeKP[shapeKey];
              const shapeWidth = parseInt(shape.width);
              const shapeHeight = parseInt(shape.height);

              // const width = 900; // SVG width
              // const height = 500; // SVG height

              shape.left = `${Math.min(Math.max(x, 0), parseInt(width) - shapeWidth)}px`;
              shape.top = `${Math.min(Math.max(y, 0), parseInt(height) - shapeHeight)}px`;
              shapeKP[shapeKey] = shape;
              updatedItems[draggingIndex] = shapeKP;
              // setItems(updatedItems);
              const tempFrames = [...frames];
              tempFrames[frIndex] = updatedItems;
              setFrames(tempFrames);

          }

  // const {pageWidth,setPageWidth} = pageStore() as widthState;
  // useEffect(()=>{
  //   console.log(pageWidth);
  // })
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
   {uploadContent && uploadContent[frIndex] &&
  uploadContent[frIndex].map((item: any, index: number) => (
    <g
      key={index}
      onMouseDown={(e) => {
        draw(e);
        setUploadIndex(index);
      }}
      style={{
        transform: `translate(${item.x}px, ${item.y}px)`,
        cursor: 'grab',
      }}
      dangerouslySetInnerHTML={{ __html: item.svgCode }}
    />
  ))
}

      {frames[frIndex].map((element, i) => {
        const item:any = Object.values(element)[0];
        const key = Object.keys(element)[0];
        // console.log("keyArr\n\n"+JSON.stringify(key));
        // console.log("frames\n\n"+JSON.stringify(frames[frIndex]));
        console.log(JSON.stringify(item)+"\n\n\nitem");
        const centerX = parseInt(item.left) + parseInt(item.width) / 2;
        const centerY = parseInt(item.top) + parseInt(item.height) / 2;
        return (
          <g
            key={item.id || i} // Ensure stable key for each shape
            transform={`translate(${parseInt(item.left)}, ${parseInt(item.top)})`}
            style={{
              cursor: draggingIndex === i ? "grabbing" : "grab",
              // stroke: i === index ? "blue" : "none", // Blue stroke for selected
              // strokeWidth: i === index ? "3px" : "0", // Visible stroke only when selected
              // filter:
              //   i === index ? "drop-shadow(0px 0px 5px blue)" : "none",
            }}
            onMouseDown={() => setDraggingIndex(i)}
            onClick={() => {setShowAnimations(true);if (index !==i) setIndex(i);}}
            onDoubleClick={() => {
              handleOpenForm(element, i);
            }}
          >
            {/* Simple motion path for testing */}
            {item.animation === "animateMotion" && (
              <path
                id={`motionPath-${i}`}
                d={item.animationProperty.path}
                
                fill="transparent"
              />
            )}
            {key === "Rectangle" && (
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
                      attributeName={item.animationProperty.attribute}
                      begin={item.animationProperty.begin}
                      from={item.animationProperty.from || item.backgroundColor}
                      to={item.animationProperty.to}
                      dur={item.animationProperty.dur}
                      repeatCount={item.animationProperty.repeatCount}
                      fill="freeze"
                      />
                    )}
                    {item.animation === "animateTransform" && (
                      <animateTransform
                      attributeName="transform"
                      attributeType="XML"
                      type="rotate"
                      from={`${item.animationProperty.fromDegree} ${
                        item.animationProperty.fromOriginX ||
                        parseInt(item.width) / 2
                      } ${
                        item.animationProperty.fromOriginY ||
                        parseInt(item.height) / 2
                      }`}
                      to={`${item.animationProperty.toDegree} ${
                        item.animationProperty.toOriginX ||
                        parseInt(item.width) / 2
                      } ${
                        item.animationProperty.toOriginY ||
                        parseInt(item.height) / 2
                      }`}
                      dur={item.animationProperty.dur}
                      repeatCount={item.animationProperty.repeatCount}
                      begin={item.animationProperty.begin}
                      fill="freeze"
                    />
                    )}
                    {item.animation === "animateMotion" && (
                      <animateMotion
                      dur={item.animationProperty.dur}
                      repeatCount={item.animationProperty.repeatCount}
                      begin={item.animationProperty.begin}
                      fill="freeze"
                    >
                      <mpath xlinkHref={`#motionPath-${i}`} />
                    </animateMotion>
                    )}
                  </>
                )}
              </rect>
            )}

            {key === "Ellipse" && (
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
                      attributeName={item.animationProperty.attribute}
                      begin={item.animationProperty.begin}
                      from={item.animationProperty.from || item.backgroundColor}
                      to={item.animationProperty.to}
                      dur={item.animationProperty.dur}
                      repeatCount={item.animationProperty.repeatCount}
                      fill="freeze"
                      />
                    )}
                    {item.animation === "animateTransform" && (
                      <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        from={`0 ${parseInt(item.width) / 2} ${
                          parseInt(item.height) / 2
                        }`}
                        to={`360 ${parseInt(item.width) / 2} ${
                          parseInt(item.height) / 2
                        }`}
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    )}
                    {item.animation === "animateMotion" && (
                      <animateMotion dur="4s" repeatCount="indefinite">
                        <mpath xlinkHref={`#motionPath-${i}`} />
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
