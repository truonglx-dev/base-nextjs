import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeConfig {
  theme: string | null;
}

const initialState: ThemeConfig = {
  theme: typeof window !== 'undefined' ? localStorage.getItem('theme') : 'light',
};

export const authenticateSlice = createSlice({
  name: 'authenticate',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
  },
});

const { actions, reducer } = authenticateSlice;
export const { setTheme } = actions;
export default reducer;
