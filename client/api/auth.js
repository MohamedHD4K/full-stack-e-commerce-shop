import { jwtDecode } from "jwt-decode";

const key = "Token";

const setToken = (token) => localStorage.setItem(key, token);
const deleteToken = () => localStorage.removeItem(key);
const getToken = () => localStorage.getItem(key);
const getUser = () => {
    const token = getToken()
    return token && jwtDecode(token)
}

const auth = { setToken, deleteToken, getUser, getToken };
export default auth;