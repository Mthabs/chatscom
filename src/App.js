import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/register/Register";
import SignInForm from "./pages/auth/login/login";
import PostCreation from "./pages/posts/Form/BaseLayout"
import PostPage from "./pages/posts/PostPage";
import Profile from "./pages/profiles/BaseLayout"

import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEdit from "./pages/profiles/form/BaseLayout";
import Friends from './pages/friends/Friends';



function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/" render={() => <PostCreation />} />
          <Route exact path="/post/:id" render={() => <PostPage />} />
          <Route exact path="/profile/:id" render={() => <Profile />} />
          <Route exact path="/profiles/:id/edit/password" render={() => <UserPasswordForm />} />
          <Route exact path="/profiles/:id/edit" render={() => <ProfileEdit />} /> 
          <Route path="/friends" render={() => <Friends />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;