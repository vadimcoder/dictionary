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
  words: T_WORD[];
  isAssociation: boolean;
};

export type T_ROW_RAW = [string, string, string, string, boolean];

export type T_WORD = {
  foreignWord: string;
  transcription: string;
  translation: string;
  dateAdded: Date;
  isAudioAvailable: boolean;
};

export type T_WORD_WITH_ASSOCIATIONS = {
  word: T_WORD;
  isAssociation: boolean;
  associationsIncludingTheWord: T_WORD[];
  associationsExcludingTheWord: T_WORD[];
};
