import "./style.css";
import { T_RECORD } from "../../db/types";
import { Record } from "../Record";

export function Tr({
  record,
  isBorderTop,
  isBorderBottom,
}: {
  record: T_RECORD;
  isBorderTop?: boolean;
  isBorderBottom?: boolean;
}) {
  return (
    <tr
      className={`row${isBorderTop ? " border-top" : isBorderBottom ? " border-bottom" : ""}`}
    >
      <td {...(record.irregularVerb && { colSpan: 2 })}>
        <Record record={record} />
      </td>
      {!record.irregularVerb && <td>{record.wordSet.transcription}</td>}
      <td>{record.translation}</td>
    </tr>
  );
}
