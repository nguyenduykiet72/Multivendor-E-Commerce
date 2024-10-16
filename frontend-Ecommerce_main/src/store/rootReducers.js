import authReducer from "./Reducers/authReducer";
import cartReducer from "./Reducers/cartReducer";
import chatReducer  from "./Reducers/chatReducer";
import dashboardReducer from "./Reducers/dashboardReducer";
import homeReducer from "./Reducers/homeReducer";
import orderReducer from "./Reducers/orderReducer";

const rootReducer = {
  home: homeReducer,
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
  dashboard: dashboardReducer,
  chat: chatReducer,
};

export default rootReducer;
