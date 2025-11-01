
import express from "express";
import {
  createJob,
  getAllJobs,
  getMyJobs,
  updateJob,
  markJobFilled,
  applyJob,
  getApplicants,
  updateApplicantStatus,
  deleteJob,
  getJobAnalytics,
} from "../Controllers/Jobpostingcontroller.js";
import { authmiddleware } from "../Middleware/authmiddleware.js";
import { recommendJobs } from "../Controllers/Usercontroller.js";
import { creatorMiddleware } from "../Middleware/Middlewareforposting.js";


const router = express.Router();

// 📌 Finder
router.post("/create", authmiddleware, createJob);
router.get("/myjobs", authmiddleware, getMyJobs);
router.put("/update/:id", authmiddleware,  creatorMiddleware,updateJob);
router.put("/markfilled/:id", authmiddleware, creatorMiddleware ,markJobFilled);
router.delete("/:id", authmiddleware,  creatorMiddleware ,deleteJob);

//  Seeker
router.get("/all", getAllJobs);
router.post("/apply/:jobId", authmiddleware, applyJob);

//  Finder Applicant Management
router.get("/:id/applicants", authmiddleware, getApplicants);
router.put("/applicant/status", authmiddleware, creatorMiddleware , updateApplicantStatus);


router.get("/analytics/data", authmiddleware, getJobAnalytics);


router.get("/recommenaded" ,  authmiddleware, recommendJobs)
export default router;
