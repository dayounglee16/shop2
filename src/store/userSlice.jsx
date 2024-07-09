import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducers: {
    changeName(state) {
      state.name = "Lee";
    },
    increase(state, action) {
      state.age += action.payload; //메세지에 보내는 택배, 화물 이런뜻
    },
  },
});

export const { changeName, increase } = user.actions; //오른쪽 자료를 변수로 내보내기

export default user;
