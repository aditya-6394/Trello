import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Boards from "./components/boards/Boards";
import Board from "./components/board/Board";
import BoardsContextProvider from "./components/boards/BoardsContextProvider";
import ListContextProvider from "./components/lists/ListsContextProvider";
import CardContextProvider from "./components/cards/CardContextProvider";
// import ChecklistContextProvider from "./components/checklists/ChecklistContextProvider";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <BoardsContextProvider>
        <ListContextProvider>
          <CardContextProvider>
            {/* <ChecklistContextProvider> */}
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Boards />} />
                  <Route path="board/:id" element={<Board />} />
                </Route>
              </Routes>
            {/* </ChecklistContextProvider> */}
          </CardContextProvider>
        </ListContextProvider>
      </BoardsContextProvider>
    </BrowserRouter>
  );
}

export default App;
