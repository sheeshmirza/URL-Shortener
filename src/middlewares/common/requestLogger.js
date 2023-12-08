const utils = require("../../utils/utils");

const requestLogger = async (request, response, next) => {
  utils.logger.log(
    "requestLogger",
    `new request -> ${request.method} ${request.path}`
  );
  next();
};

module.exports = requestLogger;