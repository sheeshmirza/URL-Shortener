const utils = require("../../utils/utils");

const requestErrorHandler = async (error, request, response, next) => {
  if (error) {
    utils.logger.error(
      "requestErrorHandler",
      `request error -> ${request.method} ${request.path} -> ${error.message}`
    );
    return response.status(400).json({
      success: false,
      message: "bad request",
    });
  }
  next();
};

module.exports = requestErrorHandler;