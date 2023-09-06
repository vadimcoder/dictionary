import { exec } from "child_process";
import { DB } from "../database/db.json";

function download() {
  exec(
    `curl -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36" --output ${word}.mp3 "https://translate.google.com.vn/translate_tts?ie=UTF-8&q=${word}&tl=en-us&client=tw-ob"`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }

      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }

      console.log(`stdout: ${stdout}`);
    },
  );
}

download();
