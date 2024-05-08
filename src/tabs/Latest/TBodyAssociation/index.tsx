import "./style.css";
import { CollapseButton } from "../../../components/Collapse/CollapseButton/CollapseButton";
import { T_USE_COLLAPSE_STATE } from "../../../components/Collapse/types";
import { Tr } from "../../../components/Tr";
import { T_ROW } from "../../../db/types";
import { WordContainer } from "../../../components/WordContainer";
import { useCollapseState } from "../../../components/Collapse/useCollapseState";
// import Checkbox from "@mui/material/Checkbox";

export function TBodyAssociation({ row }: { row: T_ROW }) {
  const collapseStateAssociations: T_USE_COLLAPSE_STATE = useCollapseState();

  return (
    <tbody
      className={`TBodyAssociation-${
        collapseStateAssociations[0].isOpened ? "opened" : ""
      }`}
    >
      <tr className={"row"}>
        <td>
          <div style={{ paddingInlineEnd: "10px" }}>
            {/*<Checkbox*/}
            {/*  // checked={false}*/}
            {/*  // onChange={() => {}}*/}
            {/*  size="small"*/}
            {/*  defaultChecked*/}
            {/*/>*/}
          </div>
        </td>
        <td {...(row.irregularVerb && { colSpan: 2 })}>
          <div className={"TBodyAssociation__cell"}>
            <WordContainer row={row} />

            <div className={"TBodyAssociation__open-association-button"}>
              <CollapseButton
                useCollapseState={collapseStateAssociations}
                animate={false}
              />
            </div>
          </div>
        </td>
        {!row.irregularVerb && (
          <td>
            <span className={"transcription"}>{row.wordSet.transcription}</span>
          </td>
        )}
        <td>
          <span className={"translation"}>{row.translation}</span>
        </td>
      </tr>

      {collapseStateAssociations[0].isOpened &&
        row.associations?.excludingTheRow.map((row: T_ROW) => (
          <Tr row={row} key={row.wordSet.word} />
        ))}
    </tbody>
  );
}
