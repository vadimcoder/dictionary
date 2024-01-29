import dictionaryRaw from "../../../private/dictionary.json" assert { type: "json" };
import { parseISO, formatISO } from "date-fns";
import {
  T_DICTIONARY,
  T_GROUP,
  T_ROW,
  T_ROW_RAW,
  T_RECORD,
  T_LAST_RECORD,
  T_DB,
  T_ROW_RAW_IRREGULAR,
} from "./types";
import orderBy from "lodash.orderby";

const dictionary = deserializeDictionary(
  dictionaryRaw as T_DICTIONARY<T_ROW_RAW | T_ROW_RAW[]>,
);

export const DB: T_DB = {
  dictionary,

  allRowsSorted: getAllRowsSorted(),

  getLastRows(lastRowsCount: number) {
    return this.allRowsSorted.slice(0, lastRowsCount);
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

function deserializeWord(rowRaw: T_ROW_RAW | T_ROW_RAW_IRREGULAR): T_RECORD {
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
        secondForm: {
          word: rowRaw[3],
          transcription: rowRaw[4],
        },
        thirdForm: {
          word: rowRaw[6],
          transcription: rowRaw[7],
        },
      },
    };
  }

  // should not reach here
  console.trace(rowRaw);
  throw new Error("unable to deserialize");
}

function serializeWord(record: T_RECORD): T_ROW_RAW | T_ROW_RAW_IRREGULAR {
  let dateISO;

  try {
    dateISO = formatISO(record.dateAdded, { representation: "date" });
  } catch (e) {
    console.log(record);
    throw e;
  }

  if (record.irregularVerb) {
    return [
      record.wordSet.word,
      record.wordSet.transcription,

      record.irregularVerb.secondForm.word,
      record.irregularVerb.secondForm.transcription,

      record.irregularVerb.thirdForm.word,
      record.irregularVerb.thirdForm.transcription,

      record.translation,

      dateISO,
    ];
  }

  return [
    record.wordSet.word,
    record.wordSet.transcription,
    record.translation,
    dateISO,
  ];
}

function deserializeRow(rowRaw: T_ROW_RAW | T_ROW_RAW[]): T_ROW {
  if (rowRaw[0] instanceof Array) {
    return {
      records: (rowRaw as T_ROW_RAW[]).map(deserializeWord),
      isAssociation: true,
    };
  }

  return {
    records: [deserializeWord(rowRaw as T_ROW_RAW)],
    isAssociation: false,
  };
}

function serializeRow(
  row: T_ROW,
): T_ROW_RAW | T_ROW_RAW_IRREGULAR | (T_ROW_RAW | T_ROW_RAW_IRREGULAR)[] {
  if (row.isAssociation) {
    return row.records.map(serializeWord);
  }

  return serializeWord(row.records[0]);
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

export function forEachRow(callback: (row: T_ROW) => void): void {
  dictionary.forEach(({ subgroups }: T_GROUP<T_ROW>) => {
    subgroups.forEach(({ rows }) => {
      rows.forEach(callback);
    });
  });
}

function splitAssociations(words: T_RECORD[]): T_LAST_RECORD[] {
  return words.map((word) => ({
    record: word,
    isAssociation: true,
    associationsIncludingTheRecord: words,
    associationsExcludingTheRecord: words.filter((w) => w !== word),
  }));
}

function getAllRowsSorted(): T_LAST_RECORD[] {
  const allRows = getAllRows();

  return orderBy(allRows, (row: T_LAST_RECORD) => row.record.dateAdded, "desc");
}

function getAllRows(): T_LAST_RECORD[] {
  let allRows: T_LAST_RECORD[] = [];

  forEachRow(({ records, isAssociation }) => {
    if (isAssociation) {
      allRows = allRows.concat(splitAssociations(records));
    } else
      allRows.push({
        record: records[0],
        isAssociation,
        associationsIncludingTheRecord: [],
        associationsExcludingTheRecord: [],
      });
  });

  return allRows;
}

export function deserializeDictionary(
  dictionaryRaw: T_DICTIONARY<T_ROW_RAW | T_ROW_RAW[]>,
): T_DICTIONARY<T_ROW> {
  return mapRow<T_ROW_RAW | T_ROW_RAW[], T_ROW>(dictionaryRaw, deserializeRow);
}

export function serializeDictionary(
  dictionary: T_DICTIONARY<T_ROW>,
): T_DICTIONARY<
  T_ROW_RAW | T_ROW_RAW_IRREGULAR | (T_ROW_RAW | T_ROW_RAW_IRREGULAR)[]
> {
  return mapRow<
    T_ROW,
    T_ROW_RAW | T_ROW_RAW_IRREGULAR | (T_ROW_RAW | T_ROW_RAW_IRREGULAR)[]
  >(dictionary, serializeRow);
}
