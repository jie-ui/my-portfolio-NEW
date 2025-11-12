import mongoose from "mongoose";
import Contact from "../models/Contact.js";

//  GET /api/contacts 
export const getAllContacts = async (req, res, next) => {
  try {
    const docs = await Contact.find({}).lean();
    res.json({ ok: true, data: docs });
  } catch (err) {
    next(err);
  }
};

//  GET /api/contacts/:id
export const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ ok: false, error: "Invalid id" });

    const doc = await Contact.findById(id).lean();
    if (!doc) return res.status(404).json({ ok: false, error: "Not found" });
    res.json({ ok: true, data: doc });
  } catch (err) {
    next(err);
  }
};

//  POST /api/contacts -> 
export const addNewContact = async (req, res, next) => {
  try {
    const doc = await Contact.create(req.body);
    res.status(201).json({ ok: true, data: doc, message: "Contact submitted successfully" });
  } catch (err) {
    next(err);
  }
};

//  PUT /api/contacts/:id ->
export const updateContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ ok: false, error: "Invalid id" });

    const doc = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      context: "query",
    });
    if (!doc) return res.status(404).json({ ok: false, error: "Not found" });
    res.json({ ok: true, data: doc, message: "Contact updated successfully" });
  } catch (err) {
    next(err);
  }
};

//  DELETE /api/contacts/:id 
export const deleteContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ ok: false, error: "Invalid id" });

    const doc = await Contact.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ ok: false, error: "Not found" });
    res.json({ ok: true, data: doc, message: "Contact deleted successfully" });
  } catch (err) {
    next(err);
  }
};

//  DELETE /api/contacts 
export const deleteAllContacts = async (_req, res, next) => {
  try {
    const r = await Contact.deleteMany({});
    res.json({ ok: true, deletedCount: r.deletedCount, message: "All contacts deleted" });
  } catch (err) {
    next(err);
  }
};
