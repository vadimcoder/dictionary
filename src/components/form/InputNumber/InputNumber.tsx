import { VARIANT_NUMBER } from "../../../pages/Quiz/question-types/questionType";
import "./style.css";

export function InputNumber({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className={"InputNumber"}>
      <button
        type={"button"}
        onClick={() => onChange(value - 1)}
        disabled={value <= VARIANT_NUMBER}
      >
        &lt;
      </button>

      {value}

      <button type={"button"} onClick={() => onChange(value + 1)}>
        &gt;
      </button>
    </div>
  );
}
