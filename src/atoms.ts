import { atom } from "recoil";
import { ILoggedInUser, IPost } from "./Interface";

export const postArrAtom = atom<IPost[]>({
  key: "postArr",
  default: [],
});

export const loggedInUserAtom = atom<ILoggedInUser>({
  key: "loggedInUser",
  default: { email: "", name: "", userId: "", username: "", isLoggedIn: false },
});
