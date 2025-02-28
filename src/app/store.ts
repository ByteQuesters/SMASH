import { Upload } from 'lucide-react';
import {create} from 'zustand';

export type shapeState = {
  shape: string;
  setShape: (shape: string) => void;
};

// export type propState = {
//   properties: Record<string, string>;
//   setProperties: (props: Record<string, string>) => void;
// };

// export type itemState = {
//   items: Record<string, string>[];
//   setItems: (item: Record<string, string>[]) => void;
// };

export type svgState = {
  svg: string[],
  setSvg: (svg: string[]) => void;
};

export type indexState = {
  index: number,
  setIndex: (index:number) => void;
}

export type framesState = {
  frames: Record<string,any>[][];
  setFrames: (frame: Record<string,any>[][]) => void;
}
export type svgCodeState = {
  svgCode: string;
  setSvgCode: (svg: string) => void;
};
export type frIndexState = {
  frIndex: number;
  setFrIndex: (index:number) => void;
}

export type widthState = {
  pageWidth: string;
  setPageWidth: (pageWidth: string) => void;
};

export type heightState = {
  pageHeight: string;
  setPageHeight: (pageHeight: string) => void;
};

export type uploadContentState = {
  uploadContent: Record<number, { svgCode: string; x: number; y: number }[]>; 
  setUploadContent: (
    frameIndex: number,
    content: { svgCode: string; x: number; y: number },
    indexToUpdate?: number
  ) => void;
};


const useStore = create((set) => ({
  shape: "",
  setShape: (state: string) => {set({ shape: state });},
  // properties: {},
  // setProperties: (state: Record<string, string>) => {
  //   set({ properties: state });
  // },
  // items: [],
  // setItems: (state: Record<string, string>[]) => {
  //   set({ items: state });
  // },
  svg: [],
  setSvg: (state: string) => {
    set({svg:state})
  },
  index: -1,
  setIndex: (state: number) => {
    set({index: state});
  },
  frames: [[]],
  setFrames: (state: Record<string,any>[][]) => {
    set({frames:state});
  },
  svgCode: "<svg></svg>",
  setSvgCode: (svg:any) => set({ svgCode: svg }),
  frIndex: 0,
  setFrIndex: (state:number) => set({frIndex:state}),

  uploadContent: {} as Record<number, { svgCode: string; x: number; y: number }[]>,

  setUploadContent: (
    frameIndex: number,
    content: { svgCode: string; x: number; y: number },
    indexToUpdate?: number
  ) =>
    set((state: { uploadContent: Record<number, { svgCode: string; x: number; y: number }[]> }) => {
      const existingFrameContent = state.uploadContent[frameIndex] || [];
      const updatedFrameContent = [...existingFrameContent];

      if (indexToUpdate !== undefined && updatedFrameContent[indexToUpdate]) {
        // 🔄 Update existing item without adding a new one
        updatedFrameContent[indexToUpdate] = content;
      } else {
        // ➕ Add new item if index not provided
        updatedFrameContent.push(content);
      }

      return {
        uploadContent: {
          ...state.uploadContent,
          [frameIndex]: updatedFrameContent,
        },
      };
    }),
   



}));

export default useStore;


export const pageStore = create((set:any)=>({
    pageWidth: "",
    setPageWidth: (state:string) => {set({pageWidth:state})},
    pageHeight: "",
    setPageHeight: (state:string) => {set({pageHeight:state})},
}))

export const formStore = create((set:any)=>({
  show: false,
  setShow: (state:boolean) => {set({show:state})},
  props: {},
  setProps: (state:Record<string,any>) => {set({props:state})},
  ind: 0,
  setInd: (state:number) => {set({index:state})}
}))
