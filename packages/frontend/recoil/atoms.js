import { atom } from "recoil";
import { selector } from "recoil";

export const pinsListState = atom({
  key: "pinsListState-key",
  default: [
    {
      id: 1,
      amount: 10,
      text: "Found a 10 dollar bill!",
    },
    {
      id: 2,
      amount: -110,
      text: "Buyy a new keyboard",
    },
  ],
});
