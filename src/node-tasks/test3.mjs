import * as prettier from "prettier";
import fs from "fs";

// console.log(fs.readFileSync("src/db/store.json").toString());

// import prettierrc f

console.log(
  await prettier.format(fs.readFileSync("src/db/store.json").toString(), {
    parser: "json",
    ...(await prettier.resolveConfig("src/db/store.json")),
  }),
);

// console.log(await prettier.resolveConfig("src/db/store.json"));
