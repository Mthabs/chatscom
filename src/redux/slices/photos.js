import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  photos: [],
  photo: null,
};

const slice = createSlice({
  name: 'photo',
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

    // GET PHOTOS
    getPhotosSuccess(state, action) {
      state.isLoading = false;
      state.photos = action.payload.results;
    },

    // GET PHOTO
    getPhotoSuccess(state, action) {
      state.isLoading = false;
      state.photo = action.payload;
    },

    // ADD PHOTO
    addPhotoSuccess(state, action) {
      state.isLoading = false;
      state.photos = [action.payload, ...state.photos];
    },

    // GET COMMENTS
    getCommentsSuccess(state, action) {
      state.isLoading = false;
      state.photos = state.photos.map(photo =>
        photo.id === action.payload.photoId
          ? { ...photo, comments: action.payload.results }
          : photo
      );
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function getPhotos() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/photos/');

      dispatch(slice.actions.getPhotosSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getPhoto(name) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/photos/photo', {
        params: { name },
      });
      dispatch(slice.actions.getPhotoSuccess(response.data.photo));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getComments(photoId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/comments/?photo=${photoId}`);

      dispatch(
        slice.actions.getCommentsSuccess({
          photoId,
          results: response.data.results,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getPhotoComments(postId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/photocomments/?photo=${postId}`);

      dispatch(
        slice.actions.getCommentsSuccess({
          postId,
          results: response.data.results,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
