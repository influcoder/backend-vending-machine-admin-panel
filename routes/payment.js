import express from "express";
import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import Transaction from "../models/Transaction.js";
import Customer from "../models/Customer.js";

const router = express.Router();

// Create order
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid amount" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("Create Order Error:", err);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
});

// Verify payment
router.post("/verify-payment", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    phone,
    amount,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid signature" });
  }

  // Save transaction
  await Transaction.create({
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    amount: amount,
    currency: "INR",
    status: "success",
    method: "upi",
    phone,
  });

  // Update or insert customer
  await Customer.findOneAndUpdate(
    { phone },
    {
      $inc: { totalOrders: 1, totalSpent: amount },
      lastOrderAt: new Date(),
    },
    { upsert: true, new: true },
  );

  res.json({ success: true, message: "Payment verified & stored" });
});

export default router;
