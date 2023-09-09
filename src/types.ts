export type T_ROW = [string, string, string, Date, boolean];

export type T_VOCABULARY = T_GROUP[];

export type T_GROUP = {
  groupName: string;
  subgroups: T_SUBGROUP[];
};

export type T_SUBGROUP = {
  subgroupName: string;
  rows: (T_ROW | T_ROW[])[];
};

export type T_ROW_WITH_ASSOCIATION = {
  row: T_ROW;
  associations: T_ROW[] | null;
};
