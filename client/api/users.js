import http from './http'

const apiUrl = "http://localhost:3000/api";

const postUser = userData => http.post(`${apiUrl}/user`, userData);
const postLogin = userData => http.post(`${apiUrl}/auth`, userData);

const userApi = { postUser , postLogin};
export default userApi;
