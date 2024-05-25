import { Checkbox } from "../form/Checkbox/Checkbox";
import { useGlobalState } from "../../GlobalState/GlobalState";
import { T_ROW } from "../../db/types";

export function CheckStopRow({ row }: { row: T_ROW }) {
  const [globalState, setGlobalState] = useGlobalState();

  function isChecked(): boolean {
    return globalState.stoppedRow?.wordSet.word === row.wordSet.word;
  }

  return (
    <Checkbox
      value={isChecked()}
      onChange={(checked) => {
        if (checked) {
          setGlobalState((state) => {
            return {
              ...state,
              stoppedRow: row,
            };
          });
        }
      }}
    />
  );
}
