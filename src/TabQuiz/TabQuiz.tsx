import "./style.css";
import { useState } from "react";
import random from "lodash.random";
import { Checkbox } from "../form/Checkbox/Checkbox";
import { InputNumber } from "../form/InputNumber/InputNumber";

enum QUESTION_TYPE {
  ENTER_ENGLISH_WORD,
  SELECT_RUSSIAN_WORD,
  ENTER_ENGLISH_WORD_BY_AUDIO,
}

function getRandomQuestionType() {
  return [
    QUESTION_TYPE.ENTER_ENGLISH_WORD,
    QUESTION_TYPE.SELECT_RUSSIAN_WORD,
    QUESTION_TYPE.ENTER_ENGLISH_WORD_BY_AUDIO,
  ][random(0, 2)];
}

export function TabQuiz() {
  const [isAll, setIsAll] = useState<boolean>(false);
  const [lastCount, setLastCount] = useState<number>(30);

  console.log(getRandomQuestionType());

  return (
    <>
      <div className={"TabQuizForm"}>
        <Checkbox label="All" value={isAll} onChange={setIsAll} />

        {!isAll && (
          <InputNumber
            value={lastCount}
            setValue={setLastCount}
            className={"TabQuizForm__input"}
          />
        )}
      </div>
    </>
  );
}
