import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, role: null },
  reducers: {
    updateState: (state, { payload }) => {
      const { role, token } = payload;
      Cookies.set("role", role, { expires: 30 });
      Cookies.set("token", token, { expires: 30 });
      state.token = token;
      state.role = role;
    },
  },
});
export const { updateState } = authSlice.actions;
export default authSlice.reducer;
