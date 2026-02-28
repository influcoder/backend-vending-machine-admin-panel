import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import razorpay from "./config/razorpay.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import vendingMachinesRoutes from "./routes/vendingMachinesRoutes.js";
import slotRoutes from "./routes/slotRoutes.js";
import payment from "./routes/payment.js";
import customerRoutes from "./routes/customer.routes.js";

dotenv.config();

const app = express();

connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "https://vendotea.netlify.app",
  "https://www.vendotea.netlify.app",
  "https://vending-machine-adminpanel.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(bodyParser.json());

// Use routes
// app.use("/api/order", orderRoutes);
app.use("/api/adminAuth", authRoutes);
app.use("/api/vendingMachines", vendingMachinesRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/payment", payment);
app.use("/api/customers", customerRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
