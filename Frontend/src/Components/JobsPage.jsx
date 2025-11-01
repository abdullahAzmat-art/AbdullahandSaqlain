import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  DollarSign,
  Briefcase,
  Eye,
  Filter,
  Calendar,
  Building2,
  Users,
  X,
} from "lucide-react";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  // Categories for filtering
  const categories = [
    "Technology",
    "Design",
    "Marketing",
    "Finance",
    "Healthcare",
    "Education",
    "Sales",
    "Engineering",
    "Other",
  ];

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:6009/api/v1/all");
      const data = await res.json();
      
      if (res.ok) {
        setJobs(data.jobs || data || []);
        setFilteredJobs(data.jobs || data || []);
      } else {
        console.error("Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...jobs];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((job) => job.category === selectedCategory);
    }

    // Location filter
    if (selectedLocation) {
      filtered = filtered.filter((job) =>
        job.location?.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Salary filter
    if (minSalary) {
      filtered = filtered.filter((job) => job.salary >= parseInt(minSalary));
    }

    setFilteredJobs(filtered);
  }, [searchTerm, selectedCategory, selectedLocation, minSalary, jobs]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedLocation("");
    setMinSalary("");
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format salary
  const formatSalary = (salary) => {
    if (!salary) return "Not specified";
    return `$${salary.toLocaleString()}`;
  };

  // Navigate to job details
  const viewJobDetails = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-950 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-indigo-950 font-semibold">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 rounded-lg ms-6">
          <h1 className="text-3xl  mt-2 font-bold text-indigo-950 mb-2">
            Explore Opportunities
          </h1>
          <p className="text-gray-600">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""}{" "}
            available
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-4xl  p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
            
              <input
                type="text"
                placeholder="Search jobs by title or description..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-950 focus:border-transparent outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
            
              <select
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-950 focus:border-transparent outline-none transition-all appearance-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 bg-indigo-950 text-white py-3 transition-colors font-semibold"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Location Filter */}
                <div className="relative">
                 
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-950 focus:border-transparent outline-none transition-all"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  />
                </div>

                {/* Salary Filter */}
                <div className="relative">
                 
                  <input
                    type="number"
                    placeholder="Min Salary"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-950 focus:border-transparent outline-none transition-all"
                    value={minSalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                  />
                </div>

                {/* Clear Filters */}
                <button
                  onClick={clearFilters}
                  className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  <X className="w-5 h-5" />
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Active Filters Display */}
        {(searchTerm || selectedCategory || selectedLocation || minSalary) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {searchTerm && (
              <span className="bg-indigo-100 text-indigo-950 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                Search: {searchTerm}
                <button onClick={() => setSearchTerm("")}>
                  <X className="w-4 h-4" />
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="bg-indigo-100 text-indigo-950 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory("")}>
                  <X className="w-4 h-4" />
                </button>
              </span>
            )}
            {selectedLocation && (
              <span className="bg-indigo-100 text-indigo-950 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                Location: {selectedLocation}
                <button onClick={() => setSelectedLocation("")}>
                  <X className="w-4 h-4" />
                </button>
              </span>
            )}
            {minSalary && (
              <span className="bg-indigo-100 text-indigo-950 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                Min Salary: ${parseInt(minSalary).toLocaleString()}
                <button onClick={() => setMinSalary("")}>
                  <X className="w-4 h-4" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Job Cards Grid */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={clearFilters}
              className="bg-indigo-950 text-white px-6 py-2 rounded-lg  transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 cursor-pointer group"
                onClick={() => viewJobDetails(job._id)}
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-indigo-950 to-indigo-800 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:underline">
                        {job.title}
                      </h3>
                      {job.category && (
                        <span className="inline-block bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                          {job.category}
                        </span>
                      )}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        job.status === "published"
                          ? "bg-green-100 text-green-700"
                          : job.status === "filled"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {job.description}
                  </p>

                  {/* Job Details */}
                  <div className="space-y-2 mb-4">
                    {job.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <MapPin className="w-4 h-4 text-indigo-950" />
                        <span>{job.location}</span>
                      </div>
                    )}
                    {job.salary && (
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <DollarSign className="w-4 h-4 text-indigo-950" />
                        <span className="font-semibold">
                          {formatSalary(job.salary)}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Users className="w-4 h-4 text-indigo-950" />
                      <span>{job.applicants?.length || 0} applicants</span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(job.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Eye className="w-4 h-4" />
                      <span>{job.views || 0} views</span>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <button
                    className="w-full mt-4 bg-indigo-950 text-white py-3 rounded-lg font-semibold  transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      viewJobDetails(job._id);
                    }}
                  >
                    View Details & Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;