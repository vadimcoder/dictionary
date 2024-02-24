import "./style.css";
import { Player } from "../Player/Player";
import { WordWithLinks } from "../WordWithLinks";

export function Word({
  word,
  dateAdded,
  autoplay = false,
}: {
  word: string;
  dateAdded: Date;
  autoplay?: boolean;
}) {
  return (
    <div className={"Word"}>
      <Player word={word} autoplay={autoplay} />

      <WordWithLinks word={word} dateAdded={dateAdded} />
    </div>
  );
}
