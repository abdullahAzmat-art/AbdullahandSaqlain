import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import { Briefcase, Users, FileText, CheckCircle, PlusCircle, Trash2, Eye } from "lucide-react";

const JobCreatorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    skills: "",
    salary: "",
  });
  const [analytics, setAnalytics] = useState({
    totalJobs: 0,
    totalApplicants: 0,
    activeJobs: 0,
    closedJobs: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // NOTE: Replace these with your actual API endpoints
  const API_BASE = "http://localhost:6600/api/v1";
  const JOB_CREATE_API = "http://localhost:6600/create";
  
  // Get token from memory state instead of localStorage
  const token = localStorage.getItem("token")

  // Fetch jobs and analytics
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");
      
      
      const response = await fetch(`${API_BASE}/myjobs`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      
      if (!response.ok) throw new Error("Failed to fetch jobs");
      
      const data = await response.json();
      setJobs(data.jobs || []);
      setAnalytics({
        totalJobs: data.jobs?.length || 0,
        totalApplicants: data.totalApplicants || 0,
        activeJobs: data.jobs?.filter((j) => j.status === "active").length || 0,
        closedJobs: data.jobs?.filter((j) => j.status === "closed").length || 0,
      });
    } catch (err) {
      setError("Failed to load jobs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Post a new job
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      
      const skillsArray = form.skills.split(",").map((s) => s.trim());
      
      const response = await fetch("http://localhost:6600/api/v1/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...form,
          skills: skillsArray
        })
      }); 
      
      if (!response.ok) throw new Error("Failed to create job");
      
      alert("Job created successfully!");
      setForm({ title: "", description: "", location: "", category: "", skills: "", salary: "" });
      setActiveTab("manage");
      fetchJobs();
    } catch (err) {
      setError("Error posting job");
      alert("Error posting job");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete job
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      setLoading(true);
      
      const response = await fetch(`${API_BASE}/jobs/${id}`, {
        method: "DELETE",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      
      if (!response.ok) throw new Error("Failed to delete job");
      
      fetchJobs();
      alert("Job deleted successfully!");
    } catch (err) {
      alert("Failed to delete job");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Mark job as filled
  const handleMarkFilled = async (id) => {
    try {
      setLoading(true);
      
      const response = await fetch(`${API_BASE}/jobs/markfilled/${id}`, {
        method: "PUT",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      if (!response.ok) throw new Error("Failed to mark job as filled");
      
      fetchJobs();
      alert("Job marked as filled!");
    } catch (err) {
      alert("Failed to update job status");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // View Applicants
  const fetchApplicants = async (jobId) => {
    try {
      setLoading(true);
      
      const response = await fetch(`${API_BASE}/jobs/${jobId}/applicants`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      
      if (!response.ok) throw new Error("Failed to fetch applicants");
      
      const data = await response.json();
      setApplicants(data.applicants || []);
      setSelectedJob(jobId);
      setActiveTab("applicants");
    } catch (err) {
      alert("Failed to load applicants");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Update applicant status
  const updateStatus = async (appId, status) => {
    try {
      setLoading(true);
      
      const response = await fetch(`${API_BASE}/jobs/applicant/status`, {
        method: "PUT",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ applicantId: appId, status })
      });
      
      if (!response.ok) throw new Error("Failed to update status");
      
      fetchApplicants(selectedJob);
    } catch (err) {
      alert("Failed to update applicant status");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Analytics data for charts
  const categoryData = jobs.reduce((acc, job) => {
    if (!job.category) return acc;
    const found = acc.find((item) => item.category === job.category);
    if (found) found.count++;
    else acc.push({ category: job.category, count: 1 });
    return acc;
  }, []);

  const applicantData = [
    { name: "Active", value: analytics.activeJobs },
    { name: "Closed", value: analytics.closedJobs },
  ];

  const COLORS = ["#2563eb", "#f59e0b"];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        CampusConnect — Job Creator Dashboard
      </h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg max-w-3xl mx-auto">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {["overview", "post", "manage", "analytics"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full transition-all font-medium ${
              activeTab === tab 
                ? "bg-indigo-600 text-white shadow-md" 
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
          </button>
        ))}
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {/* ---------------- Overview ---------------- */}
      {activeTab === "overview" && (
        <div>
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex items-center gap-4">
              <Briefcase className="text-blue-600" size={32} />
              <div>
                <p className="text-sm text-gray-500">Total Jobs</p>
                <h2 className="text-2xl font-bold text-gray-800">{analytics.totalJobs}</h2>
              </div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex items-center gap-4">
              <Users className="text-green-600" size={32} />
              <div>
                <p className="text-sm text-gray-500">Total Applicants</p>
                <h2 className="text-2xl font-bold text-gray-800">{analytics.totalApplicants}</h2>
              </div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex items-center gap-4">
              <CheckCircle className="text-yellow-600" size={32} />
              <div>
                <p className="text-sm text-gray-500">Active Jobs</p>
                <h2 className="text-2xl font-bold text-gray-800">{analytics.activeJobs}</h2>
              </div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex items-center gap-4">
              <FileText className="text-red-600" size={32} />
              <div>
                <p className="text-sm text-gray-500">Closed Jobs</p>
                <h2 className="text-2xl font-bold text-gray-800">{analytics.closedJobs}</h2>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Jobs</h2>
          <div className="bg-white rounded-xl shadow p-6">
            {jobs.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No jobs posted yet</p>
            ) : (
              jobs.slice(0, 5).map((job) => (
                <div key={job._id} className="flex justify-between items-center border-b border-gray-200 py-3 last:border-0">
                  <div>
                    <h3 className="font-semibold text-gray-800">{job.title}</h3>
                    <p className="text-sm text-gray-500">{job.category}</p>
                  </div>
                  <p className="text-sm text-gray-600">{job.location}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ---------------- Post Job ---------------- */}
      {activeTab === "post" && (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto space-y-5">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Post a New Job</h2>

          {["title", "description", "location", "category", "skills", "salary"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-semibold mb-2 capitalize text-gray-700">
                {field === "skills" ? "Skills (comma-separated)" : field}
              </label>
              {field === "description" ? (
                <textarea
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder={`Enter ${field}`}
                  rows={4}
                />
              ) : (
                <input
                  type={field === "salary" ? "number" : "text"}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder={`Enter ${field}`}
                />
              )}
            </div>
          ))}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <PlusCircle size={20} />
            {loading ? "Posting..." : "Post Job"}
          </button>
        </div>
      )}

      {/* ---------------- Manage Jobs ---------------- */}
      {activeTab === "manage" && (
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Manage Posted Jobs</h2>
          {jobs.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No jobs to manage yet</p>
          ) : (
            jobs.map((job) => (
              <div key={job._id} className="border-b border-gray-200 py-4 flex justify-between items-center last:border-0">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{job.title}</h3>
                  <p className="text-sm text-gray-500">
                    {job.category} • {job.location}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Status: <span className={job.status === "active" ? "text-green-600" : "text-gray-600"}>
                      {job.status || "active"}
                    </span>
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => fetchApplicants(job._id)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium transition-colors"
                    disabled={loading}
                  >
                    <Eye size={18} /> View
                  </button>
                  <button
                    onClick={() => handleMarkFilled(job._id)}
                    className="text-green-600 hover:text-green-800 flex items-center gap-1 font-medium transition-colors"
                    disabled={loading}
                  >
                    <CheckCircle size={18} /> Filled
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1 font-medium transition-colors"
                    disabled={loading}
                  >
                    <Trash2 size={18} /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ---------------- Applicants ---------------- */}
      {activeTab === "applicants" && (
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
          <button
            onClick={() => setActiveTab("manage")}
            className="mb-6 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            ← Back to Jobs
          </button>
          <h2 className="text-2xl font-semibold mb-6 text-indigo-700">Applicants</h2>
          {applicants.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No applicants yet for this job</p>
          ) : (
            applicants.map((app) => (
              <div key={app._id} className="border-b border-gray-200 py-4 last:border-0">
                <h3 className="font-semibold text-lg text-gray-800">{app.name}</h3>
                <p className="text-sm text-gray-600">{app.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Skills: {Array.isArray(app.skills) ? app.skills.join(", ") : app.skills}
                </p>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => updateStatus(app._id, "shortlisted")}
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
                  >
                    Shortlist
                  </button>
                  <button
                    onClick={() => updateStatus(app._id, "rejected")}
                    disabled={loading}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ---------------- Analytics ---------------- */}
      {activeTab === "analytics" && (
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">Jobs by Category</h3>
            {categoryData.length > 0 ? (
              <BarChart width={400} height={300} data={categoryData}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" />
              </BarChart>
            ) : (
              <p className="text-gray-500 text-center py-8">No data available</p>
            )}
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">Job Status Distribution</h3>
            {applicantData.some(d => d.value > 0) ? (
              <PieChart width={400} height={300}>
                <Pie
                  data={applicantData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {applicantData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            ) : (
              <p className="text-gray-500 text-center py-8">No data available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCreatorDashboard;