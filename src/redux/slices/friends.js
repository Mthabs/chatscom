import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  friends: [],
  friend: null,
};

const slice = createSlice({
  name: 'friend',
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

    // GET FRIENDS
    getFriendsSuccess(state, action) {
      state.isLoading = false;
      state.friends = action.payload.results;
    },

    // GET FRIEND
    getFriendSuccess(state, action) {
      state.isLoading = false;
      state.friend = action.payload;
    },

    // ADD FRIEND
    addFriendSuccess(state, action) {
      state.isLoading = false;
    },

    // UNFRIEND
    deleteFriendSuccess(state, action) {
      state.isLoading = false;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function getFriends(postId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/friends/');

      dispatch(slice.actions.getFriendsSuccess(response.data));

      return response.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getFriend(friendId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/friends/${friendId}/`);

      dispatch(slice.actions.getFriendSuccess(response.data));

      return response.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function addFriend(friendId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const pData = {
        friend: friendId,
      };

      const response = await axios.delete(`/friends/`, pData);

      dispatch(slice.actions.addFriendSuccess(response.data));

      return response.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteFriend(friendId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/friends/${friendId}/`);

      dispatch(slice.actions.deleteFriendSuccess(response.data));

      return response.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
