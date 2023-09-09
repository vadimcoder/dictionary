import "./style.css";
import { T_USE_COLLAPSE_STATE } from "../types";

export function CollapseButton({
  useCollapseState,
}: {
  useCollapseState: T_USE_COLLAPSE_STATE;
}) {
  const [state, setState] = useCollapseState;

  function toggle() {
    if (state.isOpened) {
      setState({
        ...state,
        isClosing: true,
      });
    } else {
      setState({
        ...state,
        isOpened: true,
      });
    }
  }

  return (
    <button
      onClick={toggle}
      className={"CollapsibleButton"}
      aria-expanded={state.isOpened}
      aria-controls={state.ariaId}
    >
      <img
        aria-hidden={true}
        src={"toggle.svg"}
        className={`CollapsibleButton__image ${
          state.isOpened ? "CollapsibleButton__image_opened" : ""
        }`}
        alt=""
      />
    </button>
  );
}
