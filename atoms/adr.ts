import { atom } from "recoil";

export const adrAtom = atom({
  key: "adrAtom",
  default: {
    postion: {
      La: 0,
      Ma: 0,
    },
    address: "",
  },
});
