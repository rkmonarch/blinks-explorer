import { Blink } from "@/types/blink";
import { StoredBlinks } from "@/types/storedBlinks";
import { create } from "zustand";

export interface IBlinkStore {
  storeBlinks: StoredBlinks;
  page: number;
  currentBlink: {
    blink: Blink;
    website: string;
    avatar: string;
    username: string;
    verified: boolean;
  } | null;
  totalPage: number;
  setPage: (page: number) => void;
  setTotalPage: (totalPage: number) => void;
  setCurrentBlink: (
    blink: Blink,
    website: string,
    avatar: string,
    username: string,
    verified: boolean
  ) => void;
  setStoreBlinks: (blink: StoredBlinks) => void;
}

const useBlinkStore = create<IBlinkStore>((set) => ({
  currentBlink: null,
  page: 1,
  totalPage: 0,
  setCurrentBlink: (
    blink: Blink,
    website: string,
    avatar: string,
    username: string,
    verified: boolean
  ) => set({ currentBlink: { blink, website, avatar, username, verified } }),
  storeBlinks: [],
  setPage: (page) => set({ page }),
  setStoreBlinks: (blink) => set({ storeBlinks: blink }),
  setTotalPage: (totalPage) => set({ totalPage }),
}));

export default useBlinkStore;
