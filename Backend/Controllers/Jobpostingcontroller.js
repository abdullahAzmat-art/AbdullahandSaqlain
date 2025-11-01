import Jobposting from "../Models/Jobposting.js";
import User from "../Models/Userschema.js";


// 📌 Create new job (Finder)
export const createJob = async (req, res) => {
  try {
    const { title, description, category, location, salary, status } = req.body;
    if (!title || !description)
      return res.status(400).json({ msg: "Title and description required" });

    const job = await Jobposting({
      title,
      description,
      category,
      location,
      salary,
      status: status || "published",
      createdBy: req.user._id,
    }).save();

    res.status(201).json({ msg: "Job created successfully", job });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 🌎 Get all published jobs (Seeker)
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Jobposting.find({ status: "published" }).populate("createdBy", "name email");
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 👨‍💻 Get all jobs created by current user (Finder)
export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Jobposting.find({ createdBy: req.user._id });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 📝 Update a job (edit)
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedJob = await Jobposting.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ msg: "Job updated successfully", job: updatedJob });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Mark job as filled
export const markJobFilled = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Jobposting.findByIdAndUpdate(id, { status: "filled" }, { new: true });
    res.status(200).json({ msg: "Job marked as filled", job });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 🧑‍🎓 Apply for a job (Seeker)
export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { message } = req.body;

    const job = await Jobposting.findById(jobId);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    const alreadyApplied = job.applicants.some(
      (a) => a.seeker.toString() === req.user._id.toString()
    );
    if (alreadyApplied) return res.status(400).json({ msg: "Already applied" });

    job.applicants.push({ seeker: req.user._id, message });
    await job.save();

    res.status(200).json({ msg: "Applied successfully", job });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 👀 Get applicants for a job (Finder)
export const getApplicants = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Jobposting.findById(id).populate("applicants.seeker", "name email");
    if (!job) return res.status(404).json({ msg: "Job not found" });
    res.status(200).json(job.applicants);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 🧾 Update applicant status (shortlist/reject)
export const updateApplicantStatus = async (req, res) => {
  try {
    const { jobId, seekerId, status } = req.body;
    const job = await Jobposting.findById(jobId);

    const applicant = job.applicants.find(
      (a) => a.seeker.toString() === seekerId
    );
    if (!applicant) return res.status(404).json({ msg: "Applicant not found" });

    applicant.status = status;
    await job.save();

    res.status(200).json({ msg: "Applicant status updated", job });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 🗑️ Delete job
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    await Jobposting.findByIdAndDelete(id);
    res.status(200).json({ msg: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 📊 Analytics for Finder Dashboard
export const getJobAnalytics = async (req, res) => {
  try {
    const jobs = await Jobposting.find({ createdBy: req.user._id });
    const totalJobs = jobs.length;
    const totalApplicants = jobs.reduce((acc, j) => acc + j.applicants.length, 0);
    res.status(200).json({ totalJobs, totalApplicants });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const recommendJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const allJobs = await Jobposting.find();

    // Filter jobs that match user's skills or category
    const recommended = allJobs.filter(job => {
      const matchSkill = job.skills.some(skill => user.skills.includes(skill));
      const matchCategory = job.category === user.preferredCategory;
      return matchSkill || matchCategory;
    });

    res.status(200).json(recommended);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
