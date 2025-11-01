import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, X, Plus } from "lucide-react";
import Swal from "sweetalert2";

const Signuppage = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Bio  , setBio] = useState("")
  const [Interests  , setinterests] = useState("")


  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [preferredCategory, setPreferredCategory] = useState("");

  const [resume, setResume] = useState(null);
 

  const navigate = useNavigate();


  

  // Handle resume upload
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
    }
  };

  // Add skill to array
  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  // Remove skill from array
  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  // Handle Enter key for adding skills
  const handleSkillKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  // ✅ Handle signup
  const submitform = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("bio" ,Bio)
    formData.append("interests" ,JSON.stringify(Interests))

    formData.append("skills", JSON.stringify(skills));
    formData.append("preferredCateory", JSON.stringify(preferredCategory));
    
    
    if (resume) {
      formData.append("resume", resume);
    }

    try {
     
      const res = await fetch("http://localhost:6600/api/v1/signup", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
          Swal.fire({
                title: "Success!",
                text: `${data.user.name} is successfully Signup in`,
                icon: "success",
                confirmButtonText: "OK",})
        
      } else {
        // Handle error from backend
               Swal.fire({
                 title: "Error!",
                 text: res.msg || "Login failed",
                 icon: "error",
                 confirmButtonText: "OK",
               });
               return;
      }
    } catch (error) {
      console.log(error);
      alert("Error during signup. Please try again.");
    }
  };


  const categories = [
    "Technology",
    "Design",
    "Marketing",
    "Finance",
    "Healthcare",
    "Education",
    "Sales",
    "Engineering",
    "Other"
  ];

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Side (Form) */}
          <div className=" rounded-2xl w-full max-w-md  p-8  ">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-indigo-950 mb-2">
                Join CampusConnect
              </h1>
              <p className="text-gray-600">Create your account to get started</p>
            </div>

            <form className="space-y-4" onSubmit={submitform}>
            

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Abdullah Khan"
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-800 focus:ring-2 focus:ring-indigo-950 focus:border-transparent outline-none transition-all"
                  required
                  onChange={(e) => setname(e.target.value)}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-800 focus:ring-2 focus:ring-indigo-950 focus:border-transparent outline-none transition-all"
                  required
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-800 focus:ring-2 focus:ring-indigo-950 focus:border-transparent outline-none transition-all"
                  required
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>


              {/* Preferred Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Job Category
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-800 focus:ring-2 focus:ring-indigo-950 focus:border-transparent outline-none transition-all"
                  onChange={(e) => setPreferredCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Skills
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Add a skill (e.g., React, Python)"
                    className="flex-1 border border-gray-300 rounded-lg p-3 text-sm text-gray-800 focus:ring-2 focus:ring-indigo-950 focus:border-transparent outline-none transition-all"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={handleSkillKeyPress}
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="bg-indigo-950 text-white px-4 rounded-lg hover:bg-indigo-800 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-indigo-100 text-indigo-950 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="hover:text-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
                 <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                Add Interests
                </label>
                <input
                  type="text"
                  placeholder="  Add Interests"
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-800 focus:ring-2 focus:ring-indigo-950 focus:border-transparent outline-none transition-all"
                  required
                  onChange={(e) => setinterests(e.target.value)}
                />
              </div>
                 <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                Add Bio
                </label>
                <input
                  type="text"
                  placeholder="  Add Bio"
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-800 focus:ring-2 focus:ring-indigo-950 focus:border-transparent outline-none transition-all"
                  required
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Resume (PDF)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="resume"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleResumeUpload}
                  />
                  <label
                    htmlFor="resume"
                    className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-indigo-950 transition-colors"
                  >
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-sm text-gray-600">
                        {resume ? resume.name : "Click to upload resume"}
                      </span>
                    </div>
                  </label>
                </div>
              </div>
             

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full  bg-blue-950 text-white py-3 rounded-lg font-semibold hover:from-indigo-900 hover:to-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all "
              >
                Create Account
              </button>

              <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{" "}
                <a href="/login" className="text-indigo-950 font-semibold hover:underline">
                  Sign In
                </a>
              </p>
            </form>
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 to-indigo-800 rounded-2xl p-12 text-white ">
            <h2 className="text-2xl font-bold mb-6 text-black">Welcome to CampusConnect 🚀</h2>
        <img src="/images/20945760.jpg" width={390} height={190} alt="Welcome" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signuppage;