import { Link } from "react-router-dom";
import "./style.css";

export const GLOBAL_NAV_ARIA = {
  all: { tabId: "global-nav-tab-all", contentId: "global-nav-tab-all-content" },
  latest: {
    tabId: "global-nav-tab-latest",
    contentId: "global-nav-tab-latest-content",
  },
  quiz: {
    tabId: "global-nav-tab-quiz",
    contentId: "global-nav-tab-quiz-content",
  },
  dev: { tabId: "global-nav-tab-dev", contentId: "global-nav-tab-dev-content" },
} as const;

export function TopMenu() {
  return (
    <div className={"TopMenu"}>
      {Object.entries(GLOBAL_NAV_ARIA).map(([name, { tabId, contentId }]) => (
        <Link id={tabId} aria-controls={contentId} key={name} to={`/${name}`}>
          {name}
        </Link>
      ))}
    </div>
  );
}
