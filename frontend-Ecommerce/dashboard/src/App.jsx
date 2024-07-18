import React, { useEffect, useState } from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes";
import { getRoutes } from "./router/routes";

const App = () => {
  const publicRoutesPath = publicRoutes;
  const [allRoutes, setAllRoutes] = useState([...publicRoutesPath]);
  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes([...allRoutes,routes]);
  }, []);
  return <Router allRoutes={allRoutes} />;
};

export default App;
