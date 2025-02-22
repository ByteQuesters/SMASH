
"use client";

import Toolbar from "./toolbar"; 

export default function Canvas() {
  return (
    <div className="flex-1 bg-foreground flex items-center justify-center mt-[-70px]">
        <div className="absolute top-4 left-4 w-16 h-16">
        <img src="/logosmash.png" className="w-auto h-auto max-w-[150px] max-h-[200px] " />
      </div>

      <svg id="canvas" className="bg-white border border-gray-400" width="900" height="500"></svg>
      < Toolbar />
    </div>
  );
}
