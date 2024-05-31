import { T_GLOBAL_STATE } from "./GlobalState";

const LOCAL_STORAGE_KEY = "globalState";

export function getStoredState(): T_GLOBAL_STATE | null {
  let globalState = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (globalState === null) {
    return null;
  }

  try {
    globalState = JSON.parse(globalState);
  } catch (e) {
    globalState = null;
  }

  if (globalState === null) {
    return null;
  }

  const globalStateTyped = globalState as unknown as T_GLOBAL_STATE;

  if (globalStateTyped.latestLastRowsCount && globalStateTyped.quiz) {
    return globalStateTyped;
  }

  return null;
}

export function storeState(globalStage: T_GLOBAL_STATE) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(globalStage));
}
