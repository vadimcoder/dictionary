import { execSync } from "child_process";
import { statSync } from "node:fs";
import querystring from "querystring";
import { forEachWord, readDbFromFile } from "./common.js";
import { T_DICTIONARY, T_ROWS } from "../db/types";
import { getFilenameWithPath } from "../utils/filenames.js";

async function sleep() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

function isFileExistSync(word: string): boolean {
  try {
    statSync(getFilenameWithPath(word));
  } catch {
    return false;
  }

  return true;
}

function fetchWordSync(word: string) {
  const filename = getFilenameWithPath(word);
  const wordEscaped = querystring.escape(word);

  const COMMAND = `curl \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36" \
  --output ${filename} \
  "https://translate.google.com.vn/translate_tts?ie=UTF-8&q=${wordEscaped}&tl=en-us&client=tw-ob"`;

  console.log("=============================================");
  console.log(`Start downloading: ${word}`);
  console.log("=============================================");

  execSync(COMMAND);
}

async function downloadAudio(dictionary: T_DICTIONARY<T_ROWS>) {
  await forEachWord(dictionary, async (word: string) => {
    if (!isFileExistSync(word)) {
      fetchWordSync(word);
      await sleep();
    }
  });
}

export async function taskDownloadAudio() {
  const dictionary: T_DICTIONARY<T_ROWS> = readDbFromFile();

  await downloadAudio(dictionary);
}
