import "./style.css";
import { useId, useState } from "react";
import { T_ROW } from "../types";
import { CollapseButton } from "../CollapseButton/CollapseButton";

export function ForeignWord({ row }: { row: T_ROW }) {
  const [isOpened, setOpen] = useState<boolean>(false);
  const ariaId = useId();

  function toggle() {
    setOpen(!isOpened);
  }

  const word = row[0];
  const dateAdded = row[3];

  return (
    <div className={"ForeignWord"}>
      <div>
        <a
          className={"ForeignWord__default-link"}
          target={"_blank"}
          href={`https://translate.google.com/details?sl=en&tl=ru&text=${word}&op=translate`}
          rel="noreferrer"
          title={dateAdded.toString()}
        >
          {word}
        </a>
      </div>

      <CollapseButton
        toggle={toggle}
        isOpened={isOpened}
        ariaControls={ariaId}
      />

      {isOpened && (
        <div id={ariaId} className={"ForeignWordCollapsibleLinks"}>
          <a
            target={"_blank"}
            href={`https://dictionary.cambridge.org/dictionary/english/${word}`}
            rel="noreferrer"
          >
            cam
          </a>
          <a
            target={"_blank"}
            href={`https://translate.yandex.ru/?source_lang=en&target_lang=ru&text=${word}`}
            rel="noreferrer"
          >
            ya
          </a>
        </div>
      )}
    </div>
  );
}
