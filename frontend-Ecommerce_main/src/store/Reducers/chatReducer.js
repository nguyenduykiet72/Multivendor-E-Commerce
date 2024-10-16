import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_chat_seller = createAsyncThunk(
  "chat/add_chat_seller",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/chat/customer/add-customer-seller",
        info
      );
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const send_messages = createAsyncThunk(
  "chat/send_messages",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/chat/customer/send-message-to-seller",
        info
      );
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const chatReducer = createSlice({
  name: "chat",
  initialState: {
    my_friends: [],
    fr_messages: [],
    currentFr: "",
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    updateMessage:(state, { payload }) => {
      state.fr_messages = [...state.fr_messages, payload];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_chat_seller.fulfilled, (state, { payload }) => {
        state.fr_messages = payload.messages;
        state.currentFr = payload.currentFriend;
        state.my_friends = payload.MyFriends;
      })

      .addCase(send_messages.fulfilled, (state, { payload }) => {
        let tempFriends = state.my_friends;
        let index = tempFriends.findIndex(
          (f) => f.fdId === payload.message.receiverId
        );
        while (index > 0) {
          let temp = tempFriends[index];
          tempFriends[index] = tempFriends[index - 1];
          tempFriends[index - 1] = temp;
          index--;
        }
        state.my_friends = tempFriends;
        state.fr_messages = [...state.fr_messages, payload.message];
        state.successMessage = "Message sent successfully";
      });
  },
});

export const { messageClear,updateMessage } = chatReducer.actions;
export default chatReducer.reducer;
