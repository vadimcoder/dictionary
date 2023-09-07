import { T_ROW, T_VOCABULARY } from "../types";
import { db } from "./db.js";

export async function forEachRow(
  db: T_VOCABULARY,
  callback: (row: T_ROW) => Promise<void> | void,
) {
  for (const { groupItems } of db) {
    for (const { subgroupItems } of groupItems) {
      for (const item of subgroupItems) {
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
