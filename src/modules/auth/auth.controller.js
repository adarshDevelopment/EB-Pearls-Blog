const BaseServiceController = require("../../services/base.service");
const userService = require("../user/user.service");
const authService = require("./auth.service");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { AppConfig } = require("../../config/config");
const { generateRandomString } = require("../../util/helper");

class AuthController {
  register = async (req, res, next) => {
    try {
      // hash password and check for duplicate emails before inserting
      const data = await authService.transformRegisterData(req);
      const response = await authService.createUser(data);
      console.log("response: ", response);

      res.status(201).json({
        message: "User successfully registered",
        data: userService.getPublicUserData(response),
        options: null,
        status: "Success",
      });
    } catch (exception) {
      // all exceptions get sent to the final middleware from where necessary details get sent back to the user
      console.log("exception: ", exception);
      next(exception);
    }
  };

  login = async (req, res, next) => {
    try {
      // validate login credentials & password verification
      const data = req.body;
      const user = await userService.fetchSingleRowByFilter({
        email: data.email,
      });

      // throw exception and return failure message if user is not found
      if (!user) {
        throw {
          message: "Invalid credentials",
          code: 401,
        };
      }
      // throw the same message if passwords dont match
      if (!bcrypt.compareSync(data.password, user.password)) {
        throw {
          message: "Invalid credentials",
          code: 401,
        };
      }
      // generate refresh and access tokens, one with refresh and other with access
      const accessToken = jsonwebtoken.sign(
        { type: "access", _id: user._id, email: user.email },
        AppConfig.jwtSecret,
        { expiresIn: "1h" }
      );

      const refreshToken = jsonwebtoken.sign(
        {
          type: "refresh",
          _id: user._id,
          email: user.email,
        },
        AppConfig.jwtSecret,
        {
          expiresIn: "24h",
        }
      );

      // generate random strings for access and refrehs tokens
      const maskedAccessToken = generateRandomString();
      const maskedRefreshToken = generateRandomString();
      // store all the tokens in one record with the userId
      const loggedInUser = await authService.createSingleRow({
        user: user._id,
        refreshToken,
        accessToken,
        maskedAccessToken: maskedAccessToken,
        maskedRefreshToken: maskedRefreshToken,
      });

      res.status(201).json({
        message: "User successfully logged in",
        data: {
          accessToken: loggedInUser.maskedAccessToken,
          refreshToken: loggedInUser.maskedRefreshToken,
        },
      });
    } catch (exception) {
      next(exception);
    }
  };
}

module.exports = new AuthController();
