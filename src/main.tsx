import "./style/index.css";
import "./config/mui-material";
import * as ReactDOMClient from "react-dom/client";
import { App } from "./App/App";

ReactDOMClient.createRoot(document.querySelector("#app")!).render(<App />);
