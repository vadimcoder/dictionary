import { getRandomItem } from "../../utils/utils";
import { DB } from "../../db/db";
import { T_ROW, T_ROWS } from "../../db/types";
import shuffle from "lodash.shuffle";

export class NextRowSelector {
  #lastRow: T_ROW | null = null;
  #isUnique: boolean = true;
  #quizLastRowsCount: number;
  #uniqueRows: T_ROWS = [];

  constructor(isUnique: boolean, quizLastRowsCount: number) {
    this.#isUnique = isUnique;
    this.#quizLastRowsCount = quizLastRowsCount;
  }

  get() {
    console.log(this.#uniqueRows);
    return this.#isUnique ? this.#getUnique() : this.#getWithDuplicates();
  }

  #getUnique(): T_ROW {
    if (this.#uniqueRows.length === 0) {
      this.#uniqueRows = shuffle(DB.getLastRows(this.#quizLastRowsCount));
    }

    return this.#uniqueRows.pop()!;
  }

  #getWithDuplicates() {
    let nextRow: T_ROW;

    do {
      nextRow = getRandomItem(DB.getLastRows(this.#quizLastRowsCount));
    } while (nextRow.wordSet.word === this.#lastRow?.wordSet.word);

    this.#lastRow = nextRow;

    return nextRow;
  }

  isUnique() {
    return this.#isUnique;
  }
}
