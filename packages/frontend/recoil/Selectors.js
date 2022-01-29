import { pinsListState } from "./atoms";
import { selector } from "recoil";

export const balanceState = selector({
  key: "balanceState-key",
  get: ({ get }) => {
    const pinsList = get(pinsListState);
    const amounts = pinsList.map((pin) => pin.amount);
    const balance = amounts.reduce((acc, num) => (acc += num), 0).toFixed(2);

    return balance;
  },
});
