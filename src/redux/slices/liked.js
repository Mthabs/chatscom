import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  likedPhotos: [],
  likedVideos: [],
};

const slice = createSlice({
  name: 'liked',
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

    // GET LIKED PHOTOS
    getLikedPhotosSuccess(state, action) {
      state.isLoading = false;
      state.likedPhotos = action.payload.results;
    },

    // GET LIKED PHOTOS
    getLikedVideosSuccess(state, action) {
      state.isLoading = false;
      state.likedVideos = action.payload.results;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function getLikedPhotos() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/likephotos/');

      dispatch(slice.actions.getLikedPhotosSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getLikedVideos() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/likevideos/');

      dispatch(slice.actions.getLikedVideosSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
