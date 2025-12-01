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


router.get("/", requireAuth, requireRole("admin"), getAllContacts);
router.get("/:id", requireAuth, requireRole("admin"), getContactById);
router.put("/:id", requireAuth, requireRole("admin"), updateContactById);
router.delete("/:id", requireAuth, requireRole("admin"), deleteContactById);
router.delete("/", requireAuth, requireRole("admin"), deleteAllContacts);

export default router;
