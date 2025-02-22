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
    svg: string,
    setSvg: (svg:string) => void;
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
  }
}));

export default useStore;