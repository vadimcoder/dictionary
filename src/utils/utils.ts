import random from "lodash.random";

export function getRandomItem<T>(array: T[]): T {
  return array[random(0, array.length - 1)];
}

export function scrollToChecked() {
  document
    .querySelector("tr:has(input[type=checkbox]:checked)")
    ?.previousElementSibling?.scrollIntoView();
}
