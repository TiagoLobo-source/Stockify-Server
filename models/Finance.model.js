const { Schema, model } = require("mongoose");

// Financial record schema
const financialRecordSchema = new Schema(
  {
    // Reference to the user (either supplier or buyer)
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },

    
    // Transaction type
    transactionType: {
      type: String,
      enum: ["Backlog", "Sent"],
      required: true,
      default:"Backlog"
    },
    // quantity of the transaction
    quantity: {
      type: Number,
      required: true,
    },

    // Amount of the transaction
    amount: {
      type: Number,
      required: true,
    },
    // Date of the transaction
    date: {
      type: Date,
      default: Date.now,
    },

    //Fiscal information
    taxNumber: {
      type: String,
    },

    // Additional details or notes about the transaction
    notes: {
      type: String,
    },

    // Total sales income of the supplier

 
  },

  {
    timestamps: true,
  }
);

// FinancialRecord model
const FinancialRecord = model("FinancialRecord", financialRecordSchema);

module.exports = FinancialRecord;
