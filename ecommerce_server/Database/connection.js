const mongoose = require("mongoose");
const DB = process.env.MONGO_URL;
// conntion to data base
const mark1 = async () => {
  await mongoose
    .connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("mongodb atlas connection Sucessful");
    })
    .catch((err) => {
      console.log(err);
    });
};

mark1();

module.exports = mark1;
