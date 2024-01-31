import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import postReducer from './slices/post';
import likeReducer from './slices/like';
import friendsReducer from './slices/friends';
import usersReducer from './slices/users';
import commentsReducer from './slices/comments';
import profilesReducer from './slices/profiles';
import photosReducer from './slices/photos';
import videosReducer from './slices/videos';
import followersReducer from './slices/followers';
import likedReducer from './slices/liked';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const postPersistConfig = {
  key: 'post',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const likePersistConfig = {
  key: 'like',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const friendsPersistConfig = {
  key: 'friends',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const usersPersistConfig = {
  key: 'user',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const commentsPersistConfig = {
  key: 'comments',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const profilesPersistConfig = {
  key: 'profiles',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const videosPersistConfig = {
  key: 'videos',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const photosPersistConfig = {
  key: 'photos',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const followersPersistConfig = {
  key: 'followers',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const likedPersistConfig = {
  key: 'liked',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  post: persistReducer(postPersistConfig, postReducer),
  like: persistReducer(likePersistConfig, likeReducer),
  friends: persistReducer(friendsPersistConfig, friendsReducer),
  users: persistReducer(usersPersistConfig, usersReducer),
  comments: persistReducer(commentsPersistConfig, commentsReducer),
  profiles: persistReducer(profilesPersistConfig, profilesReducer),
  photos: persistReducer(photosPersistConfig, photosReducer),
  videos: persistReducer(videosPersistConfig, videosReducer),
  followers: persistReducer(followersPersistConfig, followersReducer),
  liked: persistReducer(likedPersistConfig, likedReducer),
});

export { rootPersistConfig, rootReducer };
