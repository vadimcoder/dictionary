import fs from "fs";
import { prettify } from "./prettify.js";
import { T_DICTIONARY, T_ROW, T_ROWS, T_ROW_RAW } from "../db/types";
import { deserializeDictionary, serializeDictionary } from "../db/db.js";

export const PATH = "../private/dictionary.json";

export function readDbFromFile(): T_DICTIONARY<T_ROWS> {
  const dictionaryRaw: T_DICTIONARY<T_ROW_RAW | T_ROW_RAW[]> = JSON.parse(
    fs.readFileSync(PATH) as unknown as string,
  );

  return deserializeDictionary(dictionaryRaw);
}

export async function writeDbToFile(dictionary: T_DICTIONARY<T_ROWS>) {
  const dictionaryRaw = serializeDictionary(dictionary);

  const output = await prettify(JSON.stringify(dictionaryRaw));

  fs.writeFileSync(PATH, output);
}

export async function forEachWord(
  db: T_DICTIONARY<T_ROWS>,
  callback: (word: string) => Promise<void>,
) {
  for (const group of db) {
    for (const subgroup of group.subgroups) {
      for (const row of subgroup.rows) {
        if (row.length > 1) {
          for (const row_ of row) {
            await processRow(row_, callback);
          }
        } else {
          await processRow(row[0], callback);
        }
      }
    }
  }
}

async function processRow(
  row: T_ROW,
  callback: (word: string) => Promise<void>,
): Promise<void> {
  await callback(row.wordSet.word);

  if (row.irregularVerb) {
    await callback(row.irregularVerb.secondWordSet.word);
    await callback(row.irregularVerb.thirdWordSet.word);
  }
}
