import React, { useEffect, useState } from 'react';
import { BarChart3, Users, BookOpen, Settings, LogOut, Menu, X, TrendingUp, AlertCircle } from 'lucide-react';
import Departmentadd from './Departmentadd';
import { Link } from 'react-router-dom';
import Sectionsadd from './Sectionsadd';
import Sectionadd from './Sectionsadd';
import Addstudent from './Addstudent';
import Studentsection from './Studentsection';

export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'Total Students', value: '1,234', icon: Users, color: 'bg-blue-500' },
    { label: 'Active Courses', value: '28', icon: BookOpen, color: 'bg-green-500' },
    { label: 'Revenue', value: '$45,320', icon: TrendingUp, color: 'bg-purple-500' },
    { label: 'Completion Rate', value: '78%', icon: BarChart3, color: 'bg-orange-500' }
  ];

  const [cource , setcources] = useState([])
  const [courses , setcourse] = useState([])
 
  const cources = async()=>{
    const data = await fetch("http://localhost:6009/api/v1/getdepartment",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "authorization": `Bearer ${localStorage.getItem("token")}`,
      }
    })
    const res = await data.json();
    setcources(res.alldata)
    console.log(res)
  }
  const course = async()=>{
    const data = await fetch("http://localhost:6009/api/v1/getsection",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "authorization": `Bearer ${localStorage.getItem("token")}`,
      }
    })
    const res = await data.json();
    setcourse(res.alldata)
    console.log(res)
  }

  useEffect(()=>{
    cources();
    course();
  } , [])
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'departments', label: 'Departments', icon: Settings }, // 👈 New tab
  { id: 'sections', label: 'Section', icon: BookOpen },
  { id: 'Assignsection', label: 'Assignsection', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings }
];


  return (
    <div className="flex h-screen ">
      {/* SIDEBAR */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'}  text-black transition-all duration-300 ease-in-out`}>
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6 pb-1">
          {sidebarOpen && <span></span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hover:bg-slate-700 p-1 rounded">
            {sidebarOpen ? <X size={23} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="mt-2 space-y-2 px-3">
          {navItems.map((item) => (   
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-blue-600 shadow-lg'
                  : 'hover:bg-slate-700'
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

     
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOP BAR */}
     

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-auto p-1">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* STATS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                      </div>
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <stat.icon size={24} className="text-white" />
                      </div>
                    </div>
                    <div className="flex items-center text-green-600 text-sm">
                      <TrendingUp size={16} className="mr-1" />
                      <span>+12% from last month</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* COURSES TABLE */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                  <h3 className="text-xl font-bold text-black">Department </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Department Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Code</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                        {/* <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {cource.map((course) => (
                        <tr key={course.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-gray-800 font-medium">{course.name}</td>
                          <td className="px-6 py-4 text-gray-600">{course.code}</td>
                          <td className="px-6 py-4 text-gray-600">{course.description}</td>
                          <td className="px-6 py-4 ">
                         <div className='bg-red-700 w-10 rounded-lg text-white flex justify-center items-center h-10'>
                           <i class="fa-solid fa-trash"></i>

                       </div>
                          </td>
                        
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden ">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                  <h3 className="text-xl font-bold text-black">Courses </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Course Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Department</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Semester</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
                                             </tr>
                    </thead>
                    <tbody>
                      {courses.map((course) => (
                        <tr key={course.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-left text-gray-800 font-medium">{course.name}</td>
                          <td className="px-6 py-4 text-left text-gray-600">{course.department.name}</td>
                          <td className="px-6 py-4 ms-16 text-left text-gray-600">{course.semester}</td>
                          <td className="px-6 py-4 text-left ">
                       <div className='bg-red-700 w-10 rounded-lg text-white flex justify-center items-center h-10'>
                           <i class="fa-solid fa-trash"></i>

                       </div>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

           
            </div>
          )}


      {activeTab === 'Assignsection'?(
      <Studentsection />):
      activeTab === 'sections' ? (
  <Sectionadd />
) : activeTab === 'departments' ? (
  <Departmentadd />
) : activeTab !== 'dashboard' ? (
  <div className="bg-white rounded-lg shadow-md p-1 text-center">
    <p className="text-gray-600 text-lg">
      Content for {navItems.find(item => item.id === activeTab)?.label} coming soon...
    </p>
  </div>
) : null}


        </div>
      </div>
    </div>
  );
}