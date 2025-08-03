const joi = require('joi');

const RegisterDTO = joi.object({
  name: joi.string().min(2).max(75),
  email: joi.string().email().required(),
  password: joi.string().min(8).required()
})

const LoginDTO= joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required()
});

module.exports = {
  LoginDTO,
  RegisterDTO
}