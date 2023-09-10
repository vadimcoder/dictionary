import { ForeignWord } from "../ForeignWord/ForeignWord";
import { T_ROW } from "../db/types";

export function TrSimple({ row }: { row: T_ROW }) {
  return (
    <tr>
      <td>
        <ForeignWord row={row} />
      </td>
      <td>{row[1]}</td>
      <td>{row[2]}</td>
    </tr>
  );
}
