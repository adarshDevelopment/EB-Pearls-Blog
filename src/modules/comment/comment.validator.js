const joi = require("joi");

const CreateBlogDTO = joi.object({
  comment: joi.string().max(150).required(),
  blogId: joi.string().required(),
});

const UpdateBlogDTO = joi.object({
  comment: joi.string().max(150).required(),
});

module.exports = {
  CreateBlogDTO,
  UpdateBlogDTO,
};
