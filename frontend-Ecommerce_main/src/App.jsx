import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Card from "./pages/Card";
import Shipping from "./pages/Shipping";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shops" element={<Shop />} />
        <Route path="/card" element={<Card />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/product/details/:slug" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
