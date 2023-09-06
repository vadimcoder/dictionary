import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { All } from "./All.tsx";
import { Latest } from "./Latest/Latest.tsx";
import { NavBar } from "./NavBar/NavBar.tsx";
import { GlobalState } from "./GlobalState/GlobalState.tsx";

export function App() {
  return (
    <BrowserRouter>
      <GlobalState>
        <NavBar />

        <main>
          <Routes>
            <Route path={"/"} Component={All} />
            <Route path={"/latest"} Component={Latest} />

            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </main>
      </GlobalState>
    </BrowserRouter>
  );
}

// const Context1 = createContext();
//
// function Component1() {
//   const context1 = useContext(Context1);
//
//   console.log("context1", context1);
//
//   return (
//     <>
//       <div>Component1: {context1[0]}</div>
//     </>
//   );
// }
//
// function Component2() {
//   const context1 = useContext(Context1);
//
//   return (
//     <>
//       <div>Component2: {context1[0]}</div>
//     </>
//   );
// }
//
// function Component3() {
//   const context1 = useContext(Context1);
//
//   return (
//     <>
//       <button
//         onClick={() => {
//           context1[1]("rrr");
//         }}
//       >
//         123
//       </button>
//       {context1[0]}
//     </>
//   );
// }
//
// export function App() {
//   const globalState = useState("sdf");
//
//   return (
//     <Context1.Provider value={globalState}>
//       <Fragment>
//         <Component1 />
//         <Component2 />
//         <Component3 />
//       </Fragment>
//     </Context1.Provider>
//   );
// }
