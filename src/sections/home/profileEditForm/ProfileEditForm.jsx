import PropTypes from 'prop-types';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
// hooks
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

ProfileEditForm.propTypes = {
  profile: PropTypes.object,
  onProfileSubmit: PropTypes.func,
};

export default function ProfileEditForm({ profile, onProfileSubmit }) {
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
  });

  const defaultValues = {
    username: profile?.username,
    first_name: profile?.first_name,
    last_name: profile?.last_name,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async data => {
    onProfileSubmit(data);
  };

  return (
    <FormProvider
      sx={{ p: 5 }}
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={3}>
        <RHFTextField name='username' label='Username' />
        <RHFTextField name='first_name' label='First Name' />
        <RHFTextField name='last_name' label='Last Name' />
      </Stack>

      <LoadingButton
        sx={{ mt: 5 }}
        fullWidth
        size='large'
        type='submit'
        variant='contained'
        loading={isSubmitting}
      >
        Submit
      </LoadingButton>
    </FormProvider>
  );
}
