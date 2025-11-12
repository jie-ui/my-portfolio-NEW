import { Router } from "express";
import {
  getAllQualifications,
  getQualificationById,
  addNewQualification,
  updateQualificationById,
  deleteQualificationById,
  deleteAllQualifications
} from "../controllers/education.js";
import requireAuth from "../middleware/requireAuth.js";
import requireRole from "../middleware/requireRole.js";

const router = Router();


router.get("/", requireAuth, requireRole("User","Admin"),getAllQualifications);
router.get("/:id",requireAuth, requireRole("User","Admin"), getQualificationById);


router.post("/", requireAuth, requireRole("Admin"), addNewQualification);
router.put("/:id", requireAuth, requireRole("Admin"), updateQualificationById);
router.delete("/:id", requireAuth, requireRole("Admin"), deleteQualificationById);
router.delete("/", requireAuth, requireRole("Admin"), deleteAllQualifications);

export default router;
