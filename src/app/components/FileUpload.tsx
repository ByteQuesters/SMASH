

// import { useState, RefObject } from "react";
// import { useRouter } from "next/navigation";

// interface FileUploadProps {
//   svgPreview: string | null;
//   setSvgPreview: (value: string | null) => void;
//   fileInputRef: RefObject<HTMLInputElement | null>;
// }

// export default function FileUpload({ svgPreview, setSvgPreview, fileInputRef }: FileUploadProps) {
//   const [uploaded, setUploaded] = useState(false);
//   const router = useRouter();

//   const handleProceed = () => {
//     router.push('/');
//   };
//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && file.type === "image/svg+xml") {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setSvgPreview(reader.result as string);
//         setUploaded(true);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="bg-white p-6 col-span-2 row-span-1 rounded-xl border border-gray-300 border-dashed flex flex-col items-center justify-center mt-[15%] text-center h-[100%] w-[50%] mx-auto translate-x-20 my-10">

//       {svgPreview ? (
//         <img src={svgPreview} alt="SVG Preview" className="w-32 h-32 object-contain" />
//       ) : (
//         <>
//           <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l4-4 4 4m-4-4v12"></path>
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12V4a2 2 0 00-2-2H6a2 2 0 00-2 2v8"></path>
//   </svg>
//           <h1 className="text-gray-700 font-semibold text-2xl mt-4">Drag & Drop Editing</h1>
//           <p className="text-gray-500 font-medium mt-2">Animate your design instantly</p>
//         </>
//       )}
//       <input type="file" accept="image/svg+xml" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
//       {uploaded ? (
//         <div className="flex gap-4 mt-4">
//           <button className="px-4 py-2 bg-green-500 text-white rounded-md flex items-center" onClick={() =>{handleProceed}}>
//             <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
//             </svg>
//             Proceed
//           </button>
//           <button className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center" onClick={() => fileInputRef.current?.click()}>
//             <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
//             </svg>
//             Upload Again
//           </button>
//         </div>
//       ) : (
//         <button className="px-4 py-2 bg-amber-500 text-white rounded-md flex items-center mt-4" onClick={() => fileInputRef.current?.click()}>
//           <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
//           </svg>
//           Upload Your SVG
//         </button>
//       )}
//     </div>
//   );
// }

import { useState, RefObject } from "react";
import { useRouter } from "next/navigation";
import CanvasDimensionsPopup from "./CanvasDimensionsPopup";

interface FileUploadProps {
  svgPreview: string | null;
  setSvgPreview: (value: string | null) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
}

export default function FileUpload({ svgPreview, setSvgPreview, fileInputRef }: FileUploadProps) {
  const [uploaded, setUploaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [isValid, setIsValid] = useState(true);
  const router = useRouter();

  const handleProceed = () => {
    setShowModal(true); // Show dimension popup
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = () => {
        setSvgPreview(reader.result as string);
        setUploaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="bg-white p-6 col-span-2 row-span-1 rounded-xl border border-gray-300 border-dashed flex flex-col items-center justify-center mt-[15%] text-center h-[100%] w-[50%] mx-auto translate-x-20 my-10">
        {svgPreview ? (
          <img src={svgPreview} alt="SVG Preview" className="w-32 h-32 object-contain" />
        ) : (
          <>
            <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l4-4 4 4m-4-4v12"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12V4a2 2 0 00-2-2H6a2 2 0 00-2 2v8"></path>
            </svg>
            <h1 className="text-gray-700 font-semibold text-2xl mt-4">Drag & Drop Editing</h1>
            <p className="text-gray-500 font-medium mt-2">Animate your design instantly</p>
          </>
        )}
        <input type="file" accept="image/svg+xml" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
        {uploaded ? (
          <div className="flex gap-4 mt-4">
            <button className="px-4 py-2 bg-green-500 text-white rounded-md flex items-center" onClick={handleProceed}>
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
              Proceed
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center" onClick={() => fileInputRef.current?.click()}>
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Upload Again
            </button>
          </div>
        ) : (
          <button className="px-4 py-2 bg-amber-500 text-white rounded-md flex items-center mt-4" onClick={() => fileInputRef.current?.click()}>
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Upload Your SVG
          </button>
        )}
      </div>

      {/* Dimension Popup */}
      {showModal && (
        <CanvasDimensionsPopup
          showModal={showModal}
          setShowModal={setShowModal}
          width={width}
          setWidth={setWidth}
          height={height}
          setHeight={setHeight}
          isValid={isValid}
          setIsValid={setIsValid}
        />
      )}
    </>
  );
}
