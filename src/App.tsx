import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useClientWidth from "./utils/useClientWidth.util";
import CarManage from "./pages/CarManage";

function App() {
  useClientWidth();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/car-manage" element={<CarManage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
