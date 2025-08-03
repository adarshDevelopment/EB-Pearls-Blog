const authService = require("../modules/auth/auth.service");
const jsonWebtoken = require("jsonwebtoken");
const {AppConfig} = require('../config/config')

/*
  - fetches the masked access token from the authorization headers
  - fetches the corresponding access token from the auths collection
  - verifies it using jsonwebtoken
  - attaches the user_id from the payload to the request object
*/
const auth = async (req, res, next) => {
  try {
    // extract masked access token
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw {
        message: "Authorization header missing or invalid",
        code: 401,
      };
    }

    const token = authHeader.split(" ")[1];

    // fetch access token from the masked token from the auths collection
    const authRow = await authService.fetchSingleRowByFilter({
      maskedAccessToken: token,
    });

    // if not found throw exception
    if (!authRow) {
      throw {
        message: "Invalid token. Access token not found",
        code: 401,
      };
    }

    // verify accessToken and automatically throw exception if invalid
    const payload = jsonWebtoken.verify(authRow.accessToken, AppConfig.jwtSecret);

    // extract user._id jwt payload and attach it to the request object
    req.loggedInUserId = payload._id;

    // call the next middleware
    next();
  } catch (exception) {
    console.log("exception: ", exception);
    next(exception);
  }
};

module.exports = auth;
