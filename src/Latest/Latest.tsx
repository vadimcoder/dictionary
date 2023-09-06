import { LatestSelector } from "./LatestSelector/LatestSelector.tsx";
import { LatestList } from "./LatestList.tsx";

export function Latest() {
  return (
    <>
      <LatestSelector />

      <LatestList />
    </>
  );
}
