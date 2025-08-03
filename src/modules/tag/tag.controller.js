const tagService = require("./tag.service");

class TagController {
  index = async (req, res, next) => {
    try {
      //
      const filter = {};
      // use RegExp to serach for matching keywords and attach it to filter object
      if (req.query.search) {
        filter = { ...filter, title: RegExp(req.query.search, "i") };
      }

      // fetch from overridden method to also sort the result
      const tags = await tagService.fetchMultipleRowsByFilter(
        filter,
        req.query
      );

      res.status(200).json({
        message: "Tags fetched successfully",
        status: "Success",
        options: null,
        data: tags,
      });
    } catch (exception) {
      next(exception);
    }
  };

  store = async (req, res, next) => {
    try {
      const data = await tagService.transformCreateData(req);
      const tag = await tagService.createSingleRow(data);
      res.status(201).json({
        message: "Tag successfully created",
        status: "Success",
        options: null,
        data: tag,
      });
    } catch (exception) {
      next(exception);
    }
  };

  // function to verify if the record exists in the collection
  udpate = async (req, res, next) => {
    try {
      const _id = req.params.id;
      const data = req.body;

      // fetch tag and see if it exists
      const tag = await tagService.verifyData(_id)
      // update using update function in the Base service class
      const updatedTag = await tagService.updateSingleRowByFilter(
        { _id },
        data
      );

      res.status(201).json({
        message: "Tag successfully updated",
        status: "Success",
        options: null,
        data: updatedTag,
      });
    } catch (exception) {
      next(exception);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const _id = req.params.id;
      // fetch tag, and if not found, throw exception
      const tag = await tagService.verifyData(_id)
      // delete the record through the tag instance
      await tag.deleteOne();
      res.status(201).json({
        message: "Tag successfully deleted",
        status: "Success",
        data: null,
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  show = async (req, res, next) => {
    try {
      const id = req.params.id;
      const tag = await tagService.verifyData(id)
      res.status(200).json({
        message: "tag successfully fetched",
        success: "Success",
        data: tag,
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
}

module.exports = new TagController();
