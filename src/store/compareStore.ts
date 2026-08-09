import {create} from "zustand/react";

interface CompareStore {
    selectedIds: string[];
    toggleCompare: (id: string) => void;
    clearCompare: () => void;
}

export const useCompareStore = create<CompareStore>((set) => ({
    selectedIds: [],
    toggleCompare: (id) =>
        set((state) => {
            if (state.selectedIds.includes(id)) {
                return { selectedIds: state.selectedIds.filter((x) => x !== id) };
            }
            if (state.selectedIds.length >= 3) {
                return state;
            }
            return { selectedIds: [...state.selectedIds, id] };
        }),
    clearCompare: () => set({selectedIds: []})
}))