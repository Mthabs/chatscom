import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  comments: [],
  comment: null,
};

const slice = createSlice({
  name: 'comment',
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

    // GET COMMENTS
    getCommentsSuccess(state, action) {
      state.isLoading = false;
      state.comments = action.payload.results;
    },

    // GET COMMENT
    getCommentSuccess(state, action) {
      state.isLoading = false;
      state.comment = action.payload;
    },

    // POST COMMENT
    postCommentSuccess(state, action) {
      state.isLoading = false;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function getComments(postId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/comments/?post=${postId}`);

      dispatch(slice.actions.getCommentsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getComment(name) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/comments/comment', {
        params: { name },
      });
      dispatch(slice.actions.getCommentSuccess(response.data.comment));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function postComment(data) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/comments/', data);
      dispatch(slice.actions.postCommentSuccess(response.data.comment));
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function photoComment(data) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/photocomments/', data);
      dispatch(slice.actions.postCommentSuccess(response.data.comment));
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
// ----------------------------------------------------------------------

export function videoComment(data) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(/videocomments/, data);
      dispatch(slice.actions.postCommentSuccess(response.data.comment));
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
