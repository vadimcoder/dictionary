import * as prettier from "prettier";

export async function prettify(text: string) {
  return prettier.format(text, {
    parser: "json",
    printWidth: 200,
  });
}
