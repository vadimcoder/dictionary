import { T_ROW_WITH_ASSOCIATIONS } from "../../../db/helpers";
import { getRowsDividedByTBodies, T_LATEST_TBODY } from "./prepareData";
import { TBodyAssociation } from "../TBodyAssociation/TBodyAssociation";
import { TBodySimple } from "../TBodySimple/TBodySimple";
import { useGlobalState } from "../../../GlobalState/GlobalState";

export function LatestList({
  sortedRows,
}: {
  sortedRows: T_ROW_WITH_ASSOCIATIONS[];
}) {
  const [globalState] = useGlobalState();
  const tBodies: T_LATEST_TBODY[] = getRowsDividedByTBodies(
    sortedRows,
    globalState.lastRowsCount,
  );

  return (
    <table className={"LatestList"}>
      {tBodies.map((tBody: T_LATEST_TBODY) =>
        tBody.isAssociation ? (
          <TBodyAssociation tBody={tBody} key={tBody.associationMainRow![0]} />
        ) : (
          <TBodySimple rows={tBody.rows} key={tBody.rows[0][0]} />
        ),
      )}
    </table>
  );
}
