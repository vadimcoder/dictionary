import "./style.css";
import { Player } from "../Player/Player";
import { T_WORD } from "../../types/dictionary";

export function WordWithAudio({ word }: { word: T_WORD }) {
  return (
    <div className={"WordWithAudio"}>
      <Player foreignWord={word.foreignWord} />
      <a
        className={"WordWithAudio__link"}
        target={"_blank"}
        href={`https://translate.google.com/details?sl=en&tl=ru&text=${word.foreignWord}&op=translate`}
        rel="noreferrer"
        title={word.dateAdded.toString()}
      >
        {word.foreignWord}
      </a>
    </div>
  );
}
