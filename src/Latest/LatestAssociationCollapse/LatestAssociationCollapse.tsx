import { T_ROW_WITH_ASSOCIATION } from "../../types";
import { WordWithAudio } from "../../WordWithAudio/WordWithAudio";
import { CollapseButton } from "../../Collapse/CollapseButton/CollapseButton";
import { CollapseArea } from "../../Collapse/CollapseArea/CollapseArea";
import { T_USE_COLLAPSE_STATE, useCollapseState } from "../../Collapse/types";

export function LatestAssociationCollapse({
  row,
}: {
  row: T_ROW_WITH_ASSOCIATION;
}) {
  const collapseStateLinks: T_USE_COLLAPSE_STATE = useCollapseState();
  const collapseStateAssociations: T_USE_COLLAPSE_STATE = useCollapseState();

  return (
    <>
      <tr>
        <td>
          <div className={"ForeignWord__top"}>
            <WordWithAudio row={row.row} />

            <div className={"CollapseButtonsInTable"}>
              <CollapseButton useCollapseState={collapseStateAssociations} />
              <CollapseButton useCollapseState={collapseStateLinks} />
            </div>
          </div>

          <CollapseArea
            word={row.row[0]}
            useCollapseState={collapseStateLinks}
          />
        </td>
        <td>{row.row[1]}</td>
        <td>{row.row[2]}</td>
      </tr>

      {collapseStateAssociations[0].isOpened && (
        <tr>
          <td colSpan={3}>
            <CollapseArea
              word={row.row[0]}
              useCollapseState={collapseStateAssociations}
            />
          </td>
        </tr>
      )}
    </>
  );
}
