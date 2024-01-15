import { T_RECORD } from "../../db/types";
import { Record } from "../../components/Record";

export function TrSimple({ record }: { record: T_RECORD }) {
  return (
    <tr>
      <td>
        <Record record={record} />
      </td>
      <td>{record.wordSet.transcription}</td>
      <td>{record.translation}</td>
    </tr>
  );
}
