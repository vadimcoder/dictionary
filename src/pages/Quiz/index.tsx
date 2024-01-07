import "./QuizLatestSelector/style.css";
import { QuizLatestSelector } from "./QuizLatestSelector";
import { QuizMain } from "./QuizMain";

export function Quiz() {
  return (
    <>
      <QuizLatestSelector />

      <QuizMain />
    </>
  );
}
