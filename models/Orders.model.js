const { Schema, model } = require("mongoose");

// Financial record schema

const ordersSchema = new Schema({
  orders: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      products: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
          },
          quantity: {
            type: Number,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          
          idOwner: {
            type: Schema.Types.ObjectId,
            ref: "User", 
          },
        },
      ],
      transactionType: {
        type: String,
        enum: ["Backlog", "Sent"],
        required: true,
        default: "Backlog",
      },
      amount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      transactionId: {
        type: String,
      },
    },
  ],
});

// FinancialRecord model
const Orders = model("Orders", ordersSchema);

module.exports = Orders;
