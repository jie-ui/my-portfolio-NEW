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

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* -------------------------------------------------------
   CORS 
------------------------------------------------------- */

const allowedOrigins = [
  "https://my-portfolio-new-blush.vercel.app",
  "http://localhost:5173",
  process.env.RENDER_EXTERNAL_URL, 
];


const cleanOrigins = allowedOrigins.filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || cleanOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked CORS request from:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());




/* -------------------------------------------------------
   Routes
------------------------------------------------------- */
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRoutes);
app.use("/api/contacts", contactsRouter);
app.use("/api/education", educationRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/uploads", uploadRoutes);
app.use("/api/users", userRouter);

// error controller
app.use(errorController);

// default route
app.get("/", (_req, res) => {
  res.json({ message: "Welcome to My Portfolio backend API." });
});

// MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("======================================");
  console.log(`🚀 Server is running on PORT: ${PORT}`);
  console.log(`🌐 External URL: ${process.env.RENDER_EXTERNAL_URL || "Local dev"}`);
  console.log("======================================");
});

