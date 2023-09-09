import sortBy from "lodash.sortby";
import { useGlobalState } from "../GlobalState/GlobalState";
import { getAllRows } from "../db/helpers";
import { T_ROW_WITH_ASSOCIATION } from "../types";
import { ForeignWord } from "../ForeignWord/ForeignWord";
import { LatestAssociationCollapse } from "./LatestAssociationCollapse/LatestAssociationCollapse";

function getSortedRows(
  rows: T_ROW_WITH_ASSOCIATION[],
): T_ROW_WITH_ASSOCIATION[] {
  return sortBy(rows, (row: T_ROW_WITH_ASSOCIATION) => row.row[3]);
}

function getRows(lastRowsCount: number): T_ROW_WITH_ASSOCIATION[] {
  const rows: T_ROW_WITH_ASSOCIATION[] = getAllRows();

  const rowsSorted = getSortedRows(rows);

  return rowsSorted.slice(-lastRowsCount);
}

export function LatestList() {
  const [globalState] = useGlobalState();

  const rows = getRows(globalState.lastRowsCount);

  return (
    <table>
      <tbody>
        {rows.map((row: T_ROW_WITH_ASSOCIATION) =>
          row.associations ? (
            <LatestAssociationCollapse row={row} key={row.row[0]} />
          ) : (
            <tr key={row.row[0]}>
              <td>
                <ForeignWord row={row.row} />
                {/*{row.associations && <div>{row.associations[0][0]}</div>}*/}
              </td>
              <td>{row.row[1]}</td>
              <td>{row.row[2]}</td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
}
