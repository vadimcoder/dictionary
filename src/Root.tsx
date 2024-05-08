import { StrictMode } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { GlobalState } from "./GlobalState/GlobalState";
import { All } from "./tabs/All";
import { Latest } from "./tabs/Latest";
import { Quiz } from "./tabs/Quiz";
import "./components/App/style.css";
import { Dev } from "./tabs/Dev";
import { TabContent } from "./tabs/All/TabContent";
import { App } from "./components/App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "all",
        element: <All />,
        children: [
          {
            path: "noun",
            element: <TabContent groupName={"noun"} />,
          },
          {
            path: "adjective",
            element: <TabContent groupName={"adjective"} />,
          },
          {
            path: "verb",
            element: <TabContent groupName={"verb"} />,
          },
          {
            path: "adverb",
            element: <TabContent groupName={"adverb"} />,
          },
          {
            path: "preposition",
            element: <TabContent groupName={"preposition"} />,
          },
          {
            path: "conjunction",
            element: <TabContent groupName={"conjunction"} />,
          },
          {
            path: "irregular-verbs",
            element: <TabContent groupName={"irregular-verbs"} />,
          },
          {
            path: "*",
            element: <Navigate to={"noun"} />,
          },
          {
            index: true,
            element: <Navigate to={"noun"} />,
          },
        ],
      },
      {
        path: "latest",
        element: <Latest />,
      },
      {
        path: "quiz",
        element: <Quiz />,
      },
      {
        path: "dev",
        element: <Dev />,
      },
      {
        path: "*",
        element: <Navigate to={"all"} />,
      },
      {
        index: true,
        element: <Navigate to={"all"} />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/all"} />,
  },
]);

export function Root() {
  return (
    <StrictMode>
      <GlobalState>
        <RouterProvider router={router} />
      </GlobalState>
    </StrictMode>
  );
}
