import "./style.css";
import { Player } from "../Player/Player";
import { T_ROW } from "../../db/types";

export function WordWithAudio({ row }: { row: T_ROW }) {
  const word = row[0];
  const dateAdded = row[3];

  return (
    <div className={"WordWithAudio"}>
      <Player word={word} />
      <a
        className={"WordWithAudio__link"}
        target={"_blank"}
        href={`https://translate.google.com/details?sl=en&tl=ru&text=${word}&op=translate`}
        rel="noreferrer"
        title={dateAdded.toString()}
      >
        {word}
      </a>
    </div>
  );
}
