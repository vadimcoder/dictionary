import {
  T_ROW_WITH_ASSOCIATION,
  T_ROW,
  T_SUBGROUP,
  T_VOCABULARY,
} from "../types";
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
  callback: (row: T_ROW, associations: T_ROW[] | null) => Promise<void> | void,
) {
  for (const group of db) {
    for (const subgroup of group.subgroups) {
      for (const item of subgroup.rows) {
        if (item[0] instanceof Array) {
          for (const row of item as T_ROW[]) {
            const returnValue = callback(row, item as T_ROW[]);

            if (returnValue instanceof Promise) {
              await returnValue;
            }
          }
        } else {
          const returnValue = callback(item as T_ROW, null);

          if (returnValue instanceof Promise) {
            await returnValue;
          }
        }
      }
    }
  }
}

export function getAllRows(): T_ROW_WITH_ASSOCIATION[] {
  const allRows: T_ROW_WITH_ASSOCIATION[] = [];

  forEachRow(db, (row, associations: T_ROW[] | null) => {
    allRows.push({ row, associations });
  });

  return allRows;
}
