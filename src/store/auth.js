import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  authIsConnected: false,
  firstName: "",
  lastName: "",
  uid: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      const {firstName, lastName, uid, authIsConnected} = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.uid = uid;
      state.authIsConnected = authIsConnected;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
