import db from "./db.json" assert { type: "json" };
import { T_ROW, T_VOCABULARY } from "../types";

export function getDb(): T_VOCABULARY {
  return db as T_VOCABULARY;
}

function forEachRow(db: T_VOCABULARY, callback: (row: T_ROW) => void) {
  for (const { groupItems } of db) {
    for (const { subgroupItems } of groupItems) {
      for (const item of subgroupItems) {
        if (item[0] instanceof Array) {
          for (const row of item as T_ROW[]) {
            callback(row);
          }
        } else {
          callback(item as T_ROW);
        }
      }
    }
  }
  // db.forEach(({ groupItems }) => {
  //   groupItems.forEach(({ subgroupItems }) => {
  //     subgroupItems.forEach((item: T_ROW | T_ROW[]) => {
  //       if (item[0] instanceof Array) {
  //         (item as T_ROW[]).forEach((row) => {
  //           callback(row);
  //         });
  //       } else {
  //         callback(item as T_ROW);
  //       }
  //     });
  //   });
  // });
}

export function getAllRows(db = getDb()) {
  const allRows: T_ROW[] = [];

  forEachRow(db, (row) => {
    allRows.push(row);
  });

  return allRows;
}
