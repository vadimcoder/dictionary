import { NavBar } from "./NavBar";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export function App() {
  const theme = useTheme();

  return (
    <div className={"App"}>
      <nav style={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
        <NavBar />
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
