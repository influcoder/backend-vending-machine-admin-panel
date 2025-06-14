import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password required" });
    }

    let adminUser = await Admin.findOne({ email });
    console.log("Admin found:", adminUser);

    // If user not found, create one
    if (!adminUser) {
      const passwordHash = await bcrypt.hash(password, 10);
      adminUser = await Admin.create({ email, passwordHash });
      console.log("New admin created:", adminUser);
    }

    // Compare entered password with stored hash
    const isMatch = await bcrypt.compare(password, adminUser.passwordHash);
    console.log("Entered password:", password);
    console.log("Stored hash:", adminUser.passwordHash);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { email: adminUser.email, role: "admin" },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "2h" }
    );

    return res.json({ success: true, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
