import "./style.css";
import { T_RECORD } from "../../db/types";
import { Record } from "../Record";

export function Tr({
  record,
  isBorderBottom,
}: {
  record: T_RECORD;
  isBorderBottom?: boolean;
}) {
  return (
    <tr className={`row${isBorderBottom ? " solid-border" : ""}`}>
      <td {...(record.irregularVerb && { colSpan: 2 })}>
        <Record record={record} />
      </td>
      {!record.irregularVerb && <td>{record.wordSet.transcription}</td>}
      <td>{record.translation}</td>
    </tr>
  );
}
