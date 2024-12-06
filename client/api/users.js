import http from './http'

const apiUrl = "http://localhost:3001/api";

const postUser = userData => http.post(`${apiUrl}/user`, userData);
const postLogin = userData => http.post(`${apiUrl}/auth`, userData);
const updateUser = userData => http.put(`${apiUrl}/auth`, userData);

const userApi = { postUser , postLogin , updateUser };
export default userApi;
