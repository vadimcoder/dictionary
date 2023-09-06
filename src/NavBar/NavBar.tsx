import "./style.css";
import { NavLink } from "react-router-dom";
import { DirSwitcher } from "./DirSwitcher/DirSwitcher.tsx";

export function NavBar() {
  return (
    <nav>
      <NavLink to={"/"}>All</NavLink>
      <NavLink to={"/latest"}>Latest</NavLink>
      <DirSwitcher />
    </nav>
  );
}
