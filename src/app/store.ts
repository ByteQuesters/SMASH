import {create} from 'zustand';

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