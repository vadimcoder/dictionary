import "./style.css";
import { ChangeEvent, useMemo, useState } from "react";
import shuffle from "lodash.shuffle";
import { T_ROW, T_ROWS } from "../../../../db/types";
import { getRandomItem } from "../../../../utils/utils";
import { DEFAULT_VARIANT_COUNT } from "../questionType";
import { WordContainer } from "../../../../components/WordContainer";

function insertAssociations(variants: string[], row: T_ROW) {
  if (row.associations) {
    row.associations.excludingTheRow.forEach((row: T_ROW) => {
      variants.push(row.translation);
    });
  }
}

function insertOther(variants: string[], lastRows: T_ROWS) {
  while (variants.length < DEFAULT_VARIANT_COUNT) {
    const randomTranslation = getRandomItem(lastRows).translation;

    if (!variants.includes(randomTranslation)) {
      variants.push(randomTranslation);
    }
  }
}

function getVariants(row: T_ROW, lastRows: T_ROWS) {
  const variants: string[] = [row.translation];

  insertAssociations(variants, row);

  insertOther(variants, lastRows);

  return shuffle(shuffle(variants));
}

export function SelectTranslation({
  onCorrectAnswer,
  row,
  lastRows,
}: {
  onCorrectAnswer: () => void;
  row: T_ROW;
  lastRows: T_ROWS;
}) {
  const [answer, setAnswer] = useState<string>();
  const isCorrect = answer === row.translation;

  const variants = useMemo(() => getVariants(row, lastRows), []);

  function onChange({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    setAnswer(value);

    if (value === row.translation) {
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
      <WordContainer row={row} autoplay />

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
