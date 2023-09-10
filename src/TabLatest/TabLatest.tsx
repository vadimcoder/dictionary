import { LatestSelector } from "./LatestSelector/LatestSelector";
import { LatestList } from "./LatestList/LatestList";

export function TabLatest() {
  return (
    <div className={"TabLatest"}>
      <LatestSelector />

      <LatestList />
    </div>
  );
}
