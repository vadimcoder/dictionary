import "./style.css";
import { useRef } from "react";
import { wordToFilename } from "../../utils";

export function Player({ foreignWord }: { foreignWord: string }) {
  const audio = useRef<HTMLAudioElement>(null);

  function play() {
    audio.current!.play();
  }

  return (
    <div className={"player"}>
      <audio
        src={`audio/${wordToFilename(foreignWord)}.mp3`}
        preload="none"
        ref={audio}
      />
      <button onClick={play} className={"player__button"} title="Play">
        <span aria-hidden="true">▶</span>
      </button>
    </div>
  );
}
