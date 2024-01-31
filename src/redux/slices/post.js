import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  posts: [],
  post: null,
};

const slice = createSlice({
  name: 'post',
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

    // GET POSTS
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.posts = action.payload.results;
    },

    // GET POST
    getPostSuccess(state, action) {
      state.isLoading = false;
      state.post = action.payload;
    },

    // GET COMMENTS
    getCommentsSuccess(state, action) {
      state.isLoading = false;
      state.posts = state.posts.map(post =>
        post.id === action.payload.postId
          ? { ...post, comments: action.payload.results }
          : post
      );
    },

    // GET PROFILE
    getProfileSuccess(state, action) {
      state.isLoading = false;
      state.profile = action.payload;
    },

    // ADD POST
    addPostSuccess(state, action) {
      state.isLoading = false;
      state.posts = [action.payload, ...state.posts];
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function getPosts() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/posts/');

      dispatch(slice.actions.getPostsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getPost(name) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/posts/post', {
        params: { name },
      });
      dispatch(slice.actions.getPostSuccess(response.data.post));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getComments(postId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/comments/?post=${postId}`);

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

// ----------------------------------------------------------------------

export function getProfile(profileId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/profiles/${profileId}/`);

      dispatch(slice.actions.getProfileSuccess(response.data));
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function addPost(data) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const formData = new FormData();
      formData.append('header', data.header);
      formData.append('content', data.content);
      formData.append('post_picture', data.post_picture);

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      const response = await axios.post(`/posts/`, formData, config);

      dispatch(slice.actions.addPostSuccess(response.data));
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
