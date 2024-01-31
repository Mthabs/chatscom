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
import { videoComment } from '../../../redux/slices/comments';
import { getVideos } from '../../../redux/slices/videos';

// ----------------------------------------------------------------------

export default function VideosPage() {
  const dispatch = useDispatch();

  const { videos } = useSelector(state => state.videos);
  const { friends } = useSelector(state => state.friends);

  useEffect(() => {
    dispatch(getVideos());
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
      video: postId,
      content: message,
    };

    if (message === '') {
      return;
    }

    await dispatch(videoComment(pData));

    await dispatch(getVideos());
  };

  return (
    <>
      <Page title='Videos'>
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
                  {videos.map(post => (
                    <ProfilePostCard
                      key={post.id}
                      post={post}
                      onLikeClick={handleLikeClick}
                      onPostComment={handlePostComment}
                      isVideo
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
