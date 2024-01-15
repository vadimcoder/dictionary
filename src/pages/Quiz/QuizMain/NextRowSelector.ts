import { getRandomItem } from "../../../utils";
import { DB } from "../../../db/db";
import { T_LAST_RECORD } from "../../../db/types";

export class NextRowSelector {
  #lastRow: T_LAST_RECORD | null = null;

  get(quizLastRowsCount: number) {
    let nextRow: T_LAST_RECORD;

    do {
      nextRow = getRandomItem(DB.getLastRows(quizLastRowsCount));
    } while (
      nextRow.record.wordSet.word === this.#lastRow?.record.wordSet.word
    );

    this.#lastRow = nextRow;

    return nextRow;
  }
}
