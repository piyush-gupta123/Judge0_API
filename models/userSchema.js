import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, minlength: 8 },
  code: [],
});

export default mongoose.model("User", userSchema);
