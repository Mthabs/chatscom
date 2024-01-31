import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, Grid, Stack } from '@mui/material';
import FriendsComp from '../../home/Friends/FriendsComp/FriendsComp';
import ProfilePostInput from '../../home/profile/ProfilePostInput';
import { ProfilePostCard } from '../../home/profile';
import { useDispatch, useSelector } from '../../../redux/store';
import { addPost, getPosts } from '../../../redux/slices/post';
import { getFriends } from '../../../redux/slices/friends';
import { likeContent } from '../../../redux/slices/like';
import { postComment } from '../../../redux/slices/comments';
import { getFollowers } from '../../../redux/slices/followers';

HomeContent.propTypes = {
  posts: PropTypes.array,
};

export default function HomeContent() {
  const dispatch = useDispatch();

  const { posts } = useSelector(state => state.post);
  const { friends } = useSelector(state => state.friends);
  const { followers } = useSelector(state => state.followers);

  const [nPost, setNPost] = useState([]);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getFriends());
    dispatch(getFollowers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const ownPost = posts.filter(post => post?.is_owner === true);
    setNPost(ownPost);
  }, [posts]);

  // HANDLE LIKE CLICK
  const handleLikeClick = async postId => {
    const resp = await dispatch(likeContent(postId));

    if (!resp) {
      return;
    }
  };

  // HANDLE POST A COMMENT
  const handlePostComment = async (postId, message) => {
    const pData = {
      post: postId,
      content: message,
    };

    if (message === '') {
      return;
    }

    await dispatch(postComment(pData));

    await dispatch(getPosts());
  };

  // HANDLE ADD POST
  const handleAddPost = async (content, files) => {
    const pData = {
      header: '',
      content: content,
      post_picture: files[0],
    };

    await dispatch(addPost(pData));
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Grid height={'100%'} maxWidth={'xl'} container spacing={4}>
          <Grid item xs={12} md={3}>
            <Card sx={{ p: 2 }}>
              <FriendsComp friends={friends} />
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <ProfilePostInput onAddPost={handleAddPost} />
              {nPost.map(post => (
                <ProfilePostCard
                  key={post.id}
                  post={post}
                  onLikeClick={handleLikeClick}
                  onPostComment={handlePostComment}
                />
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ p: 2 }}>
              <FriendsComp friends={followers} title='Followers' isFollowers />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
