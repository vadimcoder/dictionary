import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { getStoredState, storeState } from "./helpers";
import { T_ROWS } from "../db/types";

export type T_GLOBAL_STATE = {
  latestLastRowsCount: number;
  quizLastRowsCount: number;
  selectedRows: T_ROWS;
};

type T_USE_GLOBAL_STATE = [
  T_GLOBAL_STATE,
  Dispatch<SetStateAction<T_GLOBAL_STATE>>,
];

const DEFAULT_STATE: T_GLOBAL_STATE = {
  latestLastRowsCount: 20,
  quizLastRowsCount: 20,
  selectedRows: [],
};

const DEFAULT_USE_GLOBAL_STATE: T_USE_GLOBAL_STATE = [
  getStoredState() || DEFAULT_STATE,
  () => {},
];

const GlobalStateContext = createContext<T_USE_GLOBAL_STATE>(
  DEFAULT_USE_GLOBAL_STATE,
);

export function GlobalState({ children }: { children: ReactNode }) {
  const globalState = useState<T_GLOBAL_STATE>(DEFAULT_USE_GLOBAL_STATE[0]);
  const [value] = globalState;

  useEffect(() => {
    storeState(value);
  }, [value]);

  return (
    <GlobalStateContext.Provider value={globalState}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState(): T_USE_GLOBAL_STATE {
  return useContext(GlobalStateContext);
}
