import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  name: string;
  email: string;
  password: string;
  isPhoneConfirmed: boolean;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    password: "",
    isPhoneConfirmed: false,
  },
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isPhoneConfirmed = false;
    },
    setPhoneConfirmed: (state) => {
      state.isPhoneConfirmed = true;
    },
  },
});

export const { setUser, setPhoneConfirmed } = userSlice.actions;
export default userSlice.reducer;
