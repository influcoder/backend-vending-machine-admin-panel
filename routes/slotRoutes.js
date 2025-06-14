import express from "express";
import Slot from "../models/slot.js";

const router = express.Router();

// Create a new slot
router.post("/", async (req, res) => {
  try {
    const slot = new Slot(req.body);
    const savedSlot = await slot.save();
    res.status(201).json(savedSlot);
  } catch (err) {
    console.error("Error creating slot:", err);
    res.status(500).json({ error: "Failed to create slot" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { machineId } = req.query;

    if (!machineId)
      return res.status(400).json({ message: "Missing machineId" });

    const slots = await Slot.find({ machineId });
    res.status(200).json(slots);
  } catch (err) {
    console.error("Error fetching slots:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedSlot = await Slot.findByIdAndDelete(req.params.id);
    if (!deletedSlot) {
      return res.status(404).json({ message: "Slot not found" });
    }
    res
      .status(200)
      .json({ message: "Slot deleted successfully", slot: deletedSlot });
  } catch (err) {
    console.error("Error deleting slot:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { stock } = req.body;

    const updatedSlot = await Slot.findByIdAndUpdate(
      req.params.id,
      {
        ...(stock !== undefined && { stock }),
      },
      { new: true }
    );

    if (!updatedSlot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    res.status(200).json(updatedSlot);
  } catch (err) {
    console.error("Error updating slot:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
