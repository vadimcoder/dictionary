import { LatestSelector } from "./LatestSelector/LatestSelector";
import { LatestList } from "./LatestList";
import "./LatestPanel.css";
import { useShuffle } from "./useShuffle";
import { GLOBAL_NAV_ARIA } from "../../components/NavBar/TopMenu";

export function Latest() {
  const [rows, shuffleRows] = useShuffle();

  return (
    <div
      id={GLOBAL_NAV_ARIA.latest.contentId}
      aria-labelledby={GLOBAL_NAV_ARIA.latest.tabId}
    >
      <div className={"LatestPanel"}>
        <button
          type="button"
          onClick={shuffleRows}
          className={"LatestPanel__shuffle-rows"}
        >
          Shuffle rows
        </button>

        <LatestSelector />
      </div>

      <LatestList rows={rows} />
    </div>
  );
}
