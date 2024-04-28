const mongoose = require("mongoose");
const { Schema } = mongoose;

const highlightSchema = new Schema({
  // idd: { type: String, required: true, unique: true },
  imgsrc: { type: String, required: true },
});

const virtual = highlightSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
highlightSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

Highlight = mongoose.model("Highlight", highlightSchema);
module.exports = Highlight;
