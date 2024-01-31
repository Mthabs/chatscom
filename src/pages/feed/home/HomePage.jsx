/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
// // @mui
import { Container, Box, Grid, Stack } from '@mui/material';
// // components
import Page from '../../../components/Page';
// sections
import { useDispatch, useSelector } from '../../../redux/store';
import { addPost, getPosts } from '../../../redux/slices/post';
import { likeContent } from '../../../redux/slices/like';
import { getFriends } from '../../../redux/slices/friends';
import ProfilePostInput from '../../../sections/home/profile/ProfilePostInput';
import { ProfilePostCard } from '../../../sections/home/profile';
import FriendsComp from '../../../sections/home/Friends/FriendsComp/FriendsComp';
import { Card } from 'react-bootstrap';
import { postComment } from '../../../redux/slices/comments';

// ----------------------------------------------------------------------

export default function HomePage() {
  const dispatch = useDispatch();

  const { posts } = useSelector(state => state.post);
  const { friends } = useSelector(state => state.friends);

  useEffect(() => {
    dispatch(getPosts());
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
      <Page title='Home'>
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
                  <ProfilePostInput onAddPost={handleAddPost} />
                  {posts.map(post => (
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
