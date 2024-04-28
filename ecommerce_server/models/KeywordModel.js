const mongoose = require("mongoose");

const { Schema } = mongoose;

const keywordSchema = new Schema({
  keyword: { type: String, require: true, unquie: true },
});

const virtual = keywordSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
keywordSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

Keyword = mongoose.model("Keyword", keywordSchema);
module.exports = Keyword;
