import sortBy from "lodash.sortby";
import { useGlobalState } from "../GlobalState/GlobalState";
import { getAllRows } from "../db/helpers";
import { T_ROW } from "../types";
import { Player } from "../Player/Player";
import { ForeignWord } from "../ForeignWord/ForeignWord";

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
    <table>
      <tbody>
        {rows.map((row) => (
          <tr key={row[0]}>
            <td>
              <Player word={row[0]} />
            </td>
            <td>
              <ForeignWord row={row} />
            </td>
            <td>{row[1]}</td>
            <td>{row[2]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
