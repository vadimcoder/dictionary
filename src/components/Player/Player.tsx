import "./style.css";
import { useEffect, useRef } from "react";
import { getFilename } from "../../utils/filenames";

export function Player({
  word,
  autoplay = false,
}: {
  word: string;
  autoplay?: boolean;
}) {
  const audio = useRef<HTMLAudioElement>(null);

  function play() {
    audio.current!.play();
  }

  useEffect(() => {
    if (autoplay) {
      audio.current!.play();
    }
  }, []);

  return (
    <div>
      <audio src={`/audio/${getFilename(word)}`} preload="none" ref={audio} />
      <button onClick={play} className={"player__button"} title="Play">
        <span aria-hidden="true">▶</span>
      </button>
    </div>
  );
}
