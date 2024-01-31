import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  videos: [],
  video: null,
};

const slice = createSlice({
  name: 'video',
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

    // GET VIDEOS
    getVideosSuccess(state, action) {
      state.isLoading = false;
      state.videos = action.payload.results;
    },

    // GET VIDEO
    getVideoSuccess(state, action) {
      state.isLoading = false;
      state.video = action.payload;
    },

    // ADD VIDEO
    addVideoSuccess(state, action) {
      state.isLoading = false;
      state.videos = [action.payload, ...state.videos];
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function getVideos() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/videos/');

      dispatch(slice.actions.getVideosSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getVideo(name) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/videos/video', {
        params: { name },
      });
      dispatch(slice.actions.getVideoSuccess(response.data.video));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getComments(videoId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/comments/?video=${videoId}`);

      dispatch(
        slice.actions.getCommentsSuccess({
          videoId,
          results: response.data.results,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function addVideo(data) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.video(`/videos/`, data);

      dispatch(slice.actions.addVideoSuccess(response.data));
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
