import { T_ROW } from "../../db/types";
import { ForeignWord } from "../../ForeignWord/ForeignWord";

export function Tr({
  row,
  rows,
  index,
  isBorderBottom = false,
}: {
  row: T_ROW;
  rows: T_ROW[];
  index: number;
  isBorderBottom?: boolean;
}) {
  let rowspan = 1;
  let showRussianWord = true;

  const transcription = row[1];
  const russianWord = row[2];

  if (russianWord) {
    showRussianWord = !isBackwardTranslationTheSame(rows, index);

    if (showRussianWord) {
      rowspan = seeForward(rows, index);
    }
  }

  const props = rowspan > 1 ? { rowSpan: rowspan } : {};

  return (
    <tr className={`row${isBorderBottom ? " solid-border" : ""}`}>
      <td>
        <ForeignWord row={row} />
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
