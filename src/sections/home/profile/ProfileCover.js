import { useEffect } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
// utils
import cssStyles from '../../../utils/cssStyles';
// hooks
// components
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import { Link } from 'react-router-dom';
import { PATH_FEED } from '../../../routes/paths';
import { useDispatch, useSelector } from '../../../redux/store';
import { getProfile } from '../../../redux/slices/profiles';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '&:before': {
    ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
}));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

ProfileCover.propTypes = {};

export default function ProfileCover() {
  const dispatch = useDispatch();

  const { profile } = useSelector(state => state.profiles);

  useEffect(() => {
    dispatch(getProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <RootStyle>
        <InfoStyle>
          <Avatar
            sx={{
              mx: 'auto',
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor: 'common.white',
              width: { xs: 80, md: 128 },
              height: { xs: 80, md: 128 },
            }}
          />
          <Box
            sx={{
              ml: { md: 3 },
              mt: { xs: 1, md: 0 },
              color: 'common.white',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography variant='h4'>
              {profile?.username}{' '}
              <IconButton>
                <Link to={PATH_FEED.profileEdit}>
                  <Iconify color='white' icon={'eva:edit-fill'} />
                </Link>
              </IconButton>
            </Typography>
          </Box>
        </InfoStyle>
        <Image
          alt='profile cover'
          src={''}
          sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
      </RootStyle>
    </>
  );
}
