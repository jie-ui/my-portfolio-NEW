import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ ok: false, error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 👇 从数据库中查完整用户信息（带 role）
    const user = await User.findById(decoded.id).select("_id name email role");

    if (!user) {
      return res.status(404).json({ ok: false, error: "User not found" });
    }

    req.user = user; // 👈 这一步确保返回的数据里有 role
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ ok: false, error: "Unauthorized" });
  }
}

