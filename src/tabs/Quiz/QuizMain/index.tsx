import { useState } from "react";
import {
  getRandomQuestionType,
  QUESTION_TYPE,
  QUESTIONS,
} from "../question-types/questionType";
import { T_ROW, T_ROWS } from "../../../db/types";
import { useGlobalState } from "../../../GlobalState/GlobalState";
import { DB } from "../../../db/db";
import { SelectTranslation } from "../question-types/SelectTranslation";
import { NextRowSelector } from "../NextRowSelector";
import { QuizLatestSelector } from "../QuizLatestSelector";
import { Select } from "../../../components/form/Select";
import { EnterForeignWord } from "../question-types/EnterForeignWord";
import "./style.css";

const nextRowSelector = new NextRowSelector();

export function QuizMain() {
  const { quizLastRowsCount } = useGlobalState()[0];
  const [questionType, setQuestionType] = useState<QUESTION_TYPE>(
    QUESTION_TYPE.ENTER_FOREIGN_WORD,
  );
  const [nextRow, setNextRow] = useState<T_ROW>(
    nextRowSelector.get(quizLastRowsCount),
  );

  const [lastRows, setLastRows] = useState<T_ROWS>(
    DB.getLastRows(quizLastRowsCount),
  );

  function onCorrectAnswer() {
    setNextRow(nextRowSelector.get(quizLastRowsCount));
  }

  function onChangeLastRows() {
    setLastRows(DB.getLastRows(quizLastRowsCount));
  }

  function onQuestionTypeChange(questionType: number) {
    setQuestionType(questionType);
    console.log(typeof questionType);
  }

  return (
    <div className={"QuizMain"}>
      <QuizLatestSelector onChangeLastRows={onChangeLastRows} />

      <div className={"QuizMainSelectContainer"}>
        <Select
          value={questionType}
          onChange={onQuestionTypeChange}
          options={QUESTIONS.map(({ type, label }) => ({ label, value: type }))}
        />
      </div>

      {questionType === QUESTION_TYPE.ENTER_FOREIGN_WORD && (
        <EnterForeignWord
          onCorrectAnswer={onCorrectAnswer}
          row={nextRow}
          key={nextRow.wordSet.word}
        />
      )}

      {questionType === QUESTION_TYPE.SELECT_TRANSLATION && (
        <SelectTranslation
          onCorrectAnswer={onCorrectAnswer}
          row={nextRow}
          lastRows={lastRows}
          key={nextRow.wordSet.word}
        />
      )}
    </div>
  );
}
