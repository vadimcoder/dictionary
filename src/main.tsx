import "./style.css";
import * as ReactDOMClient from "react-dom/client";
import { App } from "./App.tsx";

ReactDOMClient.createRoot(document.querySelector("#app")!).render(<App />);
