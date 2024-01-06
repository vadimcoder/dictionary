import { LatestSelector } from "./LatestSelector/LatestSelector";
import { LatestListSection } from "./LatestListSection";

export function TabLatest() {
  return (
    <div className={"TabLatest"}>
      <LatestSelector />

      <LatestListSection />
    </div>
  );
}
