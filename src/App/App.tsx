import "./style.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GlobalState } from "../GlobalState/GlobalState";
import { NavBar } from "../NavBar/NavBar";
import { All } from "../TabAll/All";
import { TabLatest } from "../TabLatest/TabLatest";
import { TabQuiz } from "../TabQuiz/TabQuiz";

export function App() {
  return (
    <BrowserRouter>
      <GlobalState>
        <div className={"App"}>
          <NavBar />

          <main>
            <Routes>
              <Route path={"/"} Component={All} />
              <Route path={"/latest"} Component={TabLatest} />
              <Route path={"/quiz"} Component={TabQuiz} />

              <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
          </main>
        </div>
      </GlobalState>
    </BrowserRouter>
  );
}
