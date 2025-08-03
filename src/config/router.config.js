const router = require("express").Router();
const authRouter = require("../modules/auth/auth.router");
const tagRouter = require("../modules/tag/tag.router");
// A centralized router that adds all other routes which is then called at express.config file

router.use("/auth/", authRouter);
router.use("/tag/", tagRouter);

module.exports = router;
