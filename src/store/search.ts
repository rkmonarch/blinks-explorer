import { StoredBlinks } from "@/types/storedBlinks";
import { create } from "zustand";

export interface ISearchStore {
    searchText: string;
    filteredBlinks: StoredBlinks;
    setSearchText: (blinkLink: string) => void;
    setFilteredBlinks: (blink: StoredBlinks) => void;
}

const useSearchStore = create<ISearchStore>((set) => ({
    searchText: "",
    filteredBlinks: [],
    setFilteredBlinks: (filteredBlinks: StoredBlinks) => set({ filteredBlinks }),
    setSearchText: (searchText: string) => set({ searchText: searchText }),
}));

export default useSearchStore;