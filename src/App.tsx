import "./global-style/index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { All } from "./TabAll/All";
import { TabLatest } from "./TabLatest/TabLatest/TabLatest";
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
            <Route path={"/latest"} Component={TabLatest} />

            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </main>
      </GlobalState>
    </BrowserRouter>
  );
}
