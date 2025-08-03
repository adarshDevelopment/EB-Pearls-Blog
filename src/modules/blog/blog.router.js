const router = require("express").Router();
const blogController = require("./blog.controller");
const auth = require("../../middlewares/auth.middleware");
const { CreateBlogDto, UpdateBlogDTO } = require("./blog.validator");
const requestValidator = require("../../middlewares/requestValidator.middleware");

router
  .route("/")
  .get(blogController.index)
  .post(auth, requestValidator(CreateBlogDto), blogController.store);
router
  .route("/:id")
  .get(blogController.show)
  .put(auth, requestValidator(UpdateBlogDTO), blogController.update)
  .delete(auth, blogController.destroy);
  router.get('/list-comments/:id', blogController.listAllComments);

module.exports = router;
