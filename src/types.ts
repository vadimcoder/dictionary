// const NOUN = "Noun";
// const ADJECTIVE = "The Adjective";

// type PART_OF_SPEECH = NOUN |

// type PART_OF_SPEECH = {
//   partOfSpeech:
// }

export enum GROUPS {
  NOUN = "Noun",
  ADJECTIVE = "The Adjective",
}

// export enum T_TRANSLATION_TYPES {
//   ONE_TRANSLATION,
//   ASSOCIATION
// }

export type T_ROW = [string, string, string, string, boolean];

export type T_ROW_DATE = [string, string, string, Date, boolean];

// export type T_ONE_TRANSLATION = {
//   type: T_TRANSLATION_TYPES.ONE_TRANSLATION,
//   oneTranslation: string;
//   items: T_ROW[];
// }
//
// export type T_ASSOCIATION = {
//   type: T_TRANSLATION_TYPES.ASSOCIATION,
//   items: (T_ROW | T_ONE_TRANSLATION)[];
// }

export type T_VOCABULARY = T_GROUP_ITEM[];

export type T_GROUP_ITEM = {
  groupName: string;
  groupItems: T_SUBGROUP_ITEM[];
};

export type T_SUBGROUP_ITEM = {
  subgroupName: string;
  subgroupItems: (T_ROW | T_ROW[])[];
};

// export const db2: T_VOCABULARY = [{
//   groupName: GROUPS.ADJECTIVE,
//   groupItems: [{
//     subgroupName: "Days of the Week",
//     subgroupItems: [
//       ["one", "sdf", "sdf", "2023-03-01"],
//       ["one", "sdf", "sdf", "2023-03-01"],
//       ["one", "sdf", "sdf", "2023-03-01"],
//       ["one", "sdf", "sdf", "2023-03-01"],
//       [
//         ["one", "sdf", "", "2023-03-01"],
//         ["one", "sdf", "sdf", "2023-03-01"],
//       ]
//     ],
//   }]
// }];
