import random from "lodash.random";

export function getRandomItem<T>(array: T[]): T {
  return array[random(0, array.length - 1)];
}

export function getTabValue(tabs: string[], rootUrl: string | undefined) {
  if (!rootUrl) return false;

  if (tabs.includes(rootUrl)) {
    return rootUrl;
  }

  return false;
}
