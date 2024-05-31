import { useState } from "react";
import { QUESTION_TYPE, QUESTIONS } from "../question-types/questionType";
import { T_ROW } from "../../../db/types";
import { useGlobalState } from "../../../GlobalState/GlobalState";
import { SelectTranslation } from "../question-types/SelectTranslation";
import { NextRowSelector } from "../NextRowSelector";
import { QuizLatestSelector } from "../QuizLatestSelector";
import { Select } from "../../../components/form/Select";
import { EnterForeignWord } from "../question-types/EnterForeignWord";
import "./style.css";

export function QuizMain() {
  const {
    quiz: { lastRowsCount, isUnique },
  } = useGlobalState()[0];
  const [questionType, setQuestionType] = useState<QUESTION_TYPE>(
    QUESTION_TYPE.ENTER_FOREIGN_WORD,
  );
  const [nextRowSelector, setNextRowSelector] = useState(
    () => new NextRowSelector(isUnique, lastRowsCount),
  );

  const [nextRow, setNextRow] = useState<T_ROW>(() => nextRowSelector.get());

  function onCorrectAnswer() {
    setNextRow(nextRowSelector.get());
  }

  function onQuestionTypeChange(questionType: number) {
    setQuestionType(questionType);
  }

  function onChangeQuiz(lastRowsCount: number, isUnique: boolean) {
    setNextRowSelector(new NextRowSelector(isUnique, lastRowsCount));
  }

  return (
    <div className={"QuizMain"}>
      <QuizLatestSelector onChange={onChangeQuiz} />

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
          key={nextRow.wordSet.word}
        />
      )}
    </div>
  );
}
