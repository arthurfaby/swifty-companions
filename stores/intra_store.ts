import { create } from "zustand/react";

type IntraStore = {
  baseUrl: string;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
};

const useIntraStore = create<IntraStore>((set) => ({
  baseUrl: "https://api.intra.42.fr",
  accessToken: "",
  setAccessToken: (accessToken) => set({ accessToken }),
}));

export { useIntraStore };
