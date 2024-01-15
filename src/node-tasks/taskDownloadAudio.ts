import { execSync } from "child_process";
import querystring from "querystring";
import { asyncForEach, readDbFromFile, writeDbToFile } from "./common.js";
import { wordToFilename } from "../utils.js";
import { T_DICTIONARY, T_ROW, T_RECORD } from "../db/types";

async function sleep() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

function fetchWordSync(foreignWord: string) {
  const filename = wordToFilename(foreignWord);
  const wordEscaped = querystring.escape(foreignWord);

  const COMMAND = `curl \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36" \
  --output public/audio/${filename}.mp3 \
  "https://translate.google.com.vn/translate_tts?ie=UTF-8&q=${wordEscaped}&tl=en-us&client=tw-ob"`;

  console.log("foreignWord:", foreignWord);

  execSync(COMMAND);
}

async function downloadAudio(dictionary: T_DICTIONARY<T_ROW>) {
  await asyncForEach(dictionary, async (record: T_RECORD) => {
    if (!record.wordSet.isAudioAvailable) {
      fetchWordSync(record.wordSet.word);
      record.wordSet.isAudioAvailable = true;
      await sleep();
    }
  });
}

export async function taskDownloadAudio() {
  const dictionary: T_DICTIONARY<T_ROW> = readDbFromFile();

  try {
    await downloadAudio(dictionary);
  } catch (e) {
    console.log(e);
  } finally {
    await writeDbToFile(dictionary);
  }
}
