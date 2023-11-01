import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Boards from "./components/boards/Boards";
import Board from "./components/board/Board";
import MyErrorBoundary from "./components/errorAndLoading/ErrorBoundary";

function App() {
  return (
    <MyErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Boards />} />
            <Route path="board/:id" element={<Board />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MyErrorBoundary>
  );
}

export default App;
