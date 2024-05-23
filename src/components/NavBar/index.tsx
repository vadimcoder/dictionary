import "./style.css";
import { DirSwitcher } from "./DirSwitcher/DirSwitcher";
import { TopMenu } from "./TopMenu";
import { Timer } from "../Timer";

export function NavBar() {
  return (
    <nav>
      <TopMenu />

      <Timer />

      <DirSwitcher />
    </nav>
  );
}
