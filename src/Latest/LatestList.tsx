import sortBy from "lodash.sortby";
import parseISO from "date-fns/parseISO";
import { T_GROUP_ITEM, T_ROW, T_ROW_DATE, T_SUBGROUP_ITEM } from "../types.ts";
import { useGlobalState } from "../GlobalState/GlobalState.tsx";
import { getDB } from "../database/helpers.ts";

function getAllRows() {
  const allRows: T_ROW[] = [];

  getDB()
    .map((group: T_GROUP_ITEM) => group.groupItems)
    .flat()
    .map((subgroupItem: T_SUBGROUP_ITEM) => subgroupItem.subgroupItems)
    .flat()
    .forEach((row) => {
      if (row[0] instanceof Array) {
        (row as T_ROW[]).forEach((item: T_ROW) => {
          allRows.push(item);
        });
      } else {
        allRows.push(row as T_ROW);
      }
    });

  return allRows;
}

function getRowsWithTime(rows: T_ROW[]): T_ROW_DATE[] {
  return rows.map((row) => [row[0], row[1], row[2], parseISO(row[3])]);
}

function getSortedRows(rows: T_ROW_DATE[]): T_ROW_DATE[] {
  return sortBy(rows, (row: T_ROW_DATE) => row[3]);
}

function getRows(lastRowsCount: number): T_ROW_DATE[] {
  const rows = getAllRows();

  const rowsWithTime = getRowsWithTime(rows);

  const rowsSorted = getSortedRows(rowsWithTime);

  console.log("rowsWithTime", rowsWithTime);
  console.log("rowsSorted", rowsSorted);

  return rowsSorted.slice(-lastRowsCount);
}

export function LatestList() {
  const [globalState] = useGlobalState();

  const rows = getRows(globalState.lastRowsCount);

  return (
    <>
      {rows.map((row) => (
        <div>{row[0]}</div>
      ))}
    </>
  );
}
