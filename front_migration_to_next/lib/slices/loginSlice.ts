import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../../store';
import { getLoginData, getTestData, getSnsLoginData } from '../api/login';
import { ILoginUserData, ISnsUserData } from '../../interfaces';

const hydrate = createAction<RootState>(HYDRATE);

export const getLoginUserDataThunk = createAsyncThunk(
  'login/getLoginUserData',
  async (params: ILoginUserData, thunkAPI) => {
    try {
      const response = await getLoginData(params);
      console.log('getLoginData response: ', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getSnsLoginUserDataThunk = createAsyncThunk(
  'login/getSnsLoginData',
  async (params: ISnsUserData, thunkAPI) => {
    try {
      const response = await getSnsLoginData(params);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

interface InitialState {
  loading: boolean;
  userData: {
    accessToken: string;
    userId: string;
    userType: string;
    isLogin: boolean;
  };
}

const initialState: InitialState = {
  loading: true,
  userData: {
    accessToken: '',
    userId: '',
    userType: '',
    isLogin: false
  }
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // builder.addCase(hydrate, (state, action) => action.payload['hangang']);
    builder.addCase(getSnsLoginUserDataThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSnsLoginUserDataThunk.fulfilled, (state, action) => {
      state.userData.accessToken = action.payload.access_token;
      state.userData.userId = action.payload.user_id;
      state.userData.userType = action.payload.user_type;
      state.userData.isLogin = true;
      state.loading = false;
    });
    builder.addCase(getSnsLoginUserDataThunk.rejected, (state, action) => {
      state.loading = false;
    });
  }
});

export default loginSlice.reducer;
