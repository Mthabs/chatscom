import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  users: [],
  userDetails: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET USERS
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.userDetails = action.payload.results;
    },

    // // GET USER
    // getUserSuccess(state, action) {
    //   state.isLoading = false;
    //   state.user = action.payload;
    // },

    // EDIT USER
    editUserSuccess(state, action) {
      state.isLoading = false;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function getUser() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/dj-rest-auth/user/');

      dispatch(slice.actions.getUserSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function editUser(data) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put('/dj-rest-auth/user/', data);
      dispatch(slice.actions.editUserSuccess(response.data.user));
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
