import "./style.css";

export function CollapseButton({
  toggle,
  isOpened,
  ariaControls,
}: {
  toggle: () => void;
  isOpened: boolean;
  ariaControls: string;
}) {
  return (
    <button
      onClick={toggle}
      className={"CollapsibleButton"}
      aria-expanded={isOpened}
      aria-controls={ariaControls}
    >
      <img
        aria-hidden={true}
        src={"toggle.svg"}
        className={`CollapsibleButton__image ${
          isOpened ? "CollapsibleButton__image_opened" : ""
        }`}
        alt=""
      />
    </button>
  );
}
