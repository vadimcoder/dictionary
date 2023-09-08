export function wordToFilename(word: string) {
  return word.replace(/\W/g, "-");
}
