import { useState } from "react";
import "./style.css";
import { Checkbox } from "../../../components/form/Checkbox/Checkbox";
import { InputNumber } from "../../../components/form/InputNumber/InputNumber";
import { useGlobalState } from "../../../GlobalState/GlobalState";

export function QuizLatestSelector({
  onChange,
}: {
  onChange: (lastRowsCount: number, isUnique: boolean) => void;
}) {
  const [isAll, setIsAll] = useState<boolean>(false);
  const [globalState, setGlobalState] = useGlobalState();

  function onChangeLastRowsCount(lastRowsCount: number) {
    setGlobalState((oldState) => ({
      ...oldState,
      quiz: {
        ...oldState.quiz,
        lastRowsCount,
      },
    }));
    onChange(lastRowsCount, globalState.quiz.isUnique);
  }

  function onChangeUnique(isUnique: boolean) {
    setGlobalState((oldState) => ({
      ...oldState,
      quiz: {
        ...oldState.quiz,
        isUnique,
      },
    }));
    onChange(globalState.quiz.lastRowsCount, isUnique);
  }

  return (
    <div className={"QuizLatestSelector"}>
      <Checkbox label="All" value={isAll} onChange={setIsAll} />

      {!isAll && (
        <InputNumber
          value={globalState.quiz.lastRowsCount}
          onChange={onChangeLastRowsCount}
        />
      )}

      <Checkbox
        label="isUnique"
        value={globalState.quiz.isUnique}
        onChange={onChangeUnique}
      />
    </div>
  );
}
