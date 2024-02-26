import "./style.css";
import { Link, Outlet, useMatch } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import { getTabValue } from "../../utils/utils";
import { GLOBAL_NAV_ARIA } from "../../components/NavBar/NavBar";

const TABS: string[] = [
  "noun",
  "adjective",
  "verb",
  "adverb",
  "preposition",
  "irregular-verbs",
] as const;

export const ALL_NAV_ARIA = {
  tabId: "all-navigation-tab-",
  contentId: "all-navigation-tab-content-",
};

export function All() {
  const match = useMatch("/all/:path");
  const tabValue = getTabValue(TABS, match?.params?.path);

  return (
    <div
      id={GLOBAL_NAV_ARIA.all.contentId}
      aria-labelledby={GLOBAL_NAV_ARIA.all.tabId}
    >
      <Tabs value={tabValue} aria-label="all-navigation">
        {TABS.map((name) => (
          <Tab
            id={`${ALL_NAV_ARIA.tabId}${name}`}
            aria-controls={`${ALL_NAV_ARIA.contentId}${name}`}
            key={name}
            label={name}
            value={name}
            to={name}
            component={Link}
          />
        ))}
      </Tabs>

      <Outlet />
    </div>
  );
}
