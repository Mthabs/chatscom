import PropTypes from 'prop-types';
// @mui
import { Grid, Stack, Typography } from '@mui/material';
import ProfilePostInput from '../profile/ProfilePostInput';
import { ProfilePostCard } from '../profile';

// ----------------------------------------------------------------------
ProfilePostCard.propTypes = {
  posts: PropTypes.object,
  onLikeClick: PropTypes.func,
  friends: PropTypes.object,
};

export default function Posts({ posts, onLikeClick, friends }) {
  const handleLikeClick = async postId => {
    onLikeClick(postId);
  };

  return (
    <Grid maxWidth={'xl'} container spacing={3}>
      <Grid item xs={12} md={3}>
        <Stack spacing={3}>
          {friends.map(friend => (
            <Typography key={friend.id} variant='subtitle2'>
              {friend.id}
            </Typography>
          ))}
        </Stack>
        {/* <Grid container spacing={3}>
          {friends.map(friend => (
            <Grid key={friend.id} item xs={12} md={4}>
              <FriendCard friend={friend} />
            </Grid>
          ))}
        </Grid> */}
      </Grid>

      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <ProfilePostInput />
          {posts.map(post => (
            <ProfilePostCard
              key={post.id}
              post={post}
              onLikeClick={handleLikeClick}
            />
          ))}
        </Stack>
      </Grid>

      <Grid item xs={12} md={3}>
        <Stack spacing={3}>hello</Stack>
      </Grid>
    </Grid>
  );
}
