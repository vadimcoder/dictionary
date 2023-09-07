import fs from "fs";
import { T_VOCABULARY } from "../types";

export function readDbFromFile(): T_VOCABULARY {
  return JSON.parse(fs.readFileSync("../db/db.json") as unknown as string);
}

export function writeDbToFile(db: T_VOCABULARY): void {
  fs.writeFileSync("../db/db.json", JSON.stringify(db, null, 2));
}
