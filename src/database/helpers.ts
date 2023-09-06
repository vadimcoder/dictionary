import DB from "./db.json";
import { T_VOCABULARY } from "../types.ts";

export function getDB(): T_VOCABULARY {
  return DB as T_VOCABULARY;
}
