"use client";

import Canvas from "./components/canvas";
import CodeSpace from "./components/codespace";
import Timeline from "./components/timeline";
import { pageStore } from "./store";
import { useEffect } from "react";

export default function Home() {
  const {pageWidth,setPageWidth} = pageStore();
  const {pageHeight,setPageHeight} = pageStore();
  useEffect(()=>{
    console.log(pageWidth+" "+pageHeight);
  })
  return (
    <div className="h-screen flex">
      <div className="flex flex-col flex-grow relative">
        <Canvas width={pageWidth} height={pageHeight} />
        <Timeline />
      </div>

      <CodeSpace />
    </div>
  );
}
