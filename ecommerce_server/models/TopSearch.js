const mongoose = require("mongoose");
const { Schema } = mongoose;

const topsearchSchema = new Schema({
  topsearch: { type: String, required: true },
});

const virtual = topsearchSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
topsearchSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

TopSearch = mongoose.model("TopSearch", topsearchSchema);
module.exports = TopSearch;
