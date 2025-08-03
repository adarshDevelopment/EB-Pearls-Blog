const blogService = require("./blog.service");

class BlogController {
  store = async (req, res, next) => {
    try {
      const data = await blogService.transformBlogCreate(req);
      const blog = await blogService.createSingleRow(data);
      res.status(201).json({
        data: blog,
        message: "Blog successfully created",
        status: "Success",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  index = async (req, res, next) => {
    try {
      // initialize an empty filter object
      let filter = {};
      // put search keyowrd in the filter object if there is a search in query params
      if (req.query.search) {
        filter = {
          $or: [
            { title: RegExp(req.query.search, "i") },
            { description: RegExp(req.query.search, "i") },
          ],
        };
      }

      console.log("filter: ", filter);
      /*
        filter would look like this
          filter = {$or:[{title:....}], isActive: true}
      */

      //  fetch required data from the service function
      const { data, currentPage, limit, totalPages, totalCount } =
        await blogService.listAllBlogs(filter, req.query);

      res.status(200).json({
        message: "Blogs successfully fetched",
        status: "Success",
        data,
        options: {
          pagination: {
            currentPage,
            limit,
            totalPages,
            totalItems: totalCount,
          },
        },
      });
    } catch (exception) {
      next(exception);
    }
  };

  update = async (req, res, next) => {
    try {
      // extracting id
      const _id = req.params.id;

      // service method to fetch blog or throw exception
      const blog = await blogService.verifyData(_id);

      // verifying if the entered tag is valid and if the user matches the createdUser
      const data = await blogService.transformBlogUpdate(req, blog);

      // update blog
      const updatedBlog = await blogService.updateSingleRowByFilter(
        { _id },
        data
      );

      res.status(201).json({
        message: "Blog successfully updated",
        status: "Success",
        data: updatedBlog,
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  show = async (req, res, next) => {
    try {
      const _id = req.params.id;
      const blog = await blogService.verifyData(_id);

      res.status(200).json({
        message: "Blog successfully fetched",
        options: null,
        status: "Success",
        data: blog,
      });
    } catch (exception) {
      next(exception);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const _id = req.params.id;
      // fetch selected blog
      const blog = await blogService.verifyData(_id);

      // check if the blog was created by the logged In User
      console.log(
        "loggedIn user: ",
        req.loggedInUserId,
        " | blog user: ",
        blog.user
      );
      if (blog.user.toString() !== req.loggedInUserId) {
        throw {
          message: "Unauthorized. You cannot delete this blog",
          code: 401,
        };
      }

      // call the delete function on the blog instance
      await blog.deleteOne();
      res.status(201).json({
        message: "Blog successfully deleted",
        status: "Success",
        data: null,
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
}

module.exports = new BlogController();
