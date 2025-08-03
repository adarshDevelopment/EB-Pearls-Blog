const router = require("express").Router();
const authRouter = require("../modules/auth/auth.router");
const tagRouter = require("../modules/tag/tag.router");
const blogRouter = require('../modules/blog/blog.router')
const commentRouter = require('../modules/comment/comment.router')
// A centralized router that adds all other routes which is then called at express.config file

router.use("/auth/", authRouter);
router.use("/tag/", tagRouter);
router.use('/blog/', blogRouter);
router.use('/comment/', commentRouter);
module.exports = router;
