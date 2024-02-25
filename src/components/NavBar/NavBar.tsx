import "./style.css";
import { Link, useMatch } from "react-router-dom";
import { DirSwitcher } from "./DirSwitcher/DirSwitcher";
import { useTheme } from "@mui/material/styles";
import { Tab, Tabs } from "@mui/material";
import { getTabValue } from "../../utils/utils";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TABS: string[] = ["all", "latest", "quiz", "dev"] as const;

export function NavBar() {
  const theme = useTheme();
  const match = useMatch("/:rootUrl/*");
  const tabValue = getTabValue(TABS, match?.params?.rootUrl);

  return (
    <nav style={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
      <div>
        <Tabs value={tabValue} aria-label="navigation">
          {TABS.map((name, index) => (
            <Tab
              key={name}
              label={name}
              {...a11yProps(index)}
              value={name}
              to={`/${name}`}
              component={Link}
            />
          ))}
        </Tabs>
      </div>

      <DirSwitcher />
    </nav>
  );
}
