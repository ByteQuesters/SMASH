/* eslint-disable @typescript-eslint/no-explicit-any */
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
}));

export default useStore;


export const pageStore = create((set:any)=>({
    pageWidth: "500",
    setPageWidth: (state:string) => {set({pageWidth:state})},
    pageHeight: "500",
    setPageHeight: (state:string) => {set({pageHeight:state})},
}))

export const formStore = create((set:any)=>({
  show: false,
  setShow: (state:boolean) => {set({show:state})},
  props: {},
  setProps: (state:Record<string,any>) => {set({props:state})},
}))

export type animePanelState = {
  showAnimations: boolean;
  setShowAnimations: (state: boolean) => void;
}

export const animePanelStore = create((set: any) => ({
  showAnimations: false,
  setShowAnimations: (state: boolean) => {set({ showAnimations: state })},
}));