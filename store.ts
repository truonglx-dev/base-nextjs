import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import authSlice from './features/auth/userSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authSlice,
    },
  });

const store = makeStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
