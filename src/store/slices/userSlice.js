import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  id: null,
  email: null,
  name: null,
  isLoggedIn: false,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      const token = action.payload;
      try {
        const decodedToken = jwtDecode(token);
        state.id = decodedToken.data.id;
        state.email = decodedToken.data.email;
        state.name = decodedToken.data.name;
        state.isLoggedIn = true;
        state.token = token;
      } catch (error) {
        console.error("Invalid token:", error);
      }
    },
    setToken(state, action) {
      const token = action.payload;
      try {
        const decodedToken = jwtDecode(token);
        state.id = decodedToken.data.id;
        state.email = decodedToken.data.email;
        state.name = decodedToken.data.name;
        state.isLoggedIn = true;
        state.token = token;
      } catch (error) {
        console.error("Invalid token:", error);
      }
    },
    register(state, action) {
      const token = action.payload;
      try {
        const decodedToken = jwtDecode(token);
        state.id = decodedToken.data.id;
        state.email = decodedToken.data.email;
        state.name = decodedToken.data.name;
        state.isLoggedIn = true;
        state.token = token;
      } catch (error) {
        console.error("Invalid token:", error);
      }
    },
    logout(state) {
      state.id = null;
      state.email = null;
      state.name = null;
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const { login, register, logout } = userSlice.actions;
export default userSlice.reducer;
