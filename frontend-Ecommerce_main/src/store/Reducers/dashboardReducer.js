import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_dashboard_index_data = createAsyncThunk(
  "dashboard/get_dashboard_index_data",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/customer/get-dashboard-data/${userId}`);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const dashboardReducer = createSlice({
  name: "dashboard",
  initialState: {
    recentOrder: [],
    errorMessage: "",
    successMessage: "",
    totalOrder: 0,
    pendingOrder: 0,
    canceledOrder: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
  builder
    .addCase(get_dashboard_index_data.fulfilled, (state, { payload }) => {
      state.totalOrder = payload.totalOrder;
      state.pendingOrder = payload.pendingOrder;
      state.canceledOrder = payload.canceledOrder;
      state.recentOrder = payload.recentOrder;
    })
},
});

export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;
