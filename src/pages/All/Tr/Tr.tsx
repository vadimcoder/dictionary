import { ForeignWord } from "../../../components/ForeignWord/ForeignWord";
import { T_ROW, T_WORD } from "../../../types/dictionary";

export function Tr({
  word,
  rows,
  index,
  isBorderBottom = false,
}: {
  word: T_WORD;
  rows: T_ROW[];
  index: number;
  isBorderBottom?: boolean;
}) {
  // let rowspan = 1;
  // let showTranslation = true;
  // // console.log("word", word);
  // if (word.translation) {
  //   showTranslation = !isBackwardTranslationTheSame(words, index);
  //
  //   if (showTranslation) {
  //     rowspan = seeForward(words, index);
  //   }
  // }
  //
  // const props = rowspan > 1 ? { rowSpan: rowspan } : {};

  return (
    <tr className={`row${isBorderBottom ? " solid-border" : ""}`}>
      <td>
        <ForeignWord word={word} />
      </td>
      <td>{word.transcription}</td>
      {/*{showTranslation && <td {...props}>{word.translation}</td>}*/}
      <td>{word.translation}</td>
    </tr>
  );
}

// function isBackwardTranslationTheSame(
//   words: T_WORD[],
//   startIndex: number,
// ): boolean {
//   const backwardTranslation = words[startIndex - 1];
//
//   return (
//     backwardTranslation &&
//     backwardTranslation.translation === words[startIndex].translation
//   );
// }
//
// function seeForward(words: T_WORD[], startIndex: number) {
//   let rowspan = 1;
//
//   for (let i = startIndex; i < words.length - 1; ++i) {
//     if (words[startIndex].translation === words[i + 1].translation) {
//       rowspan++;
//     } else {
//       break;
//     }
//   }
//
//   return rowspan;
// }
