import fs from "fs";
import { T_VOCABULARY } from "../db/types";
import { prettify } from "./prettify.js";

export const PATH = "src/db/store.json";

export function readDbFromFile(): T_VOCABULARY {
  return JSON.parse(fs.readFileSync(PATH) as unknown as string);
}

export async function writeDbToFile(db: T_VOCABULARY) {
  const output = await prettify(JSON.stringify(db));

  fs.writeFileSync(PATH, output);
}
