import http from "axios";

const apiUrl = "http://localhost:3003/api";

const postUser = (userData) => http.post(`${apiUrl}/user`, userData);
const postLogin = (userData) => http.post(`${apiUrl}/auth`, userData);

const userApi = { postUser , postLogin};
export default userApi;
