const BaseService = require("../../services/base.service");
const blogService = require("../blog/blog.service");
const CommentModel = require("./comment.model");

class CommentService extends BaseService {
  listAllComments = async (filter, query = {}) => {
    // setup pagination data
    const currentPage = +query.page || 1;
    const limit = +query.limit || 10;
    const skip = (currentPage - 1) * limit;

    // setup sort by data
    const sortBy = query.sort === "desc" ? -1 : query.sort === "asc" ? 1 : -1;

    // fetch data from the model
    const comments = await this.model
      .find(filter)
      .limit(limit)
      .skip(skip)
      .populate("blog", ["_id"])
      .populate("user", ["_id", "email", "name"])
      .sort({ createdAt: sortBy });

    const totalItems = await this.model.countDocuments(filter);
    console.log("commetns: ", comments);
    return {
      data: comments,
      pagination: {
        currentPage,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
      },
    };
  };

  transformUpdateBlog = async (req, commentId) => {
    try {
      const data = req.body;
      const commentId = req.params.id;
      // check if comment is still there
      const comment = await this.fetchSingleRowByFilter({ _id: commentId });
      if (!comment) {
        throw {
          message: "Comment not found",
          code: 404,
        };
      }
      // verify if the blog is still there
      await blogService.verifyData(comment.blog);

      // check if its the same user updating the comment
      if (comment.user.toString() !== req.loggedInUserId) {
        throw {
          message: "Unauthorized. You cannot make changes to this comment",
          code: 401,
        };
      }

      return {
        content: data.comment,
      };
    } catch (exception) {
      throw exception;
    }
  };
}

module.exports = new CommentService(CommentModel);
