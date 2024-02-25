import fs from "fs";
import { prettify } from "./prettify.js";
import { T_DICTIONARY, T_ROW, T_ROW_RAW, T_RECORD } from "../db/types";
import { deserializeDictionary, serializeDictionary } from "../db/db.js";

export const PATH = "../private/dictionary.json";

export function readDbFromFile(): T_DICTIONARY<T_ROW> {
  const dictionaryRaw: T_DICTIONARY<T_ROW_RAW | T_ROW_RAW[]> = JSON.parse(
    fs.readFileSync(PATH) as unknown as string,
  );

  return deserializeDictionary(dictionaryRaw);
}

export async function writeDbToFile(dictionary: T_DICTIONARY<T_ROW>) {
  const dictionaryRaw = serializeDictionary(dictionary);

  const output = await prettify(JSON.stringify(dictionaryRaw));

  fs.writeFileSync(PATH, output);
}

export async function forEachWord(
  db: T_DICTIONARY<T_ROW>,
  callback: (word: string) => Promise<void>,
) {
  for (const group of db) {
    for (const subgroup of group.subgroups) {
      for (const row of subgroup.rows) {
        if (row.isAssociation) {
          for (const record of row.records) {
            await processRecord(record, callback);
          }
        } else {
          await processRecord(row.records[0], callback);
        }
      }
    }
  }
}

async function processRecord(
  record: T_RECORD,
  callback: (word: string) => Promise<void>,
): Promise<void> {
  await callback(record.wordSet.word);

  if (record.irregularVerb) {
    await callback(record.irregularVerb.secondWordSet.word);
    await callback(record.irregularVerb.thirdWordSet.word);
  }
}
