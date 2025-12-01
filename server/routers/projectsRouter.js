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


router.get("/",requireAuth, requireRole("user","admin") ,getAllProjects);
router.get("/:id",requireAuth, requireRole("user","admin"), getProjectById);


router.post("/", requireAuth, requireRole("admin"), addNewProject);
router.put("/:id", requireAuth, requireRole("admin"), updateProjectById);
router.delete("/:id", requireAuth, requireRole("admin"), deleteProjectById);
router.delete("/", requireAuth, requireRole("admin"), deleteAllProjects);

export default router;
