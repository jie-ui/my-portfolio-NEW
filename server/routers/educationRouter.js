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


router.get("/", requireAuth, requireRole("user","admin"),getAllQualifications);
router.get("/:id",requireAuth, requireRole("user","admin"), getQualificationById);


router.post("/", requireAuth, requireRole("admin"), addNewQualification);
router.put("/:id", requireAuth, requireRole("admin"), updateQualificationById);
router.delete("/:id", requireAuth, requireRole("admin"), deleteQualificationById);
router.delete("/", requireAuth, requireRole("admin"), deleteAllQualifications);

export default router;
