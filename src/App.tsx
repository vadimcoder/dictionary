import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { All } from "./All";
import { Latest } from "./Latest/Latest";
import { NavBar } from "./NavBar/NavBar";
import { GlobalState } from "./GlobalState/GlobalState";
// import { getAllRows, getDb } from "./db/helpers";

export function App() {
  return (
    <BrowserRouter>
      <GlobalState>
        <NavBar />

        <main>
          <Routes>
            <Route path={"/"} Component={All} />
            <Route path={"/latest"} Component={Latest} />

            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </main>
      </GlobalState>
    </BrowserRouter>
  );
}

// const rows = getAllRows();
// console.log("rows", rows);
// debugger;
//
// rows[0][0] = rows[0][0] + "0";
// rows[1][0] = rows[1][0] + "1";
// rows[2][0] = rows[2][0] + "2";
// rows[3][0] = rows[3][0] + "3";
//
// const rows2 = getAllRows();
// console.log("rows2", rows2);
// debugger;
//
// console.log("db", getDb());
// debugger;
