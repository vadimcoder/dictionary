import { FormEvent, useState } from "react";
import { T_ROW } from "../../../../db/types";
import "./style.css";
import "../style.css";

export function EnterForeignWord({
  onCorrectAnswer,
  row,
}: {
  onCorrectAnswer: () => void;
  row: T_ROW;
}) {
  const [value, setValue] = useState<string>("");
  const [isAnswerShown, showAnswer] = useState<boolean>(false);

  const isCorrect = value === row.wordSet.word;

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    if (isCorrect) {
      onCorrectAnswer();
    }
  }

  // if (isCorrect) {
  //   setTimeout(() => {
  //     onCorrectAnswer();
  //   }, 400);
  // }

  return (
    <>
      <p>{row.translation}</p>

      <form className={"EnterForeignWordPanel"} onSubmit={onSubmit}>
        <input
          className={`EnterForeignWordInput ${isCorrect ? "correct" : "incorrect"}`}
          value={value}
          onChange={({ target: { value } }) => setValue(value)}
          type={"text"}
          autoFocus={true}
        />

        <button
          type={"button"}
          onClick={() => (isAnswerShown ? showAnswer(false) : showAnswer(true))}
        >
          Toggle answer
        </button>

        <button type={"button"} onClick={onCorrectAnswer} disabled={!isCorrect}>
          Next
        </button>
      </form>

      {isAnswerShown && <p>{row.wordSet.word}</p>}
    </>
  );
}
