import { useRef } from "react";
import { wordToFilename } from "../utils";

export function Player({ word }: { word: string }) {
  const audio = useRef<HTMLAudioElement>(null);

  return (
    <>
      <audio
        src={`audio/${wordToFilename(word)}.mp3`}
        preload="none"
        ref={audio}
      />
      <button onClick={() => audio.current!.play()}>play</button>
    </>
  );
}
