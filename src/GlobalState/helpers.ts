import { T_GLOBAL_STATE } from "./GlobalState";

const LOCAL_STORAGE_KEY = "globalState";

export function getStoredState(): T_GLOBAL_STATE | null {
  const globalState = localStorage.getItem(LOCAL_STORAGE_KEY);

  return globalState ? JSON.parse(globalState) : null;
}

export function storeState(globalStage: T_GLOBAL_STATE) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(globalStage));
}
