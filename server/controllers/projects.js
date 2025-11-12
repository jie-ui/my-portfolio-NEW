// controllers/projects.js
import mongoose from "mongoose";
import Project from "../models/Project.js";

// GET /api/projects
export const getAllProjects = async (_req, res, next) => {
  try {
    const docs = await Project.find({}).lean();
    res.json({ ok: true, data: docs });
  } catch (err) { next(err); }
};

// GET /api/projects/:id
export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ ok: false, error: "Invalid id" });

    const doc = await Project.findById(id).lean();
    if (!doc) return res.status(404).json({ ok: false, error: "Not found" });
    res.json({ ok: true, data: doc });
  } catch (err) { next(err); }
};

// POST /api/projects
export const addNewProject = async (req, res, next) => {
  try {
    const body = { ...req.body };
    if (typeof body.tech === "string") {
      body.tech = body.tech.split(",").map(t => t.trim()).filter(Boolean);
    }
    const doc = await Project.create(body);
    res.status(201).json({ ok: true, data: doc });
  } catch (err) { next(err); }
};

// PUT /api/projects/:id
export const updateProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ ok: false, error: "Invalid id" });

    const body = { ...req.body };
    if (typeof body.tech === "string") {
      body.tech = body.tech.split(",").map(t => t.trim()).filter(Boolean);
    }

    const doc = await Project.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
      context: "query",
    });
    if (!doc) return res.status(404).json({ ok: false, error: "Not found" });
    res.json({ ok: true, data: doc });
  } catch (err) { next(err); }
};

// DELETE /api/projects/:id
export const deleteProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ ok: false, error: "Invalid id" });

    const doc = await Project.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ ok: false, error: "Not found" });
    res.json({ ok: true, data: doc });
  } catch (err) { next(err); }
};

// DELETE /api/projects  
export const deleteAllProjects = async (_req, res, next) => {
  try {
    const r = await Project.deleteMany({});
    res.json({ ok: true, deletedCount: r.deletedCount });
  } catch (err) { next(err); }
};

