const joi = require("joi");

const CreateTagDTO = joi.object({
  title: joi.string().max(150).required(),
});

const UpdateTagDTO = joi.object({
  title: joi.string().max(150).required(),
});

module.exports = {
  CreateTagDTO,
  UpdateTagDTO,
};
