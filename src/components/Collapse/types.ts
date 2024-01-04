import { Dispatch, SetStateAction, useId, useState } from "react";

export type T_COLLAPSE_STATE = {
  isOpened: boolean;
  isClosing: boolean;
  ariaId: string;
};

export type T_USE_COLLAPSE_STATE = [
  T_COLLAPSE_STATE,
  Dispatch<SetStateAction<T_COLLAPSE_STATE>>,
];

export function useCollapseState(): T_USE_COLLAPSE_STATE {
  const ariaId = useId();

  return useState<T_COLLAPSE_STATE>({
    isOpened: false,
    isClosing: false,
    ariaId,
  });
}
