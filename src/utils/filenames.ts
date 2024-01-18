export function getVerbWithoutTo(word: string) {
  return word.startsWith("to ") ? word.substring(3) : word;
}

export function getFilename(word: string) {
  word = getVerbWithoutTo(word);

  return `${word.replace(/\W/g, "-")}.mp3`;
}

export function getFileFullName(word: string): string {
  return `public/audio/${getFilename(word)}`;
}
