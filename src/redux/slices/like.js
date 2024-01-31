import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  likes: [],
  like: null,
};

const slice = createSlice({
  name: 'like',
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

    // LIKE A POST
    likeContentSuccess(state, action) {
      state.isLoading = false;
    },

    // UNLIKE A POST
    unLikeContentSuccess(state, action) {
      state.isLoading = false;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function likeContent(postId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const pData = {
        post: postId,
      };

      const response = await axios.post('/likes/', pData);

      dispatch(slice.actions.likeContentSuccess(response.data));

      return response.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function unLikeContent(likeId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/likes/${likeId}/`);

      dispatch(slice.actions.unLikeContentSuccess(response.data));

      return response.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
