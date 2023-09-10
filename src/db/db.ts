import store from "./store.json" assert { type: "json" };
import { T_ROW, T_VOCABULARY } from "./types";
import { forEachRow } from "./helpers.js";
import parseISO from "date-fns/parseISO/index.js";

export const db = store as T_VOCABULARY;

function convertDateStringToDateObject() {
  forEachRow(db, (row: T_ROW) => {
    row[3] = parseISO(row[3] as unknown as string);
  });
}

convertDateStringToDateObject();
