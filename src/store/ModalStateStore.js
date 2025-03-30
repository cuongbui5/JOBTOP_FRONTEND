import {create} from "zustand";
const useModalStateStore = create((set, get) => ({
    openReport:false,
    openAuth:false,

    setOpenReport: (open) => set({ openReport: open }),
    setOpenAuth: (open) => set({ openAuth: open }),

}));

export default useModalStateStore;