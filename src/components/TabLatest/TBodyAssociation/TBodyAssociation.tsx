import "./style.css";
import { T_ROW } from "../../../db/types";
import { WordWithAudio } from "../../WordWithAudio/WordWithAudio";
import { CollapseButton } from "../../Collapse/CollapseButton/CollapseButton";
import { CollapseArea } from "../../Collapse/CollapseArea/CollapseArea";
import { T_USE_COLLAPSE_STATE, useCollapseState } from "../../Collapse/types";
import { TrSimple } from "../TrSimple";
import { T_LATEST_TBODY } from "../LatestList/prepareData";

export function TBodyAssociation({ tBody }: { tBody: T_LATEST_TBODY }) {
  const collapseStateLinks: T_USE_COLLAPSE_STATE = useCollapseState();
  const collapseStateAssociations: T_USE_COLLAPSE_STATE = useCollapseState();
  const { associationMainRow, rows } = tBody;

  return (
    <tbody
      className={`TBodyAssociation-${
        collapseStateAssociations[0].isOpened ? "opened" : ""
      }`}
    >
      <tr>
        <td>
          <div className={"ForeignWord__top"}>
            <WordWithAudio row={associationMainRow!} />

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
            word={associationMainRow![0]}
            useCollapseState={collapseStateLinks}
          />
        </td>
        <td>{associationMainRow![1]}</td>
        <td>{associationMainRow![2]}</td>
      </tr>

      {collapseStateAssociations[0].isOpened &&
        rows.map((row: T_ROW) => <TrSimple row={row} key={row[0]} />)}
    </tbody>
  );
}
