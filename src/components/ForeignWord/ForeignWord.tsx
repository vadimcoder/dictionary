import "./style.css";
import { CollapseButton } from "../Collapse/CollapseButton/CollapseButton";
import { T_USE_COLLAPSE_STATE, useCollapseState } from "../Collapse/types";
import { CollapseArea } from "../Collapse/CollapseArea/CollapseArea";
import { WordWithAudio } from "../WordWithAudio/WordWithAudio";
import { T_WORD } from "../../types/dictionary";

export function ForeignWord({ word }: { word: T_WORD }) {
  const collapseState: T_USE_COLLAPSE_STATE = useCollapseState();

  return (
    <>
      <div className={"ForeignWord__top"}>
        <WordWithAudio word={word} />

        <div className={"CollapseButtonsInTable"}>
          <CollapseButton useCollapseState={collapseState} />
        </div>
      </div>

      <CollapseArea
        foreignWord={word.foreignWord}
        useCollapseState={collapseState}
      />
    </>
  );
}
