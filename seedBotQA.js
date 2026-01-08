import mongoose from "mongoose";
import BotQA from "./models/BotQA.js";

await mongoose.connect("mongodb://127.0.0.1:27017/chatclone");

await BotQA.insertMany([
  { question: "HI", answer: "Hello, how are you?" },
  { question: "HELLO", answer: "Hi there!" },
  { question: "BYE", answer: "Goodbye!" }
]);

console.log("Bot seeded");
process.exit();
