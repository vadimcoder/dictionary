import "./style.css";
import { T_RECORD } from "../../db/types";
import { Player } from "../Player/Player";
import { WordWithLinks } from "../WordWithLinks";

function getStyle(gridColumn: number, gridRow: number) {
  return { gridColumn, gridRow };
}

export function IrregularVerbs({
  record,
  autoplay = false,
}: {
  record: T_RECORD;
  autoplay?: boolean;
}) {
  const { dateAdded } = record;

  return (
    <div className={"IrregularVerbs"}>
      <div style={getStyle(1, 1)}>
        <Player word={record.wordSet.word} autoplay={autoplay} />
      </div>

      <div style={getStyle(2, 1)}>
        <WordWithLinks word={record.wordSet.word} dateAdded={dateAdded} />
      </div>

      <div style={getStyle(4, 1)}>
        <Player word={record.irregularVerb!.secondForm.word} />
      </div>

      <div style={getStyle(5, 1)}>
        <WordWithLinks
          word={record.irregularVerb!.secondForm.word}
          dateAdded={dateAdded}
        />
      </div>

      <div style={getStyle(7, 1)}>
        <Player word={record.irregularVerb!.thirdForm.word} />
      </div>

      <div style={getStyle(8, 1)}>
        <WordWithLinks
          word={record.irregularVerb!.thirdForm.word}
          dateAdded={dateAdded}
        />
      </div>

      <div style={getStyle(2, 2)}>{record.wordSet.transcription}</div>

      <div style={getStyle(5, 2)}>
        {record.irregularVerb!.secondForm.transcription}
      </div>

      <div style={getStyle(8, 2)}>
        {record.irregularVerb!.thirdForm.transcription}
      </div>
    </div>
  );
}
