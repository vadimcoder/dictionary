import { ForeignWord } from "../../components/ForeignWord/ForeignWord";
import { T_WORD } from "../../types/dictionary";

export function TrSimple({ word }: { word: T_WORD }) {
  return (
    <tr>
      <td>
        <ForeignWord word={word} />
      </td>
      <td>{word.transcription}</td>
      <td>{word.translation}</td>
    </tr>
  );
}
