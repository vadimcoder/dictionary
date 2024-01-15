import { Styleguide } from "../../Styleguide";
import { DB } from "../../db/db";

export function Dev() {
  return (
    <>
      <h1>Stats</h1>
      total rows: {DB.allRowsSorted.length}
      <h1>Colors</h1>
      <Styleguide />
    </>
  );
}
