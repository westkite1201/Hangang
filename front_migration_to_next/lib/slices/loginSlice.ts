import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../../store';
import { getLoginData, getTestData } from '../api/login';

const hydrate = createAction<RootState>(HYDRATE);

export const getLoginUserDataThunk = createAsyncThunk(
  'login/getLoginUserData',
  async (_, thunkAPI) => {
    try {
      const response = await getLoginData();
      console.log('response: ', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
)

export const getTestDataThunk = createAsyncThunk(
  'login/getTestData',
  async (_, thunkAPI) => {
    try {
      const response = await getTestData();
      console.log('response: ', response);
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
  };
}

const initialState: InitialState = {
  loading: true,
  userData: {
    accessToken: '',
    userId: '',
    userType: ''
  }
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // builder.addCase(hydrate, (state, action) => action.payload['hangang']);
    builder.addCase(getTestDataThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTestDataThunk.fulfilled, (state, action) => {
      state.userData.accessToken = action.payload.access_token;
      state.userData.userId = action.payload.user_id;
      state.userData.userType = action.payload.user_type;
      state.loading = false;
    });
    builder.addCase(getTestDataThunk.rejected, (state, action) => {
      state.loading = false;
    });
  }
});

export default loginSlice.reducer;
