import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Stack } from '@mui/material';
import { useDispatch, useSelector } from '../../../redux/store';
import { getLikedPhotos } from '../../../redux/slices/liked';
import { ProfilePostCard } from '../../home/profile';
import { likeContent } from '../../../redux/slices/like';
import { postComment } from '../../../redux/slices/comments';

PhotoContent.propTypes = {
  photos: PropTypes.array,
};

export default function PhotoContent({ photos }) {
  const dispatch = useDispatch();

  const { likedPhotos } = useSelector(state => state.liked);

  const [nPhotos, setNPhotos] = useState([]);

  useEffect(() => {
    dispatch(getLikedPhotos());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(photos, likedPhotos);

  useEffect(() => {
    const matchedPhotos = likedPhotos?.map(likedPhoto => {
      const matchedPhoto = photos?.find(photo => photo.id === likedPhoto.photo);
      return matchedPhoto;
    });
    setNPhotos(matchedPhotos);
  }, [photos, likedPhotos]);

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

  console.log(nPhotos);

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
            {/* <Card sx={{ p: 2 }}>
              <FriendsComp friends={friends} />
            </Card> */}
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              {nPhotos?.map(post => (
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
            {/* <Card sx={{ p: 2 }}>
              <FriendsComp friends={followers} title='Followers' isFollowers />
            </Card> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
