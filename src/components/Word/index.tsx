import "./style.css";
import { Player } from "../Player/Player";
import { WordWithLinks } from "../WordWithLinks";

export function Word({ word, dateAdded }: { word: string; dateAdded: Date }) {
  return (
    <div className={"Word"}>
      <Player word={word} />

      <WordWithLinks word={word} dateAdded={dateAdded} />
    </div>
  );
}
