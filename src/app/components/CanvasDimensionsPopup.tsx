

'use client';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { heightState, pageStore, widthState } from "../store";
import { useRouter } from 'next/navigation'

interface CanvasDimensionsPopupProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  width: number;
  setWidth: (value: number) => void;
  height: number;
  setHeight: (value: number) => void;
  isValid: boolean;
  setIsValid: (value: boolean) => void;
}

const CanvasDimensionsPopup: React.FC<CanvasDimensionsPopupProps> = ({ showModal, setShowModal, width, setWidth, height, setHeight, isValid, setIsValid }) => {
  // const { setPageWidth, setPageHeight } = pageStore();
  const {pageWidth,setPageWidth} = pageStore() as widthState;
  const {pageHeight,setPageHeight} = pageStore() as heightState;
  const router = useRouter();

  const validateDimensions = (w: number, h: number) => w >= 200 && w <= 800 && h >= 200 && h <= 500;

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value) || 200;
    setWidth(newWidth);
    setIsValid(validateDimensions(newWidth, height));
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value) || 200;
    setHeight(newHeight);
    setIsValid(validateDimensions(width, newHeight));
  };

  const handleProceed = () => {
    const tempWidth = width.toString();
    setPageWidth(tempWidth);
    const tempHeight = height.toString();
    setPageHeight(tempHeight);
    setShowModal(false);
    console.log(tempHeight);
    router.push('/');
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="max-w-md p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg text-black text-center font-semibold">Set Canvas Dimensions</DialogTitle>
          <DialogDescription className="text-gray-600 text-sm">
            Enter dimensions (min: 200x200 pixels, max: 800x500 pixels)
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-gray-700">Enter Width (px)</label>
          <Input type="number" value={width} onChange={handleWidthChange} className="border-gray-300 p-2 rounded text-black" />
          <label className="text-sm font-medium text-gray-700">Enter Height (px)</label>
          <Input type="number" value={height} onChange={handleHeightChange} className="border-gray-300 p-2 rounded text-black" />
        </div>
        {!isValid && <p className="text-red-500 text-sm mt-2">Invalid dimensions! Width must be between 200-800px and height 200-500px.</p>}
        <Button className="bg-blue-600 text-white w-full mt-4" onClick={handleProceed} disabled={!isValid}>
          Proceed
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CanvasDimensionsPopup;
