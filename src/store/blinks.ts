import { StoredBlinks } from "@/types/storedBlinks";
import { create } from "zustand";

export interface IBlinkStore {
  storeBlinks: StoredBlinks;
  setStoreBlinks: (blink: StoredBlinks) => void;
}

const useBlinkStore = create<IBlinkStore>((set) => ({
  storeBlinks: [],
  setStoreBlinks: (blink: StoredBlinks) => set({ storeBlinks: blink}),
}));

export default useBlinkStore;