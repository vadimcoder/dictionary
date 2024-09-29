export function getFilename(word: string) {
  return `${word.replace(/\W/g, "-")}.mp3`;
}

export function getFilenameWithPath(word: string): string {
  return `public/audio/${getFilename(word)}`;
}
