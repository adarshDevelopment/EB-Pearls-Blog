const router = require("express").Router();
const authController = require("./auth.controller");
const requestValidator = require('../../middlewares/requestValidator.middleware');
const {LoginDTO, RegisterDTO} = require('./auth.validator')

router.post("/register", requestValidator(RegisterDTO), authController.register);
router.post("/login", requestValidator(LoginDTO), authController.login);
module.exports = router;
