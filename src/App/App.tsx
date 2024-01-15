import { StrictMode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GlobalState } from "../GlobalState/GlobalState";
import { NavBar } from "../components/NavBar/NavBar";
import { All } from "../pages/All/All";
import { Latest } from "../pages/Latest";
import { Quiz } from "../pages/Quiz";
import "./style.css";
import { Dev } from "../pages/Dev";

export function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <GlobalState>
          <div className={"App"}>
            <NavBar />

            <main>
              <Routes>
                <Route path={"/"} Component={All} />
                <Route path={"/latest"} Component={Latest} />
                <Route path={"/quiz"} Component={Quiz} />
                <Route path={"/dev"} Component={Dev} />

                <Route path="*" element={<Navigate to={"/"} />} />
              </Routes>
            </main>
          </div>
        </GlobalState>
      </BrowserRouter>
    </StrictMode>
  );
}
