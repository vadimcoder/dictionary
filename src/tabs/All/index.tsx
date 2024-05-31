import "./style.css";
import { NavLink, Outlet } from "react-router-dom";

import { GLOBAL_NAV_ARIA } from "../../components/NavBar/TopMenu";

const TABS: string[] = [
  "noun",
  "adjective",
  "verb",
  "adverb",
  "preposition",
  "conjunction",
  "irregular-verbs",
] as const;

export const ALL_NAV_ARIA = {
  tabId: "all-navigation-tab-",
  contentId: "all-navigation-tab-content-",
};

export function All() {
  return (
    <div
      id={GLOBAL_NAV_ARIA.all.contentId}
      aria-labelledby={GLOBAL_NAV_ARIA.all.tabId}
    >
      <div className={"main-navigation"}>
        {TABS.map((name) => (
          <NavLink
            id={`${ALL_NAV_ARIA.tabId}${name}`}
            aria-controls={`${ALL_NAV_ARIA.contentId}${name}`}
            key={name}
            to={name}
          >
            {name}
          </NavLink>
        ))}
      </div>

      <Outlet />
    </div>
  );
}
