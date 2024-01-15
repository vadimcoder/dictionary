import { IrregularVerbs } from "../IrregularVerbs";
import { Word } from "../Word";
import { T_RECORD } from "../../db/types";

export function Record({ record }: { record: T_RECORD }) {
  return (
    <>
      {record.irregularVerb ? (
        <IrregularVerbs record={record} />
      ) : (
        <Word word={record.wordSet.word} dateAdded={record.dateAdded} />
      )}
    </>
  );
}
