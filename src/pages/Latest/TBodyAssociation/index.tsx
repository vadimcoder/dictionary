import "./style.css";
import { CollapseButton } from "../../../components/Collapse/CollapseButton/CollapseButton";
import { T_USE_COLLAPSE_STATE } from "../../../components/Collapse/types";
import { Tr } from "../../../components/Tr";
import { T_RECORD, T_LAST_RECORD } from "../../../db/types";
import { Record } from "../../../components/Record";
import { useCollapseState } from "../../../components/Collapse/useCollapseState";
import Checkbox from "@mui/material/Checkbox";

export function TBodyAssociation({
  lastRecord,
}: {
  lastRecord: T_LAST_RECORD;
}) {
  const collapseStateAssociations: T_USE_COLLAPSE_STATE = useCollapseState();
  // console.log(lastRecord);
  return (
    <tbody
      className={`TBodyAssociation-${
        collapseStateAssociations[0].isOpened ? "opened" : ""
      }`}
    >
      <tr>
        <td>
          <div style={{ paddingInlineEnd: "10px" }}>
            <Checkbox
              // checked={false}
              // onChange={() => {}}
              size="small"
              defaultChecked
            />
          </div>
        </td>
        <td {...(lastRecord.record.irregularVerb && { colSpan: 2 })}>
          <div className={"TBodyAssociation__cell"}>
            <Record record={lastRecord.record} />

            <div className={"TBodyAssociation__open-association-button"}>
              <CollapseButton
                useCollapseState={collapseStateAssociations}
                animate={false}
              />
            </div>
          </div>
        </td>
        {!lastRecord.record.irregularVerb && (
          <td>
            <span className={"transcription"}>
              {lastRecord.record.wordSet.transcription}
            </span>
          </td>
        )}
        <td>
          <span className={"translation"}>{lastRecord.record.translation}</span>
        </td>
      </tr>

      {collapseStateAssociations[0].isOpened &&
        lastRecord.associationsExcludingTheRecord.map((record: T_RECORD) => (
          <Tr record={record} key={record.wordSet.word} />
        ))}
    </tbody>
  );
}
