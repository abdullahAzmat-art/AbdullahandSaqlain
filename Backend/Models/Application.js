import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  resume: String, // optional link or file
  status: { 
    type: String, 
    enum: ["Pending", "Shortlisted", "Rejected", "Accepted"], 
    default: "Pending" 
  },
  matchScore: Number, // optional if you implement AI/matching logic
}, { timestamps: true });

const Application = mongoose.model("Application", applicationSchema);
export default Application;
