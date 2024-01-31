import Router from './routes';
import ThemeProvider from './theme';
// import NavBar from './components/NavBar';
// import Container from 'react-bootstrap/Container';
// import { Route, Switch } from 'react-router-dom';
// import './api/axiosDefaults';
// import SignUpForm from './pages/auth/SignUpForm';
// import SignInForm from './pages/auth/SignInForm';
// import PostCreateForm from './pages/posts/PostCreateForm';
// import PostPage from './pages/posts/PostPage';
// import PostsPage from './pages/posts/PostsPage';
// import PhotoUploadForm from './pages/photos/PhotoUploadForm';
// import PhotoPage from './pages/photos/PhotoPage';
// import PhotosPage from './pages/photos/PhotosPage';
// import VideosPage from './pages/videos/VideosPage';
// import VideoUploadForm from './pages/videos/VideoUploadForm';
// import VideoPage from './pages/videos/VideoPage';
// import { useCurrentUser } from './contexts/CurrentUserContext';
// import PostEditForm from './pages/posts/PostEditForm';
// import PhotoEditForm from './pages/photos/PhotoEditForm';
// import VideoEditForm from './pages/videos/VideoEditForm';
// import ProfilePage from './pages/profiles/ProfilePage';
// import UsernameForm from './pages/profiles/UsernameForm';
// import UserPasswordForm from './pages/profiles/UserPasswordForm';
// import ProfileEditForm from './pages/profiles/ProfileEditForm';
// import Friends from './pages/friends/Friends';

function App() {
  // const currentUser = useCurrentUser();
  // const profile_id = currentUser?.profile_id || '';

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

export default App;
