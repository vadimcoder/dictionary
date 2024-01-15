import { TBodyAssociation } from "../TBodyAssociation/TBodyAssociation";
import { DB } from "../../../db/db";
import { T_LAST_RECORD } from "../../../db/types";
import { TrSimple } from "../TrSimple";
import "./style.css";
import { useGlobalState } from "../../../GlobalState/GlobalState";

export function LatestList() {
  const [globalState] = useGlobalState();

  return (
    <table className={"LatestList"}>
      {DB.getLastRows(globalState.latestLastRowsCount).map(
        (lastRecord: T_LAST_RECORD) =>
          lastRecord.isAssociation ? (
            <TBodyAssociation
              lastRecord={lastRecord}
              key={lastRecord.record.wordSet.word}
            />
          ) : (
            <tbody
              className={"TBodySimple"}
              key={lastRecord.record.wordSet.word}
            >
              <TrSimple record={lastRecord.record} />
            </tbody>
          ),
      )}
    </table>
  );
}
