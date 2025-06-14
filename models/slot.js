import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema(
  {
    product: { type: String, required: true },
    image: { type: String },
    stock: { type: Number, default: 0 },
    machineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VendingMachine",
      required: true,
    },
    lastRefill: {
      type: Date,
      default: Date.now, // default is "created at"
    },
  },
  { timestamps: true }
);

export default mongoose.model("Slot", SlotSchema);
