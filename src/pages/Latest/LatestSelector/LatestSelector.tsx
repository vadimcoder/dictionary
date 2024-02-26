import "./style.css";
import { useGlobalState } from "../../../GlobalState/GlobalState";
import { ChangeEvent } from "react";
import { DB } from "../../../db/db";

const LAST_ROWS_MAX = DB.flatSorted.length;

export function LatestSelector() {
  const [globalState, setGlobalState] = useGlobalState();

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const value = parseInt(event.target.value);

    setGlobalState((oldState) => ({
      ...oldState,
      latestLastRowsCount: value,
    }));
  }

  return (
    <div className="latestSelector">
      <div className="latestSelector__value">
        {globalState.latestLastRowsCount}
      </div>

      <input
        className={"latestSelector__input"}
        type="range"
        min="1"
        max={LAST_ROWS_MAX}
        value={globalState.latestLastRowsCount}
        step="1"
        id="inputRange"
        onChange={onChange}
      />
    </div>
  );
}
