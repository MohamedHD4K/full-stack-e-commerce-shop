const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/api/user", userController.user_index_get);

router.post("/api/user", userController.user_index_post);

router.post("/api/user/login", userController.user_login_post);


module.exports = router;
