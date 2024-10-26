import authReducer from "./Reducers/authReducer";
import bannerReducer from "./Reducers/bannerReducer";
import categoryReducer from "./Reducers/categoryReducer";
import chatReducer from "./Reducers/chatReducer";
import dashboardReducer from "./Reducers/dashboardReducer";
import orderReducer from "./Reducers/oderReducer";
import paymentReducer from "./Reducers/paymentReducer";
import productReducer from "./Reducers/productReducer";
import sellerReducer from "./Reducers/sellerReducer";

const rootReducer = {
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  seller: sellerReducer,
  chat: chatReducer,
  order: orderReducer,
  payment: paymentReducer,
  dashboard: dashboardReducer,
  banner: bannerReducer,
};

export default rootReducer;
