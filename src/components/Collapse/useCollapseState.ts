import { useId, useState } from "react";
import { T_COLLAPSE_STATE, T_USE_COLLAPSE_STATE } from "./types";

export function useCollapseState(): T_USE_COLLAPSE_STATE {
  const ariaId = useId();

  return useState<T_COLLAPSE_STATE>({
    isOpened: false,
    isClosing: false,
    ariaId,
  });
}
