const router = require("express").Router();
const blogController = require("./blog.controller");
const auth = require("../../middlewares/auth.middleware");

router.route("/").get(blogController.index).post(auth, blogController.store);
router
  .route("/:id")
  .get(blogController.show)
  .put(auth, blogController.update)
  .delete(blogController.destroy);

export default router;
