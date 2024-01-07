import { T_DICTIONARY, T_ROW, T_WORD_WITH_ASSOCIATIONS } from "./dictionary";

export type T_DB = {
  dictionary: T_DICTIONARY<T_ROW>;
  allRowsSorted: T_WORD_WITH_ASSOCIATIONS[];
  getLastRows: (lastRowsCount: number) => T_WORD_WITH_ASSOCIATIONS[];
};
