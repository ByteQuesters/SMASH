import {create} from 'zustand';

export type shapeState = {
  shape: string;
  setShape: (shape: string) => void;
};

export type propState = {
  properties: Record<string, string>;
  setProperties: (props: Record<string, string>) => void;
};

export type itemState = {
  items: Record<string, string>[];
  setItems: (item: Record<string, string>[]) => void;
};

export type svgState = {
  svg: string[],
  setSvg: (svg: string[]) => void;
};

export type indexState = {
  index: number,
  setIndex: (index:number) => void;
}


const useStore = create((set) => ({
  shape: "",
  setShape: (state: string) => {
    set({ shape: state });
  },
  properties: {},
  setProperties: (state: Record<string, string>) => {
    set({ properties: state });
  },
  items: [],
  setItems: (state: Record<string, string>[]) => {
    set({ items: state });
  },
  svg: [],
  setSvg: (state: string) => {
    set({svg:state})
  },
  index: -1,
  setIndex: (state: number) => {
    set({index: state});
  }
}));

export default useStore;
export type widthState = {
    pageWidth: string;
    setPageWidth: (pageWidth:string) => void;
}

export type heightState = {
    pageHeight: string;
    setPageHeight: (pageHeight:string) => void;
}

export const pageStore = create((set:any)=>({
    pageWidth: "",
    setPageWidth: (state:string) => {set({pageWidth:state})},
    pageHeight: "",
    setPageHeight: (state:string) => {set({pageHeight:state})},
}))
