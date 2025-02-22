
"use client";

import { useEffect } from "react";
import { pageStore, widthState } from "../store";
import Toolbar from "./toolbar"; 

export default function Canvas({width,height}:{width:string,height:string}) {
  const {pageWidth,setPageWidth} = pageStore() as widthState;
  useEffect(()=>{
    console.log(pageWidth);
  })
  return (
    <div className="flex-1 bg-foreground flex items-center justify-center mt-[-70px]">
        <div className="absolute top-4 left-4 w-16 h-16">
        <img src="/logosmash.png" className="w-auto h-auto max-w-[150px] max-h-[200px] " />
      </div>

      <svg id="canvas" className="bg-white border border-gray-400" width={width} height={height}></svg>
      < Toolbar />
    </div>
  );
}
