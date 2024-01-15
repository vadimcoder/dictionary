import "./style.css";
import { T_RECORD } from "../../db/types";
import { Player } from "../Player/Player";
import { WordWithLinks } from "../WordWithLinks";

export function IrregularVerbs({ record }: { record: T_RECORD }) {
  const { dateAdded } = record;

  return (
    <div className={"IrregularVerbs"}>
      <div style={{ gridColumn: 1, gridRow: 1 }}>
        <Player word={record.wordSet.word} />
      </div>

      <div style={{ gridColumn: 2, gridRow: 1 }}>
        <WordWithLinks word={record.wordSet.word} dateAdded={dateAdded} />
      </div>

      <div style={{ gridColumn: 4, gridRow: 1 }}>
        <Player word={record.irregularVerb!.secondForm.word} />
      </div>

      <div style={{ gridColumn: 5, gridRow: 1 }}>
        <WordWithLinks
          word={record.irregularVerb!.secondForm.word}
          dateAdded={dateAdded}
        />
      </div>

      <div style={{ gridColumn: 7, gridRow: 1 }}>
        <Player word={record.irregularVerb!.thirdForm.word} />
      </div>

      <div style={{ gridColumn: 8, gridRow: 1 }}>
        <WordWithLinks
          word={record.irregularVerb!.thirdForm.word}
          dateAdded={dateAdded}
        />
      </div>

      <div style={{ gridColumn: 2, gridRow: 2 }}>
        {record.wordSet.transcription}
      </div>

      <div style={{ gridColumn: 5, gridRow: 2 }}>
        {record.irregularVerb!.secondForm.transcription}
      </div>

      <div style={{ gridColumn: 8, gridRow: 2 }}>
        {record.irregularVerb!.thirdForm.transcription}
      </div>
    </div>
  );
}
