import { atom } from "recoil";
import { IPosts } from "./Interface";

export const postArrAtom = atom<IPosts[]>({
  key: "postArr",
  default: [],
});
