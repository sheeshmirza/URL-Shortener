const utils = require('../../utils/utils');

const resourceError = async (request, response) => {
  utils.logger.error('404-error', 'request lost');
  return response.status(404).json({
    status: "error",
    message: "resource not found",
  });
};

module.exports = resourceError;