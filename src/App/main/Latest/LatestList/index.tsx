import { TBodyAssociation } from "../TBodyAssociation";
import { DB } from "../../../../db/db";
import { T_ROW } from "../../../../db/types";
import { Tr } from "../../../../components/Tr";
import "./style.css";
import { useGlobalState } from "../../../../GlobalState/GlobalState";

export function LatestList() {
  const [globalState] = useGlobalState();

  return (
    <table className={"LatestList"}>
      {DB.getLastRows(globalState.latestLastRowsCount).map((row: T_ROW) =>
        row.associations ? (
          <TBodyAssociation row={row} key={row.wordSet.word} />
        ) : (
          <tbody className={"TBodySimple"} key={row.wordSet.word}>
            <Tr row={row} />
          </tbody>
        ),
      )}
    </table>
  );
}
