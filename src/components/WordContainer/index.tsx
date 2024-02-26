import { IrregularVerbs } from "../IrregularVerbs";
import { Word } from "../Word";
import { T_ROW } from "../../db/types";

export function WordContainer({
  row,
  autoplay = false,
}: {
  row: T_ROW;
  autoplay?: boolean;
}) {
  return (
    <>
      {row.irregularVerb ? (
        <IrregularVerbs row={row} autoplay={autoplay} />
      ) : (
        <Word
          word={row.wordSet.word}
          dateAdded={row.dateAdded}
          autoplay={autoplay}
        />
      )}
    </>
  );
}
