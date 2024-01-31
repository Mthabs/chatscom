import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  followers: [],
  follower: null,
};

const slice = createSlice({
  name: 'follower',
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

    // GET FOLLOWERS
    getFollowersSuccess(state, action) {
      state.isLoading = false;
      state.followers = action.payload.results;
    },

    // GET FOLLOWER
    getFollowerSuccess(state, action) {
      state.isLoading = false;
      state.follower = action.payload;
    },

    // ADD FOLLOWER
    addFollowerSuccess(state, action) {
      state.isLoading = false;
      state.followers = [action.payload, ...state.followers];
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function getFollowers() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/followers/');

      dispatch(slice.actions.getFollowersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getFollower(name) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/followers/follower', {
        params: { name },
      });
      dispatch(slice.actions.getFollowerSuccess(response.data.follower));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getComments(followerId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/comments/?follower=${followerId}`);

      dispatch(
        slice.actions.getCommentsSuccess({
          followerId,
          results: response.data.results,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function addFollower(data) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.follower(`/followers/`, data);

      dispatch(slice.actions.addFollowerSuccess(response.data));
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
