import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: null,
  fullName: null,
  cartData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.access_token = null;
      state.fullName = null;
      state.cartData = null;
      localStorage.removeItem("access_token_test");
    },
    loginUser: (state, action) => {
      state.access_token = action.payload.access_token;
      state.fullName = action.payload.fullName;
      localStorage.setItem("access_token_test", action.payload.access_token);
    },
    setCartData: (state, action) => {
      state.cartData = action.payload.cartData;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser, setCartData } = userSlice.actions;

export default userSlice.reducer;
