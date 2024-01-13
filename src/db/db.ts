import dictionaryRaw from "../../../private/dictionary.json" assert { type: "json" };
import { parseISO, formatISO } from "date-fns";
import {
  T_DICTIONARY,
  T_GROUP,
  T_ROW,
  T_ROW_RAW,
  T_WORD,
  T_WORD_WITH_ASSOCIATIONS,
} from "../types/dictionary";
import { T_DB } from "../types/db";
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

function getDateAdded(word: T_ROW_RAW): Date {
  let date: Date;

  try {
    date = parseISO(word[3]);
  } catch (e) {
    console.log("Cannot parse as date:", word);
    date = new Date();
  }

  return date;
}

function deserializeWord(word: T_ROW_RAW): T_WORD {
  return {
    foreignWord: word[0],
    transcription: word[1],
    translation: word[2],
    dateAdded: getDateAdded(word),
    isAudioAvailable: word[4],
  };
}

function serializeWord(word: T_WORD): T_ROW_RAW {
  const {
    foreignWord,
    transcription,
    translation,
    dateAdded,
    isAudioAvailable,
  } = word;

  const dateISO = formatISO(dateAdded, { representation: "date" });

  return [foreignWord, transcription, translation, dateISO, isAudioAvailable];
}

function deserializeRow(rowRaw: T_ROW_RAW | T_ROW_RAW[]) {
  if (rowRaw[0] instanceof Array) {
    return {
      words: (rowRaw as T_ROW_RAW[]).map(deserializeWord),
      isAssociation: true,
    };
  }

  return {
    words: [deserializeWord(rowRaw as T_ROW_RAW)],
    isAssociation: false,
  };
}

function serializeRow(row: T_ROW): T_ROW_RAW | T_ROW_RAW[] {
  if (row.isAssociation) {
    return row.words.map(serializeWord);
  }

  return serializeWord(row.words[0]);
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

function splitAssociations(words: T_WORD[]): T_WORD_WITH_ASSOCIATIONS[] {
  return words.map((word) => ({
    word,
    isAssociation: true,
    associationsIncludingTheWord: words,
    associationsExcludingTheWord: words.filter((w) => w !== word),
  }));
}

function getAllRowsSorted(): T_WORD_WITH_ASSOCIATIONS[] {
  const allRows = getAllRows();

  return orderBy(
    allRows,
    (row: T_WORD_WITH_ASSOCIATIONS) => row.word.dateAdded,
    "desc",
  );
}

function getAllRows(): T_WORD_WITH_ASSOCIATIONS[] {
  let allRows: T_WORD_WITH_ASSOCIATIONS[] = [];

  forEachRow(({ words, isAssociation }) => {
    if (isAssociation) {
      allRows = allRows.concat(splitAssociations(words));
    } else
      allRows.push({
        word: words[0],
        isAssociation,
        associationsIncludingTheWord: [],
        associationsExcludingTheWord: [],
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
): T_DICTIONARY<T_ROW_RAW | T_ROW_RAW[]> {
  return mapRow<T_ROW, T_ROW_RAW | T_ROW_RAW[]>(dictionary, serializeRow);
}
