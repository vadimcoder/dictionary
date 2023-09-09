import "./style.css";
import { useRef } from "react";
import { wordToFilename } from "../utils";

export function Player({ word }: { word: string }) {
  const audio = useRef<HTMLAudioElement>(null);

  function play() {
    audio.current!.play();
  }

  return (
    <div className={"player"}>
      <audio
        src={`audio/${wordToFilename(word)}.mp3`}
        preload="none"
        ref={audio}
      />
      <button onClick={play} className={"player__button"} title="Play">
        <span aria-hidden="true">▶</span>
      </button>
    </div>
  );
}
