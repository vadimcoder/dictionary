import "./style.css";
import { WordContainer } from "../WordContainer";
import { T_ROW } from "../../db/types";
import { CheckStopRow } from "../CheckStopRow";

export function Tr({
  row,
  isBorderTop,
  isBorderBottom,
}: {
  row: T_ROW;
  isBorderTop?: boolean;
  isBorderBottom?: boolean;
}) {
  return (
    <tr
      className={`row ${isBorderTop ? "row_border-top" : isBorderBottom ? "row_border-bottom" : ""}`}
    >
      <td {...(row.irregularVerb && { colSpan: 2 })}>
        <WordContainer row={row} />
      </td>
      {!row.irregularVerb && (
        <td>
          <span className={"transcription"}>{row.wordSet.transcription}</span>
        </td>
      )}
      <td>
        <span className={"translation"}>{row.translation}</span>
      </td>
      <td>
        <CheckStopRow row={row} />
      </td>
    </tr>
  );
}
