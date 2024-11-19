import http from "./http";

const apiUrl = 'http://localhost:3003/api';

const postProduct = (productData) =>
  http.post(`${apiUrl}/products`, productData);

const producApi = { postProduct };

export default producApi;
