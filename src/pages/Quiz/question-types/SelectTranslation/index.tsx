import { ChangeEvent, useMemo, useState } from "react";
import shuffle from "lodash.shuffle";
import { T_WORD_WITH_ASSOCIATIONS } from "../../../../types/dictionary";
import { getRandomItem } from "../../../../utils";
import { WordWithAudio } from "../../../../components/WordWithAudio/WordWithAudio";
import { VARIANT_NUMBER } from "../questionType";
import "./style.css";

function getVariants(
  row: T_WORD_WITH_ASSOCIATIONS,
  lastRows: T_WORD_WITH_ASSOCIATIONS[],
) {
  const variants: string[] = [row.word.translation];

  while (variants.length < VARIANT_NUMBER) {
    const randomTranslation = getRandomItem(lastRows).word.translation;

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
  row: T_WORD_WITH_ASSOCIATIONS;
  lastRows: T_WORD_WITH_ASSOCIATIONS[];
}) {
  const [answer, setAnswer] = useState<string>();
  const isCorrect = answer === row.word.translation;

  const variants = useMemo(() => getVariants(row, lastRows), []);

  function onChange({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    setAnswer(value);

    if (value === row.word.translation) {
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
      <WordWithAudio word={row.word} />

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
