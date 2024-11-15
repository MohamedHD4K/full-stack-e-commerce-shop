import http from "axios";

const apiUrl = "http://localhost:3003/api";

const postUser = (userData) => http.post(`${apiUrl}/user`, userData);
const postLogin = (userData) => http.post(`${apiUrl}/user/login`, userData);
const getUser = () => http.get(`${apiUrl}/user`);

const userApi = { postUser, getUser , postLogin};
export default userApi;
