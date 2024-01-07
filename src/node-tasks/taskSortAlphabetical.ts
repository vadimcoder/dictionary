import { readDbFromFile, writeDbToFile } from "./common.js";
import { ALPHABETICAL } from "../db/constants.js";
import orderBy from "lodash.orderby";
import { T_DICTIONARY, T_GROUP, T_ROW } from "../types/dictionary";

function sortAlphabetical(dictionary: T_DICTIONARY<T_ROW>) {
  dictionary.forEach(({ subgroups }: T_GROUP<T_ROW>) => {
    subgroups.forEach((subgroup) => {
      if (subgroup.subgroupName === ALPHABETICAL) {
        subgroup.rows = orderBy(
          subgroup.rows,
          (row) => row.words[0].foreignWord,
        );
      }
    });
  });
}

export async function taskSortAlphabetical() {
  const dictionary: T_DICTIONARY<T_ROW> = readDbFromFile();

  sortAlphabetical(dictionary);

  await writeDbToFile(dictionary);
}
