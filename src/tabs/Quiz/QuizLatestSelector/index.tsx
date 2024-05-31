import { useState } from "react";
import "./style.css";
import { Checkbox } from "../../../components/form/Checkbox/Checkbox";
import { InputNumber } from "../../../components/form/InputNumber/InputNumber";
import { useGlobalState } from "../../../GlobalState/GlobalState";

export function QuizLatestSelector({
  onChangeLastRows,
}: {
  onChangeLastRows: (quizLastRowsCount: number) => void;
}) {
  const [isAll, setIsAll] = useState<boolean>(false);
  const [globalState, setGlobalState] = useGlobalState();

  function onChange(quizLastRowsCount: number) {
    setGlobalState((oldState) => ({
      ...oldState,
      quizLastRowsCount,
    }));
    onChangeLastRows(quizLastRowsCount);
  }

  return (
    <div className={"QuizLatestSelector"}>
      <Checkbox label="All" value={isAll} onChange={setIsAll} />

      {!isAll && (
        <InputNumber
          value={globalState.quizLastRowsCount}
          onChange={onChange}
        />
      )}
    </div>
  );
}
