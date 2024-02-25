import "./style.css";
import { Link, Outlet, useMatch } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import { getTabValue } from "../../utils/utils";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TABS: string[] = [
  "noun",
  "adjective",
  "verb",
  "adverb",
  "preposition",
  "irregular-verbs",
] as const;

export function All() {
  const match = useMatch("/all/:path");
  const tabValue = getTabValue(TABS, match?.params?.path);

  return (
    <>
      <Tabs value={tabValue} aria-label="navigation-all">
        {TABS.map((name, index) => (
          <Tab
            key={name}
            label={name}
            {...a11yProps(index)}
            value={name}
            to={name}
            component={Link}
          />
        ))}
      </Tabs>

      <Outlet />
    </>
  );
}
