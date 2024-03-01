import "./style/index.css";
import "./config/mui-material";
import * as ReactDOMClient from "react-dom/client";
import { Root } from "./Root";

ReactDOMClient.createRoot(document.querySelector("#app")!).render(<Root />);
