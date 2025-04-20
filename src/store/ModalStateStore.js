import {create} from "zustand";

const useModalStateStore = create((set, get) => ({
    openReport:false,
    openAuth:false,
    openAIEvaluationModal:false,
    contentAIEvaluationModal:"",
    setContentAIEvaluationModal:(data)=>set({ contentAIEvaluationModal: data }),
    setOpenAIEvaluationModal: (open) => set({ openAIEvaluationModal: open }),
    setOpenReport: (open) => set({ openReport: open }),
    setOpenAuth: (open) => set({ openAuth: open }),

}));

export default useModalStateStore;