// @mui
import { styled } from '@mui/material/styles';
import { Tabs, Box, Card, Container, Tab } from '@mui/material';
import { ProfileCover } from '../../../sections/home/profile';
import Page from '../../../components/Page';
import useTabs from '../../../hooks/useTabs';
import HomeContent from '../../../sections/profile/homeContent/HomeContent';
import PhotoContent from '../../../sections/profile/photoContent/PhotoContent';
import VideoContent from '../../../sections/profile/videoContent/VideoContent';
import { useDispatch, useSelector } from '../../../redux/store';
import { useEffect } from 'react';
import { getPhotos } from '../../../redux/slices/photos';
import { getVideos } from '../../../redux/slices/videos';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function UserProfile() {
  const dispatch = useDispatch();

  const { photos } = useSelector(state => state.photos);
  const { videos } = useSelector(state => state.videos);

  useEffect(() => {
    dispatch(getPhotos());
    dispatch(getVideos());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { currentTab, onChangeTab } = useTabs('home');

  const PROFILE_TABS = [
    {
      value: 'home',
      component: <HomeContent />,
    },
    {
      value: 'photos',
      component: <PhotoContent photos={photos} />,
    },
    {
      value: 'videos',
      component: <VideoContent videos={videos} />,
    },
  ];

  return (
    <Page title='User: Profile'>
      <Container maxWidth={'xl'}>
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <ProfileCover />

          <TabsWrapperStyle>
            <Tabs
              allowScrollButtonsMobile
              variant='scrollable'
              scrollButtons='auto'
              value={currentTab}
              onChange={onChangeTab}
            >
              {PROFILE_TABS.map(tab => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  label={tab.value}
                />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map(tab => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
