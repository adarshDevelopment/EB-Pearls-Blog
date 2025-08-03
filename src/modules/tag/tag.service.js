const BaseService = require("../../services/base.service");
const TagModel = require("./tag.model");

class TagService extends BaseService {
  transformCreateData = async (req) => {
    // fetch tag and check for duplicate entries
    const data = req.body;
    const tag = await this.fetchSingleRowByFilter({ title: data.title });
    if (tag) {
      throw {
        message: "Entered tag already exists. Duplicate data warning",
        code: 409,
      };
    }
    return data;
  };

  fetchMultipleRowsByFilter = async (filter = {}, query) => {
    // check sort value
    const sort = query.sort;
    // defining sortOrder, and if the query does not exist, set it as -1 on default
    const sortOrder = sort === "asc" ? 1 : sort === "desc" ? -1 : -1;

    return this.model.find(filter).sort({ createAt: sortOrder });
  };
}

module.exports = new TagService(TagModel);
