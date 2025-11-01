import React, { useState, useEffect } from "react";

const Sectionadd = () => {
  const [name, setName] = useState("");
  const [semester, setSemester] = useState("");
  const [departmentId, setDepartmentId] = useState(""); // ✅ store department ID
  const [departments, setDepartments] = useState([]);

  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
console.log(departmentId)
  // ✅ Fetch departments on load
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch("http://localhost:6009/api/v1/getdepartment", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setDepartments(data.alldata || []);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  // ✅ Submit section data
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:6009/api/v1/createsection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          semester,
          department: departmentId, // ✅ send department ID
        }),
      });

      const data = await res.json();
      console.log("Response:", data);
      alert(data.message || "Section created successfully!");
    } catch (error) {
      console.error("Error creating section:", error);
    }
  };

  return (
    <div className="grid lg:grid-cols-1 min-h-screen">
      <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Add Section</h1>

          <form className="space-y-5" onSubmit={submitForm}>
            {/* Section Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Section Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-md p-2.5"
                required
              />
            </div>

            {/* Semester */}
            <div>
              <label className="block text-sm font-medium mb-1">Select Semester</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full border rounded-md p-2.5"
                required
              >
                <option value="">-- Select Semester --</option>
                {semesters.map((sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium mb-1">Select Department</label>
              <select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                className="w-full border rounded-md p-2.5"
                required
              >
                <option value="">-- Select Department --</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700"
            >
              Add Section
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sectionadd;
