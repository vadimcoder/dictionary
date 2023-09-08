import "./style.css";
import { T_ROW } from "../types";

export function ForeignWord({ row }: { row: T_ROW }) {
  const word = row[0];
  const dateAdded = row[3];

  return (
    <a
      className={"ForeignWord"}
      target={"_blank"}
      href={`https://translate.google.com/details?sl=en&tl=ru&text=${word}&op=translate`}
      rel="noreferrer"
      title={dateAdded.toString()}
    >
      {word}
    </a>
  );
}
