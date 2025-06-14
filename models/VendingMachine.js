// models/VendingMachine.js
import mongoose from "mongoose";

const VendingMachineSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    stockLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    lastRefill: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("VendingMachine", VendingMachineSchema);
