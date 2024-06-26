import "./QuizLatestSelector/style.css";
import { QuizMain } from "./QuizMain";

import { GLOBAL_NAV_ARIA } from "../../components/NavBar/TopMenu";

export function Quiz() {
  return (
    <div
      id={GLOBAL_NAV_ARIA.quiz.contentId}
      aria-labelledby={GLOBAL_NAV_ARIA.quiz.tabId}
    >
      <QuizMain />
    </div>
  );
}
