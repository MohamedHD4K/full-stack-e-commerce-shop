const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const authMid = require("../middlewares/auth");

router.post("/api/user", userController.user_index_post);

router.post("/api/auth", userController.auth_post);

router.post("/api/products", authMid, productController.product_post);

router.get("/api/products", productController.product_get);

router.delete("/api/products/:id", productController.product_delete);

module.exports = router;
