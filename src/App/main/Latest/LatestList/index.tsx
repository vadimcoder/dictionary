import { TBodyAssociation } from "../TBodyAssociation";
import { T_ROW, T_ROWS } from "../../../../db/types";
import { Tr } from "../../../../components/Tr";
import "./style.css";

export function LatestList({ rows }: { rows: T_ROWS }) {
  return (
    <table className={"LatestList"}>
      {rows.map((row: T_ROW) =>
        row.associations ? (
          <TBodyAssociation row={row} key={row.wordSet.word} />
        ) : (
          <tbody key={row.wordSet.word}>
            <Tr row={row} />
          </tbody>
        ),
      )}
    </table>
  );
}
