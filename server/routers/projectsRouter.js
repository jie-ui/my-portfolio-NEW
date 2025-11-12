import { Router } from "express";
import {
  getAllProjects,
  getProjectById,
  addNewProject,
  updateProjectById,
  deleteProjectById,
  deleteAllProjects
} from "../controllers/projects.js";
import requireAuth from "../middleware/requireAuth.js";
import requireRole from "../middleware/requireRole.js";

const router = Router();


router.get("/",requireAuth, requireRole("User","Admin") ,getAllProjects);
router.get("/:id",requireAuth, requireRole("User","Admin"), getProjectById);


router.post("/", requireAuth, requireRole("Admin"), addNewProject);
router.put("/:id", requireAuth, requireRole("Admin"), updateProjectById);
router.delete("/:id", requireAuth, requireRole("Admin"), deleteProjectById);
router.delete("/", requireAuth, requireRole("Admin"), deleteAllProjects);

export default router;
