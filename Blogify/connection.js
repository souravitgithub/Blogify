const mongoose = require("mongoose");
const connectToMongo = (url) => {
  return mongoose.connect(url);
};

module.exports = connectToMongo;
