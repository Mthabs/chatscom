// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_FEED = '/feed';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  login: '/',
  register: '/register',
  homeFeed: '/home',
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_FEED = {
  root: ROOTS_FEED,
  home: path(ROOTS_FEED, '/home'),
  profile: path(ROOTS_FEED, '/profile/'),
  videos: path(ROOTS_FEED, '/videos'),
  video: path(ROOTS_FEED, '/video/:id'),
  photos: path(ROOTS_FEED, '/photos'),
  photo: path(ROOTS_FEED, '/photo/:id'),
  profileEdit: path(ROOTS_FEED, '/profile/edit'),
};
