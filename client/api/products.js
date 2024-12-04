import http from "./http";

const apiUrl = "http://localhost:3001/api";

const postProduct = (productData) =>
  http.post(`${apiUrl}/products`, productData);

const getProduct = () => http.get(`${apiUrl}/products`);

const deleteProduct = (productData) => {
  http.delete(`${apiUrl}/products/${productData}`);
  console.log(productData);
};

const updateProduct = (productData) => {
  http.put(`${apiUrl}/products/`, productData);
};

const updatComment = (productData) => {
  console.log(productData);
  http.put(`${apiUrl}/products/`, productData);
};


const productApi = { postProduct, getProduct, deleteProduct, updateProduct , updatComment };

export default productApi;
