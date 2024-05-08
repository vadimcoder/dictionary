import { Styleguide } from "../../components/Styleguide";
import { DB } from "../../db/db";

import { GLOBAL_NAV_ARIA } from "../../components/NavBar/TopMenu";

export function Dev() {
  return (
    <div
      id={GLOBAL_NAV_ARIA.dev.contentId}
      aria-labelledby={GLOBAL_NAV_ARIA.dev.tabId}
    >
      <h1>Stats</h1>
      total rows: {DB.flatSorted.length}
      <h1>Colors</h1>
      <Styleguide />
    </div>
  );
}
