import "./style.css";
import { useEffect, useState } from "react";

export function DirSwitcher() {
  const [dir, setDir] = useState("ltr");

  useEffect(() => {
    document.dir = dir;
  }, [dir]);

  function onClick() {
    setDir(dir === "ltr" ? "rtl" : "ltr");
  }

  return (
    <div className="dirSwitcher">
      <button onClick={onClick}>{dir}</button>
    </div>
  );
}
