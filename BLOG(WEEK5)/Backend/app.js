import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { authorRoute } from "./APIs/AuthorApi.js";
import { userRoute } from "./APIs/UserApi.js";
import { commonRouter } from "./APIs/CommonApi.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
].filter(Boolean);

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.DB_URL);
  isConnected = true;
  console.log("Database connected");
}

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).send("Backend running");
});

app.use("/author-api", authorRoute);
app.use("/user-api", userRoute);
app.use("/common-api", commonRouter);

app.use((req, res) => {
  res.status(404).json({ message: `${req.originalUrl} is invalid path` });
});

app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

export default app;