const mongoose = require("mongoose");
const urlSchema = require("./url.schema");

const urlModel = mongoose.model("urls", urlSchema);

module.exports = urlModel;
