// server/routers/uploads.js
import { Router } from "express";
import multer from "multer";
import requireAuth from "../middleware/requireAuth.js";
import requireRole from "../middleware/requireRole.js";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const router = Router();

/* ----------------------------------------
  Cloudinary Config
----------------------------------------- */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ----------------------------------------
  Multer Storage on Cloudinary
----------------------------------------- */
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio-projects",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

/* ----------------------------------------
  Upload Route (Admin only)
----------------------------------------- */
router.post(
  "/image",
  requireAuth,
  requireRole("Admin"),
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ ok: false, error: "No file uploaded" });
    }

    return res.json({
      ok: true,
      url: req.file.path, // Cloudinary return URL
    });
  }
);

export default router;

