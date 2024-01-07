import {
  getRandomQuestionType,
  QUESTION_TYPE,
} from "../question-types/questionType";
import { useState } from "react";
import { T_WORD_WITH_ASSOCIATIONS } from "../../../types/dictionary";
import { useGlobalState } from "../../../GlobalState/GlobalState";
import { DB } from "../../../db/db";
import { SelectTranslation } from "../question-types/SelectTranslation";
import { getRandomItem } from "../../../utils";

type QUIZ_STATE = {
  questionType: QUESTION_TYPE;
  row: T_WORD_WITH_ASSOCIATIONS;
  lastRows: T_WORD_WITH_ASSOCIATIONS[];
};

export function QuizMain() {
  const [globalState] = useGlobalState();
  const [quizState, setQuizState] = useState<QUIZ_STATE>(getNextQuizState());

  function getNextQuizState(): QUIZ_STATE {
    return {
      questionType: getRandomQuestionType(),
      row: getRandomItem(DB.getLastRows(globalState.quizLastRowsCount)),
      lastRows: DB.getLastRows(globalState.quizLastRowsCount),
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
          key={quizState.row.word.foreignWord}
        />
      )}
    </>
  );
}
