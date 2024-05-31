import random from "lodash.random";

export enum QUESTION_TYPE {
  ENTER_FOREIGN_WORD,
  ENTER_FOREIGN_WORD_BY_AUDIO,
  SELECT_FOREIGN_WORD,
  SELECT_FOREIGN_WORD_BY_AUDIO,
  SELECT_TRANSLATION,
}

export type T_QUESTION = {
  type: QUESTION_TYPE;
  label: string;
};

export const QUESTIONS: T_QUESTION[] = [
  {
    type: QUESTION_TYPE.ENTER_FOREIGN_WORD,
    label: "Enter foreign word",
  },
  {
    type: QUESTION_TYPE.SELECT_TRANSLATION,
    label: "Select translation",
  },
] as const;

export function getRandomQuestionType() {
  return 4;
  return [
    QUESTION_TYPE.ENTER_FOREIGN_WORD,
    QUESTION_TYPE.ENTER_FOREIGN_WORD_BY_AUDIO,
    QUESTION_TYPE.SELECT_FOREIGN_WORD,
    QUESTION_TYPE.SELECT_FOREIGN_WORD_BY_AUDIO,
    QUESTION_TYPE.SELECT_TRANSLATION,
  ][random(0, 4)];
}

export const DEFAULT_VARIANT_COUNT = 4;
