require("./Schemas/User");
require("./Schemas/InviteCode");
const mongoose = require("mongoose");
const connect = async () => {
  return new Promise((resolve) => {
    mongoose.connect("mongodb://127.0.0.1:27017/book-mgr");
    mongoose.connection.on("open", () => {
      console.log("连接数据库成功");
      resolve();
    });
  });
};

module.exports = {
  connect,
};
