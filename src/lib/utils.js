import axios from "axios";
import jwtDecode from "jwt-decode";

export const isValidToken = accessToken => {
    if (!accessToken) {
        return false;
    }
    const decoded = jwtDecode(accessToken);

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
};

const handleTokenExpired = exp => {
    let expiredTimer;

    const currentTime = Date.now();

    // Test token expires after 10s
    // const timeLeft = currentTime + 10000 - currentTime; // ~10s
    const timeLeft = exp * 1000 - currentTime;

    clearTimeout(timeLeft);
};

export const setSession = accessToken => {
    if (accessToken) {
        localStorage.setItem('access', accessToken.access);
        localStorage.setItem('refresh', accessToken.refresh);
        localStorage.setItem('user', JSON.stringify(accessToken.user))
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken.access}`;
    } else {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common.Authorization;
    }
};