import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Boards from "./components/boards/Boards";
import Board from "./components/board/Board";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Boards />} />
          <Route path="board/:id" element={<Board />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
