const bodyValidator = (schema) => {
  return async (req, res, next) => {
    try {
      const data = req.body;
      if (!data) {
        next({
          code: 422,
          message: "Empty payload...",
        });
      }
      // throws exception if fails
      await schema.validateAsync(data, { abortEarly: false });

      // skips to the next middleware
      next();
    } catch (e) {
      let messageBag = {};
      // error is stored in path inside details key of the joi error object
      e.details.map((error) => {
        let key = error.path.pop();
        messageBag[key] = error.message;
      });

      next({
        code: 422,
        detail: messageBag,
        message: "Validation Failed",
        status: "VALIDATION_FAILED",
      });
    }
  };
};

module.exports = bodyValidator;
