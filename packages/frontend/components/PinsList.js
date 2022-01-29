import React, { useEffect } from "react";
import { ListItem } from "./ListItem";
import { pinsListState } from "../recoil/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function PinsList() {
  const pinsList = useRecoilValue(pinsListState);
  const setPinsList = useSetRecoilState(pinsListState);
  const addItem = (pin) => {
    setPinsList((pinsList) => [...pinsList, pin]);
  };

  useEffect(() => {
    addItem({
      id: 3,
      amount: 110,
      text: "Get a 110 dollar bill!",
    });
  }, []);
  return (
    <>
      <h3>Pins List</h3>
      <ul>
        {pinsList.map((item) => {
          return <ListItem key={item.id} item={item} />;
        })}
      </ul>
    </>
  );
}
