const router = require("express").Router();
const commentController = require("./comment.controller");
const auth = require("../../middlewares/auth.middleware");
const requestValidator = require("../../middlewares/requestValidator.middleware");
const { UpdateBlogDTO, CreateBlogDTO } = require("./comment.validator");

router.get("/:blogId", commentController.fetchCommentsByBlogId);
router
  .route("/")
  .get(commentController.index)
  .post(auth, requestValidator(CreateBlogDTO), commentController.store);
router
  .route("/:id")
  .get(commentController.show)
  .put(auth, requestValidator(UpdateBlogDTO), commentController.update)
  .delete(auth, commentController.destory);
module.exports = router;
