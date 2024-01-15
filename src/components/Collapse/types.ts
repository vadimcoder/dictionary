import { Dispatch, SetStateAction } from "react";

export type T_COLLAPSE_STATE = {
  isOpened: boolean;
  isClosing: boolean;
  ariaId: string;
};

export type T_USE_COLLAPSE_STATE = [
  T_COLLAPSE_STATE,
  Dispatch<SetStateAction<T_COLLAPSE_STATE>>,
];
