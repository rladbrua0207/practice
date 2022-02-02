import { atom } from "recoil";
import { IPost } from "./Interface";

export const postArrAtom = atom<IPost[]>({
  key: "postArr",
  default: [],
});
