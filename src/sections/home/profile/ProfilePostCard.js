import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Checkbox,
  TextField,
  Typography,
  CardHeader,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';
// hooks
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import MyAvatar from '../../../components/MyAvatar';
import EmojiPicker from '../../../components/EmojiPicker';
import { useDispatch } from '../../../redux/store';
import Comments from '../comments/Comments';
import { getComments } from '../../../redux/slices/post';
import ReactPlayer from 'react-player';

// ----------------------------------------------------------------------

ProfilePostCard.propTypes = {
  post: PropTypes.object,
  onLikeClick: PropTypes.func,
  onPostComment: PropTypes.func,
  isVideo: PropTypes.bool,
};

export default function ProfilePostCard({
  post,
  onLikeClick,
  onPostComment,
  isVideo = false,
}) {
  const dispatch = useDispatch();

  const commentInputRef = useRef(null);

  const fileInputRef = useRef(null);

  const [isLiked, setLiked] = useState(post?.isLiked);

  const [likes, setLikes] = useState(post?.like_count);

  const [message, setMessage] = useState('');

  const handleLike = () => {
    setLiked(true);
    setLikes(prevLikes => prevLikes + 1);
    onLikeClick(post?.id);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikes(prevLikes => prevLikes - 1);
  };

  const handleChangeMessage = value => {
    setMessage(value);
  };

  const handleClickAttach = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    dispatch(getComments(post?.id));
  }, [post?.id, dispatch]);

  const handlePostComment = async () => {
    await onPostComment(post?.id, message);
    setMessage('');
  };

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={<Avatar src={post?.profile_picture} alt={post?.owner} />}
        title={
          <Link
            to='#'
            variant='subtitle2'
            color='text.primary'
            component={RouterLink}
          >
            {post?.owner}
          </Link>
        }
        subheader={
          <Typography
            variant='caption'
            sx={{ display: 'block', color: 'text.secondary' }}
          >
            {post?.created_at}
          </Typography>
        }
        action={
          <IconButton>
            <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
          </IconButton>
        }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Typography variant='h6'>{post?.header}</Typography>
        <Typography>{post?.content}</Typography>

        {isVideo ? (
          <ReactPlayer url={post?.video_file} />
        ) : (
          <Image
            alt='post media'
            src={post?.post_picture}
            ratio='16/9'
            sx={{ borderRadius: 1 }}
          />
        )}

        <Stack direction='row' alignItems='center'>
          <FormControlLabel
            control={
              <Checkbox
                size='small'
                color='error'
                checked={isLiked}
                icon={<Iconify icon={'eva:heart-fill'} />}
                checkedIcon={<Iconify icon={'eva:heart-fill'} />}
                onChange={isLiked ? handleUnlike : handleLike}
              />
            }
            label={fShortenNumber(likes)}
            sx={{ minWidth: 72, mr: 0 }}
          />

          <Box sx={{ flexGrow: 1 }} />
        </Stack>

        {post?.comments?.length > 0 && (
          <Stack spacing={1.5}>
            {post?.comments?.map(comment => (
              <Comments comment={comment} />
            ))}
          </Stack>
        )}

        <Stack direction='row' alignItems='center'>
          <MyAvatar />
          <TextField
            fullWidth
            size='small'
            value={message}
            inputRef={commentInputRef}
            placeholder='Write a comment…'
            onChange={event => handleChangeMessage(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton size='small' onClick={handleClickAttach}>
                    <Iconify
                      icon={'ic:round-add-photo-alternate'}
                      width={24}
                      height={24}
                    />
                  </IconButton>
                  <EmojiPicker
                    alignRight
                    value={message}
                    setValue={setMessage}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              ml: 2,
              mr: 1,
              '& fieldset': {
                borderWidth: `1px !important`,
                borderColor: theme =>
                  `${theme.palette.grey[500_32]} !important`,
              },
            }}
          />
          <IconButton onClick={handlePostComment}>
            <Iconify icon={'ic:round-send'} width={24} height={24} />
          </IconButton>
          <input type='file' ref={fileInputRef} style={{ display: 'none' }} />
        </Stack>
      </Stack>
    </Card>
  );
}
