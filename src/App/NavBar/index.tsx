import "./style.css";
import { Link, useMatch } from "react-router-dom";
import { DirSwitcher } from "./DirSwitcher/DirSwitcher";
import { Tab, Tabs } from "@mui/material";
import { getTabValue } from "../../utils/utils";

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

const URLS = Object.keys(GLOBAL_NAV_ARIA);

export function NavBar() {
  const match = useMatch("/:rootUrl/*");
  const tabValue = getTabValue(URLS, match?.params?.rootUrl);

  return (
    <>
      <div>
        <Tabs value={tabValue} aria-label="global site navigation">
          {Object.entries(GLOBAL_NAV_ARIA).map(
            ([name, { tabId, contentId }]) => (
              <Tab
                id={tabId}
                aria-controls={contentId}
                key={name}
                label={name}
                value={name}
                to={`/${name}`}
                component={Link}
              />
            ),
          )}
        </Tabs>
      </div>

      <DirSwitcher />
    </>
  );
}
