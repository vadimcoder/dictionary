import "./style.css";
import { T_ROW } from "../../db/types";
import { TrSimple } from "../TrSimple";

export function TBodySimple({ rows }: { rows: T_ROW[] }) {
  return (
    <tbody className={"TBodySimple"}>
      {rows.map((row: T_ROW) => (
        <TrSimple row={row} key={row[0]} />
      ))}
    </tbody>
  );
}
