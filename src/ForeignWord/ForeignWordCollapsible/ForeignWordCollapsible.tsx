import "./style.css";
import { useState } from "react";

export function ForeignWordCollapsible({ word }: { word: string }) {
  const NAME = `ForeignWordCollapsibleLinks-${word}`;

  const [isOpened, setOpen] = useState<boolean>(false);

  function toggle() {
    setOpen(!isOpened);
  }

  return (
    <>
      <button
        onClick={toggle}
        className={"ForeignWordCollapsibleButton"}
        aria-expanded={isOpened}
        aria-controls={NAME}
      >
        <img
          aria-hidden={true}
          src={"toggle.svg"}
          className={`ForeignWordCollapsibleButton__image ${
            isOpened ? "ForeignWordCollapsibleButton__image_opened" : ""
          }`}
          alt=""
        />
      </button>

      {isOpened && (
        <div id={NAME} className={"ForeignWordCollapsibleLinks"}>
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
    </>
  );
}
