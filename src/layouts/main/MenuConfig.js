// routes
import { PATH_FEED } from '../../routes/paths';
// components
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Home',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: PATH_FEED.home,
  },
  {
    title: 'Videos',
    path: PATH_FEED.videos,
    icon: <Iconify icon={'eva:file-fill'} {...ICON_SIZE} />,
  },
  {
    title: 'Photos',
    path: PATH_FEED.photos,
    icon: <Iconify icon={'eva:file-fill'} {...ICON_SIZE} />,
  },
];

export default menuConfig;
