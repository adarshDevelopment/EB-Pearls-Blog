const tagController = require("./tag.controller");
const router = require("express").Router();
const auth = require("../../middlewares/auth.middleware");
const requestValidator = require("../../middlewares/requestValidator.middleware");
const {  CreateTagDTO, UpdateTagDTO } = require("./tag.validator");
// adding auth middlwawre to store, delete and update handlers
// not writing anything for '/' becuase there is already '/tag' mentioned in the router file
router
  .route("/:id")
  .get(tagController.show)
  .delete(auth, tagController.destroy)
  .put(auth, requestValidator(UpdateTagDTO), tagController.udpate);
router.route("/").post(auth, requestValidator(CreateTagDTO), tagController.store).get(tagController.index);

module.exports = router;
