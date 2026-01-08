import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/chatclone")
  .then(() => console.log("Mongo Connected"));

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

app.listen(3000, () => console.log("Server running"));
