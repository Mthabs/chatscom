import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PhotoUploadForm from "./pages/photos/PhotoUploadForm";
import VideoUploadForm from "./pages/videos/VideoUploadForm";
import PostPage from "./pages/posts/PostPage";
import PhotoPage from "./pages/photos/PhotoPage";
import VideoPage from "./pages/videos/VideoPage";
import PostsPage from "./pages/posts/PostsPage";
import PhotosPage from "./pages/photos/PhotosPage"; 
import VideosPage from "./pages/videos/VideosPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";

function App() {
    const currentUser = useCurrentUser();
    const profile_id = currentUser?.profile_id || "";
    
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
        <Route
            exact
            path="/"
            render={() => (
              <PostsPage message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/photos/upload" render={() => <PhotoUploadForm />} />
          <Route exact path="/videos/upload" render={() => <VideoUploadForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/photos/:id" render={() => <PhotoPage />} />
          <Route exact path="/videos/:id" render={() => <VideoPage />} />
          <Route exact path="/photos/photos" render={() => <PhotosPage />} />
          <Route exact path="/videos/videos" render={() => <VideosPage />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;