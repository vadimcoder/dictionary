import { TBodyAssociation } from "../TBodyAssociation";
import { T_ROW, T_ROWS } from "../../../db/types";
import { Tr } from "../../../components/Tr";
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

    // <table className={"LatestList"}>
    //   <tbody>
    //     <tr className="row row_border-top">
    //       <td>
    //         1 2 3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3
    //         41 2 31 2 3 4 1 2 3 4 1 2 3 1 2 3 4 1 3 4 1 2 3 4 41 2 3 41 2 3 41 2
    //         3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3 4
    //       </td>
    //       <td>
    //         1 2 3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3
    //         41 2 31 2 3 4 1 2 3 4 1 2 3 1 2 3 4 1 3 4 1 2 3 4 41 2 3 41 2 3 41 2
    //         3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3 4
    //       </td>
    //       <td>2</td>
    //     </tr>
    //   </tbody>
    //
    //   <tbody>
    //     <tr className="row row_border-top">
    //       <td>
    //         1 2 3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3
    //         41 2 31 2 3 4 1 2 3 4 1 2 3 1 2 3 4 1 3 4 1 2 3 4 41 2 3 41 2 3 41 2
    //         3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3 4
    //       </td>
    //       <td>
    //         1 2 3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3
    //         41 2 31 2 3 4 1 2 3 4 1 2 3 1 2 3 4 1 3 4 1 2 3 4 41 2 3 41 2 3 41 2
    //         3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3 41 2 3 4
    //       </td>
    //       <td>2</td>
    //     </tr>
    //   </tbody>
    // </table>
  );
}
