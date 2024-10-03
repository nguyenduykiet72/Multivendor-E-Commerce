import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const place_order = createAsyncThunk(
  "cart/place_order",
  async ( { price, products,shipping_fee,items,shippingInfo,userId,navigate }) => {
    try {
        const { data } = await api.post('/home/order/place-order',{
            price,products,shipping_fee,items,shippingInfo,userId,navigate
        })       
        navigate('/payment',{
          state:{
            price: price + shipping_fee,
            items,
            orderId: data.orderId
        }})
         console.log(data);
    } catch (error) {
        console.log(error.response);
    }
  }
);

export const orderReducer = createSlice({
  name: "order",
  initialState: {
    myOrders: [],
    myOrder:{},
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {},
});

export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
