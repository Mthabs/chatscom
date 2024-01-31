/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
// // @mui
import { Container, Box, Grid, Stack } from '@mui/material';
// // components
import Page from '../../../components/Page';
// sections
import { useDispatch, useSelector } from '../../../redux/store';
import { likeContent } from '../../../redux/slices/like';
import { getFriends } from '../../../redux/slices/friends';
import { ProfilePostCard } from '../../../sections/home/profile';
import FriendsComp from '../../../sections/home/Friends/FriendsComp/FriendsComp';
import { Card } from 'react-bootstrap';
import { photoComment } from '../../../redux/slices/comments';
import { getPhotos } from '../../../redux/slices/photos';

// ----------------------------------------------------------------------

export default function PhotosPage() {
  const dispatch = useDispatch();

  const { photos } = useSelector(state => state.photos);
  const { friends } = useSelector(state => state.friends);

  useEffect(() => {
    dispatch(getPhotos());
    dispatch(getFriends());
  }, []);

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
      photo: postId,
      content: message,
    };

    if (message === '') {
      return;
    }

    await dispatch(photoComment(pData));

    await dispatch(getPhotos());
  };

  return (
    <>
      <Page title='Photos'>
        <Container maxWidth={false}>
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
                <Card>
                  <FriendsComp friends={friends} />
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={3}>
                  {photos.map(post => (
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
                <Stack spacing={3}>hello</Stack>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Page>
    </>
  );
}
