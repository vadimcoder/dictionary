import { T_ROWS } from "../../../db/types";
import { useGlobalState } from "../../../GlobalState/GlobalState";
import { DB } from "../../../db/db";
import { useEffect, useState } from "react";
import shuffle from "lodash.shuffle";

export function useShuffle(): [T_ROWS, () => void] {
  const [globalState] = useGlobalState();
  const lastRows = DB.getLastRows(globalState.latestLastRowsCount);

  const [rows, setRows] = useState(lastRows);

  useEffect(() => {
    if (rows.length !== lastRows.length) {
      setRows(lastRows);
    }
  }, [lastRows]);

  function shuffleRows() {
    setRows((rows) => shuffle(rows));
  }

  return [rows, shuffleRows];
}
