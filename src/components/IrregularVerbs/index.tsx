import "./style.css";
import { T_ROW } from "../../db/types";
import { Player } from "../Player/Player";
import { WordWithLinks } from "../WordWithLinks";

function getStyle(gridColumn: number, gridRow: number) {
  return { gridColumn, gridRow };
}

export function IrregularVerbs({
  row,
  autoplay = false,
}: {
  row: T_ROW;
  autoplay?: boolean;
}) {
  const { dateAdded } = row;

  return (
    <div className={"IrregularVerbs"}>
      <div style={getStyle(1, 1)}>
        <Player word={row.wordSet.word} autoplay={autoplay} />
      </div>

      <div style={getStyle(2, 1)}>
        <WordWithLinks word={row.wordSet.word} dateAdded={dateAdded} />
      </div>

      <div style={getStyle(4, 1)}>
        <Player word={row.irregularVerb!.secondWordSet.word} />
      </div>

      <div style={getStyle(5, 1)}>
        <WordWithLinks
          word={row.irregularVerb!.secondWordSet.word}
          dateAdded={dateAdded}
        />
      </div>

      <div style={getStyle(7, 1)}>
        <Player word={row.irregularVerb!.thirdWordSet.word} />
      </div>

      <div style={getStyle(8, 1)}>
        <WordWithLinks
          word={row.irregularVerb!.thirdWordSet.word}
          dateAdded={dateAdded}
        />
      </div>

      <div style={getStyle(2, 2)}>{row.wordSet.transcription}</div>

      <div style={getStyle(5, 2)}>
        {row.irregularVerb!.secondWordSet.transcription}
      </div>

      <div style={getStyle(8, 2)}>
        {row.irregularVerb!.thirdWordSet.transcription}
      </div>
    </div>
  );
}
