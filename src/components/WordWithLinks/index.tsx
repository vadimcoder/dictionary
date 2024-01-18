import "./style.css";
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useId,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { useMemo, useState } from "react";
import { getVerbWithoutTo } from "../../utils/filenames";

export function WordWithLinks({
  word,
  dateAdded,
}: {
  word: string;
  dateAdded: Date;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wordForLinks = useMemo(() => getVerbWithoutTo(word), [word]);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    placement: "top",
    onOpenChange: setIsOpen,
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: "end" }),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const headingId = useId();

  return (
    <>
      <span
        ref={refs.setReference}
        {...getReferenceProps()}
        title={dateAdded.toString()}
        className={"WordWithLinks__word"}
      >
        {word}
      </span>

      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className="WordWithLinks__popover"
            ref={refs.setFloating}
            style={floatingStyles}
            aria-labelledby={headingId}
            {...getFloatingProps()}
          >
            <a
              target={"_blank"}
              href={`https://translate.google.com/details?sl=en&tl=ru&text=${wordForLinks}&op=translate`}
              rel="noreferrer"
            >
              google
            </a>
            ,{" "}
            <a
              target={"_blank"}
              href={`https://dictionary.cambridge.org/dictionary/english/${wordForLinks}`}
              rel="noreferrer"
            >
              cam
            </a>
            ,{" "}
            <a
              target={"_blank"}
              href={`https://www.multitran.com/m.exe?s=${wordForLinks}&l1=1&l2=2`}
              rel="noreferrer"
            >
              multitran
            </a>
            ,{" "}
            <a
              target={"_blank"}
              href={`https://translate.yandex.ru/?source_lang=en&target_lang=ru&text=${wordForLinks}`}
              rel="noreferrer"
            >
              ya
            </a>
            ,{" "}
            <a
              target={"_blank"}
              href={`https://www.google.com/search?q=${wordForLinks}&tbm=isch`}
              rel="noreferrer"
            >
              pics
            </a>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}
