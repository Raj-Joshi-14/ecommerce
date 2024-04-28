const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    quantity: { type: Number, required: true },
    // ref is like a foreign key
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    size: { type: Schema.Types.Mixed },
    color: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

const virtual = cartSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
