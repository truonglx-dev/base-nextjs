import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import authService from 'api/authService';

interface User {
  email: string;
  id: string;
}
interface AuthenticateState {
  accessToken: string | null;
  user: User | undefined;
  loading: boolean;
}

const initialState: AuthenticateState = {
  accessToken: typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '',
  loading: false,
  user: undefined,
};

export const login = createAsyncThunk('users/login', async (params: any) => {
  const login = await authService.login(params);
  return login;
});

export const getMe = createAsyncThunk('users/getMe', async () => {
  const me = await authService.me();
  return me;
});

export const authenticateSlice = createSlice({
  name: 'authenticate',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    removeToken: (state) => {
      state.accessToken = '';
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = { email: action.payload.email, id: action.payload.id };
    },
    logOut: (state) => {
      state.accessToken = '';
      state.user = undefined;
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
    },
    setLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.user = undefined;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = { email: action.payload.data.user.email, id: action.payload.data.user.id };
      state.accessToken = action.payload.data.token;
      localStorage.setItem('accessToken', action.payload.data.token);
      localStorage.setItem(
        'user',
        JSON.stringify({ email: action.payload.data.user.email, id: action.payload.data.user.id })
      );
    });

    builder.addCase(getMe.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getMe.rejected, (state, action) => {
      state.user = undefined;
      state.loading = false;
      state.accessToken = '';
    });

    builder.addCase(getMe.fulfilled, (state, action) => {
      state.loading = false;
      state.user = { email: action.payload.data.user.email, id: action.payload.data.user.id };
    });
  },
});

const { actions, reducer } = authenticateSlice;
export const { setToken, removeToken, setUser, logOut, setLoading } = actions;
export default reducer;
