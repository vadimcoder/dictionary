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

  function increment() {
    setGlobalState((oldState) => ({
      ...oldState,
      latestLastRowsCount: oldState.latestLastRowsCount + 1,
    }));
  }

  function decrement() {
    setGlobalState((oldState) => ({
      ...oldState,
      latestLastRowsCount: oldState.latestLastRowsCount - 1,
    }));
  }

  return (
    <div className="latestSelector">
      <button
        type={"button"}
        onClick={decrement}
        className={"latestSelector__button"}
      >
        &lt;
      </button>

      <input
        className={"latestSelector__value"}
        type="number"
        min="1"
        max={LAST_ROWS_MAX}
        value={globalState.latestLastRowsCount}
        onChange={onChange}
      />

      <button
        type={"button"}
        onClick={increment}
        className={"latestSelector__button"}
      >
        &gt;
      </button>
    </div>
  );
}
