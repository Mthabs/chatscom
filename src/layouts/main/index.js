import { Outlet } from 'react-router-dom';
// @mui
import { Box, Stack } from '@mui/material';
// components
//
import MainHeader from './MainHeader';
import { HEADER } from '../../config';

// ----------------------------------------------------------------------

export default function MainLayout() {
  return (
    <Stack sx={{ minHeight: 1, display: 'flex', flexDirection: 'column' }}>
      <MainHeader />

      <Box sx={{ marginTop: 11, height: '100vh' }}>
        <Outlet />
      </Box>
    </Stack>
  );
}
