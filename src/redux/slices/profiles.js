import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  profiles: [],
  profile: null,
};

const slice = createSlice({
  name: 'profiles',
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

    // GET PROFILES
    getProfilesSuccess(state, action) {
      state.isLoading = false;
      state.profiles = action.payload.results;
    },

    // GET PROFILE
    getProfileSuccess(state, action) {
      state.isLoading = false;
      state.profile = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function getProfiles() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/profiles/');

      dispatch(slice.actions.getProfilesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getProfile() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/dj-rest-auth/user/`);

      dispatch(slice.actions.getProfileSuccess(response.data));
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
