import "./style.css";
import { T_ROW } from "../types";
import { CollapseButton } from "../Collapse/CollapseButton/CollapseButton";
import { T_USE_COLLAPSE_STATE, useCollapseState } from "../Collapse/types";
import { CollapseArea } from "../Collapse/CollapseArea/CollapseArea";
import { WordWithAudio } from "../WordWithAudio/WordWithAudio";

export function ForeignWord({ row }: { row: T_ROW }) {
  const collapseState: T_USE_COLLAPSE_STATE = useCollapseState();

  const word = row[0];

  return (
    <>
      <div className={"ForeignWord__top"}>
        <WordWithAudio row={row} />

        <div className={"CollapseButtonsInTable"}>
          <CollapseButton useCollapseState={collapseState} />
        </div>
      </div>

      <CollapseArea word={word} useCollapseState={collapseState} />
    </>
  );
}
