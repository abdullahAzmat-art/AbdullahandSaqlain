import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layouts from "./Components/Layouts";
import Signuppage from "./Components/Signuppage";
import Otpsubmit from "./Components/Otpsubmit";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Resendemail from "./Components/Resendemail";
import Resendotp from "./Components/Resendotp";
import AdminPanel from "./Components/Adminpanel";
import Practicepanel from "./Components/Practicepanel";
import Protectedroute from "./Components/Protectedroute";
import Unauthorization from "./Components/Unauthorization";
import Addstudent from "./Components/Addstudent";
import JobsPage from "./Components/JobsPage";
import JobCreatorDashboard from "./Components/JobCreatorDashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Parent layout */}
        <Route path="/" element={<Layouts />}>
          {/* Child routes rendered inside <Outlet /> */}
          <Route path="/" element={<Home/>}/>
          <Route path="/jobs" element={<JobsPage/>}/>
          {/* <Route index element={<h1 className="text-center text-2xl mt-5">Hello Home</h1>} /> */}
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/otp" element={<Otpsubmit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resendemail" element={<Resendemail />} />
          <Route path="/resendotp" element={<Resendotp />} />
<Route path="/unauthorized" element={<Unauthorization />} />
<Route path="/jobcreator" element={<JobCreatorDashboard/>}/>

          <Route element={<Protectedroute/>}>
          
          <Route path="/practice" element={<Practicepanel />} />
          <Route path="/addthestudent" element={<Addstudent />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
