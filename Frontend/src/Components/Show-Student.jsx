import React from "react";

const ShowStudent = () => {
  const [data, setData] = React.useState([]);

  const getallstudent = async () => {
    try {
      const res = await fetch("http://localhost:6009/api/v1/getstudent", {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      console.log(result);

      // ✅ store data in state
      setData(result.allstudents || []); // assuming backend returns { students: [...] }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getallstudent();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-3xl mb-10 mt-6 font-bold text-center">
        Show All Students
      </h1>

      <div className="relative flex flex-col h-full text-gray-700 bg-white shadow-md rounded-xl">
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-blue-950 text-white">
              <th className="p-4">Name</th>
              <th className="p-4 border">Email</th>
              <th className="p-4 border">Fees</th>
              <th className="p-4 border">Age</th>
              <th className="p-4 border">Operation</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((ele, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-4 border">{ele.name}</td>
                  <td className="p-4 border">{ele.email}</td>
                  <td className="p-4 border">{ele.fees}</td>
                  <td className="p-4 border">{ele.age}</td>
                  <td className="p-4 border">
                    <button className="text-blue-600 hover:underline mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline ms-4">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-gray-500 py-4 italic"
                >
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowStudent;
