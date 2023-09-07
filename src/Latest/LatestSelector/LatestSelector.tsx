import "./style.css";
import { useGlobalState } from "../../GlobalState/GlobalState";
import { ChangeEvent } from "react";

const DAYS_AGO_MAX = 100;

export function LatestSelector() {
  const [globalState, setGlobalState] = useGlobalState();

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const value = parseInt(event.target.value);

    setGlobalState({
      ...globalState,
      lastRowsCount: value,
    });
  }

  return (
    <div className="latestSelector">
      <span className="latestSelector__value">{globalState.lastRowsCount}</span>

      <input
        className={"latestSelector__input"}
        type="range"
        min="1"
        max={DAYS_AGO_MAX}
        value={globalState.lastRowsCount}
        step="1"
        id="inputRange"
        onChange={onChange}
      />
    </div>
  );
}
