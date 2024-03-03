import { Button } from "@mui/material";
import { LatestSelector } from "./LatestSelector/LatestSelector";
import { LatestList } from "./LatestList";
import { GLOBAL_NAV_ARIA } from "../../NavBar";
import "./LatestPanel.css";
import { useShuffle } from "./useShuffle";

export function Latest() {
  const [rows, shuffleRows] = useShuffle();

  return (
    <div
      id={GLOBAL_NAV_ARIA.latest.contentId}
      aria-labelledby={GLOBAL_NAV_ARIA.latest.tabId}
    >
      <div className={"LatestPanel"}>
        <LatestSelector />

        <Button
          onClick={shuffleRows}
          variant="contained"
          className={"LatestPanel__button"}
        >
          Shuffle rows
        </Button>
      </div>

      <LatestList rows={rows} />
    </div>
  );
}
