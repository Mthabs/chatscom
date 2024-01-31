// @mui
import { Grid, Stack } from '@mui/material';
//
import ProfilePostInput from './ProfilePostInput';

// ----------------------------------------------------------------------

export default function Profile() {
  return (
    <Grid maxWidth={'xl'} container spacing={3}>
      <Grid item xs={12} md={3}>
        <Stack spacing={3}>hello</Stack>
      </Grid>

      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          {/* <ProfilePostInput /> */}
          {/* {posts.map((post) => (
            <ProfilePostCard key={post.id} post={post} />
          ))} */}
        </Stack>
      </Grid>

      <Grid item xs={12} md={3}>
        <Stack spacing={3}>hello</Stack>
      </Grid>
    </Grid>
  );
}
