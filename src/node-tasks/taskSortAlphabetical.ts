import { readDbFromFile, writeDbToFile } from "./common.js";
import { T_ROW, T_SUBGROUP, T_VOCABULARY } from "../types";
import { forEachSubgroup } from "../db/helpers.js";
import { ALPHABETICAL } from "../db/constants.js";
import sortBy from "lodash.sortby";

function sortAlphabetical(db: T_VOCABULARY) {
  forEachSubgroup(db, (subgroup: T_SUBGROUP) => {
    if (subgroup.subgroupName === ALPHABETICAL) {
      subgroup.rows = sortBy(subgroup.rows as T_ROW[], (row: T_ROW) => row[0]);
    }
  });
}

export async function taskSortAlphabetical() {
  const db: T_VOCABULARY = readDbFromFile();

  sortAlphabetical(db);

  await writeDbToFile(db);
}
