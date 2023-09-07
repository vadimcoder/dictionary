import "./style.css";
import * as ReactDOMClient from "react-dom/client";
import { App } from "./App";

ReactDOMClient.createRoot(document.querySelector("#app")!).render(<App />);
