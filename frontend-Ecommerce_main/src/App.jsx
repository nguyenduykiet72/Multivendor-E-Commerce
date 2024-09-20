import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Card from "./pages/Card";
import Shipping from "./pages/Shipping";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shops" element={<Shop />} />
        <Route path="/card" element={<Card />} />
        <Route path="/shipping" element={<Shipping />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
