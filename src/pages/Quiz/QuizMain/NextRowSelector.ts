import { getRandomItem } from "../../../utils";
import { DB } from "../../../db/db";
import { T_WORD_WITH_ASSOCIATIONS } from "../../../types/dictionary";

export class NextRowSelector {
  #lastRow: T_WORD_WITH_ASSOCIATIONS | null = null;

  get(quizLastRowsCount: number) {
    let nextRow: T_WORD_WITH_ASSOCIATIONS;

    do {
      nextRow = getRandomItem(DB.getLastRows(quizLastRowsCount));
    } while (nextRow.word.foreignWord === this.#lastRow?.word.foreignWord);

    this.#lastRow = nextRow;

    return nextRow;
  }
}
