// server/routes/uploads.js
import { Router } from "express";
import multer from "multer";
import requireAuth from "../middleware/requireAuth.js";
import requireRole from "../middleware/requireRole.js";

const router = Router();

// local/uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads"),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^\w.\-]/g, "_");
    cb(null, Date.now() + "_" + safe);
  },
});

const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!allowed.has(file.mimetype)) return cb(new Error("Only image files"));
    cb(null, true);
  },
});

// Only Admin 
router.post(
  "/image",
  requireAuth,
  requireRole("Admin"),
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ ok: false, error: "No file" });
    }
    const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.json({ ok: true, url });
  }
);

export default router;

