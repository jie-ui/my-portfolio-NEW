import express from "express";
import {
  getAllUsers,
  getUserById,
  addNewUser,
  updateUserById,
  deleteUserById,
  deleteAllUsers,
} from "../controllers/users.js";
import requireAuth from "../middleware/requireAuth.js";
import requireRole from "../middleware/requireRole.js";



const router = express.Router();



router.get("/",requireAuth, requireRole("admin"), getAllUsers);
router.get("/:id",requireAuth, requireRole("admin"), getUserById);
router.post("/", requireAuth, requireRole("admin"),addNewUser);
router.put("/:id",requireAuth, requireRole("admin"), updateUserById);
router.delete("/:id",requireAuth, requireRole("admin"), deleteUserById);
router.delete("/",requireAuth, requireRole("admin"),deleteAllUsers);





export default router;

