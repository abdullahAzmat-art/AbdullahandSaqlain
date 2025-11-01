import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const Departmentadd = () => {

// const [name  , setname] = useState("");
const [name  , setname] = useState("");
const [code , setcode] = useState("");
const [description  , setdescription] = useState("");
 

 

 const submitform =async(e) =>{
    e.preventDefault();
    try {
       console.log("before the fetch time")
     const data = await fetch("http://localhost:6009/api/v1/createdepartment",{
        method:"POST",
        headers:{
            "Content-Type":"application/json" ,
            "authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body:JSON.stringify({name,code,description})
    })
const res = await data.json();
console.log(res);
alert("heloooooooooo")


// navigate("/otp");
   } catch (error) {
    console.log(error)
   }
 }

//  const navigate = useNavigate();
  return (
    <div className="grid lg:grid-cols-1 min-h-screen">
      {/* Left Side (Form) */}
      <div className="flex items-center justify-center px-4 ">
        <div className="w-full max-w-md bg-white rounded-lg  p-8">
          {/* Heading */}
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
    Add Department
          </h1>

        <form className="space-y-5" onSubmit={submitform}>
  {/* Name */}

  {/* Email */}
  <div>
    <label
      htmlFor="email"
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      Department Name
    </label>
    <input
      type="text"
      id="name"
      name="name"
      placeholder=""
      className="w-full border border-gray-300 rounded-md p-2.5 text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"

      onChange={(e)=>setname(e.target.value)}
      required
    />
  </div>

  {/* Password */}
  <div>
    <label
      htmlFor="text"
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      Department Code
    </label>
    <input
      type="text"
      id="text"
      name="code "
      placeholder=""
      className="w-full border border-gray-300 rounded-md p-2.5 text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
     
        onChange={(e)=>setcode(e.target.value)}
      required
    />
  </div>
  <div>
    <label
      htmlFor="text"
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      Department Description
    </label>
    <input
      type="text"
      id="text"
      name="description"
      placeholder=""
      className="w-full border border-gray-300 rounded-md p-2.5 text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
     
        onChange={(e)=>setdescription(e.target.value)}
      required
    />
  </div>


  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition"
    onClick={submitform}
  >
Add the department  </button>
</form>
        </div>
      </div>

      {/* Right Side (Image or Content) */}
      {/* <div className="hidden lg:flex  flex-col items-center justify-center  ">
        <h2 className="text-3xl font-bold mb-6">Welcome to Our Platform 🚀</h2>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjt6kYNwFy4_gStca5N_ZMrGu0SjfwN9IvGQ&s" width={390} height={190}/>
      </div> */}
    </div>
  );
};

export default Departmentadd;
