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
      const 번호 = state.findIndex(a => {
        return a.id === action.payload;
      });
      state[번호].count++;
    },
    minus(state, action) {
      const 번호 = state.findIndex(a => {
        //배열에 있던 하나하나의 값
        return a.id === action.payload;
      });
      state[번호].count--;
    },
    addItem(state, action) {
      /**
       * 아까 말했듯이 includes에서 객체끼리는 비교가 불가능.
       * 그래서 각 객체에 있는 id를 비교하는데, filter나 find로 사용해야함.
       */
      const 배열에있는지확인 = state.filter(num => {
        return num.id === action.payload.id; // map과 filter는 return 필수(배열을 반환하기 때문)
      });

      /**
       * alert나 push메서드는 뭔가를 반환하는게 아니라,
       * alert: 안내문을 띄워라
       * push: 배열에 넣어라
       * 이런 "행동"적인 부분이에요. 그래서 return은 써주지 않아도됨.
       */
      if (배열에있는지확인.length) {
        alert("동일한 상품이 있습니다");
      } else {
        state.push(action.payload);
      }
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
