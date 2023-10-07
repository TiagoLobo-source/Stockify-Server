const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const productSchema = new Schema(
  {
    title: {
      type: String,
    },

    description: {
      type: String,
    },

    stock: {
      type: Number,
    },

    price: {
      type: Number,
    },

    imageProduct: {
      type: String,
    },

    idOwner: {
      type: Schema.Types.ObjectId,
      reference: "User",
    },
  },
  {
    // this second object adds extra properties: createdAt and updatedAt
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
