import "./style.css";
import { NavLink } from "react-router-dom";
import { DirSwitcher } from "./DirSwitcher/DirSwitcher";

export function NavBar() {
  return (
    <nav>
      <NavLink to={"/"}>All</NavLink>
      <NavLink to={"/latest"}>Latest</NavLink>
      <NavLink to={"/quiz"}>Quiz</NavLink>
      <DirSwitcher />
    </nav>
  );
}
