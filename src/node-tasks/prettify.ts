import * as prettier from "prettier";
import { PATH } from "./common.js";

async function getOptions() {
  const prettierrc = await prettier.resolveConfig(PATH);

  return {
    parser: "json",
    ...prettierrc,
  };
}

export async function prettify(text: string) {
  const options = await getOptions();

  return prettier.format(text, options);
}
