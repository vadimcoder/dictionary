import { globalStateSchema, T_GLOBAL_STATE } from "./GlobalState";

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

  let globalStateDeserialized: T_GLOBAL_STATE | null;

  try {
    globalStateDeserialized = globalStateSchema.parse(globalState);
  } catch (e) {
    globalStateDeserialized = null;
  }

  return globalStateDeserialized;
}

export function storeState(globalStage: T_GLOBAL_STATE) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(globalStage));
}
