import { execSync } from "child_process";
import { getAllRows } from "../db/helpers.js";
import { T_ROW, T_VOCABULARY } from "../types";
import { readDbFromFile, writeDbToFile } from "./common";

async function sleep() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

function fetchWordSync(word: string) {
  const COMMAND = `curl \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36" \
  --output audio/${word}.mp3 \
  "https://translate.google.com.vn/translate_tts?ie=UTF-8&q=${word}&tl=en-us&client=tw-ob"`;

  console.log("word", word);

  execSync(COMMAND);
}

function isNotFetched(row: T_ROW) {
  return !row[4];
}

function markFetched(row: T_ROW) {
  row[4] = true;
}

async function downloadAudioAndMutateDb(db: T_VOCABULARY) {
  const rows = getAllRows(db);

  for (const row of rows) {
    const word = row[0];

    if (isNotFetched(row)) {
      fetchWordSync(word);
      markFetched(row);
      await sleep();
    }
  }
}

export async function downloadAudio() {
  const db = readDbFromFile();

  await downloadAudioAndMutateDb(db);

  writeDbToFile(db);
}
