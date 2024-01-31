import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Paper, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from '../../../redux/store';
import { getProfile } from '../../../redux/slices/profiles';

Comments.propTypes = {
  comment: PropTypes.array,
};

export default function Comments({ comment }) {
  const dispatch = useDispatch();

  const { profile } = useSelector(state => state.profiles);

  useEffect(() => {
    dispatch(getProfile(comment?.profile_id));
  }, [dispatch, comment?.profile_id]);

  return (
    <>
      <Stack direction='row' spacing={2}>
        <Avatar alt={profile?.name} src={profile?.profile_picture} />
        <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: 'background.neutral' }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent='space-between'
            sx={{ mb: 0.5 }}
          >
            <Typography variant='subtitle2'>{comment?.owner}</Typography>
            <Typography variant='caption' sx={{ color: 'text.disabled' }}>
              {comment?.created_at}
            </Typography>
          </Stack>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {comment?.content}
          </Typography>
        </Paper>
      </Stack>
    </>
  );
}
