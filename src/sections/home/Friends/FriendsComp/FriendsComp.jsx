import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Stack, Typography } from '@mui/material';

FriendsComp.propTypes = {
  friends: PropTypes.array,
  title: PropTypes.string,
  isFollowers: PropTypes.bool,
};

export default function FriendsComp({
  friends,
  title = 'Friends',
  isFollowers = false,
}) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Box>
          <Typography variant='h6'>{title}</Typography>
        </Box>

        <Box>
          <Typography variant='h6'>({friends.length})</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 3,
        }}
      >
        {isFollowers ? (
          <>
            {friends.map(friend => (
              <Stack
                direction='column'
                spacing={1}
                key={friend.id}
                justifyContent={'center'}
                alignItems={'flex-start'}
                flexWrap={'wrap'}
              >
                <Typography variant='subtitle2'>
                  Owner: {friend.followed_name}
                </Typography>
                <Typography variant='subtitle2'>
                  Followed: {friend.followed_name}
                </Typography>
                <Typography variant='subtitle2'>
                  Follows: {friend.followed}
                </Typography>
              </Stack>
            ))}
          </>
        ) : (
          <>
            {friends.map(friend => (
              <Stack
                direction='column'
                spacing={1}
                key={friend.id}
                justifyContent={'center'}
                alignItems={'center'}
                flexWrap={'wrap'}
              >
                <Avatar src={friend.friend_avatar} alt={friend.friend_name} />
                <Typography variant='subtitle2'>
                  {friend.friend_name}
                </Typography>
              </Stack>
            ))}
          </>
        )}
      </Box>
    </>
  );
}
