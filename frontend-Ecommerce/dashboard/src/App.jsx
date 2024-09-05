import React, { useEffect, useState } from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes";
import { getRoutes } from "./router/routes";
import { useDispatch, useSelector } from "react-redux";
import { get_user_info } from "./store/Reducers/authReducer";

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const publicRoutesPath = publicRoutes;
  const [allRoutes, setAllRoutes] = useState([...publicRoutesPath]);
  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes([...allRoutes, routes]);
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(get_user_info());
    }
  }, [token]);
  return <Router allRoutes={allRoutes} />;
};

export default App;
