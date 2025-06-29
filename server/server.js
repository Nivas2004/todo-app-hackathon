import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import fs from "fs";
import admin from "firebase-admin";
import taskRoutes from "./routes/taskRoutes.js"; // ✅ Create this route file

// ✅ Load environment variables
dotenv.config();

const app = express();

// ✅ CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://todo-frontend.vercel.app",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());

// ✅ Firebase Admin Initialization
const serviceAccount = JSON.parse(
  fs.readFileSync("./firebaseServiceAccount.json", "utf-8")
);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// ✅ Verify Firebase Token Middleware
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("No token provided");

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).send("Unauthorized");
  }
};

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("✅ Backend is running.");
});

// ✅ Use Task Routes with Auth Middleware
app.use("/api/tasks", verifyToken, taskRoutes);

// ✅ Connect to MongoDB and Start Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
