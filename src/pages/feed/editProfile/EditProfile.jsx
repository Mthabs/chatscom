// @mui
import { Box, Container } from '@mui/material';
import Page from '../../../components/Page';
import ProfileEditForm from '../../../sections/home/profileEditForm/ProfileEditForm';
import { useDispatch, useSelector } from '../../../redux/store';
import { getProfile } from '../../../redux/slices/profiles';
import { useEffect } from 'react';
import { editUser } from '../../../redux/slices/users';
import { useNavigate } from 'react-router';
import { PATH_FEED } from '../../../routes/paths';

// ----------------------------------------------------------------------

export default function ProfileEdit() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { profile } = useSelector(state => state.profiles);

  useEffect(() => {
    dispatch(getProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProfileEdit = async data => {
    const resp = await dispatch(editUser(data));

    await dispatch(getProfile());

    if (
      resp.username === profile.username ||
      resp.first_name === profile.first_name ||
      resp.last_name === profile.last_name
    ) {
      navigate(PATH_FEED.profile, { replace: true });
    }
  };

  return (
    <Page title='User: Profile Edit'>
      <Container maxWidth={'sm'}>
        <Box sx={{ p: 6 }}>
          <ProfileEditForm
            profile={profile}
            onProfileSubmit={handleProfileEdit}
          />
        </Box>
      </Container>
    </Page>
  );
}
