import { TBodyAssociation } from "../TBodyAssociation/TBodyAssociation";
import { DB } from "../../../db/db";
import { T_WORD_WITH_ASSOCIATIONS } from "../../../types/dictionary";
import { TrSimple } from "../TrSimple";
import "./style.css";
import { useGlobalState } from "../../../GlobalState/GlobalState";

export function LatestList() {
  const [globalState] = useGlobalState();

  return (
    <table className={"LatestList"}>
      {DB.getLastRows(globalState.latestLastRowsCount).map(
        (row: T_WORD_WITH_ASSOCIATIONS) =>
          row.isAssociation ? (
            <TBodyAssociation row={row} key={row.word.foreignWord} />
          ) : (
            <tbody className={"TBodySimple"} key={row.word.foreignWord}>
              <TrSimple word={row.word} />
            </tbody>
          ),
      )}
    </table>
  );
}
