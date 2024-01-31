import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Stack } from '@mui/material';
import { useDispatch, useSelector } from '../../../redux/store';
import { getLikedVideos } from '../../../redux/slices/liked';
import { ProfilePostCard } from '../../home/profile';
import { likeContent } from '../../../redux/slices/like';
import { postComment } from '../../../redux/slices/comments';

VideoContent.propTypes = {
  videos: PropTypes.array,
};

export default function VideoContent({ videos }) {
  const dispatch = useDispatch();

  const { likedVideos } = useSelector(state => state.liked);

  const [nPhotos, setNPhotos] = useState([]);

  useEffect(() => {
    dispatch(getLikedVideos());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const matchedPhotos = likedVideos?.map(likedPhoto => {
      const matchedPhoto = videos?.find(photo => photo.id === likedPhoto.video);
      return matchedPhoto;
    });
    setNPhotos(matchedPhotos);
  }, [videos, likedVideos]);

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
          <Grid item xs={12} md={3}></Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              {nPhotos?.length > 0 &&
                nPhotos?.map(post => (
                  <ProfilePostCard
                    key={post.id}
                    post={post}
                    onLikeClick={handleLikeClick}
                    onPostComment={handlePostComment}
                    isVideo={true}
                  />
                ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}></Grid>
        </Grid>
      </Box>
    </>
  );
}
