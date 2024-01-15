import "./style.css";
import { T_RECORD } from "../../db/types";
import { Word } from "../Word/Word";

export function IrregularVerbs({ record }: { record: T_RECORD }) {
  const { dateAdded } = record;

  return (
    <div className={"IrregularVerbs"}>
      <div>
        <Word word={record.wordSet.word} dateAdded={dateAdded} />
        {record.wordSet.transcription}
      </div>

      <div>
        <Word
          word={record.irregularVerb!.secondForm.word}
          dateAdded={dateAdded}
        />
        {record.irregularVerb!.secondForm.transcription}
      </div>

      <div>
        <Word
          word={record.irregularVerb!.thirdForm.word}
          dateAdded={dateAdded}
        />
        {record.irregularVerb!.thirdForm.transcription}
      </div>
    </div>
  );
}
