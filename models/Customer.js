import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    phone: { type: String, unique: true },
    totalOrders: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    lastOrderAt: Date,
    consent: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model("Customer", customerSchema);
