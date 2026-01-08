import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/chatclone")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
