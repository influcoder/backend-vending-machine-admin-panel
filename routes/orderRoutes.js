import express from "express";
import razorpay from "../config/razorpay.js";

const router = express.Router();

// ✅ Create Razorpay Order (for Checkout.js)
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1, // auto-capture
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("Order creation failed:", err);
    res.status(500).json({
      success: false,
      message: "Could not create Razorpay order",
    });
  }
});

export default router;
