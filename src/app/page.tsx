"use client";

import Canvas from "./components/canvas";
import CodeSpace from "./components/codespace";
import Timeline from "./components/timeline";

export default function Home() {
  return (
    <div className="h-screen flex">
      <div className="flex flex-col flex-grow relative">
        <Canvas />
        <Timeline />
      </div>

      <CodeSpace />
    </div>
  );
}
