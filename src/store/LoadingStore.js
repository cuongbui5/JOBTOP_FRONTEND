import { create } from "zustand";

const useLoadingStore = create((set) => ({
    loading: {},
    setLoading: (type, state) =>
        set((prev) => ({
            loading: { ...prev.loading, [type]: state },
        })),
}));

export default useLoadingStore;
