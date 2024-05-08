import "./style.css";
import { WordContainer } from "../WordContainer";
import { T_ROW } from "../../db/types";
import { useGlobalState } from "../../GlobalState/GlobalState";

export function Tr({
  row,
  isBorderTop,
  isBorderBottom,
}: {
  row: T_ROW;
  isBorderTop?: boolean;
  isBorderBottom?: boolean;
}) {
  const [globalState, setGlobalState] = useGlobalState();

  function isChecked(): boolean {
    return (
      globalState.selectedRows.find(
        (row$) => row$.wordSet.word === row.wordSet.word,
      ) !== undefined
    );
  }

  return (
    <tr
      className={`row ${isBorderTop ? "row_border-top" : isBorderBottom ? "row_border-bottom" : ""}`}
    >
      <td>
        <div style={{ paddingInlineEnd: "10px" }}>
          {/*<Checkbox*/}
          {/*  checked={isChecked()}*/}
          {/*  onChange={(_event, checked) => {*/}
          {/*    if (checked) {*/}
          {/*      setGlobalState((state) => {*/}
          {/*        return {*/}
          {/*          ...state,*/}
          {/*          selectedRows: [...state.selectedRows, row],*/}
          {/*        };*/}
          {/*      });*/}
          {/*    } else {*/}
          {/*    }*/}
          {/*  }}*/}
          {/*  size="small"*/}
          {/*/>*/}
        </div>
      </td>
      <td {...(row.irregularVerb && { colSpan: 2 })}>
        <WordContainer row={row} />
      </td>
      {!row.irregularVerb && (
        <td>
          <span className={"transcription"}>{row.wordSet.transcription}</span>
        </td>
      )}
      <td>
        <span className={"translation"}>{row.translation}</span>
      </td>
    </tr>
  );
}
