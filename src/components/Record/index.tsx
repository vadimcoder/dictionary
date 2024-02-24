import { IrregularVerbs } from "../IrregularVerbs";
import { Word } from "../Word";
import { T_RECORD } from "../../db/types";

export function Record({
  record,
  autoplay = false,
}: {
  record: T_RECORD;
  autoplay?: boolean;
}) {
  return (
    <>
      {record.irregularVerb ? (
        <IrregularVerbs record={record} autoplay={autoplay} />
      ) : (
        <Word
          word={record.wordSet.word}
          dateAdded={record.dateAdded}
          autoplay={autoplay}
        />
      )}
    </>
  );
}
