import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const Addstudent = () => {

// const [name  , setname] = useState("");
const [email  , setemail] = useState("");
const [name  , setname] = useState("");
const [age  , setage] = useState("");
const [fees  , setfees] = useState("");
  

 

 const submitform =async(e) =>{
    e.preventDefault();
    try {
       console.log("before the fetch time")
     const data = await fetch("http://localhost:6009/api/v1/addstudent",{
        method:"POST",
        headers:{
            "authorization":"Bearer "+localStorage.getItem("token"),
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email,name,age,fees})
    })
const res = await data.json();
console.log(res);
alert("heloooooooooo")


   } catch (error) {
    console.log(error)
   }
 }

//  const navigate = useNavigate();
  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      {/* Left Side (Form) */}
      <div className="flex items-center justify-center px-4 ">
        <div className="w-full max-w-md bg-white rounded-lg  p-8">
          {/* Heading */}
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
Add the Student
          </h1>

        <form className="space-y-5" onSubmit={submitform}>
  {/* Name */}

  {/* Email */}
  <div>
    <label
      htmlFor="email"
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      Name
    </label>
    <input
      type="text"
      id="name"
      name="name"
      placeholder="enter the name:"
      className="w-full border border-gray-300 rounded-md p-2.5 text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"

      onChange={(e)=>setname(e.target.value)}
      required
    />
  </div>

 <div>
    <label
      htmlFor="email"
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      Age
    </label>
    <input
      type="number"
      id="Age"
      name="Age"
      placeholder="enter the Age:"
      className="w-full border border-gray-300 rounded-md p-2.5 text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"

      onChange={(e)=>setage(e.target.value)}
      required
    />
  </div>

   <div>
    <label
      htmlFor="Fees"
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      Fee
    </label>
    <input
      type="number"
      id="fee"
      name="fee"
      placeholder="enter the Fee:"
      className="w-full border border-gray-300 rounded-md p-2.5 text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"

      onChange={(e)=>setfees(e.target.value)}
      required
    />
  </div>
  {/* Password */}
  <div>
    <label
      htmlFor="password"
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      Email
    </label>
    <input
      type="email"
      id="email"
      name="email"
      placeholder="enter the email:"
      className="w-full border border-gray-300 rounded-md p-2.5 text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
     
        onChange={(e)=>setemail(e.target.value)}
      required
    />
  </div>
  <div>

  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition"
    onClick={submitform}
  >
Add the Student
  </button>
</form>
        </div>
      </div>

      {/* Right Side (Image or Content) */}
      <div className="hidden lg:flex  flex-col items-center justify-center  ">
        <h2 className="text-3xl font-bold mb-6">Welcome to Our Platform 🚀</h2>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjt6kYNwFy4_gStca5N_ZMrGu0SjfwN9IvGQ&s" width={390} height={190}/>
      </div>
    </div>
  );
};

export default Addstudent;
