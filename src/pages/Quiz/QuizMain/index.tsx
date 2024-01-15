import { useState } from "react";
import {
  getRandomQuestionType,
  QUESTION_TYPE,
} from "../question-types/questionType";
import { T_LAST_RECORD } from "../../../db/types";
import { useGlobalState } from "../../../GlobalState/GlobalState";
import { DB } from "../../../db/db";
import { SelectTranslation } from "../question-types/SelectTranslation";
import { NextRowSelector } from "./NextRowSelector";

type QUIZ_STATE = {
  questionType: QUESTION_TYPE;
  row: T_LAST_RECORD;
  lastRows: T_LAST_RECORD[];
};

const nextRowSelector = new NextRowSelector();

export function QuizMain() {
  const { quizLastRowsCount } = useGlobalState()[0];
  const [quizState, setQuizState] = useState<QUIZ_STATE>(getNextQuizState);

  function getNextQuizState(): QUIZ_STATE {
    return {
      questionType: getRandomQuestionType(),
      row: nextRowSelector.get(quizLastRowsCount),
      lastRows: DB.getLastRows(quizLastRowsCount),
    };
  }

  function onCorrectAnswer() {
    setQuizState(getNextQuizState());
  }

  return (
    <>
      {quizState.questionType === QUESTION_TYPE.SELECT_TRANSLATION && (
        <SelectTranslation
          onCorrectAnswer={onCorrectAnswer}
          row={quizState.row}
          lastRows={quizState.lastRows}
          key={quizState.row.record.wordSet.word}
        />
      )}
    </>
  );
}
