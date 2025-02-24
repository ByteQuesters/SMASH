import CanvasDimensionsPopup from "../components/CanvasDimensionsPopup";

interface CreateProjectProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  width: number;
  setWidth: (value: number) => void;
  height: number;
  setHeight: (value: number) => void;
  isValid: boolean;
  setIsValid: (value: boolean) => void;
  router: any;
}

export default function CreateProject({ showModal, setShowModal, width, setWidth, height, setHeight, isValid, setIsValid, router }: CreateProjectProps) {
  const handleProceed = () => {
    if (width >= 500 && height >= 300) {
      localStorage.setItem("canvasWidth", width.toString());
      localStorage.setItem("canvasHeight", height.toString());
      setShowModal(false);
      router.push("/editor");
    } else {
      setIsValid(false);
    }
  };

  return (
    // <div className="bg-white p-6 col-span-2 row-span-1 rounded-xl border border-gray-300 border-dashed flex flex-col items-center justify-center mt-[20%] text-center h-[100%] w-[50%] mx-20 my-10">
     <div className="bg-white p-6 col-span-2 row-span-1 rounded-xl border border-gray-300 border-dashed flex flex-col items-center justify-center mt-[15%] text-center h-[100%] w-[50%] mx-auto -translate-x-20 my-30">

      <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
      <h1 className="text-gray-700 font-semibold text-2xl mt-4">Create a New Project</h1>
      <p className="text-gray-500 font-medium mt-2">No complex tools needed. Start fresh!</p>
      <button className="px-4 py-2 bg-amber-500 text-white rounded-md mt-4 flex items-center" onClick={() => setShowModal(true)}>
        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Start Creating
      </button>

      <CanvasDimensionsPopup showModal={showModal} setShowModal={setShowModal} width={width} setWidth={setWidth} height={height} setHeight={setHeight} isValid={isValid} setIsValid={setIsValid} />
    </div>
  );
}
