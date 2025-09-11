import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Signup from '../pages/Signup';
import LandingPage from '../pages/LandingPage';
import Signin from '../pages/Signin';
import Dashboards from '../pages/Dashboards';
import Assignment from '../pages/Assignment';
import Open from '../pages/Open';
import Submit from '../pages/Submit';
import Submission from '../pages/Submission';
import LecturerSignup from '../pages/ADMIN LECTURER/lecturerSignup';
import LecturerSignin from '../pages/ADMIN LECTURER/LecturerSignin';
import LecturerDashboard from '../pages/ADMIN LECTURER/LecturerDashboard';
import LecturerAssignment from '../pages/ADMIN LECTURER/LecturerAssignment';
import LecturerSubmission from '../pages/ADMIN LECTURER/LecturerSubmission';
import Setting from '../pages/ADMIN LECTURER/Setting';
import Logout from '../pages/ADMIN LECTURER/Logout';
import Error404 from '../pages/ADMIN LECTURER/Error404';
import View from '../pages/ADMIN LECTURER/View';
import LecturerResources from '../pages/ADMIN LECTURER/LecturerResources';
import StudentResources from '../pages/StudentResources';
import MyPerformance from '../pages/MyPerformance';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="z-index">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboards />} />
        <Route path="/assignment" element={<Assignment />} />
        <Route path="/assignment/:id" element={<Open />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/submission" element={<Submission />} />
        <Route path="/lecturerSignup" element={<LecturerSignup />} />
        <Route path="/lecturerSignin" element={<LecturerSignin />} />
        <Route path="/lecturerDashboard" element={<LecturerDashboard />} />
        <Route path="/assignmentss" element={<LecturerAssignment />} />
        <Route path="/lecturer-submission/:id" element={<LecturerSubmission />} />
        <Route path="/lecturer-view/:assignmentId/:submissionIndex" element={<View />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/performance" element={< MyPerformance />} />

        <Route path="/LecturerResources" element={<LecturerResources />} />
        <Route path="/StudentResources" element={< StudentResources />} />
        <Route path="/profile" element={<Error404 />} />
        <Route path="/collaborations" element={<Error404 />} />
        <Route path="/lecturerProfile" element={<Error404 />} />
        <Route path="/lecturerPerformance" element={<Error404 />} />
        <Route path="/submissions" element={<Error404 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;