const joi = require("joi");

const CreateBlogDto = joi.object({
  title: joi.string().min(2).max(150).required(),
  description: joi.string().min(10).required(),
  tag: joi.string().required(),
});

const UpdateBlogDTO = joi.object({
  title: joi.string().min(2).max(150).required(),
  description: joi.string().min(10).required(),
  tag: joi.string().required(),
});

module.exports = {
  CreateBlogDto,
  UpdateBlogDTO,
};
