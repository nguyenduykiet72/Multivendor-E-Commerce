import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CategoryShop from "./pages/CategoryShop";
import SearchProduct from "./components/SearchProduct";
import Payment from "./pages/Payment";
import UserDashboard from "./pages/UserDashboard";
import ProtectUser from "./utils/ProtectUser";
import Index from "./components/dashboard/Index";
import Orders from "./components/dashboard/Orders";
import ChangePassword from "./components/dashboard/ChangePassword";
import Wishlist from "./components/dashboard/Wishlist";
import OrderDetail from "./components/dashboard/OrderDetail";
import Chat from "./components/dashboard/Chat";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { get_category } from "./store/Reducers/homeReducer";
import ConfirmOrder from "./pages/ConfirmOrder";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_category());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shops" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/products?" element={<CategoryShop />} />
        <Route path="/products/search?" element={<SearchProduct />} />
        <Route path="/product/details/:slug" element={<Detail />} />
        <Route path="/order/confirm?" element={<ConfirmOrder />} />

        <Route path="/dashboard" element={<ProtectUser />}>
          <Route path="" element={<UserDashboard />}>
            <Route path="" element={<Index />} />
            <Route path="my-orders" element={<Orders />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="my-wishlist" element={<Wishlist />} />
            <Route path="order/details/:orderId" element={<OrderDetail />} />
            <Route path="chat" element={<Chat />} />
            <Route path="chat/:sellerId" element={<Chat />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
