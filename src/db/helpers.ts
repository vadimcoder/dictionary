import { T_ROW, T_SUBGROUP, T_VOCABULARY } from "../types";
import { db } from "./db.js";

export function forEachSubgroup(
  db: T_VOCABULARY,
  callback: (subgroup: T_SUBGROUP) => void,
) {
  for (const group of db) {
    for (const subgroup of group.subgroups) {
      callback(subgroup);
    }
  }
}

export async function forEachRow(
  db: T_VOCABULARY,
  callback: (row: T_ROW) => Promise<void> | void,
) {
  for (const group of db) {
    for (const subgroup of group.subgroups) {
      for (const item of subgroup.rows) {
        if (item[0] instanceof Array) {
          for (const row of item as T_ROW[]) {
            const returnValue = callback(row);

            if (returnValue instanceof Promise) {
              await returnValue;
            }
          }
        } else {
          const returnValue = callback(item as T_ROW);

          if (returnValue instanceof Promise) {
            await returnValue;
          }
        }
      }
    }
  }
}

export function getAllRows() {
  const allRows: T_ROW[] = [];

  forEachRow(db, (row) => {
    allRows.push(row);
  });

  return allRows;
}
