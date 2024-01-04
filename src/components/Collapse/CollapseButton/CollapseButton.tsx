import "./style.css";
import { T_USE_COLLAPSE_STATE } from "../types";

export function CollapseButton({
  useCollapseState,
  animate = true,
}: {
  useCollapseState: T_USE_COLLAPSE_STATE;
  animate?: boolean;
}) {
  const [state, setState] = useCollapseState;

  function toggle() {
    if (animate) {
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
    } else {
      setState({
        ...state,
        isOpened: !state.isOpened,
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
