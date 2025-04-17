import {create} from "zustand";
const useJobStore = create((set, get) => ({
    selectedJobId:null,
    totalElements: 0,
    currentPage: 1,
    filters: {
        keyword: "",
        city: "",
        exp: null,
        categoryId: null,
        salaryRange: null,
        job_type: null,
        companyId: null,
        industryId: null,
        sortBy: "date_desc",
    },
    setFilters: (newFilters) => set((state) => ({ filters: { ...state.filters, ...newFilters } })),
    setCurrentPage: (page) => set({ currentPage: page }),
    setTotalElements: (total) => set({ totalElements: total }),
    setSelectedJobId: (id) => set({ selectedJobId: id }),

}));

export default useJobStore;