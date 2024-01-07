import "./style.css";
import { WordWithAudio } from "../../../components/WordWithAudio/WordWithAudio";
import { CollapseButton } from "../../../components/Collapse/CollapseButton/CollapseButton";
import { CollapseArea } from "../../../components/Collapse/CollapseArea/CollapseArea";
import {
  T_USE_COLLAPSE_STATE,
  useCollapseState,
} from "../../../components/Collapse/types";
import { TrSimple } from "../TrSimple";
import { T_WORD, T_WORD_WITH_ASSOCIATIONS } from "../../../types/dictionary";

export function TBodyAssociation({ row }: { row: T_WORD_WITH_ASSOCIATIONS }) {
  const collapseStateLinks: T_USE_COLLAPSE_STATE = useCollapseState();
  const collapseStateAssociations: T_USE_COLLAPSE_STATE = useCollapseState();

  return (
    <tbody
      className={`TBodyAssociation-${
        collapseStateAssociations[0].isOpened ? "opened" : ""
      }`}
    >
      <tr>
        <td>
          <div className={"ForeignWord__top"}>
            <WordWithAudio word={row.word} />

            <div className={"CollapseButtonsInTable"}>
              <div className={"TBodyAssociation__open-association-button"}>
                <CollapseButton
                  useCollapseState={collapseStateAssociations}
                  animate={false}
                />
              </div>
              <CollapseButton useCollapseState={collapseStateLinks} />
            </div>
          </div>

          <CollapseArea
            foreignWord={row.word.foreignWord}
            useCollapseState={collapseStateLinks}
          />
        </td>
        <td>{row.word.transcription}</td>
        <td>{row.word.translation}</td>
      </tr>

      {collapseStateAssociations[0].isOpened &&
        row.associationsExcludingTheWord.map((word: T_WORD) => (
          <TrSimple word={word} key={word.foreignWord} />
        ))}
    </tbody>
  );
}
