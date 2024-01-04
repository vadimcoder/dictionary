import "./style.css";
import { T_USE_COLLAPSE_STATE } from "../types";

export function CollapseArea({
  word,
  useCollapseState,
}: {
  word: string;
  useCollapseState: T_USE_COLLAPSE_STATE;
}) {
  const [state, setState] = useCollapseState;

  function onAnimationEnd() {
    if (state.isClosing) {
      setState({
        ...state,
        isOpened: false,
        isClosing: false,
      });
    }
  }

  return (
    <>
      {state.isOpened && (
        <div
          id={state.ariaId}
          className={`CollapseArea ${
            state.isClosing ? "CollapseArea-closing" : ""
          }`}
          onAnimationEnd={onAnimationEnd}
        >
          <div className="CollapseArea__content">
            <a
              target={"_blank"}
              href={`https://dictionary.cambridge.org/dictionary/english/${word}`}
              rel="noreferrer"
            >
              cam
            </a>
            <a
              target={"_blank"}
              href={`https://translate.yandex.ru/?source_lang=en&target_lang=ru&text=${word}`}
              rel="noreferrer"
            >
              ya
            </a>
          </div>
        </div>
      )}
    </>
  );
}
