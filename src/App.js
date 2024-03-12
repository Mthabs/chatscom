import {Route, Switch} from "react-router-dom";
import Home from "./pages/home/home";
import Videos from "./pages/videos/videos";
import Photos from "./pages/photos/photos";
import NotFound from "./pages/not-found/not-found";
import "./styles/global.css"
import Login from "./pages/login/login";
import {AuthProvider} from "./Contexts/AuthContext";
import Friends from "./pages/friends/friends";
import Profile from "./pages/profile/profile";
import SignUp from "./pages/sign-up/sign-up";

function App() {
    return (
        <>
            <Switch>
                <Route exact path="/" render={() => (
                    <AuthProvider>
                        <Login/>
                    </AuthProvider>
                )}/>
                <Route exact path="/signup" render={() => (
                    <AuthProvider>
                        <SignUp/>
                    </AuthProvider>
                )}/>
                <Route exact path="/feed/home" render={() => (
                    <AuthProvider>
                        <Home/>
                    </AuthProvider>
                )}/>
                <Route path="/feed/videos" render={() => (
                    <AuthProvider>
                        <Videos/>
                    </AuthProvider>
                )}/>
                <Route path="/feed/photos" render={() => (
                    <AuthProvider>
                        <Photos/>
                    </AuthProvider>
                )}/>
                <Route path="/feed/friends" render={() => (
                    <AuthProvider>
                        <Friends/>
                    </AuthProvider>
                )}/>
                <Route path="/feed/profile" render={() => (
                    <AuthProvider>
                        <Profile/>
                    </AuthProvider>
                )}/>
                <Route component={NotFound}/>
            </Switch>
        </>
    );
}

export default App;