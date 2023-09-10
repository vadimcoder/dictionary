import "./style.css";
import { useState } from "react";
import { Checkbox } from "../Checkbox/Checkbox";

export function TabQuiz() {
  const [isAll, setIsAll] = useState<boolean>(false);
  const [lastCount, setLastCount] = useState<number>(30);

  return (
    <div>
      <Checkbox label="All" value={isAll} onChange={setIsAll} />

      {!isAll && (
        <input
          value={lastCount}
          onChange={({ target: { value } }) => {
            const parsed = parseInt(value);

            if (Number.isNaN(parsed)) {
              setLastCount(0);
            } else {
              setLastCount(parseInt(value));
            }
          }}
        />
      )}
    </div>
  );
}
