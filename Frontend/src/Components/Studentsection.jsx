import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Studentsection = () => {
  const [sectionId, setSectionId] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [sections, setSections] = useState([]);
  const [users, setUsers] = useState([]);

  // ✅ Fetch Sections (GET)
  const getSections = async () => {
    try {
      const res = await fetch("http://localhost:6009/api/v1/getsection", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setSections(data.alldata || []);
      console.log(data.alldata)
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Fetch Students (GET)
  const getStudents = async () => {
    try {
      const res = await fetch("http://localhost:6009/api/v1/getuser");
      const data = await res.json();
      setUsers(data.allusers || []);
      console.log("the all users")
      console.log(data.allusers)
      // console.log(data.allusers.department.name)
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Handle Checkbox Select / Unselect
  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId) // remove if already selected
        : [...prev, studentId] // add if not selected
    );
  };

  // ✅ Submit Selected Students with Section
  const handleAssignSection = async (e) => {
    e.preventDefault();

    if (!sectionId) {
      alert("Please select a section first ❌");
      return;
    }

    if (selectedStudents.length === 0) {
      alert("Please select at least one student ❌");
      return;
    }

    try {
      const res = await fetch("http://localhost:6009/api/v1/assignsection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          sectionId,
          studentIds: selectedStudents,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Section assigned successfully ✅");
        setSelectedStudents([]);
      } else {
        alert(data.message || "Something went wrong ❌");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSections();
    getStudents();
  }, []);

  return (
    <div className="grid lg:grid-cols-1 min-h-screen">
      <div className="flex items-start justify-start px-4">
        <div className="w-full max-w-3xl bg-white rounded-lg p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Assign Section
          </h1>

          <form className="space-y-5" onSubmit={handleAssignSection}>
            {/* ✅ Section Dropdown */}
            <div>
              <label
                htmlFor="section"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Section Name
              </label>
              <select
                id="section"
                className="w-full border rounded-md p-2.5"
                required
                value={sectionId}
                onChange={(e) => setSectionId(e.target.value)}
              >
                <option value="">-- Select Section --</option>
                {sections.map((sec) => (
                  <option key={sec._id} value={sec._id}>
                    {sec.name}
                  </option>
                ))}
              </select>
            </div>

            {/* ✅ Students Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-8">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <h3 className="text-xl font-bold text-white">Students</h3>
              </div>

              <div className="overflow-x-auto">
                {users.length > 0 ? (
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                          Select
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                          Name
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                          Semester
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                          Department
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {users.map((user) => (
                        <tr
                          key={user._id}
                          className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-center">
                            <input
                              type="checkbox"
                              checked={selectedStudents.includes(user._id)}
                              onChange={() => handleCheckboxChange(user._id)}
                              className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                            />
                          </td>
                          <td className="px-6 py-4 text-gray-800 font-medium">
                            {user.name || "N/A"}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {typeof user.semester === "object"
                              ? user.semester?.name || "N/A"
                              : user.semester || "N/A"}
                          </td>
                       <td className="px-6 py-4 text-gray-600">
  {user.department?.name || "N/A"}
</td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-600 text-center py-4">
                    No students found.
                  </p>
                )}
              </div>
            </div>

            {/* ✅ Assign Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 transition mt-5" onClick={handleAssignSection}
            >
              Assign Selected Students
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Studentsection;
