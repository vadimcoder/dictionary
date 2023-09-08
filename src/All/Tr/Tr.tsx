import "./style.css";
import { T_ROW } from "../../types";
import { Player } from "../../Player/Player";

export function Tr({
  translation,
  translations,
  index,
  isBorderBottom = false,
}: {
  translation: T_ROW;
  translations: T_ROW[];
  index: number;
  isBorderBottom?: boolean;
}) {
  let rowspan = 1;
  let showRussianWord = true;

  const [foreignWord, transcription, russianWord, dateAdded] = translation;

  if (russianWord) {
    showRussianWord = !isBackwardTranslationTheSame(translations, index);

    if (showRussianWord) {
      rowspan = seeForward(translations, index);
    }
  }

  const props = rowspan > 1 ? { rowSpan: rowspan } : {};

  return (
    <tr className={`row${isBorderBottom ? " solid-border" : ""}`}>
      <td>
        <Player word={foreignWord} />
      </td>
      <td title={dateAdded.toString()}>
        <a
          className={"row__foreignWord"}
          target={"_blank"}
          href={`https://translate.google.com/details?sl=en&tl=ru&text=${foreignWord}&op=translate`}
          rel="noreferrer"
        >
          {foreignWord}
        </a>
      </td>
      <td>{transcription}</td>
      {showRussianWord && <td {...props}>{russianWord}</td>}
    </tr>
  );
}

function isBackwardTranslationTheSame(
  translations: T_ROW[],
  startIndex: number,
): boolean {
  const backwardTranslation = translations[startIndex - 1];

  return (
    backwardTranslation &&
    backwardTranslation[2] === translations[startIndex][2]
  );
}

function seeForward(translations: T_ROW[], startIndex: number) {
  let rowspan = 1;

  for (let i = startIndex; i < translations.length - 1; ++i) {
    if (translations[startIndex][2] === translations[i + 1][2]) {
      rowspan++;
    } else {
      break;
    }
  }

  return rowspan;
}
