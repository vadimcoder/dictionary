import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { All } from "./All";
import { Latest } from "./Latest/Latest";
import { NavBar } from "./NavBar/NavBar";
import { GlobalState } from "./GlobalState/GlobalState";

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
