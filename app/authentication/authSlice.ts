import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  
}

const initialState: AuthState = {
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase('persist/REHYDRATE', (state, action: any) => {
      if (action.payload?.auth) {
        state.token = action.payload.auth.token || null;
        state.isLoggedIn = Boolean(action.payload.auth.token);
      }
    });
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
