// server/server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// routes
import userRouter from "./routers/usersRouter.js";
import educationRouter from "./routers/educationRouter.js";
import projectsRouter from "./routers/projectsRouter.js";
import contactsRouter from "./routers/contactsRouter.js";
import authRouter from "./routers/authRouter.js";
import profileRoutes from "./routers/profileRouter.js";
import uploadRoutes from "./routers/uploads.js";

// controllers
import { errorController } from "./controllers/errorController.js";

dotenv.config();

// --- __dirname in ESM ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API 
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRoutes);
app.use("/api/contacts", contactsRouter);
app.use("/api/education", educationRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/uploads", uploadRoutes);
app.use("/api/users", userRouter);

// error
app.use(errorController);


app.get("/", (_req, res) => {
  res.json({ message: "Welcome to My Portfolio application." });
});


console.log("🧩 MONGO_URI:", process.env.MONGODB_URI);
const URL = process.env.MONGODB_URI;

mongoose
  .connect(URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error(" MongoDB connection error:", err.message));

// START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);

