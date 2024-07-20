import { Blink } from "@/types/blink";
import { StoredBlinks } from "@/types/storedBlinks";
import { create } from "zustand";

export interface IBlinkStore {
  storeBlinks: StoredBlinks;
  page: number,
  currentBlink: {
    blink: Blink;
    website: string;
    avatar: string;
    username: string;
    verified: boolean,
  } | null;
  setPage: (page: number) => void;
  setCurrentBlink: (blink: Blink, website: string, avatar: string, username: string, verified: boolean) => void;
  setStoreBlinks: (blink: StoredBlinks) => void;
}

const useBlinkStore = create<IBlinkStore>((set) => ({
  currentBlink: null,
  page: 1,
  setCurrentBlink: (blink: Blink, website: string, avatar: string, username: string, verified: boolean) => set({ currentBlink: { blink, website, avatar, username, verified } }),
  storeBlinks: [],
  setPage: (page: number) => set({ page }),
  setStoreBlinks: (blink: StoredBlinks) => set({ storeBlinks: blink }),
}));

export default useBlinkStore;

