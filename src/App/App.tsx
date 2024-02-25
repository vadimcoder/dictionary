import { StrictMode } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { GlobalState } from "../GlobalState/GlobalState";
import { All } from "../pages/All";
import { Latest } from "../pages/Latest";
import { Quiz } from "../pages/Quiz";
import "./style.css";
import { Dev } from "../pages/Dev";
import { TabContent } from "../pages/All/TabContent";
import { Root } from "./Root";

export function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,

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

  return (
    <StrictMode>
      <GlobalState>
        <RouterProvider router={router} />
      </GlobalState>
    </StrictMode>
  );
}
