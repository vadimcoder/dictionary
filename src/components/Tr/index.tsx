import "./style.css";
import { WordContainer } from "../WordContainer";
import Checkbox from "@mui/material/Checkbox";
import { T_ROW } from "../../db/types";

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
      className={`row${isBorderTop ? " border-top" : isBorderBottom ? " border-bottom" : ""}`}
    >
      <td>
        <div style={{ paddingInlineEnd: "10px" }}>
          <Checkbox
            // checked={false}
            // onChange={() => {}}
            size="small"
          />
        </div>
      </td>
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
    </tr>
  );
}
