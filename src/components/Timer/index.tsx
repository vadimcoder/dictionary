import { useEffect, useState, Dispatch, useRef, RefObject } from "react";
import "./style.css";
import { format } from "date-fns";

const INTERVALS = [1, 1, 1] as const; // in minutes

function tick(
  currentIndex: number,
  currentInterval: number,
  intervalsFormatted: string[],
  setTimer: Dispatch<string>,
) {
  intervalsFormatted[currentIndex] = format(currentInterval, "mm:ss");

  intervalsFormatted = intervalsFormatted.map((interval, index) =>
    index === currentIndex ? `<b>${interval}</b>` : interval,
  );

  setTimer(`[${intervalsFormatted.join(", ")}]`);
}

function runIntervals(
  intervals: readonly number[],
  setTimer: Dispatch<string>,
  audio: RefObject<HTMLAudioElement>,
) {
  const intervalsMillis = intervals.map((interval) => interval * 6000);
  const intervalsFormatted = intervalsMillis.map((interval) =>
    format(interval, "mm:ss"),
  );
  let currentIndex = 0;
  let currentInterval = intervalsMillis[currentIndex];

  const intervalId = setInterval(() => {
    currentInterval -= 1000;

    tick(currentIndex, currentInterval, intervalsFormatted, setTimer);

    if (currentInterval === 0) {
      currentInterval = intervalsMillis[++currentIndex];
      audio.current?.play();

      if (!currentInterval) {
        clearInterval(intervalId);
        return;
      }
    }
  }, 1000);

  return intervalId;
}

export function Timer() {
  const [timer, setTimer] = useState("");
  const audio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const intervalId = runIntervals(INTERVALS, setTimer, audio);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={"timer"}>
      <div dangerouslySetInnerHTML={{ __html: timer }} />
      <audio
        ref={audio}
        src="/ui-sounds/new-notification-on-your-device-138695.mp3"
      />
    </div>
  );
}
