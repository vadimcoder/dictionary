import "./style.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GlobalState } from "../GlobalState/GlobalState";
import { NavBar } from "../components/NavBar/NavBar";
import { All } from "../components/TabAll/All";
import { TabLatest } from "../components/TabLatest/TabLatest";
import { TabQuiz } from "../components/TabQuiz/TabQuiz";

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
