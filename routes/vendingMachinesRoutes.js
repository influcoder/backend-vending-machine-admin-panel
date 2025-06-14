import express from "express";
import VendingMachine from "../models/VendingMachine.js";

const router = express.Router();

// Create/store new vending machine
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    // Validate if you want to ensure id uniqueness or other logic
    const existing = await VendingMachine.findOne({ id: data.id });
    if (existing) {
      return res.status(400).json({ message: "Machine ID already exists" });
    }

    const newMachine = new VendingMachine(data);
    await newMachine.save();
    res.status(201).json(newMachine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch all vending machines, latest first
router.get("/", async (req, res) => {
  try {
    const machines = await VendingMachine.find().sort({ createdAt: -1 }); // latest first
    res.json(machines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Active", "Inactive"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedMachine = await VendingMachine.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedMachine) {
      return res.status(404).json({ message: "Vending machine not found" });
    }

    res.json(updatedMachine);
  } catch (err) {
    console.error("Status update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
