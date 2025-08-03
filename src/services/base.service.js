class BaseService {
  constructor(model) {
    this.model = model;
  }

  fetchSingleRowByFilter = async (filter) => {
    return await this.model.findOne(filter);
  };

  fetchMultipleRowsByFilter = async (filter = {}) => {
    return await this.model.find(filter);
  };

  createSingleRow = async (data) => {
    return await this.model.create(data);
  };

  updateSingleRowByFilter = async (filter, data) => {
    // update data and return the updated data
    return await this.model.findOneAndUpdate(filter, data, { new: true });
  };

  // function to verify if the record exists. returns the data if it exists
  verifyData = async (_id) => {
    try {
      // console.log('id: ', _id, ' | model: ',this.model.modelName );
      const data = await this.model.findOne({ _id: _id });
      if (!data) {
        throw {
          // display message saying the model name does not exist
          message: `${this.model.modelName} not found`,
          code: 404,
        };
      }
      return data;
    } catch (exception) {
      throw exception;
    }
  };
}

module.exports = BaseService;
