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

export async function asyncForEach(
  db: T_DICTIONARY<T_ROW>,
  callback: (row: T_RECORD) => Promise<void>,
) {
  for (const group of db) {
    for (const subgroup of group.subgroups) {
      for (const item of subgroup.rows) {
        if (item.isAssociation) {
          for (const word of item.records) {
            await callback(word);
          }
        } else {
          await callback(item.records[0]);
        }
      }
    }
  }
}
