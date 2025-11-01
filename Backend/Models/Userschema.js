import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["seeker", "creator", "admin"], default: "seeker" },
  skills: [String],
  preferredCategory: String,

  resetPasswordToken: String,
  resetPasswordExpires: Date,   
});



const User = mongoose.model("User", userSchema);
export default User;
