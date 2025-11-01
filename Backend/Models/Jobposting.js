import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    location: { type: String },
    salary: { type: Number },
    status: {
      type: String,
      enum: ["draft", "published", "filled"],
      default: "published",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applicants: [
      {
        seeker: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        message: String,
        status: {
          type: String,
          enum: ["pending", "shortlisted", "rejected"],
          default: "pending",
        },
      },
    ],
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
