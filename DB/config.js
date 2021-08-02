let mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/BookStore")
  .then(() => {
    console.log("connection successfull yes");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
