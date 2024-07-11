import { create } from "zustand";

export interface IUserStore {
    username: string
    avatar: string
    first_name: any
    last_name: any
    bio: any
    setUsername: (username: string) => void
    setAvatar: (avatar: string) => void
    setFirstName: (first_name: any) => void
    setLastName: (last_name: any) => void
    setBio: (bio: any) => void
  }

  const useUserStore = create<IUserStore>((set) => ({
    username: "",
    avatar: "",
    first_name: "",
    last_name: "",
    bio: "",
    setUsername: (username: string) => set({ username }),
    setAvatar: (avatar: string) => set({ avatar }),
    setFirstName: (first_name: any) => set({ first_name }),
    setLastName: (last_name: any) => set({ last_name }),
    setBio: (bio: any) => set({ bio }),
  }))

    export default useUserStore;
  