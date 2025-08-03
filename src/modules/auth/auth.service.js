const BaseServiceController = require("../../services/base.service");
const userService = require("../user/user.service");
const AuthModel = require("./auth.model");
const bcrypt = require("bcrypt");
const UserModel = require("../user/user.model");

class AuthService extends BaseServiceController {
  transformRegisterData = async (req) => {
    try {
      const data = req.body;
      const user = await userService.fetchSingleRowByFilter({
        email: data.email,
      });
      // check for duplicate error
      if (user) {
        throw {
          message: "Email already exists",
          code: 409,
        };
      }
      // hash password
      const hashedPassword = bcrypt.hashSync(data.password,12);
      return {
        email: data.email,
        password: hashedPassword,
        name: data.name,
      };
    } catch (exception) {
      console.log('exception: ', exception);
      throw exception;
    }
  };

  createUser = async (data) => {
    // try catch block to find specific exceptions
    try {
      return await UserModel.create(data);
    } catch (exception) {
      throw exception;
    }
  };
}

module.exports = new AuthService(AuthModel);
