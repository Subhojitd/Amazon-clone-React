import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  userInfo: [],
};

export const amazonSlice = createSlice({
  name: "amazon",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
        const item = state.products.find((item) => item.id === action.payload);
        item.quantity++;
    },
    decreaseQuantity: (state, action) => {
        const item = state.products.find((item) => item.id === action.payload);
        item.quantity===1?item.quantity=1:item.quantity--;
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    userSignOut: (state) => {
      state.userInfo = null;
    },
  },
});

export const { addToCart, deleteItem, resetCart,increaseQuantity,decreaseQuantity,setUserInfo,userSignOut } = amazonSlice.actions;
export default amazonSlice.reducer;
