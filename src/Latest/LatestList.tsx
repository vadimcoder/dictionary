import sortBy from "lodash.sortby";
import { useGlobalState } from "../GlobalState/GlobalState";
import { getAllRows } from "../db/helpers";
import { T_ROW } from "../types";

function getSortedRows(rows: T_ROW[]): T_ROW[] {
  return sortBy(rows, (row: T_ROW) => row[3]);
}

function getRows(lastRowsCount: number): T_ROW[] {
  const rows = getAllRows();

  const rowsSorted = getSortedRows(rows);

  return rowsSorted.slice(-lastRowsCount);
}

export function LatestList() {
  const [globalState] = useGlobalState();

  const rows = getRows(globalState.lastRowsCount);

  return (
    <>
      {rows.map((row) => (
        <div key={row[0]}>{row[0]}</div>
      ))}
    </>
  );
}
