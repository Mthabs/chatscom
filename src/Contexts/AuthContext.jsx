import {createContext, useContext, useEffect, useState} from 'react';
import AxiosServices, {baseUrl} from "../Config/AxiosServices";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {setSession} from "../lib/utils";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('refresh') ? localStorage.getItem('refresh') : null)
    let [isAuthenticated, setIsAuthenticated] = useState(false)
    let [user, setUser] = useState(null)
    let [loading, setLoading] = useState(true)
    const history = useHistory();
    const {pathname} = useLocation()


    useEffect(() => {
        const initialize = async () => {
            if (localStorage.getItem('user')) {
                setUser(JSON.parse(localStorage.getItem('user')))
                // axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('access')}`;
                setIsAuthenticated(true)
                setLoading(false)
            } else {
                setUser(null)
                setIsAuthenticated(false)
                setLoading(false)
            }
        };

        initialize();
    }, [loading]);

    let updateToken = async () => {
        let token = localStorage.getItem('refresh')
        let response = await AxiosServices.post('/dj-rest-auth/token/refresh/', {refresh: token})

        if (response.status === 200) {
            // console.log(response)
            setAuthTokens(response.data.access)
            localStorage.setItem('access', response.data.access);
        } else {
            setSession(null);
            setIsAuthenticated(false)
            setUser(null)
            history.push("/")
        }
        if (loading) {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (loading) {
            updateToken()
        }
        let fourMinutes = 1000 * 60 * 2

        let interval = setInterval(() => {
            if (authTokens) {
                console.log("ey")
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)

    }, [authTokens, loading])

    useEffect(() => {
        if (authTokens) {
            return;
        } else {
            if (pathname === "/" || pathname === "/signup") {
                return;
            } else {
                history.push("/")
            }
        }
    }, [authTokens]);

    return (
        <AuthContext.Provider
            value={{isAuthenticated, setIsAuthenticated, user, setUser, loading, setLoading}}
        >
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        throw new Error("useAuth used outside of the Provider")
    }
    return authContext;
}
