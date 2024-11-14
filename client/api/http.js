import http from "axios";

const apiUrl = "http://localhost:3003";

export const postUser = (userData) =>
  http
    .post(`${apiUrl}/user`, userData)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));