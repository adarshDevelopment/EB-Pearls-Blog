const { default: slugify } = require("slugify");
const BaseService = require("../../services/base.service");
const tagService = require("../tag/tag.service");
const BlogModel = require("./blog.model");
const { generateRandomString } = require("../../util/helper");

class BlogService extends BaseService {
  transformBlogCreate = async (req) => {
    // extract req.body
    const data = req.body;

    // validate if tag exists
    const tag = await tagService.fetchSingleRowByFilter({ _id: data.tag });
    if (!tag) {
      throw {
        message: "Entered tag does not exist",
        status: 409,
      };
    }

    // attach user._id to user field
    data["user"] = req.loggedInUserId;

    // create slug and replace all special character with blank and join it with a random string
    const slug = slugify(
      data.title.replace("+", "").replace(`"`, ``).replace(`'`, ``) +
        "_" +
        generateRandomString(5),
      { lower: true, strict: true }
    );
    data['slug']= slug;

    //  return data
    return data;
  };

  listAllBlogs = async (filter, query) => {
    try {
      // setting up pagination data
      const currentPage = query.page || 1;
      const limit = query.limit || 10;
      const skip = (currentPage - 1) * limit;

      const sortBy = query.sort === "desc" ? -1 : query.sort === "asc" ? 1 : -1;

      const data = await this.model
        .find(filter)
        .skip(skip)
        .limit(limit)
        .populate("user", ["_id", "email", "name"])
        .populate("tag", ["_id", "title"])
        .sort({ createdAt: sortBy });

      // fetching total count
      const totalCount = await this.model.countDocuments(filter);

      return {
        data,
        currentPage,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit), // round off the total value to find the total number of pages
      };
    } catch (exception) {
      throw exception;
    }
  };

  // function to validate user and see if the entered tag is valid
  transformBlogUpdate = async (req, blog) => {
    // check if it is the same user
    const data = req.body;
    console.log('logged In user: ', req.loggedInUserId, ' | blgo id: ', blog.user)
    if (blog.user.toString() !== req.loggedInUserId) {
      throw {
        message: "You are not authorized to make changes to this blog.",
        code: 401,
      };
    }

    // check if entered tag is valid
    const tag = await tagService.fetchSingleRowByFilter({ _id: data.tag });
    if (!tag) {
      throw {
        message: "The tag you entered does not exist",
        code: 404,
      };
    }

    // return data
    return data;
  };
}
module.exports = new BlogService(BlogModel);
