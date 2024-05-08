import { getRandomItem } from "../../../utils/utils";
import { DB } from "../../../db/db";
import { T_ROW } from "../../../db/types";

export class NextRowSelector {
  #lastRow: T_ROW | null = null;

  get(quizLastRowsCount: number) {
    let nextRow: T_ROW;

    do {
      nextRow = getRandomItem(DB.getLastRows(quizLastRowsCount));
    } while (nextRow.wordSet.word === this.#lastRow?.wordSet.word);

    this.#lastRow = nextRow;

    return nextRow;
  }
}
