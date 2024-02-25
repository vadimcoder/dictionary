import "./style.css";
import { Link, useLocation } from "react-router-dom";
import { DirSwitcher } from "./DirSwitcher/DirSwitcher";
import { useTheme } from "@mui/material/styles";
import { Tab, Tabs } from "@mui/material";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function NavBar() {
  const { pathname } = useLocation();
  const theme = useTheme();

  return (
    <nav style={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
      <div>
        <Tabs value={pathname} aria-label="navigation">
          <Tab
            label="All"
            {...a11yProps(0)}
            value={"/"}
            to={"/"}
            component={Link}
          />
          <Tab
            label="Latest"
            {...a11yProps(1)}
            value={"/latest"}
            to={"/latest"}
            component={Link}
          />
          <Tab
            label="Quiz"
            {...a11yProps(2)}
            value={"/quiz"}
            to={"/quiz"}
            component={Link}
          />
          <Tab
            label="Dev"
            {...a11yProps(3)}
            value={"/dev"}
            to={"/dev"}
            component={Link}
          />
        </Tabs>
      </div>

      <DirSwitcher />
    </nav>
  );
}
