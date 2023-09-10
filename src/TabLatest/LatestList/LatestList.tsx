import { useGlobalState } from "../../GlobalState/GlobalState";
import { TBodyAssociation } from "../TBodyAssociation/TBodyAssociation";
import { prepareData, T_LATEST_TBODY } from "./prepareData";
import { TBodySimple } from "../TBodySimple/TBodySimple";

export function LatestList() {
  const [globalState] = useGlobalState();

  const tBodies: T_LATEST_TBODY[] = prepareData(globalState.lastRowsCount);

  return (
    <table style={{ border: "1px solid transparent" }}>
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
