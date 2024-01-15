import "./style.css";
import { ChangeEvent, useMemo, useState } from "react";
import shuffle from "lodash.shuffle";
import { T_LAST_RECORD } from "../../../../db/types";
import { getRandomItem } from "../../../../utils";
import { VARIANT_NUMBER } from "../questionType";
import { Record } from "../../../../components/Record";

function getVariants(row: T_LAST_RECORD, lastRows: T_LAST_RECORD[]) {
  const variants: string[] = [row.record.translation];

  while (variants.length < VARIANT_NUMBER) {
    const randomTranslation = getRandomItem(lastRows).record.translation;

    if (!variants.includes(randomTranslation)) {
      variants.push(randomTranslation);
    }
  }

  return shuffle(variants);
}

export function SelectTranslation({
  onCorrectAnswer,
  row,
  lastRows,
}: {
  onCorrectAnswer: () => void;
  row: T_LAST_RECORD;
  lastRows: T_LAST_RECORD[];
}) {
  const [answer, setAnswer] = useState<string>();
  const isCorrect = answer === row.record.translation;

  const variants = useMemo(() => getVariants(row, lastRows), []);

  function onChange({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    setAnswer(value);

    if (value === row.record.translation) {
      setTimeout(onCorrectAnswer, 100);
    }
  }

  function isChecked(variant: string) {
    return variant === answer;
  }

  function getModifier(variant: string) {
    if (isChecked(variant)) {
      return `SelectTranslationVariant_${isCorrect ? "correct" : "incorrect"}`;
    }

    return "";
  }

  return (
    <div className={"SelectTranslation"}>
      <Record record={row.record} />

      <ul>
        {variants.map((variant) => (
          <li
            key={variant}
            className={`SelectTranslation__variant SelectTranslationVariant ${getModifier(
              variant,
            )}`}
          >
            <label>
              <input
                type={"radio"}
                value={variant}
                checked={isChecked(variant)}
                onChange={onChange}
              />{" "}
              {variant}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
