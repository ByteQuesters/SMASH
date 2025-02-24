"use client";

import Canvas from "../components/canvas";
import CodeSpace from "../components/codespace";
import Timeline from "../components/timeline";
import { pageStore, formStore } from "../store";
import { useEffect, useState } from "react";
import PropertiesForm from "../components/PropertiesForm";

export default function Home() {
  const store = pageStore();
  const { pageWidth, setPageWidth, pageHeight, setPageHeight } = store;

  const [frames, setFrames] = useState<{ id: number; svg: string }[]>([]);
  const { show, setShow } = formStore();

  useEffect(() => {
    console.log(pageWidth + " " + pageHeight);
  }, [pageWidth, pageHeight]);

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
