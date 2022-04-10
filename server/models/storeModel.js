const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    deliveryTime: { type: String, required: true },
    openingTime: { type: String, required: true },
    products: [
      (product = {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      }),
    ],
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
