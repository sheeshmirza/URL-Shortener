const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  shortCode: {
    type: String,
    require: true,
  },
  longUrl: {
    type: String,
    require: true,
  },
  clickedCounts: {
    type: Number,
    require: false,
    default: 0,
  },
  /*
  // under development
  isMonetized: {
    type: Boolean,
    require: false,
    default: false,
  },
  monetizationId: {
    type: String,
    require: false,
    default: null,
  },
  */
  createdAt: {
    type: Number,
    require: false,
    default: Date.now,
  },
  /*
  // under development
  updatedAt: {
    type: Number,
    require: false,
    default: Date.now,
  },
  */
  expiredAt: {
    type: Number,
    require: false,
    default: Date.now,
  },
  /*
  // under development
  createdBy: {
    type: String,
    require: false,
    default: null,
  },
  */
});

module.exports = urlSchema;
