
"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "../components/FileUpload";
import CreateProject from "../components/CreateProject";
import Logo from "../../../public/logosmash.png"; // Import the logo

export default function Home() {
  const [svgPreview, setSvgPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [width, setWidth] = useState(900);
  const [height, setHeight] = useState(500);
  const [isValid, setIsValid] = useState(true);

  return (
    <div className="min-h-screen bg-[#FCE7C8] p-6 text-black flex flex-col items-center gap-6">
      {/* Logo at the top */}
      <img src={Logo.src} alt="Logo" className="w-64 h-22" />

      {/* Main Content */}
      <div className="grid gap-4 grid-cols-4 grid-rows-3 w-full">
        <FileUpload svgPreview={svgPreview} setSvgPreview={setSvgPreview} fileInputRef={fileInputRef} />
        <CreateProject 
          showModal={showModal} 
          setShowModal={setShowModal} 
          width={width} 
          setWidth={setWidth} 
          height={height} 
          setHeight={setHeight} 
          isValid={isValid} 
          setIsValid={setIsValid} 
          router={router} 
        />
      </div>
    </div>
  );
}
