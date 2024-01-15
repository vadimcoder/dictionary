import { Word } from "../../components/Word/Word";
import { T_ROW, T_RECORD } from "../../db/types";
import { IrregularVerbs } from "../../components/IrregularVerbs";
import { Record } from "../../components/Record";

export function Tr({
  record,
  rows,
  index,
  isBorderBottom = false,
}: {
  record: T_RECORD;
  rows: T_ROW[];
  index: number;
  isBorderBottom?: boolean;
}) {
  // let rowspan = 1;
  // let showTranslation = true;
  // // console.log("record", record);
  // if (record.translation) {
  //   showTranslation = !isBackwardTranslationTheSame(records, index);
  //
  //   if (showTranslation) {
  //     rowspan = seeForward(records, index);
  //   }
  // }
  //
  // const props = rowspan > 1 ? { rowSpan: rowspan } : {};

  return (
    <tr className={`row${isBorderBottom ? " solid-border" : ""}`}>
      <td {...(record.irregularVerb && { colSpan: 2 })}>
        <Record record={record} />
      </td>
      {!record.irregularVerb && <td>{record.wordSet.transcription}</td>}
      {/*{showTranslation && <td {...props}>{record.translation}</td>}*/}
      <td>{record.translation}</td>
    </tr>
  );
}

// function isBackwardTranslationTheSame(
//   records: T_RECORD[],
//   startIndex: number,
// ): boolean {
//   const backwardTranslation = records[startIndex - 1];
//
//   return (
//     backwardTranslation &&
//     backwardTranslation.translation === records[startIndex].translation
//   );
// }
//
// function seeForward(records: T_RECORD[], startIndex: number) {
//   let rowspan = 1;
//
//   for (let i = startIndex; i < records.length - 1; ++i) {
//     if (records[startIndex].translation === records[i + 1].translation) {
//       rowspan++;
//     } else {
//       break;
//     }
//   }
//
//   return rowspan;
// }
