import "./style.css";
import { getAllRows, T_ROW_WITH_ASSOCIATIONS } from "../../../db/helpers";
import orderBy from "lodash.orderby";
import { LatestList } from "./LatestList";

function getSortedRows(
  rows: T_ROW_WITH_ASSOCIATIONS[],
): T_ROW_WITH_ASSOCIATIONS[] {
  return orderBy(rows, (row: T_ROW_WITH_ASSOCIATIONS) => row.row[3], "desc");
}

export function LatestListSection() {
  const rows: T_ROW_WITH_ASSOCIATIONS[] = getAllRows();

  const sortedRows = getSortedRows(rows);

  return <LatestList sortedRows={sortedRows} />;
}
