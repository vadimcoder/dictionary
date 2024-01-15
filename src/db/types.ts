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
  records: T_RECORD[];
  isAssociation: boolean;
};

export type T_ROW_RAW = [
  string /* word */,
  string /* transcription */,
  string /* translation */,
  string /* dateAdded */,
  boolean /* isAudioAvailable */ /* TODO: move up */,
];
export type T_ROW_RAW_IRREGULAR = [
  string /* word */,
  string /* transcription */,
  boolean /* isAudioAvailable */,
  string /* word */,
  string /* transcription */,
  boolean /* isAudioAvailable */,
  string /* word */,
  string /* transcription */,
  boolean /* isAudioAvailable */,
  string /* translation */,
  string /* dateAdded */,
];

export type T_WORD_SET = {
  word: string;
  transcription: string;
  isAudioAvailable: boolean;
};

export type T_RECORD = {
  wordSet: T_WORD_SET;
  translation: string;
  dateAdded: Date;
  irregularVerb?: {
    secondForm: T_WORD_SET;
    thirdForm: T_WORD_SET;
  };
};

export type T_LAST_RECORD = {
  record: T_RECORD;
  isAssociation: boolean;
  associationsIncludingTheRecord: T_RECORD[];
  associationsExcludingTheRecord: T_RECORD[];
};

export type T_DB = {
  dictionary: T_DICTIONARY<T_ROW>;
  allRowsSorted: T_LAST_RECORD[];
  getLastRows: (lastRowsCount: number) => T_LAST_RECORD[];
};
