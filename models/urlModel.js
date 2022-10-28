const mongoose = require("mongoose");
//schema Validation
const urlSchema = mongoose.Schema({
  url: {
    type: String,
  },
  short_url: {
    type: String,
  },
  total_visit: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

var Url = mongoose.model("urls", urlSchema);
module.exports = Url;
