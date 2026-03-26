import { Option } from "@/components/ui/multiple-selector";
import { create } from "zustand";

export interface ICreateBlinkStore {
    blinkLink: string;
    selectedTags: Option[] | []
    setBlinkLink: (blinkLink: string) => void;
    setSelectedTags: (selectedTags: Option[]) => void
}

const useCreateBlinkStore = create<ICreateBlinkStore>((set) => ({
    blinkLink: "",
    selectedTags: [],
    setBlinkLink: (blinkLink: string) => set({ blinkLink: blinkLink }),
    setSelectedTags: (selectedTags: Option[]) => set({ selectedTags: selectedTags }),
}));

export default useCreateBlinkStore;