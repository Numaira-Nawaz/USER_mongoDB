const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares");
const { userController } = require("../controllers");

router.post("/signUp", userController.create);


router.get("/getUserList", auth, userController.get);

router.get("/getSingleUser", userController.getSingle);

router.delete("/delete", auth, userController.deleteSingle);

router.patch("/update", auth, userController.updateSingle);

router.post("/login",userController.login);

module.exports = router;
