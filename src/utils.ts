import random from "lodash.random";

export function wordToFilename(word: string) {
  return word.replace(/\W/g, "-");
}

export function getRandomItem<T>(array: T[]): T {
  return array[random(0, array.length - 1)];
}
