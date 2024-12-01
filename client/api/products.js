import http from "./http";

const apiUrl = "http://localhost:3000/api";

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

const productApi = { postProduct, getProduct, deleteProduct, updateProduct };

export default productApi;
