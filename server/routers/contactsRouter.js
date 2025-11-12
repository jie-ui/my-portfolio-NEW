import { Router } from "express";
import {
  getAllContacts,
  getContactById,
  addNewContact,
  updateContactById,
  deleteContactById,
  deleteAllContacts
} from "../controllers/contacts.js";
import requireAuth from "../middleware/requireAuth.js";
import requireRole from "../middleware/requireRole.js";

const router = Router();


router.post("/", addNewContact);


router.get("/", requireAuth, requireRole("Admin"), getAllContacts);
router.get("/:id", requireAuth, requireRole("Admin"), getContactById);
router.put("/:id", requireAuth, requireRole("Admin"), updateContactById);
router.delete("/:id", requireAuth, requireRole("Admin"), deleteContactById);
router.delete("/", requireAuth, requireRole("Admin"), deleteAllContacts);

export default router;
