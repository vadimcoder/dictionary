import "./QuizLatestSelector/style.css";
import { QuizLatestSelector } from "./QuizLatestSelector";
import { QuizMain } from "./QuizMain";
import { GLOBAL_NAV_ARIA } from "../../NavBar";

export function Quiz() {
  return (
    <div
      id={GLOBAL_NAV_ARIA.quiz.contentId}
      aria-labelledby={GLOBAL_NAV_ARIA.quiz.tabId}
    >
      <QuizLatestSelector />

      <QuizMain />
    </div>
  );
}
