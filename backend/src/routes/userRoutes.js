const express = require("express");
const router = express.Router();
const usersControllers = require("../controller/userController");
// Validations Middleware
const registerValidator = require("../middlewares/registerValidator");
const loginValidator = require("../middlewares/loginValidator");

router.get("/getUser/:id", usersControllers.getUser);
router.post("/register", registerValidator, usersControllers.register);
router.post("/login", loginValidator, usersControllers.login);
router.put("/update/:id", registerValidator, usersControllers.editUser);
router.delete("/delete/:id", registerValidator, usersControllers.deleteUser);


module.exports = router;