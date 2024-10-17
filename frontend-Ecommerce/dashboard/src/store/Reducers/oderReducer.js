import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_admin_orders = createAsyncThunk(
  "orders/get_admin_orders",
  async (
    { nextPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/admin/orders?page=${page}&&searchValue=${searchValue}&&nextPage=${nextPage}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_admin_order_detail = createAsyncThunk(
  "orders/get_admin_order_detail",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/order/detail/${orderId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderReducer = createSlice({
  name: "order",
  initialState: {
    successMessage: "",
    errorMessage: "",
    totalOrder: 0,
    order: {},
    myOrders: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_admin_orders.fulfilled, (state, { payload }) => {
      state.myOrders = payload.orders;
      state.totalOrder = payload.totalOrder;
    });

    builder.addCase(get_admin_order_detail.fulfilled, (state, { payload }) => {
      state.order = payload.order;
    })
  },
});

export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
