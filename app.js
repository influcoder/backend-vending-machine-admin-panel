import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import vendingMachinesRoutes from "./routes/vendingMachinesRoutes.js";
import slotRoutes from "./routes/slotRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.json());

// Use routes
app.use("/api/order", orderRoutes);
app.use("/api/adminAuth", authRoutes);
app.use("/api/vendingMachines", vendingMachinesRoutes);
app.use("/api/slots", slotRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
