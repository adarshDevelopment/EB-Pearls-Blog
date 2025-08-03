const blogService = require("../blog/blog.service");
const commentService = require("./comment.service");

class CommentController {
  index = async (req, res, next) => {
    try {
      // create filter object
      // user can write the blogId here and fetch appropriate data
      const filter = {};

      // search for keyword if req.query.search present
      if (req.query.search) {
        filter = { content: RegExp(req.query.search, "i") };
      }

      // fetch required data from service method
      const { data, pagination } = await commentService.listAllComments(
        filter,
        req.query
      );
      res.status(200).json({
        data: data,
        options: { pagination },
        message: "Comments successfully posted",
        status: "Success",
      });
    } catch (exception) {
      next(exception);
    }
  };

  fetchCommentsByBlogId = async (req, res, next) => {
    try {
      const blogId = req.params.blogId;
      // if blog id not found, throw appropriate message
      if (!blogId) {
        throw { message: "Blog not selected", code: 400 };
      }

      // check for blog
      await blogService.verifyData(blogId);

      // fetch commetns
      const { data, pagination } = await commentService.listAllComments({
        blog: blogId,
      });

      res.status(200).json({
        message: "Comments of the selected post successfully fetched",
        status: "Success",
        data,
        options: { pagination },
      });
    } catch (exception) {
      next(exception);
    }
  };

  store = async (req, res, next) => {
    try {
      // verify if the post is still intact
      const data = req.body;
      await blogService.verifyData(data.blogId);

      console.log("ujserid: ", req.loggedInUserId);
      // post comment
      const comment = await commentService.createSingleRow({
        content: data.comment,
        blog: data.blogId,
        user: req.loggedInUserId,
      });

      res.status(201).json({
        message: "Comment successfully made",
        status: "Success",
        data: comment,
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  update = async (req, res, next) => {
    try {
      const commentId = req.params.id;
      // make necessary changes to the payload
      const data = await commentService.transformUpdateBlog(req);
      // console.log('data: ', data);
      // call the update function from the baseservice
      const updatedComment = await commentService.updateSingleRowByFilter(
        { _id: commentId },
        data
      );

      res.status(201).json({
        message: "Comment successfully updated",
        status: "Success",
        data: updatedComment,
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  show = async (req, res, next) => {
    try {
      const commentId = req.params.id;
      const comment = await commentService.verifyData(commentId);

      res.status(200).json({
        message: "Comment successfully fetched",
        status: "Success",
        data: comment,
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  destory = async (req, res, next) => {
    try {
      const commentId = req.params.id;
      const comment = await commentService.verifyData(commentId);
      // check if its the same user deleting  the comment
      if (comment.user.toString() !== req.loggedInUserId) {
        throw {
          message: "Unauthorized. You cannot delete this comment",
          code: 401,
        };
      }
      await comment.deleteOne();
      res.status(201).json({
        message: "Comment successfully deleted",
        staus: "Success",
        data: null,
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
}

module.exports = new CommentController();
