import { LatestSelector } from "./LatestSelector/LatestSelector";
import { LatestList } from "./LatestList";
import { GLOBAL_NAV_ARIA } from "../../NavBar";

export function Latest() {
  return (
    <div
      id={GLOBAL_NAV_ARIA.latest.contentId}
      aria-labelledby={GLOBAL_NAV_ARIA.latest.tabId}
    >
      <LatestSelector />

      <LatestList />
    </div>
  );
}
