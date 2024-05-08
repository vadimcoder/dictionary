import "./style.css";
import { DirSwitcher } from "./DirSwitcher/DirSwitcher";
import { TopMenu } from "./TopMenu";

export function NavBar() {
  return (
    <nav>
      <TopMenu />

      <DirSwitcher />
    </nav>
  );
}
