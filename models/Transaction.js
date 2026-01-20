import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    orderId: String,
    paymentId: String,
    amount: Number,
    currency: String,
    status: { type: String, enum: ["success", "failed", "refunded"] },
    method: String,
    phone: String,
  },
  { timestamps: true },
);

export default mongoose.model("Transaction", transactionSchema);
