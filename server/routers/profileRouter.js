import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import requireRole from "../middleware/requireRole.js";
import User from "../models/User.js";

const router = express.Router();



router.get("/me", requireAuth, async (req, res) => {
  try {
    res.status(200).json({
      ok: true,
      data: req.user, // 👈 已包含 role
      message: "Fetched user successfully",
    });
  } catch (err) {
    console.error("Fetch user error:", err);
    res.status(500).json({ ok: false, error: "Failed to fetch user" });
  }
});






router.get("/all", requireAuth, requireRole("Admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ ok: true, data: users, message: "Fetched all users (Admin)" });
  } catch (err) {
    console.error("Fetch all users error:", err);
    res.status(500).json({ ok: false, error: "Failed to fetch users" });
  }
});

export default router;

