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



router.get("/",requireAuth, requireRole("Admin"), getAllUsers);
router.get("/:id",requireAuth, requireRole("Admin"), getUserById);
router.post("/", requireAuth, requireRole("Admin"),addNewUser);
router.put("/:id",requireAuth, requireRole("Admin"), updateUserById);
router.delete("/:id",requireAuth, requireRole("Admin"), deleteUserById);
router.delete("/",requireAuth, requireRole("Admin"),deleteAllUsers);





export default router;

