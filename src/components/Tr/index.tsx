import "./style.css";
import { T_RECORD } from "../../db/types";
import { Record } from "../Record";
import Checkbox from "@mui/material/Checkbox";

export function Tr({
  record,
  isBorderTop,
  isBorderBottom,
}: {
  record: T_RECORD;
  isBorderTop?: boolean;
  isBorderBottom?: boolean;
}) {
  // console.log(record);

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
            defaultChecked
          />
        </div>
      </td>
      <td {...(record.irregularVerb && { colSpan: 2 })}>
        <Record record={record} />
      </td>
      {!record.irregularVerb && (
        <td>
          <span className={"transcription"}>
            {record.wordSet.transcription}
          </span>
        </td>
      )}
      <td>
        <span className={"translation"}>{record.translation}</span>
      </td>
    </tr>
  );
}
