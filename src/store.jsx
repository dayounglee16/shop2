import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice";

const cart = createSlice({
  name: "cart",
  initialState: [
    //배열, 객체 상관없이 사용 가능
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    addCount(state, action) {
      const 번호 = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state[번호].count++;
    },
    minus(state, action) {
      const 번호 = state.findIndex((a) => {
        //배열에 있던 하나하나의 값
        return a.id === action.payload;
      });
      state[번호].count--;
    },
    addItem(state, action) {
      state.includes((num) => {
        if (num.id === action.payload) {
          return alert("동일한 상품이 있습니다");
        } else {
          return state.push(action.payload);
        }
      });
    },

    removeItem(state, action) {
      state.pop(action.payload);
    },
  },
});

export const { addCount, minus, addItem, removeItem, numbers } = cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
  },
});
