import React, { useState } from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes";

const App = () => {
  const publicRoutesPath = publicRoutes;
  const [allRoutes, setAllRoutes] = useState([...publicRoutesPath]);
  return <Router allRoutes={allRoutes} />;
};

export default App;
