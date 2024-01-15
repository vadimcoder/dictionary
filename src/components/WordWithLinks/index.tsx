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
import { useState } from "react";

export function WordWithLinks({
  word,
  dateAdded,
}: {
  word: string;
  dateAdded: Date;
}) {
  const [isOpen, setIsOpen] = useState(false);

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
              href={`https://translate.google.com/details?sl=en&tl=ru&text=${word}&op=translate`}
              rel="noreferrer"
            >
              google
            </a>
            ,{" "}
            <a
              target={"_blank"}
              href={`https://dictionary.cambridge.org/dictionary/english/${word}`}
              rel="noreferrer"
            >
              cam
            </a>
            ,{" "}
            <a
              target={"_blank"}
              href={`https://translate.yandex.ru/?source_lang=en&target_lang=ru&text=${word}`}
              rel="noreferrer"
            >
              ya
            </a>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}
