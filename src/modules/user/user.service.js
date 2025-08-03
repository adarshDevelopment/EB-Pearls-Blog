const BaseServiceClass = require("../../services/base.service");
const UserModel = require('./user.model')

class UserService extends BaseServiceClass {
  getPublicUserData = (data)=>{
    return {
      email: data.email,
      name: data.name
    }
  }
}

module.exports = new UserService(UserModel);
