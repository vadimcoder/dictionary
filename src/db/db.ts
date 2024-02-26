import dictionaryRaw from "../../../private/dictionary.json" assert { type: "json" };
import { parseISO, formatISO } from "date-fns";
import {
  T_DICTIONARY,
  T_ROW,
  T_ROWS,
  T_ROW_RAW,
  T_DB,
  T_ROW_RAW_IRREGULAR,
} from "./types";
import orderBy from "lodash.orderby";

const dictionary = deserializeDictionary(
  dictionaryRaw as T_DICTIONARY<T_ROW_RAW | T_ROW_RAW[]>,
);

export const DB: T_DB = {
  dictionary,

  flatSorted: getFlatSorted(),

  getLastRows(lastRowsCount: number) {
    return this.flatSorted.slice(0, lastRowsCount);
  },
};

function getDateAdded(
  dateAdded: string,
  row: T_ROW_RAW | T_ROW_RAW_IRREGULAR,
): Date {
  let date = parseISO(dateAdded);

  if (Number.isNaN(date.getTime())) {
    console.log("Cannot parse as date:", row);
    date = new Date();
  }

  return date;
}

function deserializeRow(rowRaw: T_ROW_RAW | T_ROW_RAW_IRREGULAR): T_ROW {
  if (rowRaw.length === 4) {
    return {
      wordSet: {
        word: rowRaw[0],
        transcription: rowRaw[1],
      },
      translation: rowRaw[2],
      dateAdded: getDateAdded(rowRaw[3], rowRaw),
    };
  }

  if (rowRaw.length === 8) {
    return {
      wordSet: {
        word: rowRaw[0],
        transcription: rowRaw[1],
      },
      translation: rowRaw[6],
      dateAdded: getDateAdded(rowRaw[7], rowRaw),
      irregularVerb: {
        secondWordSet: {
          word: rowRaw[2],
          transcription: rowRaw[3],
        },
        thirdWordSet: {
          word: rowRaw[4],
          transcription: rowRaw[5],
        },
      },
    };
  }

  // should not reach here
  console.trace(rowRaw);
  throw new Error("unable to deserialize");
}

function serializeRow(row: T_ROW): T_ROW_RAW | T_ROW_RAW_IRREGULAR {
  let dateISO;

  try {
    dateISO = formatISO(row.dateAdded, { representation: "date" });
  } catch (e) {
    console.log(row);
    throw e;
  }

  if (row.irregularVerb) {
    return [
      row.wordSet.word,
      row.wordSet.transcription,

      row.irregularVerb.secondWordSet.word,
      row.irregularVerb.secondWordSet.transcription,

      row.irregularVerb.thirdWordSet.word,
      row.irregularVerb.thirdWordSet.transcription,

      row.translation,

      dateISO,
    ];
  }

  return [
    row.wordSet.word,
    row.wordSet.transcription,
    row.translation,
    dateISO,
  ];
}

function attachAssociations(deserialized: T_ROWS): T_ROWS {
  return deserialized.map((row: T_ROW) => ({
    ...row,
    associations: {
      includingTheRow: deserialized,
      excludingTheRow: deserialized.filter((r) => r !== row),
    },
  }));
}

function deserializeRows(rowRaw: T_ROW_RAW | T_ROW_RAW[]): T_ROWS {
  if (rowRaw[0] instanceof Array) {
    let deserialized = (rowRaw as T_ROW_RAW[]).map(deserializeRow);

    deserialized = attachAssociations(deserialized);

    return deserialized;
  }

  return [deserializeRow(rowRaw as T_ROW_RAW)];
}

function serializeRows(
  rows: T_ROWS,
): T_ROW_RAW | T_ROW_RAW_IRREGULAR | (T_ROW_RAW | T_ROW_RAW_IRREGULAR)[] {
  if (rows.length > 1) {
    return rows.map(serializeRow);
  }

  return serializeRow(rows[0]);
}

function mapRow<INPUT_ROW_TYPE, OUTPUT_ROW_TYPE>(
  dictionary: T_DICTIONARY<INPUT_ROW_TYPE>,
  transformRow: (row: INPUT_ROW_TYPE) => OUTPUT_ROW_TYPE,
): T_DICTIONARY<OUTPUT_ROW_TYPE> {
  return dictionary.map(({ groupName, subgroups }) => ({
    groupName,
    subgroups: subgroups.map(({ subgroupName, rows }) => ({
      subgroupName,
      rows: rows.map(transformRow),
    })),
  }));
}

function getFlatSorted(): T_ROWS {
  const flatList = getFlatList();

  return orderBy(flatList, (row: T_ROW) => row.dateAdded, "desc");
}

function getFlatList(): T_ROWS {
  return dictionary
    .map(({ subgroups }) => subgroups)
    .flat()
    .map(({ rows }) => rows)
    .flat(2);
}

export function deserializeDictionary(
  dictionaryRaw: T_DICTIONARY<T_ROW_RAW | T_ROW_RAW[]>,
): T_DICTIONARY<T_ROWS> {
  return mapRow<T_ROW_RAW | T_ROW_RAW[], T_ROWS>(
    dictionaryRaw,
    deserializeRows,
  );
}

export function serializeDictionary(
  dictionary: T_DICTIONARY<T_ROWS>,
): T_DICTIONARY<
  T_ROW_RAW | T_ROW_RAW_IRREGULAR | (T_ROW_RAW | T_ROW_RAW_IRREGULAR)[]
> {
  return mapRow<
    T_ROWS,
    T_ROW_RAW | T_ROW_RAW_IRREGULAR | (T_ROW_RAW | T_ROW_RAW_IRREGULAR)[]
  >(dictionary, serializeRows);
}
