export type T_DICTIONARY<ROW_TYPE> = T_GROUP<ROW_TYPE>[];

export type T_GROUP<ROW_TYPE> = {
  groupName: string;
  subgroups: T_SUBGROUP<ROW_TYPE>[];
};

export type T_SUBGROUP<ROW_TYPE> = {
  subgroupName: string;
  rows: ROW_TYPE[];
};

export type T_ROW = {
  wordSet: T_WORD_SET;
  translation: string;
  dateAdded: Date;
  irregularVerb?: {
    secondWordSet: T_WORD_SET;
    thirdWordSet: T_WORD_SET;
  };
  associations?: {
    includingTheRow: T_ROWS;
    excludingTheRow: T_ROWS;
  };
};

export type T_WORD_SET = {
  word: string;
  transcription: string;
};

export type T_ROWS = T_ROW[];

export type T_ROW_RAW = [
  string /* word */,
  string /* transcription */,
  string /* translation */,
  string /* dateAdded */,
];
export type T_ROW_RAW_IRREGULAR = [
  string /* word */,
  string /* transcription */,
  string /* word */,
  string /* transcription */,
  string /* word */,
  string /* transcription */,
  string /* translation */,
  string /* dateAdded */,
];

export type T_DB = {
  dictionary: T_DICTIONARY<T_ROWS>;
  flatSorted: T_ROWS;
  getLastRows: (lastRowsCount: number) => T_ROWS;
};
