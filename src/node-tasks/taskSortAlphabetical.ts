import { readDbFromFile, writeDbToFile } from "./common.js";
import { ALPHABETICAL } from "../db/constants.js";
import orderBy from "lodash.orderby";
import { T_DICTIONARY, T_GROUP, T_ROWS } from "../db/types";

function sortAlphabetical(dictionary: T_DICTIONARY<T_ROWS>) {
  dictionary.forEach(({ subgroups }: T_GROUP<T_ROWS>) => {
    subgroups.forEach((subgroup) => {
      if (subgroup.subgroupName === ALPHABETICAL) {
        subgroup.rows = orderBy(subgroup.rows, (row) => row[0].wordSet.word);
      }
    });
  });
}

export async function taskSortAlphabetical() {
  const dictionary: T_DICTIONARY<T_ROWS> = readDbFromFile();

  sortAlphabetical(dictionary);

  await writeDbToFile(dictionary);
}
