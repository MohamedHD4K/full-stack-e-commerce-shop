const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/user", userController.user_index_get);

router.post("/user", userController.user_index_post);


module.exports = router;
